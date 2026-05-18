// @vitest-environment jsdom

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Beacon1CheckoutButton } from "./Beacon1CheckoutButton";

function jsonResponse(body: unknown, status = 200) {
  return {
    ok: status >= 200 && status < 300,
    status,
    json: async () => body,
  } as Response;
}

function getButton(label: string) {
  return screen.getByRole("button", { name: label }) as HTMLButtonElement;
}

describe("Beacon1CheckoutButton", () => {
  const fetchMock = vi.fn();
  const assignMock = vi.fn();
  const openMock = vi.fn();
  const originalLocation = window.location;
  const originalOpen = window.open;

  beforeEach(() => {
    fetchMock.mockReset();
    assignMock.mockReset();
    openMock.mockReset();
    sessionStorage.clear();
    vi.stubGlobal("fetch", fetchMock);
    // Default: simulate a successfully-opened popup so click handlers don't
    // fall back to same-tab navigation. Individual tests can override.
    openMock.mockReturnValue({
      closed: false,
      opener: {},
      location: { href: "about:blank" },
      close: vi.fn(),
    });
    window.open = openMock as unknown as typeof window.open;
    Object.defineProperty(window, "location", {
      configurable: true,
      value: {
        ...originalLocation,
        assign: assignMock,
      },
    });
  });

  afterEach(() => {
    cleanup();
    sessionStorage.clear();
    vi.unstubAllGlobals();
    window.open = originalOpen;
    Object.defineProperty(window, "location", {
      configurable: true,
      value: originalLocation,
    });
  });

  it("renders the default label when the product is available", async () => {
    fetchMock.mockResolvedValueOnce(
      jsonResponse({
        product: {
          availableForSale: true,
          variant: { availableForSale: true },
        },
      }),
    );

    render(
      <Beacon1CheckoutButton
        defaultLabel="Buy Beacon 1"
        surface="product-page"
        className="rounded-full"
      />,
    );

    await waitFor(() => {
      expect(getButton("Buy Beacon 1").disabled).toBe(false);
    });
  });

  it("shows Sold Out when the product variant is unavailable", async () => {
    fetchMock.mockResolvedValueOnce(
      jsonResponse({
        product: {
          availableForSale: true,
          variant: { availableForSale: false },
        },
      }),
    );

    render(
      <Beacon1CheckoutButton
        defaultLabel="Buy Beacon 1"
        surface="product-page"
        className="rounded-full"
      />,
    );

    await waitFor(() => {
      expect(getButton("Sold Out").disabled).toBe(true);
    });
  });

  it("shows Releasing Soon when product lookup fails", async () => {
    fetchMock.mockResolvedValueOnce(jsonResponse({}, 500));

    render(
      <Beacon1CheckoutButton
        defaultLabel="Buy Beacon 1"
        surface="product-page"
        className="rounded-full"
      />,
    );

    await waitFor(() => {
      expect(getButton("Releasing Soon").disabled).toBe(true);
    });
  });

  it("shows the loading label and opens checkout in a new tab", async () => {
    let resolveCheckout: ((value: Response) => void) | undefined;
    const checkoutPromise = new Promise<Response>((resolve) => {
      resolveCheckout = resolve;
    });

    fetchMock
      .mockResolvedValueOnce(
        jsonResponse({
          product: {
            availableForSale: true,
            variant: { availableForSale: true },
          },
        }),
      )
      .mockReturnValueOnce(checkoutPromise);

    const checkoutWindow = {
      closed: false,
      opener: {} as unknown,
      location: { href: "about:blank" },
      close: vi.fn(),
    };
    openMock.mockReturnValueOnce(checkoutWindow);

    render(
      <Beacon1CheckoutButton
        defaultLabel="Buy Beacon 1"
        loadingLabel="Opening Checkout..."
        surface="product-page"
        className="rounded-full"
      />,
    );

    const button = await screen.findByRole("button", { name: "Buy Beacon 1" });
    fireEvent.click(button);

    expect(openMock).toHaveBeenCalledWith("about:blank", "_blank");
    expect(checkoutWindow.opener).toBeNull();

    await waitFor(() => {
      expect(getButton("Opening Checkout...").disabled).toBe(true);
    });

    resolveCheckout?.(
      jsonResponse({
        checkoutUrl: "https://example.myshopify.com/checkouts/test",
      }),
    );

    await waitFor(() => {
      expect(checkoutWindow.location.href).toBe(
        "https://example.myshopify.com/checkouts/test",
      );
    });
    expect(assignMock).not.toHaveBeenCalled();
  });

  it("falls back to same-tab navigation when the popup is blocked", async () => {
    fetchMock
      .mockResolvedValueOnce(
        jsonResponse({
          product: {
            availableForSale: true,
            variant: { availableForSale: true },
          },
        }),
      )
      .mockResolvedValueOnce(
        jsonResponse({
          checkoutUrl: "https://example.myshopify.com/checkouts/blocked",
        }),
      );

    openMock.mockReturnValueOnce(null);

    render(
      <Beacon1CheckoutButton
        defaultLabel="Buy Beacon 1"
        surface="product-page"
        className="rounded-full"
      />,
    );

    const button = await screen.findByRole("button", { name: "Buy Beacon 1" });
    fireEvent.click(button);

    await waitFor(() => {
      expect(assignMock).toHaveBeenCalledWith(
        "https://example.myshopify.com/checkouts/blocked",
      );
    });
  });

  it("locks the button when checkout creation fails", async () => {
    fetchMock
      .mockResolvedValueOnce(
        jsonResponse({
          product: {
            availableForSale: true,
            variant: { availableForSale: true },
          },
        }),
      )
      .mockRejectedValueOnce(new Error("checkout failed"));

    render(
      <Beacon1CheckoutButton
        defaultLabel="Buy Beacon 1"
        surface="product-page"
        className="rounded-full"
      />,
    );

    const button = await screen.findByRole("button", { name: "Buy Beacon 1" });
    fireEvent.click(button);

    await waitFor(() => {
      expect(getButton("Releasing Soon").disabled).toBe(true);
    });
  });
});

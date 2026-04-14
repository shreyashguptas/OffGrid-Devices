// @vitest-environment jsdom

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Link1CheckoutButton } from "./Link1CheckoutButton";

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

describe("Link1CheckoutButton", () => {
  const fetchMock = vi.fn();
  const assignMock = vi.fn();
  const originalLocation = window.location;

  beforeEach(() => {
    fetchMock.mockReset();
    assignMock.mockReset();
    sessionStorage.clear();
    vi.stubGlobal("fetch", fetchMock);
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
      <Link1CheckoutButton
        defaultLabel="Buy Link 1"
        className="rounded-full"
      />,
    );

    await waitFor(() => {
      expect(getButton("Buy Link 1").disabled).toBe(false);
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
      <Link1CheckoutButton
        defaultLabel="Buy Link 1"
        className="rounded-full"
      />,
    );

    await waitFor(() => {
      expect(getButton("Sold Out").disabled).toBe(true);
    });
  });

  it("shows Checkout Unavailable when product lookup fails", async () => {
    fetchMock.mockResolvedValueOnce(jsonResponse({}, 500));

    render(
      <Link1CheckoutButton
        defaultLabel="Buy Link 1"
        className="rounded-full"
      />,
    );

    await waitFor(() => {
      expect(getButton("Checkout Unavailable").disabled).toBe(true);
    });
  });

  it("shows the loading label and redirects after checkout creation", async () => {
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

    render(
      <Link1CheckoutButton
        defaultLabel="Buy Link 1"
        loadingLabel="Opening Checkout..."
        className="rounded-full"
      />,
    );

    const button = await screen.findByRole("button", { name: "Buy Link 1" });
    fireEvent.click(button);

    await waitFor(() => {
      expect(getButton("Opening Checkout...").disabled).toBe(true);
    });

    resolveCheckout?.(
      jsonResponse({
        checkoutUrl: "https://example.myshopify.com/checkouts/test",
      }),
    );

    await waitFor(() => {
      expect(assignMock).toHaveBeenCalledWith(
        "https://example.myshopify.com/checkouts/test",
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
      <Link1CheckoutButton
        defaultLabel="Buy Link 1"
        className="rounded-full"
      />,
    );

    const button = await screen.findByRole("button", { name: "Buy Link 1" });
    fireEvent.click(button);

    await waitFor(() => {
      expect(getButton("Checkout Unavailable").disabled).toBe(true);
    });
  });
});

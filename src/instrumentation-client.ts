import { initBotId } from "botid/client/core";

// BotID only attaches verification headers to fetch() calls whose path+method
// are listed here. Without this, checkBotId() on the checkout routes treats
// every request as a bot (403) in production.
initBotId({
  protect: [
    {
      path: "/api/shopify/beacon-1/checkout",
      method: "POST",
    },
    {
      path: "/api/shopify/beacon-2/checkout",
      method: "POST",
    },
  ],
});

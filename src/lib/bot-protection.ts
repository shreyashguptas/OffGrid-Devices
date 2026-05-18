import { checkBotId } from "botid/server";

type BotIdVerdict = Awaited<ReturnType<typeof checkBotId>>;

const OIDC_MISSING_HINT = "x-vercel-oidc-token";

export async function safeCheckBotId(): Promise<BotIdVerdict> {
  try {
    return await checkBotId({
      developmentOptions: { bypass: "HUMAN" },
    });
  } catch (error) {
    if (
      error instanceof Error &&
      error.message.includes(OIDC_MISSING_HINT)
    ) {
      console.warn(
        "safeCheckBotId: Vercel OIDC token missing — bypassing BotId. This is expected outside Vercel (local dev, CI).",
      );
      return { isBot: false } as BotIdVerdict;
    }
    throw error;
  }
}

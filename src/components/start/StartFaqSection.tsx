import { jsonLdScriptProps, faqJsonLd } from "@/lib/jsonLd";
import { startContent } from "@/content/start";
import { StartFaqList } from "./StartFaqList";
import { StartSection } from "./StartSection";

export function StartFaqSection() {
  const faq = startContent.faq;
  return (
    <StartSection
      id="troubleshooting"
      eyebrow={faq.eyebrow}
      title={faq.title}
      description={faq.description}
      surface="elevated"
    >
      <script
        {...jsonLdScriptProps(
          faqJsonLd(
            faq.items.map((item) => ({
              question: item.question,
              answer: item.answer,
            })),
          ),
        )}
      />
      <StartFaqList items={faq.items} />
    </StartSection>
  );
}

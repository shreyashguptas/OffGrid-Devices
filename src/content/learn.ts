/**
 * "Learn" — a small, quiet section of interactive explainers.
 *
 * The story: when reading alone doesn't make a concept click, I ask Claude to
 * build me a tiny interactive page I can poke at until it does. These are a
 * couple of those, cleaned up and restyled to the site. The home-page build
 * log and the /learn hub both read from this list so titles and blurbs never
 * drift between the card and the page it links to.
 *
 * Each explainer is a self-contained interactive React component rendered at
 * /learn/<slug>; this file holds only the framing copy + SEO metadata.
 */

export type Explainer = {
  /** URL slug under /learn. */
  slug: string;
  /** Short mono eyebrow shown above the title. */
  eyebrow: string;
  /** Page/card title. */
  title: string;
  /**
   * One-paragraph description for the /learn hub card — what the concept is
   * and the "here's what I was trying to learn" framing.
   */
  blurb: string;
  /** A short intro line shown on the explainer page itself, above the lesson. */
  intro: string;
  /** SEO <title> (kept short for SERP). */
  seoTitle: string;
  /** Meta description. */
  metaDescription: string;
};

export const explainers: Explainer[] = [
  {
    slug: "drone-frame-physics",
    eyebrow: "First principles · quad frames",
    title: "Why a drone frame fights back",
    blurb:
      "Most drone-build “rules” are downstream of a handful of physical realities — arms that flex, frames that ring, weight that sits in the wrong place. I wanted to feel why, not just memorize the rules, so this one lets you drag the sliders and watch the physics misbehave. When something turns Ember-orange, the frame is working against the flight controller, not with it.",
    intro:
      "Six tiny simulators, one per pitfall. Drag a slider or flip a toggle and watch what breaks — when a readout goes Ember, the frame is fighting back.",
    seoTitle: "Drone Frame Physics — Interactive Explainer",
    metaDescription:
      "An interactive, first-principles look at why quadcopter frames flex, resonate, and lose control authority — drag the sliders and watch the physics misbehave.",
  },
  {
    slug: "prop-guards",
    eyebrow: "Drone aerodynamics · flow",
    title: "What a prop guard really costs",
    blurb:
      "My gut said a prop guard “blocks” the airflow. It mostly doesn’t — the real story is a tiny tornado at each blade tip, and whether your guard ignores it or seals it. This one lets you flip between an open prop, a cheap ring, and a tight duct and watch the airflow, the wasted energy, and the trade-offs respond.",
    intro:
      "Flip between three “jackets” for the same propeller and watch the tip vortex, the airflow, and four trade-offs respond in real time.",
    seoTitle: "Prop Guards — Interactive Flow Explainer",
    metaDescription:
      "An interactive look at what a drone prop guard actually costs you: not blocked airflow, but the tip vortex, added weight, and drag — flip the configs and watch.",
  },
];

export function getExplainer(slug: string): Explainer | undefined {
  return explainers.find((e) => e.slug === slug);
}

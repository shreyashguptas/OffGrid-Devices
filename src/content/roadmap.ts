/**
 * OffGrid roadmap — the single source of truth for the home-page timeline.
 *
 * Two storylines run in parallel:
 *  - `beacon`  → the shipping mesh-hardware line (Beacon 1 → Beacon 2).
 *  - `drone`   → Project Cheap Drone, the new build-in-public project
 *                (Phase 0 → Phase 3), where the LoRa mesh work eventually
 *                meets an airframe.
 *
 * All three home-page prototypes (Field Log, Mission Control, Two Tracks)
 * consume this array so the copy and ordering never drift between them.
 *
 * Honesty rule (matches the Project Cheap Drone voice): later phases are a
 * deliberate "slow reveal" — they stay vague and marked `locked` rather than
 * over-promising. We mark exactly ONE phase `active` ("you are here") so the
 * single Ember accent always has a home on the timeline.
 */

export type RoadmapTrack = "beacon" | "drone";

export type RoadmapStatus =
  | "shipped" // done and out in the world (may be retired)
  | "shipping" // available to buy right now
  | "active" // the one thing being worked on in public today
  | "next" // the immediate next step
  | "locked"; // teased on purpose — details later

/**
 * One entry in a phase's running build log. A phase accumulates many of these
 * over time — the day-to-day "here's what happened" shown INLINE on the home
 * page. This log IS the record (not a link to a blog post): an update can hold
 * its own paragraphs of text, image(s), and an embedded tweet. The separate
 * blog is for long-form writing and does not feed this.
 *
 * Everything except `date` is optional, so an update can be a quick one-liner
 * or a full image + two-paragraph write-up. Stored newest-first within
 * `RoadmapPhase.updates`.
 */
export type PhaseUpdate = {
  /** Short display date, e.g. "12 Jun 2026". */
  date: string;
  /** Optional short headline for the update. */
  title?: string;
  /** Body text — one string per paragraph (write as many as you want). */
  body?: string[];
  /** Inline image(s) for this update. */
  images?: { src: string; alt: string }[];
  /** Optional outbound links for this update, e.g. where a model was published. */
  links?: { label: string; url: string }[];
  /** Optional X/tweet URL to embed inline. */
  tweetUrl?: string;
};

export type RoadmapPhase = {
  id: string;
  track: RoadmapTrack;
  /** Short instrument label, e.g. "PHASE 0" or "SHIPPING". */
  marker: string;
  title: string;
  blurb: string;
  status: RoadmapStatus;
  /** Human status chip text, e.g. "In progress". */
  statusLabel: string;
  /** Optional supporting detail line (tools, constraints, cost). */
  meta?: string;
  /**
   * Simple human date for the build-log layout, e.g. "31st of May 2026".
   * Only set on steps that have actually happened (shipped / shipping /
   * active); future phases stay undated on purpose — a hard date on a
   * deliberately teased step would over-promise.
   */
  date?: string;
  /** Optional outbound link + label for the phase. */
  href?: string;
  hrefLabel?: string;
  external?: boolean;
  /** Short, image-first caption used by the visual Flight Plan layout. */
  tagline?: string;
  /** Optional media for the visual layout; a placeholder shows when absent. */
  image?: { src: string; alt: string };
  /**
   * Marks the single point on the line where the mesh work and the drone
   * meet — the convergence beat, told sequentially rather than as two lanes.
   */
  convergence?: boolean;
  /**
   * Running build log for this phase — the multiple things done / broken /
   * learned as the phase plays out. Newest-first. Append as work happens.
   */
  updates?: PhaseUpdate[];
};

/** Where to follow the build — reused by every "follow along" CTA. */
export const FOLLOW_LINKS = {
  blog: "/blog",
  x: "https://x.com/ShreyashGuptas",
} as const;

/**
 * Ordered oldest → newest → planned. The `active` phase (Phase 1 — building
 * the first quad) is the narrative "now"; everything above it is history
 * (including the still-ongoing Phase 0 sim practice), everything below is the
 * road ahead.
 */
export const roadmapPhases: RoadmapPhase[] = [
  {
    id: "beacon-1",
    track: "beacon",
    marker: "SHIPPED",
    title: "Beacon 1",
    blurb:
      "The first MagSafe Meshtastic radio — the device that started OffGrid. Sold out and retired, but it proved the idea: a mesh radio that stays on the phone you already carry.",
    status: "shipped",
    statusLabel: "Retired",
    meta: "MagSafe · Meshtastic · sold out",
    date: "1st of November 2024", // TODO: confirm real Beacon 1 launch date
    href: "/products/beacon-1",
    hrefLabel: "See Beacon 1",
    tagline: "The first MagSafe Meshtastic radio. Where OffGrid started.",
    image: {
      src: "/products/beacon1-hero-v1.jpg",
      alt: "OffGrid Beacon 1 MagSafe LoRa mesh radio",
    },
  },
  {
    id: "beacon-2",
    track: "beacon",
    marker: "SHIPPING",
    title: "Beacon 2",
    blurb:
      "The radio we ship today. 3000 mAh, a replaceable SMA antenna, and magnets that actually hold. No towers, no SIMs, no subscriptions — it runs Meshtastic out of the box.",
    status: "shipping",
    statusLabel: "Shipping now",
    meta: "3000 mAh · replaceable antenna · in stock",
    date: "31st of May 2026", // TODO: confirm real Beacon 2 launch date
    href: "/products/beacon-2",
    hrefLabel: "Shop Beacon 2",
    tagline: "The MagSafe mesh radio we ship today — and the work the drone builds on.",
    image: {
      src: "/beacon-2/parallax/hero-front.jpg",
      alt: "OffGrid Beacon 2 MagSafe LoRa mesh radio, antenna up",
    },
    // Real updates go here, e.g.:
    //   updates: [
    //     { date: "2 Jun 2026", body: ["Restocked SMA antennas."] },
    //   ],
  },
  {
    id: "drone-phase-0",
    track: "drone",
    marker: "PHASE 0",
    title: "Learn to fly, for almost nothing",
    blurb:
      "I have never picked up a drone controller. So before spending real money, I'm logging hours in a simulator — crashing where crashing is free. The goal is embarrassingly basic: stop crashing on takeoff.",
    status: "shipped",
    statusLabel: "Ongoing",
    meta: "VelociDrone · Mac · ~$20",
    date: "14th of June 2026", // the day sim practice went public (tweet below)
    // No per-phase blog link: the inline build log below IS the record.
    tagline: "Logging sim hours so my first real flight isn't my first time flying.",
    // ─────────────────────────────────────────────────────────────────────
    // TEMPLATE — copy one of these into `updates` to log something. Every
    // field except `date` is optional, so it can be a one-liner or a full
    // image + multi-paragraph write-up with an embedded tweet:
    //
    //   {
    //     date: "12 Jun 2026",
    //     title: "Throttle is everything", // optional headline
    //     body: [
    //       "First paragraph of the write-up.",
    //       "Second paragraph — as many as you want.",
    //     ],
    //     images: [{ src: "/build-log/phase-0/sim.jpg", alt: "..." }],
    //     tweetUrl: "https://x.com/ShreyashGuptas/status/123",
    //   },
    // ─────────────────────────────────────────────────────────────────────
    updates: [
      {
        date: "14 Jun 2026",
        title: "Practicing in the simulator first",
        body: [
          "Before I get my hands on a real drone and actually try to fly it, I'm logging hours in a flight simulator. Flying is completely new to me, and it's very different from anything I've done before.",
          "A drone controller is nothing like a PlayStation or Xbox controller — the sticks do different things and it takes real practice to get a feel for it. So rather than crash an expensive drone on my first attempt, I'm crashing in the sim, where it costs nothing.",
        ],
        tweetUrl: "https://x.com/ShreyashGuptas/status/2066640231693160925",
      },
    ],
  },
  {
    id: "drone-phase-1",
    track: "drone",
    marker: "PHASE 1",
    title: "Build the cheapest quad I can — and fly it",
    blurb:
      "One small 3-inch quad, mostly 3D-printed. Print the frame; buy the parts you can't print — motors, flight controller, battery, radio. Wire it, fly it line-of-sight, crash it, and figure out exactly why. That loop is the whole point.",
    status: "active",
    statusLabel: "In progress",
    meta: "3D-printed frame · off-the-shelf guts · honest cost of every part",
    date: "16th of June 2026",
    tagline: "Print the frame, buy the guts, fly it, crash it, find out why.",
    // First real Phase 1 artifact: the flight-controller CAD model — the
    // starting point for designing the printed frame around the board.
    updates: [
      {
        date: "16 Jun 2026",
        title: "Open-sourced the flight controller's 3D model",
        body: [
          "It's not helpful that the companies making these flight controller boards don't publish a 3D model of the part. To design a drone frame around the board, I first had to model the board itself.",
          "It took about four iterations, but I got the height, length, and width accurate, with the screw holes in the right spots to actually hold the board in place. I 3D print each version to check it against the real device.",
          "The board is the GEPRC TAKER G4 45A 8-bit AIO flight controller. I've open-sourced the model so nobody else has to redraw it from scratch.",
        ],
        images: [
          {
            src: "/build-log/phase-0/taker-g4-cad.jpg",
            alt: "3D CAD model of the GEPRC TAKER G4 AIO flight controller board, USB-C corner",
          },
        ],
        links: [
          {
            label: "Printables",
            url: "https://www.printables.com/model/1756356-geprc-taker-g4-aio-g4-fc-45a-2-6s-esc-25x25-dimens",
          },
          {
            label: "MakerWorld",
            url: "https://makerworld.com/en/models/2942103-geprc-taker-g4-45a-aio-accurate-cad-model",
          },
          {
            label: "GrabCAD",
            url: "https://grabcad.com/library/geprc-taker-g4-aio-g4-fc-45a-2-6s-esc-25x25-dimension-accurate-3d-model-1",
          },
          {
            label: "Thingiverse",
            url: "https://www.thingiverse.com/thing:7370782",
          },
        ],
      },
    ],
  },
  {
    id: "drone-phase-2",
    track: "drone",
    marker: "PHASE 2",
    title: "Where the mesh meets the drone",
    blurb:
      "This is where the two OffGrid storylines cross — the LoRa mesh work behind Beacon meets the airframe. Details are a deliberate slow reveal, shared when we get there.",
    status: "locked",
    statusLabel: "Teased",
    meta: "Beacon mesh × Cheap Drone",
    tagline: "The two lines meet — the LoRa mesh work joins the airframe.",
    convergence: true,
  },
  {
    id: "drone-phase-3",
    track: "drone",
    marker: "PHASE 3",
    title: "From learning project to real problem",
    blurb:
      "Where this stops being a build log and starts solving something real in the market. Still under wraps — but it's the reason any of this is happening.",
    status: "locked",
    statusLabel: "Locked",
    tagline: "From learning project to a real problem worth solving.",
  },
];

/** Phase index used to split the timeline into "recent" and "ahead" lanes. */
const activePhaseIndex = roadmapPhases.findIndex((p) => p.status === "active");

/**
 * Newest-first view for the Flight Plan "build log" layout.
 *
 * `timelineRecent` runs the active "now" phase first, then descends through
 * everything already shipped (most recent → oldest) — a reverse-chronological
 * changelog where the latest real update is always at the top.
 *
 * `timelineAhead` is the forward-looking road: the next step and the teased
 * later phases, shown lower down and quieter so the future never out-shouts
 * what's actually happening today.
 */
export const timelineRecent = roadmapPhases
  .slice(0, activePhaseIndex + 1)
  .reverse();
export const timelineAhead = roadmapPhases.slice(activePhaseIndex + 1);

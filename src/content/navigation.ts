export type NavLink = {
  label: string;
  href: string;
};

/**
 * Section header shown above the device list in the Products menu, so the
 * Beacons read explicitly as one of OffGrid's two business lines (mesh
 * devices) rather than the whole company.
 */
export const productsMenuLabel = "Meshtastic Devices";

/**
 * Top-level navigation links, in display order, rendered after the Products
 * dropdown and before the Beacon 2 buy button. Drives both the desktop bar
 * and the mobile menu so the two never drift apart.
 *
 * - Manufacturing → the 3D-design / small-batch manufacturing business line.
 * - Blog → existing field notes.
 * - Contact → the new prospect intake.
 */
export const primaryNavLinks: NavLink[] = [
  { label: "Manufacturing", href: "/capabilities" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

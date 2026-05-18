import { permanentRedirect } from "next/navigation";

// Beacon 2 lives on the homepage now — keep this slug as a 308 redirect
// so any links/bookmarks/SEO that reach /products/beacon-2 land on /.
export default function Beacon2Product(): never {
  permanentRedirect("/");
}

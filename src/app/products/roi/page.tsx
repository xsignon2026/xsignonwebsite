import { permanentRedirect } from "next/navigation";

export default function ProductsRoiRedirect() {
  permanentRedirect("/roi-calculator");
}

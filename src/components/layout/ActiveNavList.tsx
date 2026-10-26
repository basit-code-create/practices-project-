"use client";

import { usePathname } from "next/navigation";
import { NavList } from "./NavList";

/** NavList that highlights the current page. Render inside <Suspense>. */
export function ActiveNavList(props: { variant: "desktop" | "mobile"; onNavigate?: () => void }) {
  const pathname = usePathname();
  return <NavList pathname={pathname} {...props} />;
}

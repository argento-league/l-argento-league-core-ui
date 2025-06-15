import { useEffect, useState } from "react";

const MOBILE_BREAKPOINT = 720;

export function useIsMobile(breakpoint: number = MOBILE_BREAKPOINT): boolean {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < breakpoint : false
  );

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < breakpoint);
    }

    window.addEventListener("resize", handleResize);
    // Check on mount
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint]);

  return isMobile;
}
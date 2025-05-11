import { useEffect, useState } from "react";
import DoubleEliminationMobile from "./../../components/seasons/mobile/DoubleEmilinationMobile";
import { DoubleEliminationBracketDesktop } from "../../components/seasons/mobile/DoubleEliminationDesktop";

export default function DoubleElimination() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  
  if (isMobile) {
    return <DoubleEliminationMobile />;
  }

  return <DoubleEliminationBracketDesktop />;
}

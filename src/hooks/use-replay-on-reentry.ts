import { useInView } from "framer-motion";
import { useEffect, useState, type RefObject } from "react";

export function useReplayOnReentry(
  ref: RefObject<Element | null>,
  shouldReduceMotion: boolean | null,
  entryAmount: number,
  resetAmount = 0.05,
) {
  const hasEntered = useInView(ref, { once: false, amount: entryAmount });
  const remainsVisible = useInView(ref, { once: false, amount: resetAmount });
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (shouldReduceMotion) {
      setIsActive(true);
      return;
    }

    if (!remainsVisible) {
      setIsActive(false);
      return;
    }

    if (hasEntered) setIsActive(true);
  }, [hasEntered, remainsVisible, shouldReduceMotion]);

  return shouldReduceMotion || isActive;
}

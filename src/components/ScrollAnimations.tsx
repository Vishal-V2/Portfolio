"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Scroll-driven transitions between sections, all scrubbed to the scrollbar
 * so they play forward on the way down and reverse on the way back up.
 *
 *   [data-reveal]       rises and fades in as it enters the viewport
 *   [data-reveal="2"]   same, but lags a little (for the right-hand column of a row)
 *   [data-exit]         drifts up and fades out as you scroll away from it (the intro)
 */
export default function ScrollAnimations() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        const lag = el.dataset.reveal === "2";
        gsap.fromTo(
          el,
          { y: lag ? 110 : 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 95%", end: lag ? "top 55%" : "top 65%", scrub: 1 },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-exit]").forEach((el) => {
        gsap.to(el, {
          y: -80,
          opacity: 0.15,
          scale: 0.97,
          ease: "none",
          scrollTrigger: { trigger: el, start: "center 45%", end: "bottom top", scrub: 1 },
        });
      });
    });

    // the GitHub project ring and fonts can change page height after first paint
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    document.fonts?.ready.then(refresh);
    return () => {
      window.removeEventListener("load", refresh);
      ctx.revert();
    };
  }, []);

  return null;
}

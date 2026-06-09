"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function FadeUp({ children, delay = 0, className = "" }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          gsap.fromTo(
            el,
            { y: 40, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.85,
              delay,
              ease: "power3.out",
            }
          );
          observer.unobserve(el);
        }
      },
      { threshold: 0.12 }
    );

    gsap.set(el, { y: 40, opacity: 0 });
    observer.observe(el);

    return () => observer.disconnect();
  }, [delay]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
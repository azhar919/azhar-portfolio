"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Mail } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

/**
 * Mobile-only floating action bar. Pinned within thumb reach, it slides up
 * once the hero has scrolled away and tucks itself out of the way near the
 * footer so it never collides with the contact CTA there. Hidden on desktop.
 */
export default function MobileActionBar() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const nearBottom =
        window.innerHeight + y > document.body.scrollHeight - 640;
      setShow(y > window.innerHeight * 0.7 && !nearBottom);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="md:hidden"
          initial={{ y: 90, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 90, opacity: 0 }}
          transition={{ duration: 0.4, ease: EASE }}
          style={{
            position: "fixed",
            left: "12px",
            right: "12px",
            bottom: "calc(12px + env(safe-area-inset-bottom, 0px))",
            zIndex: 50,
            display: "flex",
            gap: "8px",
            padding: "8px",
            borderRadius: "9999px",
            background: "rgba(17,14,11,0.82)",
            backdropFilter: "blur(14px)",
            WebkitBackdropFilter: "blur(14px)",
            border: "1px solid rgba(255,255,255,0.1)",
            boxShadow: "0 12px 40px rgba(0,0,0,0.55)",
          }}
        >
          <a
            href="#work"
            className="group flex items-center justify-center gap-1.5 font-semibold"
            style={{
              flex: 1,
              height: "46px",
              borderRadius: "9999px",
              background: "#C4622D",
              color: "white",
              fontSize: "14px",
              boxShadow: "0 6px 20px rgba(196,98,45,0.3)",
            }}
          >
            View work
            <ArrowUpRight size={15} />
          </a>
          <a
            href="mailto:Azhar919@gmail.com"
            aria-label="Email Azhar"
            className="flex items-center justify-center"
            style={{
              width: "46px",
              height: "46px",
              borderRadius: "9999px",
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.14)",
              color: "white",
              flexShrink: 0,
            }}
          >
            <Mail size={17} />
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

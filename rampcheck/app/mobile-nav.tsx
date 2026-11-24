"use client";
import { useState, useEffect } from "react";

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  /* close when user navigates via anchor */
  useEffect(() => {
    if (!open) return;
    const close = () => setOpen(false);
    window.addEventListener("hashchange", close);
    return () => window.removeEventListener("hashchange", close);
  }, [open]);

  /* lock body scroll while menu is open */
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <button
        className="mobile-menu-btn"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          {open ? (
            <>
              <line x1="6" y1="6" x2="18" y2="18" />
              <line x1="6" y1="18" x2="18" y2="6" />
            </>
          ) : (
            <>
              <line x1="4" y1="7" x2="20" y2="7" />
              <line x1="4" y1="12" x2="20" y2="12" />
              <line x1="4" y1="17" x2="20" y2="17" />
            </>
          )}
        </svg>
      </button>

      {open && <div className="mobile-overlay" onClick={() => setOpen(false)} />}

      <div className={`mobile-drawer${open ? " is-open" : ""}`}>
        <nav className="mobile-drawer-nav" aria-label="Mobile navigation">
          <a href="#product" onClick={() => setOpen(false)}>Product</a>
          <a href="#approach" onClick={() => setOpen(false)}>Approach</a>
          <a href="#security" onClick={() => setOpen(false)}>Security</a>
          <a href="#resources" onClick={() => setOpen(false)}>Docs</a>
        </nav>
        <a className="button button-dark mobile-drawer-cta" href="#preview" onClick={() => setOpen(false)}>
          Book a technical preview
        </a>
      </div>
    </>
  );
}

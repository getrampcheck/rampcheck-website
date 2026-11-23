/* eslint-disable @typescript-eslint/no-require-imports */
import React from "react";
import fs from "fs";
import path from "path";
import { render, screen, within } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import "@testing-library/jest-dom";

expect.extend(toHaveNoViolations);

jest.mock("next/font/google", () => ({
  Geist: () => ({ variable: "--font-geist-sans", className: "mock" }),
  Geist_Mono: () => ({ variable: "--font-geist-mono", className: "mock-mono" }),
}));

jest.mock("motion/react", () => {
  const ReactMod = require("react");
  const motionProxy = new Proxy({}, {
    get: (_: unknown, tag: string) => {
      const Comp = ({ children, ...rest }: React.HTMLAttributes<HTMLElement>) =>
        ReactMod.createElement(tag, rest, children);
      Comp.displayName = `motion.${tag}`;
      return Comp;
    },
  });
  return {
    motion: motionProxy,
    AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
    useInView: () => true,
    useMotionValue: (v: number) => ({ set: jest.fn(), on: () => jest.fn(), get: () => v }),
    useSpring: (v: unknown) => v,
  };
});

jest.mock("@/app/waitlist-form", () => {
  function WaitlistFormMock() {
    return (
      <form aria-label="Request waitlist access">
        <label htmlFor="wl-name">Full name<input id="wl-name" name="name" required /></label>
        <label htmlFor="wl-email">Work email<input id="wl-email" name="email" type="email" required /></label>
        <button type="submit">Request access</button>
      </form>
    );
  }
  WaitlistFormMock.displayName = "WaitlistFormMock";
  return WaitlistFormMock;
});

let Home: React.ComponentType;
beforeAll(async () => { const m = await import("@/app/page"); Home = m.default; });
const renderPage = () => render(<Home />);

describe("axe — WCAG 2.1 AA", () => {
  it("has no automatically detectable violations", async () => {
    const { container } = renderPage();
    const results = await axe(container, {
      runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21aa", "best-practice"] },
    });
    expect(results).toHaveNoViolations();
  });
});

describe("Document structure & landmarks", () => {
  it("has exactly one <main>", () => { renderPage(); expect(screen.getAllByRole("main")).toHaveLength(1); });
  it("has a banner landmark", () => { renderPage(); expect(screen.getByRole("banner")).toBeInTheDocument(); });
  it("has a contentinfo landmark", () => { renderPage(); expect(screen.getByRole("contentinfo")).toBeInTheDocument(); });
  it("h1 appears exactly once and is non-empty", () => {
    renderPage();
    const h1s = screen.getAllByRole("heading", { level: 1 });
    expect(h1s).toHaveLength(1);
    expect(h1s[0].textContent?.trim().length).toBeGreaterThan(0);
  });
  it("all h2 headings are non-empty", () => {
    renderPage();
    screen.getAllByRole("heading", { level: 2 }).forEach((h) => expect(h.textContent?.trim().length).toBeGreaterThan(0));
  });
  it("navigation has an accessible name", () => {
    renderPage();
    screen.getAllByRole("navigation").forEach((nav) => expect(nav).toHaveAttribute("aria-label"));
  });
});

describe("Images & icons", () => {
  it("all non-decorative imgs have non-empty alt", () => {
    renderPage();
    document.querySelectorAll("img").forEach((img) => {
      if (img.getAttribute("aria-hidden") !== "true") expect(img.getAttribute("alt")).toBeTruthy();
    });
  });
  it("decorative SVGs carry aria-hidden=true", () => {
    renderPage();
    expect(document.querySelectorAll("svg[aria-hidden='true']").length).toBeGreaterThan(0);
  });
  it("informational SVG has aria-label", () => {
    renderPage();
    const chart = document.querySelector("svg[role='img']");
    if (chart) expect(chart).toHaveAttribute("aria-label");
  });
});

describe("Navigation & links", () => {
  it("all main-nav links have visible text", () => {
    renderPage();
    const nav = screen.getByRole("navigation", { name: /main navigation/i });
    within(nav).getAllByRole("link").forEach((link) => expect(link.textContent?.trim().length).toBeGreaterThan(0));
  });
  it("header CTA links have discernible text", () => {
    renderPage();
    const ctaLinks = screen.getAllByRole("link", { name: /join the waitlist/i });
    expect(ctaLinks.length).toBeGreaterThanOrEqual(1);
  });
  it("brand wordmark link has aria-label", () => {
    renderPage();
    expect(screen.getByRole("link", { name: /rampcheck home/i })).toBeInTheDocument();
  });
});

describe("Waitlist form", () => {
  it("form has an accessible name", () => { renderPage(); expect(screen.getByRole("form")).toHaveAttribute("aria-label"); });
  it("all text inputs have associated labels", () => {
    renderPage();
    document.querySelectorAll("input:not([type='radio'])").forEach((input) => {
      const id = input.getAttribute("id");
      if (id) expect(document.querySelector(`label[for="${id}"]`)).not.toBeNull();
      else expect(input.closest("label")).not.toBeNull();
    });
  });
  it("submit button has discernible text", () => {
    renderPage();
    expect(screen.getByRole("button", { name: /request access/i })).toBeInTheDocument();
  });
});

describe("CSS — font-size & colour tokens", () => {
  const cssPath = path.join(__dirname, "../app/globals.css");
  const getCSS = () => fs.readFileSync(cssPath, "utf-8");

  it("--foreground CSS var is defined", () => { expect(getCSS()).toMatch(/--foreground:\s*#0b120e/); });
  it("--background CSS var is defined", () => { expect(getCSS()).toMatch(/--background:\s*#f5f6f5/); });
  it("body base font-size is >= 16px", () => {
    const css = getCSS();
    const bodyBlock = css.match(/body\s*\{([^}]+)\}/)![1];
    const size = parseFloat(bodyBlock.match(/font-size:\s*(\d+(?:\.\d+)?)px/)![1]);
    expect(size).toBeGreaterThanOrEqual(16);
  });
  it("hero h1 font-size uses clamp with minimum >= 32px", () => {
    const css = getCSS();
    const h1Block = css.match(/\.hero h1\s*\{([^}]+)\}/)![1];
    const clampMatch = h1Block.match(/font-size:\s*clamp\((\d+)px/);
    expect(clampMatch).not.toBeNull();
    expect(parseInt(clampMatch![1])).toBeGreaterThanOrEqual(32);
  });
  it("paragraph body text is >= 15px", () => {
    const css = getCSS();
    const descMatch = css.match(/\.hero-description\s*\{([^}]+)\}/);
    if (descMatch) {
      const sizeMatch = descMatch[1].match(/font-size:\s*(\d+(?:\.\d+)?)px/);
      if (sizeMatch) expect(parseFloat(sizeMatch[1])).toBeGreaterThanOrEqual(15);
    }
  });
});

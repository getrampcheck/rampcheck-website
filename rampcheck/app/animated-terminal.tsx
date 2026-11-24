"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";

interface TerminalLine {
  text: string;
  className: string;
  /** Typing speed in ms per character. 0 = instant reveal (fade in). */
  speed?: number;
}

/**
 * A terminal body whose lines appear one-by-one with a typewriter effect.
 * The command line types out character by character; subsequent output lines
 * fade in sequentially to simulate real CLI output.
 *
 * Animation starts once the component scrolls into view.
 */
export default function AnimatedTerminal({
  lines,
  showCursor = true,
  /** Delay before the very first line starts (ms). */
  startDelay = 400,
  /** Pause between successive output lines (ms). */
  linePause = 320,
}: {
  lines: TerminalLine[];
  showCursor?: boolean;
  startDelay?: number;
  linePause?: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef as React.RefObject<Element>, {
    amount: 0.25,
    once: true,
  });

  // Track which line index is currently animating / complete.
  const [activeLine, setActiveLine] = useState(-1);
  // For the typing line: how many characters have been revealed.
  const [typedChars, setTypedChars] = useState(0);

  // Kick off the sequence when in view.
  useEffect(() => {
    if (isInView && activeLine === -1) {
      const t = setTimeout(() => setActiveLine(0), startDelay);
      return () => clearTimeout(t);
    }
  }, [isInView, activeLine, startDelay]);

  // Handle typing for the active line.
  useEffect(() => {
    if (activeLine < 0 || activeLine >= lines.length) return;

    const line = lines[activeLine];
    const speed = line.speed ?? 0;

    if (speed > 0) {
      // Typewriter: tick one character at a time.
      if (typedChars < line.text.length) {
        const t = setTimeout(() => setTypedChars((c) => c + 1), speed);
        return () => clearTimeout(t);
      }
      // Typing finished — move to next line after a pause.
      const t = setTimeout(() => {
        setActiveLine((i) => i + 1);
        setTypedChars(0);
      }, linePause);
      return () => clearTimeout(t);
    }

    // Instant (fade-in) line — just pause then advance.
    const t = setTimeout(() => {
      setActiveLine((i) => i + 1);
      setTypedChars(0);
    }, linePause);
    return () => clearTimeout(t);
  }, [activeLine, typedChars, lines, linePause]);

  return (
    <div ref={containerRef} className="hero-terminal-body">
      {lines.map((line, i) => {
        const isTyping = line.speed && line.speed > 0;
        const isActive = i === activeLine;
        const isComplete = i < activeLine;
        const isVisible = isComplete || isActive;

        if (!isVisible) return null;

        return (
          <p
            key={i}
            className={line.className}
            style={{
              opacity: isComplete ? 1 : isActive && !isTyping ? 1 : isActive ? 1 : 0,
              transition: "opacity 0.25s ease",
            }}
          >
            {isTyping && isActive ? line.text.slice(0, typedChars) : line.text}
          </p>
        );
      })}

      {showCursor && (
        <p
          className="term-cursor-line"
          style={{
            opacity: activeLine >= lines.length ? 1 : 0,
            transition: "opacity 0.25s ease",
          }}
        >
          $ <span className="term-cursor" aria-hidden="true" />
        </p>
      )}
    </div>
  );
}

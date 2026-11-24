"use client";

import { useEffect, useRef } from "react";

/**
 * Robotics-data timeline animation.
 * Renders rows of episode slices (vertical bars) with a scanning
 * timeline strip that sweeps left → right → left in a continuous loop.
 * Meant to sit behind hero copy at low opacity.
 */
export default function HeroTimeline() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf: number;
    const dpr = window.devicePixelRatio || 1;

    function resize() {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    resize();
    window.addEventListener("resize", resize);

    // Episode slice config
    const rows = 7;
    const sliceCount = 50;
    const rowHeight = 32;
    const rowGap = 10;
    const totalHeight = rows * rowHeight + (rows - 1) * rowGap;

    // Pre-generate random slice widths and colors per row
    const slices: { x: number; w: number; h: number; color: string; row: number; flagged: boolean }[] = [];
    const colors = [
      "rgba(14,180,131,0.35)",
      "rgba(14,180,131,0.45)",
      "rgba(14,180,131,0.25)",
      "rgba(237,178,0,0.4)",
      "rgba(14,180,131,0.5)",
    ];

    for (let r = 0; r < rows; r++) {
      const count = sliceCount + Math.floor(Math.random() * 10);
      for (let i = 0; i < count; i++) {
        const w = 2 + Math.random() * 4;
        const h = r >= 5 ? 4 + Math.random() * 6 : 10 + Math.random() * (rowHeight - 14);
        const x = (i / count) * 100;
        const colorIdx = Math.random() < 0.06 ? 3 : Math.floor(Math.random() * 3);
        slices.push({ x, w, h, color: colors[colorIdx], row: r, flagged: Math.random() < 0.35 });
      }
    }

    // Dashed row lines
    const rowLines = Array.from({ length: rows + 1 }, (_, i) => i * (rowHeight + rowGap) - rowGap / 2);

    // Animation — 3 scanners starting at different positions & directions
    const scanStates = [
      { x: 15, dir: 1 },
      { x: 70, dir: -1 },
      { x: 45, dir: 1 },
    ];

    function draw() {
      if (!canvas || !ctx) return;
      const W = canvas.width / dpr;
      const H = canvas.height / dpr;
      const offsetY = (H - totalHeight) / 2;

      ctx.clearRect(0, 0, W, H);

      // Row separator lines
      ctx.setLineDash([4, 6]);
      ctx.strokeStyle = "rgba(14,180,131,0.2)";
      ctx.lineWidth = 1;
      for (const ly of rowLines) {
        const y = offsetY + ly;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(W, y);
        ctx.stroke();
      }
      ctx.setLineDash([]);

      // Episode slices
      for (const s of slices) {
        const sx = (s.x / 100) * W;
        const sy = offsetY + s.row * (rowHeight + rowGap) + (rowHeight - s.h) / 2;
        ctx.fillStyle = s.color;
        ctx.fillRect(sx - s.w / 2, sy, s.w, s.h);
      }

      // 3 scanners — each covers 2 rows, different speeds & directions
      const scanners = [
        { x: scanStates[0].x, rowStart: 0, rowEnd: 2, speed: 0.010 },
        { x: scanStates[1].x, rowStart: 2, rowEnd: 4, speed: 0.016 },
        { x: scanStates[2].x, rowStart: 4, rowEnd: 6, speed: 0.007 },
      ];

      for (let si = 0; si < scanners.length; si++) {
        const sc = scanners[si];
        const scanPx = (sc.x / 100) * W;
        const yTop = offsetY + sc.rowStart * (rowHeight + rowGap) - 8;
        const yBot = offsetY + (sc.rowEnd + 1) * (rowHeight + rowGap) - rowGap + 8;

        // Vertical line
        ctx.strokeStyle = "rgba(180,180,180,0.4)";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(scanPx, yTop);
        ctx.lineTo(scanPx, yBot);
        ctx.stroke();

        // Top dot
        ctx.fillStyle = "rgba(180,180,180,0.55)";
        ctx.beginPath();
        ctx.arc(scanPx, yTop, 3.5, 0, Math.PI * 2);
        ctx.fill();

        // Highlight slices in this scanner's row range
        for (const s of slices) {
          if (s.row < sc.rowStart || s.row > sc.rowEnd) continue;
          const sx = (s.x / 100) * W;
          const dist = Math.abs(sx - scanPx);
          if (dist < 30) {
            const alpha = 0.6 * (1 - dist / 30);
            const sy = offsetY + s.row * (rowHeight + rowGap) + (rowHeight - s.h) / 2;
            if (s.flagged) {
              ctx.fillStyle = `rgba(237,178,0,${alpha})`;
            } else {
              ctx.fillStyle = `rgba(14,180,131,${alpha * 0.6})`;
            }
            ctx.fillRect(sx - s.w / 2 - 1, sy - 1, s.w + 2, s.h + 2);
          }
        }

        // Move this scanner
        scanStates[si].x += sc.speed * scanStates[si].dir;
        if (scanStates[si].x >= 100) { scanStates[si].x = 100; scanStates[si].dir = -1; }
        if (scanStates[si].x <= 0) { scanStates[si].x = 0; scanStates[si].dir = 1; }
      }

      // Top & bottom fade overlay
      const fadeH = H * 0.15;
      const topGrad = ctx.createLinearGradient(0, 0, 0, fadeH);
      topGrad.addColorStop(0, "rgba(252,252,251,1)");
      topGrad.addColorStop(1, "rgba(252,252,251,0)");
      ctx.fillStyle = topGrad;
      ctx.fillRect(0, 0, W, fadeH);

      const botGrad = ctx.createLinearGradient(0, H - fadeH, 0, H);
      botGrad.addColorStop(0, "rgba(252,252,251,0)");
      botGrad.addColorStop(1, "rgba(252,252,251,1)");
      ctx.fillStyle = botGrad;
      ctx.fillRect(0, H - fadeH, W, fadeH);

      raf = requestAnimationFrame(draw);
    }

    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="hero-timeline"
      aria-hidden="true"
    />
  );
}

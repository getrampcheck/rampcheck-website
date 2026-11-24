"use client";

import { useEffect, useRef } from "react";

export default function HeroTimeline() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf: number;
    const dpr = window.devicePixelRatio || 1;

    function getConfig() {
      const vw = window.innerWidth;
      if (vw <= 560) return { rows: 5, sliceCount: 25, rowHeight: 18, rowGap: 14, baseFade: 0.06, glowRange: 300, scannerWidth: 1 };
      if (vw <= 760) return { rows: 5, sliceCount: 30, rowHeight: 22, rowGap: 14, baseFade: 0.07, glowRange: 350, scannerWidth: 1.2 };
      if (vw <= 980) return { rows: 6, sliceCount: 40, rowHeight: 26, rowGap: 12, baseFade: 0.08, glowRange: 400, scannerWidth: 1.3 };
      return { rows: 7, sliceCount: 50, rowHeight: 32, rowGap: 10, baseFade: 0.1, glowRange: 500, scannerWidth: 1.5 };
    }

    let cfg = getConfig();

    function buildSlices() {
      const s: { x: number; w: number; h: number; row: number; flagged: boolean }[] = [];
      for (let r = 0; r < cfg.rows; r++) {
        const count = cfg.sliceCount + Math.floor(Math.random() * 10);
        for (let i = 0; i < count; i++) {
          const w = 2 + Math.random() * 3;
          const h = r >= cfg.rows - 2 ? 3 + Math.random() * 5 : 6 + Math.random() * (cfg.rowHeight - 10);
          s.push({ x: (i / count) * 100, w, h, row: r, flagged: Math.random() < 0.35 });
        }
      }
      return s;
    }

    let slices = buildSlices();

    function getRowLines() {
      return Array.from({ length: cfg.rows + 1 }, (_, i) => i * (cfg.rowHeight + cfg.rowGap) - cfg.rowGap / 2);
    }

    let rowLines = getRowLines();

    const scanStates = [
      { x: 15, dir: 1 },
      { x: 70, dir: -1 },
      { x: 45, dir: 1 },
    ];

    function resize() {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      const newCfg = getConfig();
      if (newCfg.rows !== cfg.rows || newCfg.sliceCount !== cfg.sliceCount) {
        cfg = newCfg;
        slices = buildSlices();
        rowLines = getRowLines();
      } else {
        cfg = newCfg;
      }
    }

    resize();
    window.addEventListener("resize", resize);

    function draw() {
      if (!canvas || !ctx) return;
      const W = canvas.width / dpr;
      const H = canvas.height / dpr;
      const totalHeight = cfg.rows * cfg.rowHeight + (cfg.rows - 1) * cfg.rowGap;
      const offsetY = (H - totalHeight) / 2;

      ctx.clearRect(0, 0, W, H);

      // Row separator lines
      ctx.setLineDash([4, 6]);
      ctx.lineWidth = 1;
      for (const ly of rowLines) {
        const y = offsetY + ly;
        const distFromCenter = Math.abs(y - (offsetY + totalHeight / 2)) / (totalHeight / 2);
        const fade = Math.max(0.1, 1 - distFromCenter * 0.9);
        ctx.strokeStyle = `rgba(14,180,131,${0.15 * fade})`;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(W, y);
        ctx.stroke();
      }
      ctx.setLineDash([]);

      // Episode slices
      const centerY = offsetY + totalHeight / 2;
      const halfH = totalHeight / 2;
      for (const s of slices) {
        const sx = (s.x / 100) * W;
        const rowCenterY = offsetY + s.row * (cfg.rowHeight + cfg.rowGap) + cfg.rowHeight / 2;
        const distFromCenter = Math.abs(rowCenterY - centerY) / halfH;
        const fade = Math.max(0.15, 1 - distFromCenter * 0.85);
        const scaledH = s.h * (0.4 + 0.6 * fade);
        const sy = rowCenterY - scaledH / 2;
        const a = (cfg.baseFade + Math.random() * 0.001) * fade;
        ctx.fillStyle = s.flagged
          ? `rgba(237,178,0,${a * 1.2})`
          : `rgba(14,180,131,${a})`;
        ctx.fillRect(sx - s.w / 2, sy, s.w, scaledH);
      }

      // Scanners
      const scannerDefs = [
        { rowStart: 0, rowEnd: Math.min(2, cfg.rows - 1), speed: 0.010 },
        { rowStart: Math.min(2, cfg.rows - 1), rowEnd: Math.min(4, cfg.rows - 1), speed: 0.016 },
        { rowStart: Math.min(4, cfg.rows - 1), rowEnd: cfg.rows - 1, speed: 0.007 },
      ];

      for (let si = 0; si < scannerDefs.length; si++) {
        const sc = { ...scannerDefs[si], x: scanStates[si].x };
        const scanPx = (sc.x / 100) * W;
        const yTop = offsetY + sc.rowStart * (cfg.rowHeight + cfg.rowGap) - 8;
        const yBot = offsetY + (sc.rowEnd + 1) * (cfg.rowHeight + cfg.rowGap) - cfg.rowGap + 8;

        ctx.strokeStyle = "rgba(180,180,180,0.4)";
        ctx.lineWidth = cfg.scannerWidth;
        ctx.beginPath();
        ctx.moveTo(scanPx, yTop);
        ctx.lineTo(scanPx, yBot);
        ctx.stroke();

        ctx.fillStyle = "rgba(180,180,180,0.55)";
        ctx.beginPath();
        ctx.arc(scanPx, yTop, 3, 0, Math.PI * 2);
        ctx.fill();

        for (const s of slices) {
          if (s.row < sc.rowStart || s.row > sc.rowEnd) continue;
          const sx = (s.x / 100) * W;
          const dist = Math.abs(sx - scanPx);
          if (dist < cfg.glowRange) {
            const alpha = dist < 50
              ? 0.6 * (1 - dist / 50)
              : 0.4 * (1 - (dist - 50) / (cfg.glowRange - 50));
            const rowCenterY = offsetY + s.row * (cfg.rowHeight + cfg.rowGap) + cfg.rowHeight / 2;
            const distFromCenter = Math.abs(rowCenterY - centerY) / halfH;
            const vFade = Math.max(0.15, 1 - distFromCenter * 0.85);
            const scaledH = s.h * (0.4 + 0.6 * vFade);
            const sy = rowCenterY - scaledH / 2;
            ctx.fillStyle = s.flagged
              ? `rgba(237,178,0,${alpha * vFade})`
              : `rgba(14,180,131,${alpha * 0.6 * vFade})`;
            ctx.fillRect(sx - s.w / 2 - 1, sy - 1, s.w + 2, scaledH + 2);
          }
        }

        scanStates[si].x += scannerDefs[si].speed * scanStates[si].dir;
        if (scanStates[si].x >= 100) { scanStates[si].x = 100; scanStates[si].dir = -1; }
        if (scanStates[si].x <= 0) { scanStates[si].x = 0; scanStates[si].dir = 1; }
      }

      // Top & bottom fade overlay
      const fadeH = H * 0.18;
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

  return <canvas ref={canvasRef} className="hero-timeline" aria-hidden="true" />;
}

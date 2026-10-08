import React, { useEffect, useRef } from 'react';
import * as PIXI from 'pixi.js';

export const PixiCartoonCanvas: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const appRef = useRef<PIXI.Application | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    let destroyed = false;

    const app = new PIXI.Application();

    async function initPixi() {
      await app.init({
        width: window.innerWidth,
        height: window.innerHeight,
        backgroundAlpha: 0,
        antialias: true,
        resolution: window.devicePixelRatio || 1,
        autoDensity: true,
      });

      if (destroyed || !containerRef.current) {
        app.destroy(true);
        return;
      }

      containerRef.current.appendChild(app.canvas);
      appRef.current = app;

      // 1. Floating Holographic HUD Data Charts (2D Pixi Elements)
      const hudContainer = new PIXI.Container();
      app.stage.addChild(hudContainer);

      // Pie chart HUD (Top Left)
      const pieGraphics = new PIXI.Graphics();
      pieGraphics.x = 120;
      pieGraphics.y = 220;
      pieGraphics.roundRect(-50, -50, 100, 100, 12);
      pieGraphics.fill({ color: 0x0284c7, alpha: 0.25 });
      pieGraphics.stroke({ width: 2, color: 0x38bdf8, alpha: 0.8 });
      
      // Draw pie slices inside
      pieGraphics.poly([0, 0, 30, 0, 20, 25]);
      pieGraphics.fill({ color: 0xf59e0b, alpha: 0.9 });
      pieGraphics.poly([0, 0, 20, 25, -25, 20]);
      pieGraphics.fill({ color: 0x10b981, alpha: 0.9 });
      pieGraphics.poly([0, 0, -25, 20, 30, 0]);
      pieGraphics.fill({ color: 0x38bdf8, alpha: 0.9 });

      hudContainer.addChild(pieGraphics);

      // Radar HUD (Top Right)
      const radarGraphics = new PIXI.Graphics();
      radarGraphics.x = app.screen.width - 150;
      radarGraphics.y = 200;
      radarGraphics.circle(0, 0, 45);
      radarGraphics.fill({ color: 0x0369a1, alpha: 0.25 });
      radarGraphics.stroke({ width: 2, color: 0x38bdf8, alpha: 0.8 });
      radarGraphics.circle(0, 0, 30);
      radarGraphics.stroke({ width: 1, color: 0x38bdf8, alpha: 0.4 });
      radarGraphics.circle(0, 0, 15);
      radarGraphics.stroke({ width: 1, color: 0x38bdf8, alpha: 0.4 });

      hudContainer.addChild(radarGraphics);

      // 2. Animated Floating Embers / Sparks (2D Particle Effect from yqyl.jfif)
      const particleCount = 40;
      const particles: { sprite: PIXI.Graphics; speedY: number; speedX: number; resetY: number }[] = [];

      for (let i = 0; i < particleCount; i++) {
        const p = new PIXI.Graphics();
        const size = Math.random() * 4 + 2;
        const color = Math.random() > 0.4 ? 0xfbbf24 : 0x38bdf8; // Gold or Cyan sparks
        
        p.circle(0, 0, size);
        p.fill({ color, alpha: Math.random() * 0.7 + 0.3 });
        p.x = Math.random() * app.screen.width;
        p.y = Math.random() * app.screen.height;

        app.stage.addChild(p);

        particles.push({
          sprite: p,
          speedY: Math.random() * 1.2 + 0.4,
          speedX: (Math.random() - 0.5) * 0.4,
          resetY: app.screen.height + 20
        });
      }

      // Ticker animation for particles & HUD bobbing
      let elapsed = 0;
      app.ticker.add((ticker) => {
        elapsed += ticker.deltaTime * 0.03;

        // Bobbing HUD elements
        pieGraphics.y = 220 + Math.sin(elapsed) * 6;
        radarGraphics.y = 200 + Math.cos(elapsed * 0.8) * 6;

        // Floating particles rising upwards
        particles.forEach(pt => {
          pt.sprite.y -= pt.speedY;
          pt.sprite.x += pt.speedX;
          if (pt.sprite.y < -20) {
            pt.sprite.y = pt.resetY;
            pt.sprite.x = Math.random() * app.screen.width;
          }
        });
      });
    }

    initPixi();

    // Window resize handler
    const handleResize = () => {
      if (appRef.current && appRef.current.renderer) {
        appRef.current.renderer.resize(window.innerWidth, window.innerHeight);
      }
    };
    window.addEventListener('resize', handleResize);

    return () => {
      destroyed = true;
      window.removeEventListener('resize', handleResize);
      if (appRef.current) {
        appRef.current.destroy(true);
        appRef.current = null;
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden" 
    />
  );
};

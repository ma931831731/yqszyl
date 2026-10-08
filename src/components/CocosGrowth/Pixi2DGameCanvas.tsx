import React, { useEffect, useRef } from 'react';
import * as PIXI from 'pixi.js';
import { BaseFacility } from '../../types';

interface Pixi2DGameCanvasProps {
  facilities: BaseFacility[];
  onSelectFacility: (fac: BaseFacility) => void;
}

export const Pixi2DGameCanvas: React.FC<Pixi2DGameCanvasProps> = ({
  facilities,
  onSelectFacility,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const appRef = useRef<PIXI.Application | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    let destroyed = false;

    // Create Pixi.js Application
    const app = new PIXI.Application();

    async function initPixi() {
      await app.init({
        width: containerRef.current?.clientWidth || 800,
        height: 380,
        backgroundColor: 0x0a1020,
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

      // 1. Draw 2D Background Grid & Command Platform
      const bgGraphics = new PIXI.Graphics();
      bgGraphics.rect(0, 0, app.screen.width, app.screen.height);
      bgGraphics.fill({ color: 0x091122 });

      // Grid lines
      bgGraphics.stroke({ width: 1, color: 0x1e293b, alpha: 0.5 });
      for (let x = 0; x < app.screen.width; x += 40) {
        bgGraphics.moveTo(x, 0);
        bgGraphics.lineTo(x, app.screen.height);
      }
      for (let y = 0; y < app.screen.height; y += 40) {
        bgGraphics.moveTo(0, y);
        bgGraphics.lineTo(app.screen.width, y);
      }

      app.stage.addChild(bgGraphics);

      // 2. Render 8 Facility Building Nodes on 2D Canvas
      const cols = 4;
      const cardWidth = (app.screen.width - 60) / cols;
      const cardHeight = 130;

      facilities.forEach((fac, idx) => {
        const row = Math.floor(idx / cols);
        const col = idx % cols;
        const x = 20 + col * (cardWidth + 10);
        const y = 25 + row * (cardHeight + 20);

        const buildingContainer = new PIXI.Container();
        buildingContainer.x = x;
        buildingContainer.y = y;
        buildingContainer.eventMode = 'static';
        buildingContainer.cursor = 'pointer';

        // Building Box Graphic
        const buildingBox = new PIXI.Graphics();
        
        // Pick theme color based on facility ID
        let accentColor = 0x38bdf8; // Sky Blue
        if (fac.id === 'shudi') accentColor = 0x10b981;  // Emerald
        if (fac.id === 'diting') accentColor = 0xf59e0b; // Amber
        if (fac.id === 'wangping') accentColor = 0xf43f5e;// Rose
        if (fac.id === 'diandian') accentColor = 0xa855f7;// Purple

        buildingBox.roundRect(0, 0, cardWidth, cardHeight, 14);
        buildingBox.fill({ color: 0x121c33 });
        buildingBox.stroke({ width: 2, color: accentColor, alpha: 0.8 });

        // Hover animation
        buildingContainer.on('pointerover', () => {
          buildingContainer.scale.set(1.03);
        });
        buildingContainer.on('pointerout', () => {
          buildingContainer.scale.set(1.0);
        });
        buildingContainer.on('pointerdown', () => {
          onSelectFacility(fac);
        });

        buildingContainer.addChild(buildingBox);

        // Building Name Text
        const titleText = new PIXI.Text({
          text: fac.buildingName,
          style: {
            fontFamily: 'sans-serif',
            fontSize: 13,
            fontWeight: 'bold',
            fill: 0xffffff,
          }
        });
        titleText.x = 14;
        titleText.y = 14;
        buildingContainer.addChild(titleText);

        // Level Badge
        const levelBadge = new PIXI.Graphics();
        levelBadge.roundRect(cardWidth - 55, 12, 42, 20, 6);
        levelBadge.fill({ color: accentColor, alpha: 0.2 });
        levelBadge.stroke({ width: 1, color: accentColor });
        buildingContainer.addChild(levelBadge);

        const levelText = new PIXI.Text({
          text: `LV.${fac.level}`,
          style: {
            fontFamily: 'sans-serif',
            fontSize: 11,
            fontWeight: '900',
            fill: accentColor,
          }
        });
        levelText.x = cardWidth - 48;
        levelText.y = 15;
        buildingContainer.addChild(levelText);

        // System Name & Yield Speed
        const systemText = new PIXI.Text({
          text: `系统: ${fac.name}`,
          style: {
            fontFamily: 'sans-serif',
            fontSize: 11,
            fill: 0x94a3b8,
          }
        });
        systemText.x = 14;
        systemText.y = 42;
        buildingContainer.addChild(systemText);

        const yieldText = new PIXI.Text({
          text: `+${fac.dataRatePerSec} 情报/s`,
          style: {
            fontFamily: 'sans-serif',
            fontSize: 12,
            fontWeight: 'bold',
            fill: 0x38bdf8,
          }
        });
        yieldText.x = 14;
        yieldText.y = 68;
        buildingContainer.addChild(yieldText);

        // Status Indicator Button
        const btnBox = new PIXI.Graphics();
        btnBox.roundRect(14, 95, cardWidth - 28, 22, 6);
        btnBox.fill({ color: 0x1e293b });
        buildingContainer.addChild(btnBox);

        const btnText = new PIXI.Text({
          text: fac.assignedOfficerId ? '👮 已特聘干员驻扎' : '⚡ 点击升级 / 驻扎',
          style: {
            fontFamily: 'sans-serif',
            fontSize: 10,
            fontWeight: 'bold',
            fill: fac.assignedOfficerId ? 0xfbbf24 : 0xe2e8f0,
          }
        });
        btnText.x = 22;
        btnText.y = 99;
        buildingContainer.addChild(btnText);

        app.stage.addChild(buildingContainer);
      });

      // 3. Animated 2D Floating Data Particles
      const particles: { text: PIXI.Text; startY: number; speed: number }[] = [];
      facilities.forEach((fac, idx) => {
        const col = idx % cols;
        const row = Math.floor(idx / cols);
        const px = 20 + col * (cardWidth + 10) + cardWidth / 2;
        const py = 25 + row * (cardHeight + 20) + 30;

        const pText = new PIXI.Text({
          text: `+${fac.dataRatePerSec}`,
          style: {
            fontFamily: 'sans-serif',
            fontSize: 10,
            fontWeight: 'bold',
            fill: 0x38bdf8,
          }
        });
        pText.x = px;
        pText.y = py;
        pText.alpha = 0.8;

        app.stage.addChild(pText);
        particles.push({ text: pText, startY: py, speed: 0.4 + Math.random() * 0.3 });
      });

      // Ticker animation loop
      app.ticker.add(() => {
        particles.forEach(p => {
          p.text.y -= p.speed;
          p.text.alpha -= 0.008;
          if (p.text.alpha <= 0) {
            p.text.y = p.startY;
            p.text.alpha = 0.9;
          }
        });
      });
    }

    initPixi();

    return () => {
      destroyed = true;
      if (appRef.current) {
        appRef.current.destroy(true);
        appRef.current = null;
      }
    };
  }, [facilities, onSelectFacility]);

  return (
    <div className="w-full rounded-2xl overflow-hidden border-2 border-slate-700 shadow-xl bg-[#0a1020]">
      <div className="bg-[#121c33] px-4 py-2 flex items-center justify-between border-b border-slate-700 text-xs font-bold text-slate-200">
        <span className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>Pixi.js 2D 游戏引擎物理渲染视图 (Canvas 60FPS)</span>
        </span>
        <span className="text-slate-400 font-mono text-[11px]">Engine: Pixi.js v8.x</span>
      </div>
      <div ref={containerRef} className="w-full h-[380px] flex items-center justify-center" />
    </div>
  );
};

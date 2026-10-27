import { useEffect, useRef, useState } from 'react';
import {
  ACT_ONE_CUTSCENE_SCRIPT,
  ANCIENT_MARTIAL_ARTS_MATRIX,
  ANDHAKASURA_MOVES,
  BHAIRAV_MOVES,
  ENGINE_BLUEPRINT_FILES
} from './tandavData';
import { tandavAudio } from './tandavAudioEngine';
import {
  CombatSnapshot,
  TandavCombatEngine3D
} from './tandavEngine3D';
import {
  SupportedLocale,
  tandavLocalization
} from './tandavLocalizationEngine';
import { initWizardChess } from './wizardChessEngine.js';

type ActiveDrawer = 'none' | 'framedata' | 'charselect' | 'blueprint' | 'matchhistory';
type ArenaMode = 'tandav_fighter' | 'sanctum_chess';

export default function App() {
  const canvasMountRef = useRef<HTMLDivElement | null>(null);
  const engineRef = useRef<TandavCombatEngine3D | null>(null);
  const [arenaMode, setArenaMode] = useState<ArenaMode>('tandav_fighter');
  const [snap, setSnap] = useState<CombatSnapshot | null>(null);
  const [uiHidden, setUiHidden] = useState(false);
  const [dockCollapsed, setDockCollapsed] = useState(false);
  const [activeDrawer, setActiveDrawer] = useState<ActiveDrawer>('none');
  const [selectedBlueprintId, setSelectedBlueprintId] = useState<string>(
    ENGINE_BLUEPRINT_FILES[0].id
  );
  const [selectedMatchId, setSelectedMatchId] = useState<string>('MATCH_2026_05');
  const [frameTab, setFrameTab] = useState<'bhairav' | 'andhakasura' | 'martial_arts'>('bhairav');
  const [audioMuted, setAudioMuted] = useState(false);
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);
  const [perfMonitorExpanded, setPerfMonitorExpanded] = useState(true);

  useEffect(() => {
    const mountEl = canvasMountRef.current;
    if (!mountEl) return;

    if (arenaMode === 'tandav_fighter') {
      const engine = new TandavCombatEngine3D(mountEl, (nextSnap) => {
        setSnap(nextSnap);
      });
      engineRef.current = engine;
      return () => {
        engine.dispose();
        engineRef.current = null;
      };
    } else {
      // Mount pre-designed Sanctum Tactical Chess Board when toggled
      if (engineRef.current) {
        engineRef.current.dispose();
        engineRef.current = null;
      }
      initWizardChess();
    }
  }, [arenaMode]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === 'h' || e.key === 'H') {
        setUiHidden((prev) => !prev);
      } else if (e.key === 'Escape') {
        setActiveDrawer('none');
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const handleToggleAudio = () => {
    const nextMuted = !audioMuted;
    setAudioMuted(nextMuted);
    tandavAudio.setMuted(nextMuted);
    if (!nextMuted) {
      tandavAudio.startRhythmLoop(120);
    }
  };

  const handleCopyBlueprint = (id: string, code: string) => {
    navigator.clipboard?.writeText(code).catch(() => {});
    setCopiedCodeId(id);
    window.setTimeout(() => setCopiedCodeId(null), 1800);
  };

  const activeLocale: SupportedLocale =
    snap?.activeLocale || tandavLocalization.getActiveLocale();
  const controlledMoves =
    snap?.playerSide === 'andhakasura' ? ANDHAKASURA_MOVES : BHAIRAV_MOVES;
  const activeCutsceneStep =
    snap?.cutsceneStepIndex !== null && snap?.cutsceneStepIndex !== undefined
      ? ACT_ONE_CUTSCENE_SCRIPT[snap.cutsceneStepIndex]
      : null;
  const currentBlueprint =
    ENGINE_BLUEPRINT_FILES.find((b) => b.id === selectedBlueprintId) ||
    ENGINE_BLUEPRINT_FILES[0];

  const handleSelectLocale = (locale: SupportedLocale) => {
    tandavLocalization.setLocale(locale);
    engineRef.current?.setLocale(locale);
  };

  return (
    <div
      className={`tandav-app-shell ${uiHidden ? 'cinematic-ui-hidden' : ''} ${
        snap?.aspectRatio === '1.43:1'
          ? 'imax-143-active'
          : snap?.aspectRatio === '1.90:1'
            ? 'imax-190-active'
            : ''
      }`}
    >
      {/* 3D WebGL Viewport Container */}
      <div id="canvas-container" ref={canvasMountRef}></div>

      {/* IMAX 1.43:1 / 1.90:1 Dynamic Aspect Ratio Framing Bars */}
      {arenaMode === 'tandav_fighter' && snap && snap.aspectRatio !== '16:9' && (
        <div className="imax-framing-overlay" aria-hidden="true">
          <div className="imax-bar imax-bar-left">
            <span className="imax-watermark">
              IMAX {snap.aspectRatio} DUAL-LASER PIPELINE • DOLBY VISION HDR
            </span>
          </div>
          <div className="imax-bar imax-bar-right">
            <span className="imax-watermark">
              TĀṆḌAVA: THE RHYTHM OF WRATH • MOUNT KAILASH ARENA
            </span>
          </div>
        </div>
      )}

      {/* Restore UI Floating Button when hidden */}
      {uiHidden && (
        <button
          type="button"
          className="hud-btn restore-ui-floating"
          onClick={() => setUiHidden(false)}
        >
          Show HUD [H]
        </button>
      )}

      {/* Top Navigation & Control Bar (Preserves all required test IDs) */}
      <header id="hud-top">
        <div className="hud-group" id="hud-left">
          <div className="brand-lockup">
            <span className="brand-title">
              {tandavLocalization.getMenuString('MainMenu_Title', activeLocale)}
            </span>
            <span className="brand-sep">·</span>
            <span className="brand-sub">
              {tandavLocalization.getMenuString('HUD_Subtitle', activeLocale)}
            </span>
          </div>

          <div className="status-readout" id="status-pill">
            <span id="turn-text">
              {arenaMode === 'tandav_fighter'
                ? `Round ${snap?.roundNumber ?? 1} · ${snap?.beat.bpm ?? 120} BPM Adi Tāla`
                : 'Sanctum Tactical Board'}
            </span>
            <span className="brand-sep">·</span>
            <span className="mode-badge" id="mode-badge">
              {snap?.playerSide === 'andhakasura'
                ? tandavLocalization.getFighterLocalization('andhakasura', activeLocale).name
                : tandavLocalization.getFighterLocalization('bhairav', activeLocale).name}
            </span>
          </div>
        </div>

        <div className="hud-group" id="hud-right">
          {/* Live FText Localization Switcher (en-IN / hi-IN / or-IN) */}
          {tandavLocalization.getSupportedLocales().map((loc) => (
            <button
              key={loc.code}
              type="button"
              className={`hud-btn ${activeLocale === loc.code ? 'active' : ''}`}
              title={`Switch FText Localization Profile to ${loc.label} (${loc.code})`}
              onClick={() => handleSelectLocale(loc.code)}
            >
              {loc.nativeLabel}
            </button>
          ))}

          <div className="hud-divider" aria-hidden="true"></div>

          <button
            type="button"
            className="hud-btn"
            id="btn-side-toggle"
            title="Switch between controlling Bhairav and Andhakāsura"
            onClick={() => engineRef.current?.togglePlayerSide()}
          >
            {tandavLocalization.getButtonString('Select_Character', activeLocale)}:{' '}
            {snap?.playerSide === 'andhakasura' ? 'Bhairav' : 'Andhakāsura'}
          </button>

          <button
            type="button"
            className="hud-btn"
            id="btn-ai-move"
            title="Trigger immediate AI opponent strike on the Tāla beat"
            onClick={() => engineRef.current?.triggerManualAiStrike()}
          >
            {tandavLocalization.getButtonString('AI_Strike', activeLocale)}
          </button>

          <button
            type="button"
            className="hud-btn"
            id="btn-reset"
            title="Reset Round and Health on Mount Kailash"
            onClick={() => engineRef.current?.resetMatch()}
          >
            {tandavLocalization.getButtonString('Reset_Match', activeLocale)}
          </button>

          <div className="hud-divider" aria-hidden="true"></div>

          <button
            type="button"
            className={`hud-btn ${snap?.cameraPreset === 'competitive' ? 'active' : ''}`}
            id="btn-cam-player"
            onClick={() => engineRef.current?.setCameraPreset('competitive')}
          >
            Fighter Cam
          </button>
          <button
            type="button"
            className={`hud-btn ${snap?.cameraPreset === 'overhead' ? 'active' : ''}`}
            id="btn-cam-top"
            onClick={() => engineRef.current?.setCameraPreset('overhead')}
          >
            Overhead
          </button>
          <button
            type="button"
            className={`hud-btn ${snap?.cameraPreset === 'side_east' ? 'active' : ''}`}
            id="btn-cam-side"
            onClick={() => engineRef.current?.setCameraPreset('side_east')}
          >
            Side
          </button>
          <button
            type="button"
            className={`hud-btn ${snap?.cameraPreset === 'kailash_wide' ? 'active' : ''}`}
            id="btn-cam-wide"
            onClick={() => engineRef.current?.setCameraPreset('kailash_wide')}
          >
            Kailash Wide
          </button>

          <div className="hud-divider" aria-hidden="true"></div>

          <button
            type="button"
            className={`hud-btn ${activeDrawer === 'framedata' ? 'active' : ''}`}
            onClick={() =>
              setActiveDrawer((prev) => (prev === 'framedata' ? 'none' : 'framedata'))
            }
          >
            {tandavLocalization.getButtonString('Frame_Data', activeLocale)}
          </button>

          <button
            type="button"
            className={`hud-btn ${activeDrawer === 'charselect' ? 'active' : ''}`}
            onClick={() =>
              setActiveDrawer((prev) => (prev === 'charselect' ? 'none' : 'charselect'))
            }
          >
            {tandavLocalization.getButtonString('Fighters_Modes', activeLocale)}
          </button>

          <button
            type="button"
            className={`hud-btn ${activeDrawer === 'blueprint' ? 'active' : ''}`}
            onClick={() =>
              setActiveDrawer((prev) => (prev === 'blueprint' ? 'none' : 'blueprint'))
            }
          >
            {tandavLocalization.getButtonString('Studio_APIs', activeLocale)}
          </button>

          <button
            type="button"
            className={`hud-btn ${activeDrawer === 'matchhistory' ? 'active' : ''}`}
            onClick={() =>
              setActiveDrawer((prev) => (prev === 'matchhistory' ? 'none' : 'matchhistory'))
            }
            title="Inspect Round-by-Round Telemetry for the Last 5 Matches (Winner, Total Combos, Tāla Sync Accuracy)"
          >
            {tandavLocalization.getButtonString('Match_History', activeLocale)} (
            {snap?.matchHistoryLogs?.length ?? 5})
          </button>

          <button
            type="button"
            className="hud-btn"
            onClick={() => engineRef.current?.startActOneCutscene()}
          >
            {tandavLocalization.getButtonString('Act_One_Cutscene', activeLocale)}
          </button>

          <button
            type="button"
            className="hud-btn"
            onClick={handleToggleAudio}
          >
            {audioMuted ? 'Unmute Tāla' : 'Mute Tāla'}
          </button>

          <button
            type="button"
            className="hud-btn"
            id="btn-hide-ui"
            title="Toggle HUD visibility (Shortcut: H)"
            onClick={() => setUiHidden((prev) => !prev)}
          >
            Hide UI [H]
          </button>
        </div>
      </header>

      {/* In-Engine Competitive Combat HUD (TandavCombatHUD.cpp Layout) */}
      {arenaMode === 'tandav_fighter' && snap && (
        <section className="tandav-combat-hud" aria-label="Competitive Combat Telemetry">
          {/* Player 1: Bhairav */}
          <div className="fighter-hud-column fighter-left">
            <div className="fighter-header-row">
              <div>
                <div className="fighter-name-row">
                  <span className="fighter-name">{snap.p1.name}</span>
                  <span className="fighter-stance-tag">{snap.p1.stanceLabel}</span>
                </div>
                <div className="fighter-subtitle">{snap.p1.title}</div>
              </div>
              <div className="round-win-counters">
                <span className={`round-gem ${snap.p1RoundsWon >= 1 ? 'won' : ''}`}>◆</span>
                <span className={`round-gem ${snap.p1RoundsWon >= 2 ? 'won' : ''}`}>◆</span>
                <span className="hp-numeric">{snap.p1.health} HP</span>
              </div>
            </div>

            <div className="health-bar-track">
              <div
                className="health-bar-fill bhairav-fill"
                style={{ width: `${(snap.p1.health / snap.p1.maxHealth) * 100}%` }}
              />
            </div>

            <div className="tandav-meter-row">
              <span className="meter-label">
                TĀṆḌAVA GAUGE: {snap.p1.tandavMeter}%
                {snap.p1.deflectAnimFrames > 0 && (
                  <strong className="status-alert-inline">
                    {' '}
                    · NATARAJA DEFLECT ({snap.p1.deflectAnimFrames}f)
                  </strong>
                )}
                {snap.p1.staggerLockFrames > 0 && (
                  <strong className="status-alert-inline crimson">
                    {' '}
                    · STAGGER LOCK ({snap.p1.staggerLockFrames}f)
                  </strong>
                )}
                {snap.p1.capturedFrames > 0 && (
                  <strong className="status-alert-inline crimson">
                    {' '}
                    · GRAB CAPTURED ({snap.p1.capturedFrames}f)
                  </strong>
                )}
                {snap.p1.varmaFreezeFrames > 0 && (
                  <strong className="status-alert-inline"> · VARMA FROZEN</strong>
                )}
                {snap.p1.rootedFrames > 0 && (
                  <strong className="status-alert-inline crimson">
                    {' '}
                    · CLONE LEG-LOCK ({snap.p1.rootedFrames}f)
                  </strong>
                )}
              </span>
              <div className="tandav-meter-track">
                <div
                  className={`tandav-meter-fill ${snap.p1.tandavMeter >= 100 ? 'maxed' : ''}`}
                  style={{ width: `${snap.p1.tandavMeter}%` }}
                />
              </div>
            </div>

            <div className="frame-telemetry-strip">
              <span>
                FRAME: S:{snap.p1.startupFrames} A:{snap.p1.activeFrames} R:{snap.p1.recoveryFrames}
              </span>
              <span>·</span>
              <span>PHASE: {snap.p1.framePhase}</span>
              <span>·</span>
              <span className={snap.p1.frameAdvantage >= 0 ? 'adv-plus' : 'adv-minus'}>
                ADV: {snap.p1.frameAdvantage >= 0 ? `+${snap.p1.frameAdvantage}` : snap.p1.frameAdvantage}f
              </span>
              <span>·</span>
              <span className="socket-telemetry-tag" title="TandavWeaponSocketBinder + BhairavHitboxTracer">
                {snap.p1.socketStateLabel} [{snap.p1.hitboxExtentLabel}]
              </span>
              {snap.p1.comboCount > 1 && (
                <>
                  <span>·</span>
                  <span className="combo-chip">{snap.p1.comboCount} HIT COMBO</span>
                </>
              )}
            </div>
          </div>

          {/* Central Damru Metasounds Beat Core & Match Timer */}
          <div className="center-damru-core">
            <div className="match-timer-box" title="TandavStateManager: Best-of-3 Rounds / Best-of-5 Sets">
              <span className="round-tag">
                S{snap.currentSetNumber}/{snap.maxSetsPerMatch} ({snap.p1SetWins}-{snap.p2SetWins}) · R{snap.roundNumber}
              </span>
              <span className="timer-digits">
                {snap.gameMode === 'practice_lab' ? '∞' : snap.roundTimerSec}
              </span>
            </div>

            <div
              className={`damru-pulse-ring ${
                snap.beat.isDownbeatWindow
                  ? 'tala-perfect-now'
                  : snap.beat.isHalfbeatWindow
                    ? 'tala-great-now'
                    : ''
              }`}
              style={{
                transform: `scale(${1 + snap.beat.beatPulse * 0.18})`
              }}
              title="Metasounds Damru Beat Core — Strike when ring flashes gold/cyan"
            >
              <span className="damru-symbol">⋈</span>
              <span className="damru-beat-num">
                BEAT {snap.beat.currentBeatInCycle + 1}/8
              </span>
            </div>

            <div className="beat-delta-readout">
              <span
                className={`tala-accuracy-tag ${
                  snap.lastJudgementAccuracy === 'TALA_PERFECT'
                    ? 'perfect'
                    : snap.lastJudgementAccuracy === 'TALA_GREAT'
                      ? 'great'
                      : 'off'
                }`}
              >
                {snap.lastJudgementAccuracy.replace('_', ' ')}
              </span>
              <span className="delta-ms">Δ {snap.lastBeatDeltaMs}ms</span>
            </div>
          </div>

          {/* Player 2: Andhakāsura */}
          <div className="fighter-hud-column fighter-right">
            <div className="fighter-header-row reverse">
              <div className="round-win-counters">
                <span className="hp-numeric">{snap.p2.health} HP</span>
                <span className={`round-gem ${snap.p2RoundsWon >= 1 ? 'won crimson' : ''}`}>◆</span>
                <span className={`round-gem ${snap.p2RoundsWon >= 2 ? 'won crimson' : ''}`}>◆</span>
              </div>
              <div className="align-right">
                <div className="fighter-name-row reverse">
                  <span className="fighter-stance-tag crimson">{snap.p2.stanceLabel}</span>
                  <span className="fighter-name">{snap.p2.name}</span>
                </div>
                <div className="fighter-subtitle">{snap.p2.title}</div>
              </div>
            </div>

            <div className="health-bar-track reverse">
              <div
                className="health-bar-fill andhakasura-fill"
                style={{ width: `${(snap.p2.health / snap.p2.maxHealth) * 100}%` }}
              />
            </div>

            <div className="tandav-meter-row reverse">
              <div className="tandav-meter-track">
                <div
                  className={`tandav-meter-fill crimson ${
                    snap.p2.tandavMeter >= 100 ? 'maxed' : ''
                  }`}
                  style={{ width: `${snap.p2.tandavMeter}%` }}
                />
              </div>
              <span className="meter-label">
                TĀṆḌAVA: {snap.p2.tandavMeter}% · CLONES: {snap.activeClonesCount}/3
                {snap.p2.staggerLockFrames > 0 && (
                  <strong className="status-alert-inline crimson">
                    {' '}
                    · +18f STAGGER LOCK ({snap.p2.staggerLockFrames}f)
                  </strong>
                )}
                {snap.p2.whiffRecoveryFrames > 0 && (
                  <strong className="status-alert-inline crimson">
                    {' '}
                    · 28f WHIFF PENALTY ({snap.p2.whiffRecoveryFrames}f)
                  </strong>
                )}
                {snap.p2.varmaFreezeFrames > 0 && (
                  <strong className="status-alert-inline">
                    {' '}
                    · VARMA LOCKED ({(snap.p2.varmaFreezeFrames / 60).toFixed(1)}s)
                  </strong>
                )}
              </span>
            </div>

            <div className="frame-telemetry-strip reverse">
              <span className="socket-telemetry-tag crimson" title="TandavWeaponSocketBinder + BhairavHitboxTracer">
                [{snap.p2.hitboxExtentLabel}] {snap.p2.socketStateLabel}
              </span>
              <span>·</span>
              <span className={snap.p2.frameAdvantage >= 0 ? 'adv-plus' : 'adv-minus'}>
                ADV: {snap.p2.frameAdvantage >= 0 ? `+${snap.p2.frameAdvantage}` : snap.p2.frameAdvantage}f
              </span>
              <span>·</span>
              <span>PHASE: {snap.p2.framePhase}</span>
              <span>·</span>
              <span>
                FRAME: S:{snap.p2.startupFrames} A:{snap.p2.activeFrames} R:{snap.p2.recoveryFrames}
              </span>
            </div>
          </div>
        </section>
      )}

      {/* Top-Right Real-Time 60 FPS Frame-Rate Monitor & Memory Usage Graph */}
      {arenaMode === 'tandav_fighter' && snap && snap.perf && (
        <aside
          className={`perf-monitor-widget ${perfMonitorExpanded ? 'expanded' : 'compact'}`}
          aria-label="Real-Time 60 FPS Frame-Rate and Memory Usage Profiler"
        >
          <div className="perf-header-row">
            <div className="perf-title-group">
              <span
                className={`perf-status-dot ${
                  snap.perf.fps >= 55 ? 'healthy' : snap.perf.fps >= 45 ? 'warn' : 'drop'
                }`}
              />
              <span className="perf-kicker">60 FPS LOOP PROFILER</span>
            </div>

            <div className="perf-metrics-inline">
              <span className="perf-badge cyan">
                {snap.perf.fps} FPS ({snap.perf.frameTimeMs.toFixed(1)}ms)
              </span>
              <span className="perf-badge emerald">
                {snap.perf.memoryUsedMb.toFixed(1)} MB
              </span>
              <button
                type="button"
                className="perf-collapse-btn"
                onClick={() => setPerfMonitorExpanded((prev) => !prev)}
                title="Toggle Real-Time FPS & Memory Graph Details"
              >
                {perfMonitorExpanded ? '▾' : '▸'}
              </button>
            </div>
          </div>

          {perfMonitorExpanded && (
            <div className="perf-body">
              {/* Graph 1: Real-Time Frame-Rate (FPS) & 16.67ms Frame Budget Curve */}
              <div className="perf-graph-card">
                <div className="perf-graph-labels">
                  <span>FRAME RATE &amp; 16.67ms BUDGET</span>
                  <span className="mono-val">
                    Target: 60 FPS · Budget: {snap.perf.budgetTargetMs}ms
                  </span>
                </div>
                <svg
                  className="perf-sparkline-svg"
                  viewBox="0 0 220 44"
                  preserveAspectRatio="none"
                  aria-label="Real-time FPS Sparkline"
                >
                  {/* 60 FPS / 16.67ms Target Reference Line */}
                  <line
                    x1="0"
                    y1="8"
                    x2="220"
                    y2="8"
                    stroke="rgba(212, 175, 55, 0.45)"
                    strokeDasharray="3 3"
                    strokeWidth="1"
                  />
                  <polyline
                    fill="none"
                    stroke="#00d2ff"
                    strokeWidth="1.8"
                    points={snap.perf.fpsHistory
                      .map((val, idx, arr) => {
                        const x = (idx / Math.max(1, arr.length - 1)) * 220;
                        const clamped = Math.max(20, Math.min(65, val));
                        const y = 40 - ((clamped - 20) / 45) * 32;
                        return `${x.toFixed(1)},${y.toFixed(1)}`;
                      })
                      .join(' ')}
                  />
                </svg>
              </div>

              {/* Graph 2: Real-Time Heap & WebGL Buffer Memory Usage Graph (MB) */}
              <div className="perf-graph-card">
                <div className="perf-graph-labels">
                  <span>HEAP &amp; REPLAY BUFFER MEMORY</span>
                  <span className="mono-val">
                    {snap.perf.memoryUsedMb.toFixed(1)} / {snap.perf.memoryAllocatedMb.toFixed(0)} MB
                  </span>
                </div>
                <svg
                  className="perf-sparkline-svg"
                  viewBox="0 0 220 44"
                  preserveAspectRatio="none"
                  aria-label="Real-time Memory Usage Sparkline"
                >
                  <line
                    x1="0"
                    y1="12"
                    x2="220"
                    y2="12"
                    stroke="rgba(16, 185, 129, 0.35)"
                    strokeDasharray="3 3"
                    strokeWidth="1"
                  />
                  <polyline
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="1.8"
                    points={snap.perf.memoryHistory
                      .map((val, idx, arr) => {
                        const x = (idx / Math.max(1, arr.length - 1)) * 220;
                        const minMem = Math.min(...arr, 30);
                        const maxMem = Math.max(...arr, minMem + 25);
                        const norm = (val - minMem) / Math.max(1, maxMem - minMem);
                        const y = 38 - norm * 28;
                        return `${x.toFixed(1)},${y.toFixed(1)}`;
                      })
                      .join(' ')}
                  />
                </svg>
              </div>

              {/* WebGL Draw Calls & Live Interview Frame-Parameter Override Controls */}
              <div className="perf-footer-row">
                <span className="perf-stat-Readout">
                  Draws: {snap.perf.drawCalls} · Tris: {snap.perf.triangles} · Geos:{' '}
                  {snap.perf.geometries}
                </span>
                <div className="perf-actions">
                  <button
                    type="button"
                    className={`perf-mini-btn ${
                      snap.perf.highPerfOverrideActive ? 'active' : ''
                    }`}
                    onClick={() => engineRef.current?.toggleHighPerfOverride()}
                    title="Live Interview Debugging Strategy: Toggle bIsHighPerformanceOverrideActive (TransitionFrameWindow = 3f vs 6f)"
                  >
                    Morph: {snap.perf.highPerfOverrideActive ? '3f Override' : '6f Baseline'}
                  </button>
                  <button
                    type="button"
                    className="perf-mini-btn"
                    onClick={() => engineRef.current?.purgeReplayMemoryCache()}
                    title="Flush 300-frame rolling replay & particle buffers to inspect memory drop"
                  >
                    GC Flush
                  </button>
                </div>
              </div>
            </div>
          )}
        </aside>
      )}

      {/* Live Tāla Judgement & Combat Alert Banner */}
      {arenaMode === 'tandav_fighter' && snap && (
        <div className="combat-callouts-wrap" aria-live="polite">
          <div className="tala-judgement-line">
            {snap.parryFreezeFramesLeft > 0
              ? `⚡ ${tandavLocalization.getCombatAlert('Nataraja_Deflection', activeLocale)} (${snap.parryFreezeFramesLeft}/15f) • SLOMO 0.0001f ⚡`
              : snap.lastJudgementText}
          </div>
          {snap.combatBannerText && (
            <div className="combat-major-banner">{snap.combatBannerText}</div>
          )}
          {snap.engineeringAlertText && (
            <div className="moksha-prompt-box" role="alert">
              <span>⚠️ {snap.engineeringAlertText}</span>
            </div>
          )}
          {snap.matchPhase === 'finisher_window' && (
            <div className="moksha-prompt-box">
              <span>
                {tandavLocalization.getCombatAlert('Moksha_Trigger', activeLocale)} (
                {snap.finisherWindowFramesLeft}f) — PRESS{' '}
                <strong>DOWN → BACK → FORWARD + CIRCLE [L]</strong>
              </span>
              <button
                type="button"
                className="moksha-exec-btn"
                onClick={() => engineRef.current?.triggerMokshaFinisher()}
              >
                {tandavLocalization.getCombatAlert('Moksha_Trigger', activeLocale)}
              </button>
            </div>
          )}
        </div>
      )}

      {/* 5-Second Victory Replay Studio Deck (TandavVictoryReplaySystem.cpp) */}
      {arenaMode === 'tandav_fighter' && snap && snap.matchPhase === 'victory_replay' && (
        <section className="victory-replay-bar" aria-label="5-Second Victory Replay Controls">
          <div className="replay-header-row">
            <div className="replay-badge-group">
              <span className="replay-rec-dot" />
              <span className="replay-title">
                VICTORY REPLAY BUFFER · LAST 5.00s ({snap.replayTotalFrames} FRAMES @ 60 FPS)
              </span>
              <span className="replay-sub">
                {snap.mokshaName || 'Moksha Finisher Sequence'}
              </span>
            </div>

            <div className="replay-camera-group">
              <button
                type="button"
                className={`replay-chip-btn ${snap.replayAutoDirector ? 'active' : ''}`}
                onClick={() => engineRef.current?.toggleReplayAutoDirector()}
                title="Cycle 3D camera angles automatically or use the top-bar camera presets / mouse orbit"
              >
                {snap.replayAutoDirector ? '3D Cam: Auto-Director' : '3D Cam: Manual / Orbit'}
              </button>
              <button
                type="button"
                className={`replay-chip-btn ${snap.showHitboxes ? 'active' : ''}`}
                onClick={() => engineRef.current?.toggleHitboxes()}
              >
                3D Hitboxes {snap.showHitboxes ? 'ON' : 'OFF'}
              </button>
              <button
                type="button"
                className="replay-exit-btn"
                onClick={() => engineRef.current?.exitVictoryReplayToMatchOver()}
              >
                Match Summary ✕
              </button>
            </div>
          </div>

          <div className="replay-scrubber-row">
            <div className="replay-transport-btns">
              <button
                type="button"
                className="replay-ctrl-btn"
                onClick={() => engineRef.current?.stepReplayFrame(-1)}
                title="Step Backward 1 Frame"
              >
                -1f
              </button>
              <button
                type="button"
                className="replay-ctrl-btn primary"
                onClick={() => engineRef.current?.toggleReplayPause()}
              >
                {snap.replayPaused ? '▶ Play' : '⏸ Pause'}
              </button>
              <button
                type="button"
                className="replay-ctrl-btn"
                onClick={() => engineRef.current?.stepReplayFrame(1)}
                title="Step Forward 1 Frame"
              >
                +1f
              </button>
            </div>

            <div className="replay-timeline-wrap">
              <input
                type="range"
                className="replay-range-slider"
                min={0}
                max={Math.max(1, snap.replayTotalFrames - 1)}
                value={snap.replayFrameIndex}
                onChange={(e) => engineRef.current?.seekReplayFrame(Number(e.target.value))}
                aria-label="Scrub 5-second Victory Replay timeline"
              />
              <div className="replay-time-readout">
                <span>
                  FRAME {snap.replayFrameIndex + 1} / {snap.replayTotalFrames}
                </span>
                <span>·</span>
                <span>
                  {(snap.replayFrameIndex / 60).toFixed(2)}s /{' '}
                  {(snap.replayTotalFrames / 60).toFixed(2)}s
                </span>
                <span>·</span>
                <span>
                  {snap.replayFrameIndex < 150
                    ? 'PRE-FINISHER COMBAT'
                    : 'MOKSHA FINISHER EXECUTION'}
                </span>
              </div>
            </div>

            <div className="replay-speed-btns">
              {([0.25, 0.5, 1] as const).map((spd) => (
                <button
                  key={spd}
                  type="button"
                  className={`replay-chip-btn ${snap.replaySpeed === spd ? 'active' : ''}`}
                  onClick={() => engineRef.current?.setReplaySpeed(spd)}
                >
                  {spd}x
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Act I: The Darkening (Pralaya Sandhyā) Cinematic Cutscene Overlay */}
      {activeCutsceneStep && (
        <div className="cutscene-letterbox-overlay" role="dialog" aria-label="Act I Intro Cutscene">
          <div className="cutscene-top-bar">
            <span className="cutscene-kicker">{activeCutsceneStep.title}</span>
            <div className="cutscene-actions">
              <button
                type="button"
                className="hud-btn"
                onClick={() => engineRef.current?.advanceCutsceneStep()}
              >
                Next Shot →
              </button>
              <button
                type="button"
                className="hud-btn primary"
                onClick={() => engineRef.current?.stopCutscene()}
              >
                Skip to Round 1 [Esc]
              </button>
            </div>
          </div>

          <div className="cutscene-bottom-bar">
            <div className="cutscene-speaker-tag">{activeCutsceneStep.speaker}</div>
            <p className="cutscene-dialogue-text">{activeCutsceneStep.dialogue}</p>
            <div className="cutscene-stage-dir">{activeCutsceneStep.stageDirection}</div>
          </div>
        </div>
      )}

      {/* Drawer 1: 60 FPS Frame Data & Ancient Martial Arts Matrix */}
      {activeDrawer === 'framedata' && (
        <div className="engine-modal-backdrop" onClick={() => setActiveDrawer('none')}>
          <div
            className="engine-modal-panel"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-label="Competitive Frame Data Matrix"
          >
            <div className="modal-header">
              <div>
                <h2 className="modal-title">
                  60 FPS Competitive Frame Data &amp; Martial Arts Matrix
                </h2>
                <p className="modal-subtitle">
                  Synchronized Tāla inputs on Damru downbeats (≤ 45ms) cut recovery frames and grant positive block advantage. Click any move to test it live in the 3D arena.
                </p>
              </div>
              <button
                type="button"
                className="hud-btn"
                onClick={() => setActiveDrawer('none')}
              >
                Close ✕
              </button>
            </div>

            <div className="modal-tabs">
              <button
                type="button"
                className={`tab-btn ${frameTab === 'bhairav' ? 'active' : ''}`}
                onClick={() => setFrameTab('bhairav')}
              >
                Bhairav — Silambam &amp; Kalaripayattu (12 Moves)
              </button>
              <button
                type="button"
                className={`tab-btn ${frameTab === 'andhakasura' ? 'active' : ''}`}
                onClick={() => setFrameTab('andhakasura')}
              >
                Andhakāsura — Thang-Ta &amp; Malla-Yuddha (8 Moves)
              </button>
              <button
                type="button"
                className={`tab-btn ${frameTab === 'martial_arts' ? 'active' : ''}`}
                onClick={() => setFrameTab('martial_arts')}
              >
                Ancient Indian Martial Arts Matrix
              </button>
            </div>

            {frameTab !== 'martial_arts' ? (
              <div className="frame-table-scroll">
                <table className="frame-data-table">
                  <thead>
                    <tr>
                      <th>Move Name</th>
                      <th>Stance</th>
                      <th>Input (Pad / Key)</th>
                      <th>Hit Level</th>
                      <th>S / A / R (60 FPS)</th>
                      <th>Std Block</th>
                      <th>Tāla Block</th>
                      <th>Damage</th>
                      <th>Properties &amp; Cancel Routes</th>
                      <th>Test Live</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(frameTab === 'bhairav' ? BHAIRAV_MOVES : ANDHAKASURA_MOVES).map((m) => {
                      const locMove = tandavLocalization.getMoveLocalization(
                        m.id,
                        m.name,
                        m.properties,
                        activeLocale
                      );
                      return (
                        <tr key={m.id}>
                          <td className="move-name-cell">{locMove.name}</td>
                          <td>
                            {m.stance === 'silambam_veechu'
                              ? 'Silambam'
                              : m.stance === 'kalaripayattu_puliyankam'
                                ? 'Kalaripayattu'
                                : 'Thang-Ta'}
                          </td>
                          <td className="mono-cell">
                            {m.inputLabel} [{m.keyboardHint}]
                          </td>
                          <td>{m.hitLevel}</td>
                          <td className="mono-cell">
                            {m.startupFrames} / {m.activeFrames} / {m.recoveryFrames}
                          </td>
                          <td className="mono-cell adv-minus">{m.onBlockStandard}</td>
                          <td className="mono-cell adv-plus">
                            {typeof m.onBlockTalaSynced === 'number' && m.onBlockTalaSynced > 0
                              ? `+${m.onBlockTalaSynced}`
                              : m.onBlockTalaSynced}
                          </td>
                          <td className="mono-cell">{m.baseDamage}</td>
                          <td className="props-cell">{locMove.description}</td>
                          <td>
                            <button
                              type="button"
                              className="table-action-btn"
                              onClick={() => {
                                engineRef.current?.setPlayerSide(m.character);
                                engineRef.current?.executeControlledMove(m.id);
                                setActiveDrawer('none');
                              }}
                            >
                              {tandavLocalization.getButtonString('Confirm_Lock', activeLocale)}
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="martial-arts-grid">
                {ANCIENT_MARTIAL_ARTS_MATRIX.map((art) => (
                  <div key={art.name} className="martial-art-card">
                    <div className="art-header">
                      <span className="art-title">{art.name}</span>
                      <span className="art-meta">
                        {art.region} · {art.fighter}
                      </span>
                    </div>
                    <p className="art-desc">{art.mechanicRole}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Drawer 2: Character Select, Modern Costume Architecture & Game Modes */}
      {activeDrawer === 'charselect' && (
        <div className="engine-modal-backdrop" onClick={() => setActiveDrawer('none')}>
          <div
            className="engine-modal-panel"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-label="Character Selection and Costume Architecture"
          >
            <div className="modal-header">
              <div>
                <h2 className="modal-title">
                  Fighter Selection &amp; Respectful Modern Tech-Wear Architecture
                </h2>
                <p className="modal-subtitle">
                  Designed for global competitive play with zero religious iconography—combining modern athletic composite materials, Disney Cloth Physics, and Warner Bros. Stencil Shading.
                </p>
              </div>
              <button
                type="button"
                className="hud-btn"
                onClick={() => setActiveDrawer('none')}
              >
                Close ✕
              </button>
            </div>

            <div className="char-select-grid">
              <div
                className={`char-card ${snap?.playerSide === 'bhairav' ? 'selected-cyan' : ''}`}
              >
                <div className="char-card-header">
                  <h3 className="char-title">BHAIRAV — THE VESSEL OF ANANDA</h3>
                  <span className="char-variant">Modern Ascetic Tech-Wrap Variant</span>
                </div>
                <ul className="char-spec-list">
                  <li>
                    <strong>Stances:</strong> Silambam Staff (Veechu Nilai) ↔ Kalaripayattu Sword &amp; Shield (Puliyankam) in 6f / 2f Tāla-Synced.
                  </li>
                  <li>
                    <strong>Costume Architecture:</strong> Stealth-indigo matte microfiber undersuit, asymmetrical utility canvas wraps, geometric carbon-fiber forearm cuffs, and neon-blue kinetic combo piping.
                  </li>
                  <li>
                    <strong>Special Trait [Varma Kalai Prāṇa Bind]:</strong> Two-finger pressure terminal strike freezes opponent Tandav gauge gain for 4.0 seconds.
                  </li>
                  <li>
                    <strong>Moksha Finisher:</strong> Cosmic Dissolution (Light Trishul &amp; Stardust Shatter in IMAX 1.43:1).
                  </li>
                </ul>
                <button
                  type="button"
                  className="hud-btn primary"
                  onClick={() => {
                    setArenaMode('tandav_fighter');
                    engineRef.current?.setPlayerSide('bhairav');
                    setActiveDrawer('none');
                  }}
                >
                  {tandavLocalization.getButtonString('Select_Character', activeLocale)} —{' '}
                  {tandavLocalization.getFighterLocalization('bhairav', activeLocale).name}
                </button>
              </div>

              <div
                className={`char-card ${snap?.playerSide === 'andhakasura' ? 'selected-crimson' : ''}`}
              >
                <div className="char-card-header">
                  <h3 className="char-title crimson-text">
                    ANDHAKĀSURA — THE KING OF DARKNESS
                  </h3>
                  <span className="char-variant">Modern Sovereign Titanium Exoskeleton Variant</span>
                </div>
                <ul className="char-spec-list">
                  <li>
                    <strong>Stances:</strong> Thang-Ta Dual Curved Steel Blades, Vallari Iron Boomerang (40f return), and Malla-Yuddha Command Grabs.
                  </li>
                  <li>
                    <strong>Costume Architecture:</strong> Crimson-maroon ballistic weave base, multi-layered angular titanium chest/shoulder plates, and tactical steel jaw-guard with horizontal vents.
                  </li>
                  <li>
                    <strong>Special Trait [Rakta-Bīja Replication]:</strong> Heavy hits (&ge; 15 dmg) bleed shadow fluid, spawning up to 3 cel-shaded Shadow Clones that root Bhairav’s legs for 45 frames.
                  </li>
                  <li>
                    <strong>Moksha Finisher:</strong> The Pralaya Forge (Twin Blade Pin &amp; Geothermal Beam Petrification).
                  </li>
                </ul>
                <button
                  type="button"
                  className="hud-btn primary"
                  onClick={() => {
                    setArenaMode('tandav_fighter');
                    engineRef.current?.setPlayerSide('andhakasura');
                    setActiveDrawer('none');
                  }}
                >
                  {tandavLocalization.getButtonString('Select_Character', activeLocale)} —{' '}
                  {tandavLocalization.getFighterLocalization('andhakasura', activeLocale).name}
                </button>
              </div>
            </div>

            <div className="mode-selector-bar">
              <div className="mode-group">
                <span className="mode-group-label">
                  {tandavLocalization.getMenuString('MainMenu_Title', activeLocale)}:
                </span>
                <button
                  type="button"
                  className={`hud-btn ${
                    arenaMode === 'tandav_fighter' && snap?.gameMode === 'vs_ai' ? 'active' : ''
                  }`}
                  onClick={() => {
                    setArenaMode('tandav_fighter');
                    engineRef.current?.setGameMode('vs_ai');
                  }}
                >
                  {tandavLocalization.getMenuString('Mode_Versus', activeLocale)} (AI)
                </button>
                <button
                  type="button"
                  className={`hud-btn ${
                    arenaMode === 'tandav_fighter' && snap?.gameMode === 'local_2p' ? 'active' : ''
                  }`}
                  onClick={() => {
                    setArenaMode('tandav_fighter');
                    engineRef.current?.setGameMode('local_2p');
                  }}
                >
                  {tandavLocalization.getMenuString('Mode_Versus', activeLocale)} (2P)
                </button>
                <button
                  type="button"
                  className={`hud-btn ${
                    arenaMode === 'tandav_fighter' && snap?.gameMode === 'practice_lab'
                      ? 'active'
                      : ''
                  }`}
                  onClick={() => {
                    setArenaMode('tandav_fighter');
                    engineRef.current?.setGameMode('practice_lab');
                  }}
                >
                  {tandavLocalization.getMenuString('Mode_Practice', activeLocale)}
                </button>
                <button
                  type="button"
                  className="hud-btn"
                  onClick={() => {
                    setArenaMode('tandav_fighter');
                    engineRef.current?.startActOneCutscene();
                    setActiveDrawer('none');
                  }}
                >
                  {tandavLocalization.getMenuString('Mode_Story', activeLocale)}
                </button>
                <button
                  type="button"
                  className={`hud-btn ${arenaMode === 'sanctum_chess' ? 'active' : ''}`}
                  onClick={() => {
                    setArenaMode('sanctum_chess');
                    setActiveDrawer('none');
                  }}
                >
                  Sanctum 3D Tactical Board Mode
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Drawer 3: Studio APIs & UE5 C++ / Python Blueprint Source Code */}
      {activeDrawer === 'blueprint' && (
        <div className="engine-modal-backdrop" onClick={() => setActiveDrawer('none')}>
          <div
            className="engine-modal-panel"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-label="UE5 C++ and Hollywood Studio API Pipeline"
          >
            <div className="modal-header">
              <div>
                <h2 className="modal-title">
                  Hollywood-AAA Studio API Pipeline &amp; UE5 C++ Source Architecture
                </h2>
                <p className="modal-subtitle">
                  Toggle live 3D viewport rendering passes below or inspect the C++ / Python source modules from the technical specification.
                </p>
              </div>
              <button
                type="button"
                className="hud-btn"
                onClick={() => setActiveDrawer('none')}
              >
                Close ✕
              </button>
            </div>

            {/* Live Studio Pipeline Toggles */}
            <div className="studio-api-toggle-strip">
              <button
                type="button"
                className={`hud-btn ${snap?.aspectRatio === '1.43:1' ? 'active' : ''}`}
                onClick={() =>
                  engineRef.current?.setAspectRatio(
                    snap?.aspectRatio === '1.43:1' ? '16:9' : '1.43:1'
                  )
                }
              >
                IMAX Camera API (1.43:1): {snap?.aspectRatio === '1.43:1' ? 'ACTIVE' : '16:9'}
              </button>
              <button
                type="button"
                className={`hud-btn ${snap?.disneyPhysicsEnabled ? 'active' : ''}`}
                onClick={() => engineRef.current?.toggleStudioApi('disney')}
              >
                Disney Cloth &amp; Bhasma API: {snap?.disneyPhysicsEnabled ? 'ON' : 'OFF'}
              </button>
              <button
                type="button"
                className={`hud-btn ${snap?.wbCelStencilEnabled ? 'active' : ''}`}
                onClick={() => engineRef.current?.toggleStudioApi('wb')}
              >
                Warner Bros. Cel-Stencil API: {snap?.wbCelStencilEnabled ? 'ON' : 'OFF'}
              </button>
              <button
                type="button"
                className={`hud-btn ${snap?.dolbyVisionHdrEnabled ? 'active' : ''}`}
                onClick={() => engineRef.current?.toggleStudioApi('hdr')}
              >
                Netflix / MGM Dolby Vision HDR: {snap?.dolbyVisionHdrEnabled ? 'ON' : 'OFF'}
              </button>
              <button
                type="button"
                className={`hud-btn ${snap?.showHitboxes ? 'active' : ''}`}
                onClick={() => engineRef.current?.toggleHitboxes()}
              >
                3D Hitbox / Hurtbox Volumes: {snap?.showHitboxes ? 'VISIBLE' : 'HIDDEN'}
              </button>
            </div>

            {/* Live TandavLocalizationMatrix (en-IN / hi-IN / or-IN) & Engineering Alert Diagnostic Strip */}
            <div className="studio-api-toggle-strip">
              {tandavLocalization.getSupportedLocales().map((loc) => (
                <button
                  key={loc.code}
                  type="button"
                  className={`hud-btn ${activeLocale === loc.code ? 'active' : ''}`}
                  onClick={() => handleSelectLocale(loc.code)}
                >
                  FText Locale [{loc.code}]: {loc.nativeLabel}
                </button>
              ))}
              <button
                type="button"
                className="hud-btn"
                onClick={() => {
                  engineRef.current?.triggerEngineeringAlertDemo('Buffer_Overflow');
                }}
              >
                Test Alert: Buffer_Overflow
              </button>
              <button
                type="button"
                className="hud-btn"
                onClick={() => {
                  engineRef.current?.triggerEngineeringAlertDemo('Mocap_Sync_Error');
                }}
              >
                Test Alert: Mocap_Sync_Error
              </button>
              <button
                type="button"
                className="hud-btn"
                onClick={() => {
                  engineRef.current?.triggerEngineeringAlertDemo('Api_Initialization_Fail');
                }}
              >
                Test Alert: Api_Initialization_Fail
              </button>
            </div>

            <div className="blueprint-viewer-layout">
              <div className="blueprint-file-list">
                {ENGINE_BLUEPRINT_FILES.map((file) => (
                  <button
                    key={file.id}
                    type="button"
                    className={`blueprint-file-btn ${
                      selectedBlueprintId === file.id ? 'active' : ''
                    }`}
                    onClick={() => setSelectedBlueprintId(file.id)}
                  >
                    <span className="file-name">{file.filename}</span>
                    <span className="file-sub">{file.subsystem}</span>
                  </button>
                ))}
              </div>

              <div className="blueprint-code-pane">
                <div className="code-pane-header">
                  <div>
                    <strong className="code-title">{currentBlueprint.filename}</strong>
                    <span className="code-summary"> — {currentBlueprint.summary}</span>
                  </div>
                  <button
                    type="button"
                    className="hud-btn"
                    onClick={() =>
                      handleCopyBlueprint(currentBlueprint.id, currentBlueprint.code)
                    }
                  >
                    {copiedCodeId === currentBlueprint.id ? 'Copied!' : 'Copy Source'}
                  </button>
                </div>
                <pre className="code-block">
                  <code>{currentBlueprint.code}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Drawer 4: Match History Log (Last 5 Matches Round-by-Round Telemetry & Tāla Accuracy) */}
      {activeDrawer === 'matchhistory' && snap && (
        <div className="engine-modal-backdrop" onClick={() => setActiveDrawer('none')}>
          <div
            className="engine-modal-panel"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-label="Match History Log — Last 5 Matches Telemetry"
          >
            <div className="modal-header">
              <div>
                <h2 className="modal-title">
                  Match History Log — Last 5 Matches Round-by-Round Telemetry
                </h2>
                <p className="modal-subtitle">
                  TandavStateManager.cpp &amp; TandavLogParser.py: Rolling 5-match tournament archive tracking Winner, Total Combos, Tāla Sync Accuracy (%), 8-Bit UDP Bitmask, and P2P Rollback metrics.
                </p>
              </div>
              <div className="history-header-actions">
                <button
                  type="button"
                  className="hud-btn primary"
                  onClick={() => {
                    engineRef.current?.recordLiveMatchSnapshotToHistory();
                    if (snap.matchHistoryLogs[0]) {
                      setSelectedMatchId(snap.matchHistoryLogs[0].matchId);
                    }
                  }}
                  title="Snapshot current arena telemetry and append as the latest match in the 5-match rolling log"
                >
                  + Log Current Match Snapshot
                </button>
                <button
                  type="button"
                  className="hud-btn"
                  onClick={() => setActiveDrawer('none')}
                >
                  Close ✕
                </button>
              </div>
            </div>

            {/* Aggregate 5-Match Telemetry KPI Strip */}
            {(() => {
              const logs = snap.matchHistoryLogs || [];
              const activeMatch =
                logs.find((m) => m.matchId === selectedMatchId) || logs[0];
              const totalCombosAll5 = logs.reduce((acc, m) => acc + m.totalCombos, 0);
              const avgSyncAll5 = Math.round(
                logs.reduce((acc, m) => acc + m.overallTalaSyncPct, 0) /
                  Math.max(1, logs.length)
              );
              const avgDeltaAll5 = (
                logs.reduce((acc, m) => acc + m.avgBeatDeltaMs, 0) /
                Math.max(1, logs.length)
              ).toFixed(1);
              const bhairavWins = logs.filter((m) => m.winnerId === 'bhairav').length;
              const andhakasuraWins = logs.length - bhairavWins;

              const schemaJsonPayload = activeMatch
                ? JSON.stringify(
                    {
                      LogMetadata: {
                        TesterProfileID: activeMatch.testerProfileId,
                        MatchID: activeMatch.matchId,
                        EngineVersion: 'UE5_C++20_V1.0',
                        FrameCountDelta: snap.logicalFrame,
                        ExecutionTimestamp: activeMatch.timestampIso
                      },
                      InputTelemetry: {
                        ControllerPollingRateHz: 1000,
                        ActiveInputBitmask:
                          activeMatch.rounds[activeMatch.rounds.length - 1]
                            ?.activeInputBitmask || '0x45',
                        TalaSyncAccuracyMS: activeMatch.avgBeatDeltaMs,
                        OverallTalaSyncRatePct: activeMatch.overallTalaSyncPct,
                        TotalMatchCombos: activeMatch.totalCombos
                      },
                      PhysicsCollisionData: {
                        ActiveStanceState:
                          activeMatch.winnerId === 'bhairav'
                            ? 'Silambam_Veechu'
                            : 'Kalaripayattu_Puliyankam',
                        BoxExtentX: 144.0,
                        BoxExtentY: 18.0,
                        DoubleHitBlocked: true
                      },
                      NetworkRollbackMetrics: {
                        P2PClockDriftMS: activeMatch.p2pClockDriftMs,
                        RollbackExecutedFrames: activeMatch.rollbackRecoveredFrames,
                        DesyncTriggered: false,
                        AuditTrailBucket: activeMatch.auditCategory
                      }
                    },
                    null,
                    2
                  )
                : '{}';

              return (
                <>
                  <div className="history-kpi-strip">
                    <div className="history-kpi-card">
                      <span className="kpi-label">ROLLING BUFFER CAPACITY</span>
                      <strong className="kpi-val cyan">{logs.length} / 5 Matches</strong>
                    </div>
                    <div className="history-kpi-card">
                      <span className="kpi-label">5-MATCH WIN SPLIT</span>
                      <strong className="kpi-val">
                        Bhairav {bhairavWins} — {andhakasuraWins} Andhakāsura
                      </strong>
                    </div>
                    <div className="history-kpi-card">
                      <span className="kpi-label">TOTAL COMBOS (LAST 5)</span>
                      <strong className="kpi-val gold">{totalCombosAll5} Combos</strong>
                    </div>
                    <div className="history-kpi-card">
                      <span className="kpi-label">AVG TĀLA SYNC ACCURACY</span>
                      <strong className="kpi-val emerald">
                        {avgSyncAll5}% (Δ {avgDeltaAll5}ms)
                      </strong>
                    </div>
                  </div>

                  {/* 5-Match Selector Tabs */}
                  <div className="history-match-tabs">
                    {logs.map((m, idx) => (
                      <button
                        key={m.matchId}
                        type="button"
                        className={`history-match-tab ${
                          activeMatch?.matchId === m.matchId ? 'active' : ''
                        } ${m.winnerId === 'bhairav' ? 'winner-cyan' : 'winner-crimson'}`}
                        onClick={() => setSelectedMatchId(m.matchId)}
                      >
                        <div className="match-tab-top">
                          <span className="match-id-tag">
                            #{idx + 1} · {m.matchId}
                          </span>
                          <span className="match-score-pill">{m.finalScore}</span>
                        </div>
                        <div className="match-tab-winner">
                          Winner: <strong>{m.winnerName}</strong>
                        </div>
                        <div className="match-tab-meta">
                          <span>{m.totalCombos} Combos</span>
                          <span>·</span>
                          <span>{m.overallTalaSyncPct}% Tāla Sync</span>
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* Selected Match Round-by-Round Telemetry Breakdown */}
                  {activeMatch && (
                    <div className="history-detail-grid">
                      <div className="history-rounds-pane">
                        <div className="pane-subheader">
                          <div>
                            <strong>
                              {activeMatch.matchId} — Round-by-Round Telemetry Breakdown
                            </strong>
                            <span className="pane-sub-meta">
                              {' '}
                              · Finisher: {activeMatch.mokshaName} · Audit Bucket:{' '}
                              <code>{activeMatch.auditCategory}</code>
                            </span>
                          </div>
                          <span className="tester-badge">
                            {activeMatch.testerProfileId} · 1000Hz Polling
                          </span>
                        </div>

                        <div className="frame-table-scroll">
                          <table className="frame-data-table">
                            <thead>
                              <tr>
                                <th>Round</th>
                                <th>Round Winner</th>
                                <th>Total Combos</th>
                                <th>Max Chain</th>
                                <th>Tāla Sync %</th>
                                <th>Perfect / Great / Off</th>
                                <th>Avg Beat Δ</th>
                                <th>Ending Judgement</th>
                                <th>UDP Bitmask</th>
                                <th>Duration</th>
                              </tr>
                            </thead>
                            <tbody>
                              {activeMatch.rounds.map((r) => (
                                <tr key={r.roundNumber}>
                                  <td className="mono-cell">R{r.roundNumber}</td>
                                  <td
                                    className={`move-name-cell ${
                                      r.winnerId === 'bhairav' ? 'adv-plus' : 'adv-minus'
                                    }`}
                                  >
                                    {r.winnerName}{' '}
                                    {r.viaMoksha && (
                                      <span className="moksha-mini-tag">MOKSHA</span>
                                    )}
                                  </td>
                                  <td className="mono-cell">{r.totalCombos}</td>
                                  <td className="mono-cell">{r.maxComboChain}-Hit</td>
                                  <td className="mono-cell adv-plus">
                                    <strong>{r.talaSyncRatePct}%</strong>
                                  </td>
                                  <td className="mono-cell">
                                    {r.talaPerfectCount}P / {r.talaGreatCount}G /{' '}
                                    {r.offBeatCount}O
                                  </td>
                                  <td className="mono-cell">Δ {r.avgBeatDeltaMs}ms</td>
                                  <td className="mono-cell">{r.endingAccuracy}</td>
                                  <td className="mono-cell">
                                    <code>{r.activeInputBitmask}</code>
                                    {r.rollbackFrames > 0
                                      ? ` (${r.rollbackFrames}f RB)`
                                      : ''}
                                  </td>
                                  <td className="mono-cell">{r.durationSec}s</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>

                      {/* Validated tester_log_schema.json Telemetry Packet Export */}
                      <div className="history-json-pane">
                        <div className="code-pane-header">
                          <div>
                            <strong className="code-title">
                              tester_log_schema.json Audit Packet
                            </strong>
                            <span className="code-summary">
                              {' '}
                              — Validated by TandavTelemetryLogParser
                            </span>
                          </div>
                          <button
                            type="button"
                            className="hud-btn"
                            onClick={() =>
                              handleCopyBlueprint(activeMatch.matchId, schemaJsonPayload)
                            }
                          >
                            {copiedCodeId === activeMatch.matchId
                              ? 'Copied JSON!'
                              : 'Copy JSON Log'}
                          </button>
                        </div>
                        <pre className="code-block history-json-pre">
                          <code>{schemaJsonPayload}</code>
                        </pre>
                      </div>
                    </div>
                  )}
                </>
              );
            })()}
          </div>
        </div>
      )}

      {/* Unified Collapsible Bottom Control Dock (Zero Viewport Occlusion) */}
      <footer id="hud-bottom" className={dockCollapsed ? 'dock-collapsed' : ''}>
        <div className="dock-collapse-handle-row">
          <button
            type="button"
            className="dock-collapse-btn"
            onClick={() => setDockCollapsed((prev) => !prev)}
          >
            {dockCollapsed
              ? '▴ Expand Combat Deck & Studio Controls'
              : '▾ Collapse Combat Deck (Cinema View)'}
          </button>
        </div>

        {!dockCollapsed && arenaMode === 'tandav_fighter' && snap && (
          <div className="tandav-bottom-dock">
            {/* Row 1: Instant Martial Arts Move & Special Triggers */}
            <div className="dock-moves-row">
              <span className="dock-section-tag">
                {snap.playerSide === 'bhairav' ? 'BHAIRAV MOVES:' : 'ANDHAKĀSURA MOVES:'}
              </span>
              {controlledMoves.slice(0, 6).map((move) => {
                const locMove = tandavLocalization.getMoveLocalization(
                  move.id,
                  move.name,
                  move.properties,
                  activeLocale
                );
                return (
                  <button
                    key={move.id}
                    type="button"
                    className={`dock-move-btn ${move.isSpecial ? 'special' : ''}`}
                    title={`${locMove.name} (${move.inputLabel}) — ${locMove.description}`}
                    onClick={() => engineRef.current?.executeControlledMove(move.id)}
                  >
                    <span className="move-btn-name">{locMove.name}</span>
                    <span className="move-btn-key">[{move.keyboardHint}]</span>
                  </button>
                );
              })}

              <button
                type="button"
                className="dock-move-btn special"
                title="BhairavParryEngine.cpp: Execute Perfect Nataraja Deflection (15f Global Freeze, +18f Stagger Lock, +30 Gauge, 0 DMG)"
                onClick={() => engineRef.current?.triggerNatarajaParryDemo()}
              >
                <span className="move-btn-name">Nataraja Parry</span>
                <span className="move-btn-key">[15f Freeze]</span>
              </button>

              <button
                type="button"
                className="dock-move-btn clone-btn"
                title="AndhakasuraGrabEngine.cpp: Execute Unblockable Malla-Yudha Command Grab (65f Socket_LeftHand_GrabAnchor Lock)"
                onClick={() => engineRef.current?.triggerMallaYudhaGrabDemo()}
              >
                <span className="move-btn-name">Malla-Yudha Grab</span>
                <span className="move-btn-key">[65f Lock]</span>
              </button>

              <button
                type="button"
                className="dock-move-btn clone-btn"
                title="Test Rakta-Bīja Shadow Clone Replication (45f Leg-Lock Root)"
                onClick={() => engineRef.current?.spawnRaktaBijaShadowClone(true)}
              >
                <span className="move-btn-name">Rakta-Bīja Clone</span>
                <span className="move-btn-key">[3f Max]</span>
              </button>

              <button
                type="button"
                className="dock-move-btn hazard-btn"
                title="Trigger Mount Kailash Glacial Fissure Stage Interaction [Key: E]"
                onClick={() => engineRef.current?.triggerGlacialFissureHazard()}
              >
                <span className="move-btn-name">Glacial Fissure</span>
                <span className="move-btn-key">[E]</span>
              </button>

              <button
                type="button"
                className="dock-move-btn hazard-btn"
                title="Trigger Round 3 Mount Kailash Avalanche Shockwave & High Gravity"
                onClick={() => engineRef.current?.triggerRound3AvalancheDemo()}
              >
                <span className="move-btn-name">R3 Avalanche</span>
                <span className="move-btn-key">[Stage]</span>
              </button>

              <button
                type="button"
                className="dock-move-btn moksha-btn"
                title="Execute Moksha Finisher Fatality in Native IMAX 1.43:1 & Record 5s Victory Replay"
                onClick={() => engineRef.current?.triggerMokshaFinisher()}
              >
                <span className="move-btn-name">Moksha Finisher</span>
                <span className="move-btn-key">[IMAX 1.43:1]</span>
              </button>

              {snap.victoryReplayAvailable && (
                <button
                  type="button"
                  className={`dock-move-btn replay-dock-btn ${
                    snap.matchPhase === 'victory_replay' ? 'active' : ''
                  }`}
                  title="Launch 5-Second (300-Frame) 3D Camera Victory Replay"
                  onClick={() => engineRef.current?.startVictoryReplay()}
                >
                  <span className="move-btn-name">5s Victory Replay</span>
                  <span className="move-btn-key">[300f Cam]</span>
                </button>
              )}
            </div>

            {/* Row 2: Controls Hint, 12-Frame Rolling Input Buffer & Studio Pipeline Toggles */}
            <div className="dock-meta-row">
              <div className="hint-pill" id="controls-hint">
                <strong>Controls:</strong> A/D: Move · W: Jump · J: Light (Sq) · I: Heavy (Tri) ·
                L: Weapon/Split (Cir) · K: Nataraja Parry (R1) · U: Stance/Grab · O: Varma/Vallari
                · E: Ice Hazard · Space: Pralaya
              </div>

              <div className="captured-pill" id="captured-tray">
                <span className="buffer-label">12f Input Buffer:</span>
                {snap.inputBuffer.length === 0 ? (
                  <span className="buffer-empty">Awaiting Input on Damru Beat...</span>
                ) : (
                  snap.inputBuffer.map((pkt) => (
                    <span
                      key={pkt.id}
                      className={`buffer-token ${pkt.bIsBeatMatched ? 'beat-synced' : ''}`}
                    >
                      {pkt.button.replace('Face_', '').replace('Dpad_', '')}
                    </span>
                  ))
                )}
              </div>

              <div className="studio-quick-pills">
                <button
                  type="button"
                  className={`mini-toggle-btn ${snap.showHitboxes ? 'active' : ''}`}
                  onClick={() => engineRef.current?.toggleHitboxes()}
                >
                  Hitboxes
                </button>
                <button
                  type="button"
                  className={`mini-toggle-btn ${snap.aspectRatio === '1.43:1' ? 'active' : ''}`}
                  onClick={() =>
                    engineRef.current?.setAspectRatio(
                      snap.aspectRatio === '1.43:1' ? '16:9' : '1.43:1'
                    )
                  }
                >
                  IMAX 1.43:1
                </button>
              </div>
            </div>
          </div>
        )}
      </footer>

      {/* Match / Checkmate Summary Overlay (Preserves IDs for compatibility) */}
      <div
        id="checkmate-overlay"
        className={snap?.matchPhase === 'ko_over' ? 'visible' : ''}
        role="status"
        aria-live="polite"
      >
        <div className="checkmate-banner">
          <div className="checkmate-ornament">TĀṆḌAVA: THE RHYTHM OF WRATH</div>
          <div className="checkmate-crown" id="checkmate-crown">
            ⋈
          </div>
          <div className="checkmate-title" id="checkmate-title">
            {snap?.mokshaWinner === 'bhairav'
              ? 'Bhairav Triumphs'
              : 'Andhakāsura Triumphs'}
          </div>
          <div className="checkmate-rule"></div>
          <div className="checkmate-subtitle" id="checkmate-subtitle">
            {snap?.mokshaName || 'Cosmic Equilibrium Restored on Mount Kailash'}
          </div>
          <div className="checkmate-actions">
            <button
              type="button"
              className="checkmate-btn"
              id="btn-checkmate-replay"
              onClick={() => engineRef.current?.startVictoryReplay()}
            >
              Watch 5s Victory Replay
            </button>
            <button
              type="button"
              className="checkmate-btn"
              onClick={() => engineRef.current?.triggerMokshaFinisher(snap?.mokshaWinner || 'bhairav')}
            >
              Re-Trigger Moksha Finisher
            </button>
            <button
              type="button"
              className="checkmate-btn"
              id="btn-checkmate-newgame"
              onClick={() => engineRef.current?.resetMatch()}
            >
              New Match
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

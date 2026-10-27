# Tāṇḍava: The Rhythm of Wrath — 3D Rhythmic Combat & Sanctum Arena

An interactive 3D rhythmic martial arts fighting game and tactical combat experience inspired by ancient Indian martial arts (*Kalaripayattu*, *Silambam*, *Thang-Ta*, *Varma Kalai*, *Malla-Yuddha*) and cosmic *Damru* / *Mridangam* percussion cycles, pitting **Bhairav (The Vessel of Ananda)** against **Andhakāsura (The King of Darkness)** atop the reflective Black Ice fracture zone of Mount Kailash.

## User Review & Critical Decisions

> [!IMPORTANT]
> Because the clarifying questions were skipped, this plan adopts the recommended defaults so you get the complete, playable 3D competitive fighting experience alongside a seamless bridge to the pre-designed 3D Sanctum tactical board:

- **Confirmed Default 1 — Dual Playable Modes (Pure 3D 1v1 Rhythmic Fighter + Tactical Sanctum Clash)**: Launches directly into **Tāṇḍava 1v1 Rhythmic Arena** (60 FPS real-time fighting game with AI, 2-Player Local, and Frame-Data Practice Lab), while also letting players switch to **Sanctum Tactical Mode** where tactical board captures trigger live 3D *Tāṇḍava* rhythmic combat duels.
- **Confirmed Default 2 — Full Combat, Audio & Studio Pipeline Features**: Includes the Web Audio synthesized *Damru* & *Mridangam* *Tāla* beat engine, live 60 FPS Startup/Active/Recovery frame telemetry HUD, 12-frame rolling input command buffer, *Act I: The Darkening* cinematic intro cutscene, and dynamic IMAX 1.43:1 aspect-ratio transitions during *Pralaya* and *Moksha Finishers*.
- **Confirmed Default 3 — Respectful Modern Tech-Wear Character Design**: Strictly honors sacred traditions by avoiding religious iconography or deity depictions, dressing **Bhairav** in a stealth-indigo tactical compression undersuit with carbon-fiber forearm cuffs and neon-blue kinetic piping, and **Andhakāsura** in angular titanium exoskeleton plates with a tactical steel jaw-guard and dual magnetic-holstered *Thang-Ta* blades.

---

## 1. Overview & Core Concept

- **What It Does**: Delivers a real-time 60 FPS 3D fighting game where attacks, stance morphs, parries, and *Moksha Finishers* are synchronized to a live *Damru* and *Mridangam* percussion track (*The Tāla System*). Striking on the downbeat ($\le 45\text{ms}$ *Tāla Perfect*) or half-beat ($\le 90\text{ms}$ *Tāla Great*) dynamically alters frame data—cutting recovery frames, expanding hit-stun, bypassing 50% block mitigation with guard-crush frames, and charging the *Tāṇḍava Gauge*.
- **Target Audience / Persona**: Competitive fighting game players, technical game directors, and AAA studio portfolio reviewers looking for an authentic, mechanically rigorous vertical slice of Indian martial arts combat with real-time frame telemetry and studio rendering modes.
- **Key Value**: Proves out the complete *Tāṇḍava* GDD in a live, playable 3D viewport—combining a 12-frame rolling input buffer, exact 60 FPS frame data tables (*Veechu Nilai* Silambam/Kalaripayattu and *Pacing Force* Thang-Ta), *Rakta-Bīja* shadow clone spawning, environmental stage hazards, and dynamic studio rendering presets (IMAX 1.43:1 aspect ratio, Disney cloth/ash particle physics, Warner Bros. kinetic cel-shaded stencil outlines, and Dolby Vision HDR tone-mapping).

---

## 2. User Experience & Visual Design

### Key User Flows

1. **Character Select & Pipeline Studio View (`TandavCharSelectUI`)**:
   - Players inspect the 3D articulated models of **Bhairav** (Modern Ascetic Tech-Wrap) and **Andhakāsura** (Modern Sovereign Titanium Exoskeleton) with live *Tāla* pulse visualization at the bottom of the screen.
   - Players choose between **1v1 Arcade vs. AI**, **2P Local Versus**, **Frame-Data & Hitbox Practice Lab**, or **Tactical Sanctum Hybrid Mode**, and can trigger **Act I: The Darkening** intro cutscene at any time.
2. **Act I: The Darkening Cinematic Intro (`Pralaya Sandhyā`)**:
   - Framed in native IMAX `1.43:1` aspect ratio with automated camera choreography across the crystalline ice spires and molten red fissures of Mount Kailash, complete with synchronized dialogue subtitles and Web Audio *Damru* & *Mridangam* resonance before expanding smoothly to the 60 FPS combat camera (`"ROUND 1... ARAMBHAM!"`).
3. **Live 60 FPS Rhythmic Combat & HUD (`TandavCombatHUD`)**:
   - **Top Combat Bar**: P1 (Bhairav) and P2 (Andhakāsura) health bars, round win counters, match timer, and central **Damru Metasounds Beat Core** with converging rhythm rings showing exact downbeat and half-beat windows.
   - **Tāṇḍava Gauge & Frame Data Telemetry**: Dual *Tāṇḍava Meters* (0–100%) directly beneath the health bars, plus live competitive frame telemetry (`FRAME: S:7 A:2 R:11 | ADV: +2 TĀLA PERFECT`) and real-time input history buffer display on the flanks.
   - **Stance Morphing & Special Mechanics**:
     - **Bhairav** morphs his *Silambam* bamboo-alloy staff into dual *Kalaripayattu* sword-and-shield (*Urumi Split*, 6 frames standard / 2 frames on *Tāla* downbeat) and executes *Prāṇa Bind* (*Varma Kalai* finger strike) to freeze the opponent's meter gain for 4 seconds.
     - **Andhakāsura** unleashes *Chakra Slash*, *Pralaya Cleave*, out-of-bounds *Vallari Loop* iron boomerangs (returning from behind after 40 frames), *Asura Clasp* command grabs, and automatic *Rakta-Bīja* Shadow Clones that spawn behind the attacker on heavy hits ($\ge 15$ damage) to apply a 45-frame leg-lock root.
4. **Mount Kailash Environmental Hazards & Round 3 Escalation**:
   - **Glacial Fissure Plunge**: Pressing Stage Interact (`E`) near the arena rim on a downbeat shatters the black-ice edge, tripping grounded opponents in the fracture zone.
   - **Round 3 Avalanche Kinetic Shockwave**: Transitions the aurora sky from midnight indigo to violent violet-crimson and triggers a 15-frame avalanche screen tremor with increased airborne gravity.
5. **Moksha Finisher State Machine (`Finish Him / Moksha Window`)**:
   - Dropping an opponent's health to `0%` opens a 300-frame (5-second) *Moksha Finisher Window*. Inputting `Down → Back → Forward + Weapon (Circle/L)` on the *Damru* downbeat shifts the viewport to IMAX `1.43:1`, darkens the arena into a cosmic nebula or volcanic forge, and executes **Cosmic Dissolution** (Trishul of light + blue stardust shatter) or **The Pralaya Forge** (twin Thang-Ta blade pin + geothermal third-eye petrification shatter).

### Visual Identity & Theme

- **Aesthetic Direction**: High-contrast dark obsidian and glacial midnight indigo (`#060913`) paired with bioluminescent cyan-blue (`#00D2FF`) for Bhairav's *Ananda* kinetic conduits, molten crimson-amber (`#EF4444` / `#F59E0B`) for Andhakāsura's *Rudra* fissures, and brushed gold (`#D4AF37`) for *Tāla* Perfect beat lock indicators.
- **Typography & Hierarchy**:
  - *Display / Combat Headers*: `Chakra Petch` / `Barlow Condensed` for sharp, high-impact round callouts, character titles, and *Tāla* judgement banners (`TĀLA PERFECT`, `NATARAJA PARRY`, `PRALAYA ACTIVATED`).
  - *UI & Move List Prose*: `Plus Jakarta Sans` for clean, legible move list drawers, cinematic subtitles, and control docks.
  - *Frame Telemetry & Input Buffer*: `JetBrains Mono` with `tabular-nums` for zero-jitter 60 FPS startup/active/recovery frame counters (`S:07 A:02 R:11`) and millisecond beat deltas (`Δ 18ms`).
- **Ergonomic Viewport Layout**:
  - Keeps the central 3D Mount Kailash Black Ice arena 100% unobstructed.
  - Top HUD houses health bars, *Tāṇḍava* gauges, and the central *Damru* beat ring.
  - A collapsible bottom control dock (`Hide UI [H]`) provides instant access to **Move List & Frame Data Matrix**, **Studio API Pipeline Toggles** (IMAX `1.43:1` / `1.90:1` / `16:9`, Warner Bros. Cel-Stencil Overlay, Disney Bhasma/Cloth Particle Turbulence, Dolby Vision HDR Contrast, Hitbox Volume Visualizer), **Camera Presets**, and **Quick Finisher / Cutscene Triggers**.

---

## 3. Key Product Decisions & Trade-Offs

- **Decision 1 — Real-Time 60 FPS Deterministic Frame Engine in Three.js**:
  - *Chosen Approach*: Build a dedicated 60 FPS fixed-timestep combat state machine (`16.67ms` logical frames) driving procedural multi-part articulated 3D character rigs (`THREE.Group` skeletal hierarchies with 10+ distinct armor, cloth-wrap, and morphing weapon parts per fighter).
  - *Why*: Ensures frame data tables (`Startup / Active / Recovery / On-Block Advantage`) and the 12-frame rolling input buffer behave like an authentic fighting game engine rather than an approximation.
- **Decision 2 — Zero-Dependency Web Audio *Metasounds* Percussion Synthesizer**:
  - *Chosen Approach*: Synthesize authentic *Damru* (pitch-bent resonant membrane double-taps), *Mridangam* (deep bass *Thoppi* and harmonic *Valanthalai* strokes), and sub-bass *Tanpura* drones in real time via the Web Audio API with exact beat timestamps (`getMetasoundsNearestBeatTime()`).
  - *Why*: Guarantees zero-latency millisecond delta calculation (`FrameDeltaMS`) for the *Tāla* rhythm multiplier without external audio file loading failures.
- **Decision 3 — Interactive Studio Pipeline Visualization**:
  - *Chosen Approach*: Implement the GDD's Studio API layers (IMAX dynamic letterbox/pillarbox aspect scaling, Disney bioluminescent Bhasma & cloth physics trails, Warner Bros. kinetic slash streaks & crimson clone cel-outlines, and Netflix/MGM HDR tone-mapping curves) as live, toggleable real-time 3D rendering passes and telemetry inspectors.
  - *Why*: Lets recruiters and players visually experience how each pipeline module transforms the live 3D combat viewport.

---

## 4. Technical Architecture & Data Strategy

### Architecture & Component Diagram

```
┌──────────────────────────────────────────────────────────────────────────────┐
│                     REACT UI & TELEMETRY LAYER (App.tsx)                     │
│  ┌────────────────────────┐  ┌────────────────────────┐  ┌────────────────┐  │
│  │   TandavCombatHUD      │  │  MoveList & FrameData  │  │ StudioPipeline │  │
│  │ • Health & Tandav Bars │  │  Matrix Inspector      │  │ & Cutscene     │  │
│  │ • Damru Beat Ring      │  │ • Bhairav Veechu Nilai │  │ Controller     │  │
│  │ • Live S/A/R Telemetry │  │ • Andhakasura Thang-Ta │  │ • IMAX 1.43:1  │  │
│  │ • 12f Input Stream     │  │ • Hitbox Box Visualizer│  │ • Act I Script │  │
│  └───────────┬────────────┘  └───────────┬────────────┘  └────────┬───────┘  │
└──────────────┼───────────────────────────┼────────────────────────┼──────────┘
               │                           │                        │
               ▼                           ▼                        ▼
┌──────────────────────────────────────────────────────────────────────────────┐
│                TĀṆḌAVA 60 FPS CORE COMBAT ENGINE (TypeScript)                │
│  ┌────────────────────────┐  ┌────────────────────────┐  ┌────────────────┐  │
│  │  TandavInputBuffer     │  │  TandavRhythmDamage    │  │ LevelManager & │  │
│  │ • 12-Frame Rolling Q   │  │  & Metasounds Synth    │  │ Moksha State   │  │
│  │ • Quarter-Circle &     │  │ • 45ms Tāla Perfect    │  │ • 300f Window  │  │
│  │   Moksha String Parser │  │ • 90ms Tāla Great      │  │ • Round 3      │  │
│  │ • Nataraja 1f Parry    │  │ • Guard Crush & Stun   │  │   Avalanche    │  │
│  └───────────┬────────────┘  └───────────┬────────────┘  └────────┬───────┘  │
│              │                           │                        │          │
│  ┌───────────▼───────────────────────────▼────────────────────────▼───────┐  │
│  │             CHARACTER STANCE & REPLICATION CONTROLLERS                 │  │
│  │ • BhairavStanceEngine: Silambam Staff ↔ Kalaripayattu Sword & Shield   │  │
│  │   (6f Standard / 2f Tāla-Synced Morph + Varma Kalai 4s Meter Freeze)   │  │
│  │ • AndhakasuraCloneSystem: Rakta-Bīja Shadow Clone Spawner (Max 3,      │  │
│  │   180f Lifespan, 240f Cooldown, 45f Leg-Lock Grapple, Vallari Loop)    │  │
│  └───────────────────────────────────────┬────────────────────────────────┘  │
└──────────────────────────────────────────┼───────────────────────────────────┘
                                           │
                                           ▼
┌──────────────────────────────────────────────────────────────────────────────┐
│                 THREE.JS / WEBGL 3D SCENE & STUDIO PIPELINE                  │
│  • Mount Kailash Black Ice Reflective Arena + Molten Fissures + Aurora Sky   │
│  • Composite Articulated 3D Fighters (Bhairav & Andhakasura + Shadow Clones) │
│  • Dynamic Hitbox/Hurtbox 3D Wireframes, Kinetic Slash Ribbons & Stardust    │
│  • Sanctum Tactical Board Bridge (Optional Chess-to-Tāṇḍava Duel Mode)       │
└──────────────────────────────────────────────────────────────────────────────┘
```

### Data Model & State

- **Move Frame Data Registry (`MoveFrameData`)**: Stores exact `startupFrames`, `activeFrames`, `recoveryFrames`, `onBlockStandard`, `onBlockTalaSynced`, `baseDamage`, `chipDamageModifier`, `hitLevel` (`High` | `Mid` | `Low` | `Overhead` | `CommandGrab` | `Deflect`), and `cancelRoutes` for every move in Bhairav's *Silambam / Kalaripayattu* stances and Andhakāsura's *Thang-Ta* stance.
- **Fighter Runtime State (`FighterState`)**: Tracks 3D position, velocity, facing direction, health (`0–1000`), `tandavMeter` (`0–100`), `currentStance`, active move and current frame index, `hitStunFrames`, `blockStunFrames`, `varmaFreezeTimer` (4s meter lock), `rootedFrames` (45f Shadow Clone leg-lock), and active 3D bounding hitboxes/hurtboxes.
- **Input Buffer Queue (`InputPacket[]`)**: Stores up to 8 recent controller/keyboard inputs with `frameLogged` and `bIsBeatMatched`, automatically pruning entries older than 12 frames and evaluating special strings (*Prāṇa Bind*, *Urumi Split*, *Asura Clasp*, and *Moksha Finisher*).

### Interactive Component & State Mapping

- **Keyboard, Mouse & Gamepad Combat Controls**:
  - **Movement**: `A / D` or `Left / Right` (Walk/Dash), `W` (Jump), `S` (Crouch), `E` (Glacial Fissure Stage Hazard).
  - **Attacks**: `J` / `Square` (Light Strike), `I` / `Triangle` (Heavy Strike), `L` / `Circle` (Weapon Action / Stance Split / Vallari Boomerang), `K` / `R1` (Block & *Nataraja Deflection* Parry), `Space` / `LT` (Activate *Pralaya* Time-Dilation at 100% Tandav Meter).
  - **One-Click Combo & Special Triggers in Practice/HUD Dock**: Players can also trigger any named special move, stance morph, *Rakta-Bīja* clone test, or *Moksha Finisher* directly from the interactive Frame-Data Bar to inspect animations and frame advantage in real time.

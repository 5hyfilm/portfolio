"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { gsap } from "gsap";

interface CinematicIntroProps {
  onComplete: () => void;
}

export default function CinematicIntro({ onComplete }: CinematicIntroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [showSkip, setShowSkip] = useState(false);
  const skipActionRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    // --- State & Config ---
    const ANIMATION_CONFIG = {
      surgeProgress: 0,       // Phase 1: 0 (bottom) to 1 (full rise)
      vibrationIntensity: 0,   // Preparation: 0 to 1 (vibrating before blast)
      explosionProgress: 0,    // Phase 3: 0 (monolith) to 1 (shards flying out)
      ashProgress: 0,          // Phase 4: 0 to 1 (gravity ash drift)
    };

    // --- 1. Scene Setup ---
    const width = window.innerWidth;
    const height = window.innerHeight;

    const scene = new THREE.Scene();
    scene.background = null; 

    // Camera
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
    camera.position.set(0, 0, 8);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true, // Allow transparency to blend with CSS background
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.65); // Boosted for high visibility
    scene.add(ambientLight);

    // Dynamic fuchsia point light inside the monolith core
    const coreLight = new THREE.PointLight(0xd946ef, 0, 20);
    scene.add(coreLight);

    // Specular highlight directional light for obsidian shards
    const dirLight = new THREE.DirectionalLight(0xffffff, 1.8); // Slipped up to 1.8 for bright highlights
    dirLight.position.set(5, 5, 5);
    scene.add(dirLight);

    // Secondary vivid purple rim light from opposite corner to highlight 3D edges
    const dirLight2 = new THREE.DirectionalLight(0xa855f7, 1.2);
    dirLight2.position.set(-5, 3, -5);
    scene.add(dirLight2);

    // --- 2. Shards Geometry and InstancedMesh ---
    const COLOR_PALETTE = [
      new THREE.Color(0x10051e), // Velvet Dark Charcoal (slightly brighter than 0x08020e)
      new THREE.Color(0x22073d), // Gothic Dark Purple
      new THREE.Color(0x360d5e), // Midnight Lavender
      new THREE.Color(0x501185), // Vivid Deep Purple
      new THREE.Color(0x6b1da1), // Rich Electric Amethyst
      new THREE.Color(0x8b2ec4), // Bright Lavender Specular
      new THREE.Color(0xd946ef), // Hyper-Neon Fuchsia / Pink Conduit lines!
    ];

    const TOTAL_PARTICLES = 6500; // All dedicated to the central pillar! Increased for a dense, tightly-packed solid monolith

    // Box Geometry representing flat, vertical rectangular digital slate panels (Kuroshitsuji style)
    const shardGeometry = new THREE.BoxGeometry(0.22, 0.44, 0.04);
    
    const shardMaterial = new THREE.MeshPhongMaterial({
      shininess: 95,              // Extremely glossy
      specular: 0xa855f7,          // Slightly brighter neon purple reflections
      emissive: 0x0e041c,          // Subtle digital shadow glow boosted slightly
      transparent: true,
      opacity: 1,
      side: THREE.DoubleSide,
    });

    const instancedMesh = new THREE.InstancedMesh(shardGeometry, shardMaterial, TOTAL_PARTICLES);
    instancedMesh.frustumCulled = false; // Disable culling to prevent hiding particles starting below the screen
    scene.add(instancedMesh);

    // --- 3. Generate Monolith Particle Data ---
    interface ParticleData {
      index: number;
      startX: number;
      startY: number;
      startZ: number;
      targetX: number;
      targetY: number;
      targetZ: number;
      expDirX: number;
      expDirY: number;
      expDirZ: number;
      expSpeed: number;
      rotSpeedX: number;
      rotSpeedY: number;
      rotSpeedZ: number;
      scaleX: number;
      scaleY: number;
      scaleZ: number;
      riseDelay: number;
      wallRotY: number; // Flat rotation angle aligning with its corresponding vertical wall face
    }

    const particles: ParticleData[] = [];

    // Temporary variables for calculations
    const tempMatrix = new THREE.Matrix4();
    const tempPosition = new THREE.Vector3();
    const tempRotation = new THREE.Euler();
    const tempQuaternion = new THREE.Quaternion();
    const tempScale = new THREE.Vector3();

    // Dimensions of the hollow square Kuroshitsuji-style monolith
    const pillarWidth = 1.6;  // Wider container
    const pillarDepth = 1.6;
    const pillarHeight = 5.2;
    const wallThickness = 0.08; // Thin flat tile brickwork layer thickness

    for (let i = 0; i < TOTAL_PARTICLES; i++) {
      // Pick one of the 4 vertical walls of the hollow square container
      const wallIndex = Math.floor(Math.random() * 4);
      let targetX = 0;
      let targetZ = 0;
      let wallRotY = 0; // Angle parallel to the wall face

      const hw = pillarWidth / 2;
      const hd = pillarDepth / 2;

      if (wallIndex === 0) { // Front wall (X-axis, Z-front)
        targetX = (Math.random() - 0.5) * pillarWidth;
        targetZ = hd + (Math.random() - 0.5) * wallThickness;
        wallRotY = 0;
      } else if (wallIndex === 1) { // Back wall (X-axis, Z-back)
        targetX = (Math.random() - 0.5) * pillarWidth;
        targetZ = -hd + (Math.random() - 0.5) * wallThickness;
        wallRotY = Math.PI;
      } else if (wallIndex === 2) { // Left wall (Z-axis, X-left)
        targetX = -hw + (Math.random() - 0.5) * wallThickness;
        targetZ = (Math.random() - 0.5) * pillarDepth;
        wallRotY = -Math.PI / 2;
      } else { // Right wall (Z-axis, X-right)
        targetX = hw + (Math.random() - 0.5) * wallThickness;
        targetZ = (Math.random() - 0.5) * pillarDepth;
        wallRotY = Math.PI / 2;
      }

      // Kuroshitsuji Castle Battlements Jagged Top (Crenellations)
      // Hash column index along perimeter to group shard max heights stable-randomly
      let colKey = 0;
      if (wallIndex === 0 || wallIndex === 1) {
        colKey = Math.floor((targetX + hw) / 0.18); // 0.18 wide masonry columns
      } else {
        colKey = Math.floor((targetZ + hd) / 0.18);
      }
      
      const hash = Math.abs(Math.sin(colKey * 12.9898) * 43758.5453) % 1.0;
      let maxColHeight = pillarHeight;
      if (hash < 0.28) {
        maxColHeight = pillarHeight * 0.68; // Castle battlements hollow cut-down
      } else if (hash < 0.58) {
        maxColHeight = pillarHeight * 0.88; // Mid level
      }

      const bottomY = -pillarHeight / 2;
      const topY = maxColHeight - pillarHeight / 2;
      const targetY = bottomY + Math.random() * (topY - bottomY);

      // Start position (strictly vertical below target coordinates to preserve the hollow box layout during rise)
      const startX = targetX;
      const startY = -12.0 - Math.random() * 3.0;
      const startZ = targetZ;

      // Explosion velocities: radiating outward from the central hollow column
      const radialAngle = Math.atan2(targetZ, targetX) + (Math.random() - 0.5) * 0.4;
      const horizontalSpeed = 4.5 + Math.random() * 6.5;
      
      const expDirX = Math.cos(radialAngle) * horizontalSpeed;
      const expDirZ = Math.sin(radialAngle) * horizontalSpeed;
      const expDirY = (Math.random() - 0.5) * 5.0 + (targetY * 0.5); // Slight vertical spread
      
      const expSpeed = 0.8 + Math.random() * 1.5;

      // Wild spin during blast
      const rotSpeedX = (Math.random() - 0.5) * 12.0;
      const rotSpeedY = (Math.random() - 0.5) * 12.0;
      const rotSpeedZ = (Math.random() - 0.5) * 12.0;

      // Varied fragment sizes for a rich digital masonry aesthetic
      const scaleX = 0.6 + Math.random() * 0.6;
      const scaleY = 0.7 + Math.random() * 1.0; // Flat vertical slate blocks
      const scaleZ = 0.6 + Math.random() * 0.6;

      // Stagger delay based on height (bottom elements rise first, top rise last)
      const heightFactor = (targetY + (pillarHeight / 2)) / pillarHeight; // 0 to 1
      const riseDelay = heightFactor * 0.4 + Math.random() * 0.15;

      particles.push({
        index: i,
        startX,
        startY,
        startZ,
        targetX,
        targetY,
        targetZ,
        expDirX,
        expDirY,
        expDirZ,
        expSpeed,
        rotSpeedX,
        rotSpeedY,
        rotSpeedZ,
        scaleX,
        scaleY,
        scaleZ,
        riseDelay,
        wallRotY,
      });

      // Colors: brighter dark-gothic stone masonry with vibrant fuchsia conduit cracks showing through
      let colorIndex = 0;
      const hashColor = Math.random();
      if (hashColor < 0.40) {
        colorIndex = 1; // Gothic Dark Purple (visible base)
      } else if (hashColor < 0.75) {
        colorIndex = 2; // Midnight Lavender
      } else if (hashColor < 0.90) {
        colorIndex = 3; // Vivid Deep Purple
      } else {
        colorIndex = 6; // Bright Neon Fuchsia / Pink (matching fuchsia fire!)
      }

      instancedMesh.setColorAt(i, COLOR_PALETTE[colorIndex]);
    }

    instancedMesh.instanceColor!.needsUpdate = true;

    // --- 4. Soft Volumetric Energy Glowing Aura ---
    const auraGeometry = new THREE.CylinderGeometry(1.4, 1.4, 6.0, 24, 1, true);
    const auraMaterial = new THREE.MeshBasicMaterial({
      color: 0x2e0854,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
      depthWrite: false, // Prevents clipping artifacts
    });
    const auraMesh = new THREE.Mesh(auraGeometry, auraMaterial);
    scene.add(auraMesh);

    // Swirling atmospheric smoke clouds (Swirling neon fire inside the Kuroshitsuji container!)
    const smokeParticles: THREE.Mesh[] = [];
    const smokeCount = 30; // 30 clouds for high-density neon magenta magical fire
    const smokeGeometry = new THREE.PlaneGeometry(1.5, 1.5);
    const smokeColors = [0xec4899, 0xd946ef, 0xa855f7]; // Hot magenta, vibrant fuchsia, royal purple neon fire

    for (let k = 0; k < smokeCount; k++) {
      const smokeMat = new THREE.MeshBasicMaterial({
        color: smokeColors[k % smokeColors.length],
        transparent: true,
        opacity: 0,
        blending: THREE.AdditiveBlending,
        side: THREE.DoubleSide,
        depthWrite: false,
      });
      const smoke = new THREE.Mesh(smokeGeometry, smokeMat);
      
      // Keep strictly inside the 1.4-unit wide hollow interior of our 1.6 x 1.6 square container
      smoke.position.set(
        (Math.random() - 0.5) * 0.8,
        (Math.random() - 0.5) * 4.5,
        (Math.random() - 0.5) * 0.8
      );
      smoke.rotation.z = Math.random() * Math.PI * 2;
      const smokeScale = 0.8 + Math.random() * 0.8;
      smoke.scale.set(smokeScale, smokeScale, 1);
      scene.add(smoke);
      smokeParticles.push(smoke);
    }

    // --- 5. GSAP Timeline Sequencing ---
    const tl = gsap.timeline({
      onComplete: () => {
        // Smoothly fade out overlay wrapper upon completion
        gsap.to(containerRef.current, {
          opacity: 0,
          duration: 1.2,
          ease: "power2.out",
          onComplete: () => {
            onComplete(); // Clean unmount
          },
        });
      },
    });

    // Phase 1 (The Surge): Monolith surges upward much slower over 3.2s
    tl.to(ANIMATION_CONFIG, {
      surgeProgress: 1.0,
      duration: 3.2,
      ease: "power2.out",
    });

    // Sync lights & glowing aura with the rise
    tl.to(coreLight, {
      intensity: 22.0, // Rich, bright fuchsia glow from inside!
      distance: 20,
      duration: 3.0,
      ease: "power1.inOut",
    }, 0);

    tl.to(auraMaterial, {
      opacity: 0.35, // Brightened cylinder aura for readability
      duration: 2.8,
      ease: "power1.out",
    }, 0.3);

    smokeParticles.forEach((smoke) => {
      tl.to(smoke.material, {
        opacity: 0.28, // Vibrant, clearly visible magical fire!
        duration: 2.8,
        ease: "power1.out",
      }, 0.3);
    });

    // Vibration / Compressing Anticipation (3.2s to 3.5s)
    tl.to(ANIMATION_CONFIG, {
      vibrationIntensity: 1.0,
      duration: 0.3,
      ease: "none",
    }, 3.2);

    // Phase 3 (The Explosion): Decelerating cinematic blast at t = 3.5s
    tl.to(ANIMATION_CONFIG, {
      explosionProgress: 1.0,
      duration: 2.2,
      ease: "power4.out", // Explosive outward snap, then extreme deceleration
    }, 3.5);

    // Aura and atmospheric smoke explode outward and dissipate instantly
    tl.to(auraMesh.scale, {
      x: 6.0,
      y: 1.5,
      z: 6.0,
      duration: 0.8,
      ease: "expo.out",
    }, 3.5);

    tl.to(auraMaterial, {
      opacity: 0,
      duration: 0.8,
      ease: "power2.out",
    }, 3.5);

    smokeParticles.forEach((smoke) => {
      tl.to(smoke.scale, {
        x: 4.0,
        y: 4.0,
        duration: 1.2,
        ease: "power3.out",
      }, 3.5);

      tl.to(smoke.material, {
        opacity: 0,
        duration: 1.0,
        ease: "power2.out",
      }, 3.5);
    });

    tl.to(coreLight, {
      intensity: 0,
      duration: 1.5,
      ease: "power2.out",
    }, 3.5);

    // Phase 4 (The Fade & Ash Drift): Drift downwards and shrink
    tl.to(ANIMATION_CONFIG, {
      ashProgress: 1.0,
      duration: 2.0,
      ease: "power2.out",
    }, 3.9);

    tl.to(shardMaterial, {
      opacity: 0,
      duration: 1.5,
      ease: "power1.inOut",
    }, 4.1);

    // Show skip button after 2.2 seconds to match the slower rise
    const skipTimer = setTimeout(() => {
      setShowSkip(true);
    }, 2200);

    // --- 6. Render Tick Loop ---
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();
      const sProg = ANIMATION_CONFIG.surgeProgress;
      const vib = ANIMATION_CONFIG.vibrationIntensity;
      const eProg = ANIMATION_CONFIG.explosionProgress;
      const ashProg = ANIMATION_CONFIG.ashProgress;

      // Rotate and pulse the energy aura
      if (auraMaterial.opacity > 0) {
        auraMesh.rotation.y = elapsedTime * 0.8;
        auraMesh.scale.x = 1.0 + Math.sin(elapsedTime * 8) * 0.05;
        auraMesh.scale.z = 1.0 + Math.sin(elapsedTime * 8) * 0.05;
      }

      // Swirl and rise the fuchsia/magenta neon fire clouds inside the hollow core
      smokeParticles.forEach((smoke, idx) => {
        // Slow spin around their own center
        smoke.rotation.z += 0.012 * (idx % 2 === 0 ? 1 : -1);
        
        // Helical orbit around the vertical Y-axis
        const orbitSpeed = 0.6 + (idx % 3) * 0.25;
        const angle = elapsedTime * orbitSpeed + (idx * Math.PI * 2 / smokeParticles.length);
        const radius = 0.15 + Math.sin(elapsedTime * 0.4 + idx) * 0.15; // Swirl inside the hollow walls
        
        if (eProg === 0) {
          smoke.position.x = Math.cos(angle) * radius;
          smoke.position.z = Math.sin(angle) * radius;
          
          // Continuous upward drift like real fire flames!
          smoke.position.y += 0.015;
          if (smoke.position.y > 2.5) {
            smoke.position.y = -2.5; // Wrap back to bottom
          }
          
          // Scale pulses dynamically to simulate flickering fire
          if (sProg > 0) {
            const flicker = (0.7 + Math.sin(elapsedTime * 6.0 + idx) * 0.3) * sProg;
            smoke.scale.set(flicker, flicker, 1);
          }
        }
      });

      // Move point light slowly upward along the core during the surge
      if (sProg > 0 && eProg === 0) {
        coreLight.position.y = -3.0 + sProg * 6.0;
      }

      // Vibration math
      let vibX = 0;
      let vibY = 0;
      if (vib > 0 && eProg === 0) {
        vibX = Math.sin(elapsedTime * 80) * 0.04 * vib;
        vibY = Math.cos(elapsedTime * 85) * 0.04 * vib;
        camera.position.x = Math.sin(elapsedTime * 90) * 0.015 * vib;
        camera.position.y = Math.cos(elapsedTime * 95) * 0.015 * vib;
      } else if (eProg > 0) {
        camera.position.x *= 0.9;
        camera.position.y *= 0.9;
      }

      // Update positions, scales, and rotations for all 3,500 shards
      for (let i = 0; i < TOTAL_PARTICLES; i++) {
        const p = particles[i];

        let x = 0, y = 0, z = 0;

        if (eProg === 0) {
          // --- SURGE PHASE ---
          const localRise = Math.max(0, Math.min(1, (sProg - p.riseDelay) / (1 - p.riseDelay)));
          const surgeEase = 1 - Math.pow(1 - localRise, 3); // cubic out
          
          x = p.startX * (1 - surgeEase) + p.targetX * surgeEase;
          y = p.startY * (1 - surgeEase) + p.targetY * surgeEase;
          z = p.startZ * (1 - surgeEase) + p.targetZ * surgeEase;

          // Apply vibration trembling offsets
          x += vibX * (0.3 + Math.random() * 0.7);
          y += vibY * (0.3 + Math.random() * 0.7);
        } else {
          // --- EXPLOSION & ASH DRIFT PHASE ---
          const baseExplosionDist = eProg * p.expSpeed;
          
          x = p.targetX + p.expDirX * baseExplosionDist;
          y = p.targetY + p.expDirY * baseExplosionDist;
          z = p.targetZ + p.expDirZ * baseExplosionDist;

          if (ashProg > 0) {
            const driftY = -5.0 * Math.pow(ashProg, 1.8); // exponential fall
            y += driftY;

            // Sway gently from side to side like floating ash
            x += Math.sin(elapsedTime * 2 + p.index) * 0.4 * ashProg;
            z += Math.cos(elapsedTime * 1.5 + p.index) * 0.4 * ashProg;
          }
        }

        tempPosition.set(x, y, z);

        // Rotations: Lay flat parallel to wall face with subtle organic sway
        if (eProg === 0) {
          tempRotation.set(
            0,
            p.wallRotY + Math.sin(elapsedTime * 2.0 + p.index) * 0.04,
            0
          );
        } else {
          // Wild tumbling during explosion
          tempRotation.set(
            p.targetX * 0.5 + p.rotSpeedX * eProg,
            p.wallRotY + p.rotSpeedY * eProg,
            p.targetZ * 0.5 + p.rotSpeedZ * eProg
          );
        }

        // Scales
        let sx = p.scaleX;
        let sy = p.scaleY;
        let sz = p.scaleZ;

        if (eProg === 0) {
          const scaleEase = Math.max(0, Math.min(1, (sProg - p.riseDelay) / (1 - p.riseDelay)));
          sx *= scaleEase;
          sy *= scaleEase;
          sz *= scaleEase;
        } else {
          const shrinkFactor = 1.0 - ashProg * 0.9;
          sx *= shrinkFactor;
          sy *= shrinkFactor;
          sz *= shrinkFactor;
        }

        tempScale.set(sx, sy, sz);

        // Compose and update Matrix
        tempQuaternion.setFromEuler(tempRotation);
        tempMatrix.compose(tempPosition, tempQuaternion, tempScale);
        instancedMesh.setMatrixAt(i, tempMatrix);
      }

      instancedMesh.instanceMatrix.needsUpdate = true;
      renderer.render(scene, camera);
    };

    animate();

    // --- 7. Resize Event ---
    const handleResize = () => {
      if (!containerRef.current) return;
      const w = window.innerWidth;
      const h = window.innerHeight;

      camera.aspect = w / h;
      camera.updateProjectionMatrix();

      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    // --- 8. Skip Actions ---
    const skipAction = () => {
      clearTimeout(skipTimer);
      tl.kill();
      gsap.to(containerRef.current, {
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
        onComplete: () => {
          onComplete();
        },
      });
    };

    skipActionRef.current = skipAction;

    // --- 9. Clean up WebGL Context & Geometries ---
    return () => {
      clearTimeout(skipTimer);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      tl.kill();

      shardGeometry.dispose();
      shardMaterial.dispose();
      auraGeometry.dispose();
      auraMaterial.dispose();
      smokeGeometry.dispose();
      smokeParticles.forEach((smoke) => {
        if (smoke.material instanceof THREE.Material) {
          smoke.material.dispose();
        }
      });
      renderer.dispose();
    };
  }, [onComplete]);

  const handleSkipClick = () => {
    if (skipActionRef.current) {
      skipActionRef.current();
    }
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] overflow-hidden bg-black flex items-center justify-center pointer-events-auto"
      style={{
        background: "radial-gradient(circle, #0e0417 0%, #030105 100%)",
      }}
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />

      {/* Cyberpunk Vignette Overlays */}
      <div className="absolute inset-0 pointer-events-none border-[12px] border-purple-950/20 mix-blend-overlay opacity-60" />
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_20%,rgba(0,0,0,0.8)_100%)] opacity-80" />

      {/* Skip Button */}
      {showSkip && (
        <button
          onClick={handleSkipClick}
          className="absolute bottom-8 right-8 z-[10000] px-5 py-2.5 rounded-md border border-purple-500/30 bg-black/40 text-purple-400 font-mono text-xs tracking-widest uppercase transition-all duration-300 hover:bg-purple-900/20 hover:border-purple-400 hover:text-purple-300 hover:shadow-[0_0_15px_rgba(168,85,247,0.25)] active:scale-95"
        >
          Skip Intro
        </button>
      )}

      {/* Central Cyberpunk branding indicator */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none text-[8rem] font-bold text-purple-950/5 font-mono">
        MIND
      </div>
    </div>
  );
}

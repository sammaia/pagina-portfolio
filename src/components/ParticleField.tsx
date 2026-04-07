"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const PARTICLE_COUNT = 250;
const CONNECTION_DISTANCE = 2.0;
const FIELD_SIZE = 14;

function Particles() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const particles = useMemo(() => {
    const positions = [];
    const velocities = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      positions.push(
        (Math.random() - 0.5) * FIELD_SIZE,
        (Math.random() - 0.5) * FIELD_SIZE,
        (Math.random() - 0.5) * FIELD_SIZE * 0.5
      );
      velocities.push(
        (Math.random() - 0.5) * 0.005,
        (Math.random() - 0.5) * 0.005,
        (Math.random() - 0.5) * 0.003
      );
    }
    return { positions: new Float32Array(positions), velocities };
  }, []);

  const lineGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const maxLines = PARTICLE_COUNT * 8;
    const positions = new Float32Array(maxLines * 6);
    const colors = new Float32Array(maxLines * 6);
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    geo.setDrawRange(0, 0);
    return geo;
  }, []);

  useFrame((state) => {
    if (!meshRef.current || !linesRef.current) return;
    const time = state.clock.elapsedTime;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      particles.positions[i3] += particles.velocities[i3];
      particles.positions[i3 + 1] += particles.velocities[i3 + 1];
      particles.positions[i3 + 2] += particles.velocities[i3 + 2];

      for (let axis = 0; axis < 3; axis++) {
        const limit = axis === 2 ? FIELD_SIZE * 0.25 : FIELD_SIZE * 0.5;
        if (Math.abs(particles.positions[i3 + axis]) > limit) {
          particles.velocities[i3 + axis] *= -1;
        }
      }

      dummy.position.set(
        particles.positions[i3],
        particles.positions[i3 + 1],
        particles.positions[i3 + 2]
      );
      const pulse = 1.0 + Math.sin(time * 2 + i * 0.3) * 0.5;
      dummy.scale.setScalar(pulse);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;

    const posArr = lineGeometry.attributes.position.array as Float32Array;
    const colArr = lineGeometry.attributes.color.array as Float32Array;
    let lineIdx = 0;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      for (let j = i + 1; j < PARTICLE_COUNT; j++) {
        const i3 = i * 3;
        const j3 = j * 3;
        const dx = particles.positions[i3] - particles.positions[j3];
        const dy = particles.positions[i3 + 1] - particles.positions[j3 + 1];
        const dz = particles.positions[i3 + 2] - particles.positions[j3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist < CONNECTION_DISTANCE) {
          const alpha = 1 - dist / CONNECTION_DISTANCE;
          const idx = lineIdx * 6;
          posArr[idx] = particles.positions[i3];
          posArr[idx + 1] = particles.positions[i3 + 1];
          posArr[idx + 2] = particles.positions[i3 + 2];
          posArr[idx + 3] = particles.positions[j3];
          posArr[idx + 4] = particles.positions[j3 + 1];
          posArr[idx + 5] = particles.positions[j3 + 2];

          // Mix cyan and violet based on position
          const mix = (particles.positions[i3] + FIELD_SIZE / 2) / FIELD_SIZE;
          colArr[idx] = 0.49 * mix * alpha;
          colArr[idx + 1] = (0.9 - 0.67 * mix) * alpha;
          colArr[idx + 2] = (1.0 - 0.07 * mix) * alpha;
          colArr[idx + 3] = 0.49 * mix * alpha;
          colArr[idx + 4] = (0.9 - 0.67 * mix) * alpha;
          colArr[idx + 5] = (1.0 - 0.07 * mix) * alpha;
          lineIdx++;
        }
      }
    }
    lineGeometry.setDrawRange(0, lineIdx * 2);
    lineGeometry.attributes.position.needsUpdate = true;
    lineGeometry.attributes.color.needsUpdate = true;
  });

  return (
    <>
      <instancedMesh ref={meshRef} args={[undefined, undefined, PARTICLE_COUNT]}>
        <sphereGeometry args={[0.03, 8, 8]} />
        <meshBasicMaterial color="#00e5ff" transparent opacity={0.9} />
      </instancedMesh>
      <lineSegments ref={linesRef} geometry={lineGeometry}>
        <lineBasicMaterial vertexColors transparent opacity={0.3} />
      </lineSegments>
    </>
  );
}

export default function ParticleField() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 60 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Particles />
      </Canvas>
      {/* Softer vignette — less aggressive fade */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, transparent 0%, rgba(5,5,8,0.4) 60%, #050508 85%)",
        }}
      />
    </div>
  );
}

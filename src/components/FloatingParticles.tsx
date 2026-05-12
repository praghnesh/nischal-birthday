"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

function Particles({ count = 2000 }) {
  const points = useRef<THREE.Points>(null!);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return pos;
  }, [count]);

  useFrame((state, delta) => {
    if (points.current) {
      points.current.rotation.x += delta * 0.05;
      points.current.rotation.y += delta * 0.075;
    }
  });

  return (
    <Points ref={points} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#ff00ff"
        size={0.015}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

function AuraLights() {
  return (
    <>
      <pointLight position={[5, 5, 5]} color="#002366" intensity={2} />
      <pointLight position={[-5, -5, -5]} color="#4b0082" intensity={2} />
      <pointLight position={[0, 0, 0]} color="#ff00ff" intensity={1} />
    </>
  );
}

export default function FloatingParticles() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <color attach="background" args={["#050505"]} />
        <ambientLight intensity={0.5} />
        <AuraLights />
        <Particles count={3000} />
        <Particles count={1000} />
      </Canvas>
    </div>
  );
}

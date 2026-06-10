import React, { useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useTexture, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

const IMAGE_PATHS = [
  '/portfolio/kotshina/club_card_1.png','/portfolio/kotshina/club_card_2.png','/portfolio/kotshina/club_card_3.png','/portfolio/kotshina/club_card_4.png','/portfolio/kotshina/club_card_5.png','/portfolio/kotshina/club_card_6.png','/portfolio/kotshina/club_card_7.png','/portfolio/kotshina/club_card_8.png','/portfolio/kotshina/club_card_9.png','/portfolio/kotshina/club_card_10.png','/portfolio/kotshina/club_card_11.png','/portfolio/kotshina/club_card_12.png','/portfolio/kotshina/club_card_13.png',
  '/portfolio/kotshina/diamond_card_1.png','/portfolio/kotshina/diamond_card_2.png','/portfolio/kotshina/diamond_card_3.png','/portfolio/kotshina/diamond_card_4.png','/portfolio/kotshina/diamond_card_5.png','/portfolio/kotshina/diamond_card_6.png','/portfolio/kotshina/diamond_card_7.png','/portfolio/kotshina/diamond_card_8.png','/portfolio/kotshina/diamond_card_9.png','/portfolio/kotshina/diamond_card_10.png','/portfolio/kotshina/diamond_card_11.png','/portfolio/kotshina/diamond_card_12.png','/portfolio/kotshina/diamond_card_13.png',
  '/portfolio/kotshina/heart_card_1.png','/portfolio/kotshina/heart_card_2.png','/portfolio/kotshina/heart_card_3.png','/portfolio/kotshina/heart_card_4.png','/portfolio/kotshina/heart_card_5.png','/portfolio/kotshina/heart_card_6.png','/portfolio/kotshina/heart_card_7.png','/portfolio/kotshina/heart_card_8.png','/portfolio/kotshina/heart_card_9.png','/portfolio/kotshina/heart_card_10.png','/portfolio/kotshina/heart_card_11.png','/portfolio/kotshina/heart_card_12.png','/portfolio/kotshina/heart_card_13.png',
  '/portfolio/kotshina/spade_card_1.png','/portfolio/kotshina/spade_card_2.png','/portfolio/kotshina/spade_card_3.png','/portfolio/kotshina/spade_card_4.png','/portfolio/kotshina/spade_card_5.png','/portfolio/kotshina/spade_card_6.png','/portfolio/kotshina/spade_card_7.png','/portfolio/kotshina/spade_card_8.png','/portfolio/kotshina/spade_card_9.png','/portfolio/kotshina/spade_card_10.png','/portfolio/kotshina/spade_card_11.png','/portfolio/kotshina/spade_card_12.png','/portfolio/kotshina/spade_card_13.png',
];

const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);

const CARD_W = 1;
const CARD_H = 1.4;

function Card({ texture, backTexture, position, rotation }) {
  return (
    <group position={position} rotation={rotation}>
      {/* FRONT OF CARD */}
      <mesh position={[0, 0, 0.01]}>
        <planeGeometry args={[CARD_W, CARD_H]} />
        <meshStandardMaterial map={texture} roughness={0.2} metalness={0.1} />
      </mesh>
      
      {/* BACK OF CARD */}
      <mesh position={[0, 0, 0]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[CARD_W, CARD_H]} />
        <meshStandardMaterial map={backTexture} roughness={0.8} metalness={0.05} />
      </mesh>
    </group>
  );
}

function Scene() {
  const textures = useTexture(IMAGE_PATHS);
  
  // Custom procedural texture pattern for card backs
  const backTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512; canvas.height = 512;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#1a3a4a'; 
    ctx.fillRect(0, 0, 512, 512);
    ctx.strokeStyle = '#ffffff22';
    ctx.lineWidth = 10;
    for(let i=0; i<512; i+=40) {
        ctx.moveTo(i, 0); ctx.lineTo(i, 512);
        ctx.moveTo(0, i); ctx.lineTo(512, i);
    }
    ctx.stroke();
    return new THREE.CanvasTexture(canvas);
  }, []);

  const deckGroups = useMemo(() => {
    const s = shuffle(IMAGE_PATHS);
    return [
      // Front & Back flipped to look OUTWARD (opposite direction)
      { key: 'front', images: s.slice(0, 13),  pos: [0, 0, 5],  rot: 0 },      
      { key: 'back',  images: s.slice(13, 26), pos: [0, 0, -5], rot: Math.PI },            
      
      // Left & Right remain looking OUTWARD (as configured previously)
      { key: 'left',  images: s.slice(26, 39), pos: [-5, 0, 0], rot: -Math.PI / 2 }, 
      { key: 'right', images: s.slice(39, 52), pos: [5, 0, 0],  rot: Math.PI / 2 },  
    ];
  }, []);

  return (
    <>
      <group position={[0, 0.5, 0]}>
        {deckGroups.map((group) => (
          <group key={group.key} position={group.pos} rotation={[0, group.rot, 0]}>
            {group.images.map((path, i) => {
              const spacing = 0.7;
              const xPos = (i - 6) * spacing;
              const fanRot = (i - 6) * 0.05;
              const fanY = Math.abs(i - 6) * -0.05;

              return (
                <Card 
                  key={path}
                  texture={textures[IMAGE_PATHS.indexOf(path)]}
                  backTexture={backTexture}
                  position={[xPos, fanY, 0]}
                  rotation={[0, 0, fanRot]}
                />
              );
            })}
          </group>
        ))}
      </group>

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]} receiveShadow>
        <circleGeometry args={[8, 64]} />
        <meshStandardMaterial color="#0b3d21" roughness={1} />
      </mesh>
      
      <ContactShadows opacity={0.4} scale={20} blur={2} far={4.5} />
    </>
  );
}

export default function StimationSection() {
  return (
    <section className="py-12 px-6 bg-black text-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-6">
          <div>
            <h2 className="text-4xl font-bold tracking-tighter">STIMATION 3D</h2>
            <p className="text-gray-400">Orbit to see other players' positions</p>
          </div>
        </div>

        <div className="w-full h-[650px] bg-zinc-900 rounded-xl overflow-hidden border border-white/5 shadow-2xl">
          <Canvas camera={{ position: [0, 10, 12], fov: 45 }} shadows>
            <fog attach="fog" args={['#111', 10, 30]} />
            <ambientLight intensity={0.4} />
            <spotLight position={[10, 15, 10]} angle={0.3} penumbra={1} castShadow />
            <pointLight position={[-10, -10, -10]} color="blue" intensity={1} />

            <Scene />

            <OrbitControls 
              enablePan={false}
              minDistance={8}
              maxDistance={20}
              maxPolarAngle={Math.PI / 2.1}
            />
          </Canvas>
        </div>
      </div>
    </section>
  );
}
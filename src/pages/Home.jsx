import React, { Suspense, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas,useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, Edges, useTexture, Text ,PerspectiveCamera ,  AsciiRenderer  } from '@react-three/drei';
import * as THREE from 'three'
import { Helmet } from 'react-helmet-async';
import Navbar from '../components/Navbar'
import ChessSection from '../components/ChessSection';
function King({ position, isWhite ,onClick}) {
  const texture = useTexture("https://mohamedsamir1919.github.io/portfolio/Linear_Gradient.png")


    const baseColor = isWhite ? "#ffffff" : "#0a0a0c";
  const glowColor = "#2563eb"; // Premium Electric Blue Accent
  
  // Luxury physical material maps
  const roughness = isWhite ? 0.05 : 0.3;
  const metalness = isWhite ? 0.95 : 0.1;

  return (

 <group position={[0, 0.6, 0]}>
          {/* Stately interlocking monolith architecture */}
          <mesh castShadow>
            <boxGeometry args={[0.32, 0.9, 0.32]} />
            <meshStandardMaterial color={isSelected ? glowColor : baseColor} roughness={roughness} metalness={metalness} />
            <Edges scale={1.01} color={isWhite ? "#cbd5e1" : "#1e293b"} />
          </mesh>
          {/* Minimalist Crown Finial */}
          <mesh position={[0, 0.5, 0]}>
            <boxGeometry args={[0.12, 0.12, 0.12]} />
            <meshStandardMaterial color={isSelected ? glowColor : baseColor} roughness={0.1} metalness={0.9} />
          </mesh>
        </group>
  );
}

// 1. The Board Component
function ChessBoard() {
  const [pos, setPos] = useState(null);
  const [rot,setRot] = useState(null);
  
  const texture = useTexture('https://mohamedsamir1919.github.io/portfolio/chess_board.png'); 

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>

      <boxGeometry args={[8, 8, 0.2]} /> 
      <meshStandardMaterial map={texture} />
    </mesh>
  );
}

function Pawn({ position , txt,isWhite, onClick}) {
  
  const textur3 = useTexture("https://mohamedsamir1919.github.io/portfolio/Linear_Gradient.png")
    const baseColor = isWhite ? "#ffffff" : "#0a0a0c";
  const glowColor = "#2563eb"; // Premium Electric Blue Accent
  
  // Luxury physical material maps
  const roughness = isWhite ? 0.05 : 0.3;
  const metalness = isWhite ? 0.95 : 0.1;

  return (
    <group>
   <mesh castShadow position={[0, 0.35, 0]}>
            <coneGeometry args={[0.18, 0.5, 4]} />
            <meshStandardMaterial color={isSelected ? glowColor : baseColor} roughness={roughness} metalness={metalness} />
            <Edges scale={1.01} color={isWhite ? "#cbd5e1" : "#1e293b"} />
          </mesh>
    </group>
  );
}


function Rook({ position, isWhite,onClick }) {
  const texture = useTexture("https://mohamedsamir1919.github.io/portfolio/Linear_Gradient.png")
    const baseColor = isWhite ? "#ffffff" : "#0a0a0c";
  const glowColor = "#2563eb"; // Premium Electric Blue Accent
  
  // Luxury physical material maps
  const roughness = isWhite ? 0.05 : 0.3;
  const metalness = isWhite ? 0.95 : 0.1;

  return (
    <group position={position} onClick={onClick} castShadow>
      {/* Base */}
       <mesh castShadow position={[0, 0.45, 0]}>
                <boxGeometry args={[0.36, 0.65, 0.36]} />
                <meshStandardMaterial color={isSelected ? glowColor : baseColor} roughness={roughness} metalness={metalness} />
                <Edges scale={1.01} color={isWhite ? "#cbd5e1" : "#1e293b"} />
              </mesh>
    </group>
  );
}
function Knight({ position,isWhite, onClick }) {
  const texture = useTexture('https://mohamedsamir1919.github.io/portfolio/Linear_Gradient.png'); 
    const baseColor = isWhite ? "#ffffff" : "#0a0a0c";
  const glowColor = "#2563eb"; // Premium Electric Blue Accent
  
  // Luxury physical material maps
  const roughness = isWhite ? 0.05 : 0.3;
  const metalness = isWhite ? 0.95 : 0.1;


  return (
    <group position={[0, 0.4, 0]}>
             {/* Asymmetric chiseled monolith */}
             <mesh castShadow rotation={[0, 0, 0.2]}>
               <boxGeometry args={[0.22, 0.6, 0.34]} />
               <meshStandardMaterial color={isSelected ? glowColor : baseColor} roughness={roughness} metalness={metalness} />
               <Edges scale={1.01} color={isWhite ? "#cbd5e1" : "#1e293b"} />
             </mesh>
           </group>
  );
}
function Bishop({ position,isWhite , onClick}) {
  const texture = useTexture("https://mohamedsamir1919.github.io/portfolio/Linear_Gradient.png")
      const baseColor = isWhite ? "#ffffff" : "#0a0a0c";
  const glowColor = "#2563eb"; // Premium Electric Blue Accent
  
  // Luxury physical material maps
  const roughness = isWhite ? 0.05 : 0.3;
  const metalness = isWhite ? 0.95 : 0.1;

  return (
    <mesh castShadow position={[0, 0.5, 0]} rotation={[0, Math.PI / 4, 0]}>
              <octahedronGeometry args={[0.28]} />
              <meshStandardMaterial color={isSelected ? glowColor : baseColor} roughness={roughness} metalness={metalness} />
              <Edges scale={1.01} color={isWhite ? "#cbd5e1" : "#1e293b"} />
            </mesh>
  );
}
function Queen({ position,isWhite ,onClick}) {
  const texture = useTexture("https://mohamedsamir1919.github.io/portfolio/Linear_Gradient.png")
       const baseColor = isWhite ? "#ffffff" : "#0a0a0c";
  const glowColor = "#2563eb"; // Premium Electric Blue Accent
  
  // Luxury physical material maps
  const roughness = isWhite ? 0.05 : 0.3;
  const metalness = isWhite ? 0.95 : 0.1;

  return (
     <group position={[0, 0.55, 0]}>
             {/* Slender, multi-faceted fluted pillar */}
             <mesh castShadow>
               <cylinderGeometry args={[0.24, 0.16, 0.8, 8]} />
               <meshStandardMaterial color={isSelected ? glowColor : baseColor} roughness={roughness} metalness={metalness} />
               <Edges scale={1.01} color={isWhite ? "#cbd5e1" : "#1e293b"} />
             </mesh>
             <mesh position={[0, 0.46, 0]}>
               <sphereGeometry args={[0.06, 8, 8]} />
               <meshStandardMaterial color={isSelected ? glowColor : baseColor} roughness={0.0} metalness={1.0} />
             </mesh>
           </group>
  );
}


const buildInitialBoardState = ()=> {
  const dataset = [
    // Black Base Matrix (z = 0)
    { id: "b-r1", type: "rook", isWhite: false, x: 0, z: 0 },
    { id: "b-n1", type: "knight", isWhite: false, x: 1, z: 0 },
    { id: "b-b1", type: "bishop", isWhite: false, x: 2, z: 0 },
    { id: "b-q",  type: "queen", isWhite: false, x: 3, z: 0 },
    { id: "b-k",  type: "king", isWhite: false, x: 4, z: 0 },
    { id: "b-b2", type: "bishop", isWhite: false, x: 5, z: 0 },
    { id: "b-n2", type: "knight", isWhite: false, x: 6, z: 0 },
    { id: "b-r2", type: "rook", isWhite: false, x: 7, z: 0 },
    
    // White Base Matrix (z = 7)
    { id: "w-r1", type: "rook", isWhite: true, x: 0, z: 7 },
    { id: "w-n1", type: "knight", isWhite: true, x: 1, z: 7 },
    { id: "w-b1", type: "bishop", isWhite: true, x: 2, z: 7 },
    { id: "w-q",  type: "queen", isWhite: true, x: 3, z: 7 },
    { id: "w-k",  type: "king", isWhite: true, x: 4, z: 7 },
    { id: "w-b2", type: "bishop", isWhite: true, x: 5, z: 7 },
    { id: "w-n2", type: "knight", isWhite: true, x: 6, z: 7 },
    { id: "w-r2", type: "rook", isWhite: true, x: 7, z: 7 },
  ];

  for (let col = 0; col < 8; col++) {
    dataset.push({ id: `b-p${col}`, type: "pawn", isWhite: false, x: col, z: 1 });
    dataset.push({ id: `w-p${col}`, type: "pawn", isWhite: true, x: col, z: 6 });
  }
  return dataset;
};

// 3. The Main Scene
export default function Home() {
   
const [selectedData, setSelectedData] = useState(null);

  
  const personalInfo = {
    name: "Mohamed Samir",
    birthYear: "1998",
    location: "10th of Ramadan City, Egypt",
    github: "github.com/mohamedsamir1919" // Update with your actual link
  };

const [isMobile, setIsMobile] = useState()
   useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', handleResize)
    
    handleResize();
    return () => window.removeEventListener('resize', handleResize)
  }, []) 






 const [pieces, setPieces] = useState(buildInitialBoardState());
  const [selectedId, setSelectedId] = useState(null);

  const handleSelectPiece = (id, event) => {
    event.stopPropagation();
    setSelectedId(id === selectedId ? null : id);
  };

  const handleGridSquareClick = (targetX, targetZ) => {
    if (selectedId) {
      setPieces((currentSet) =>
        currentSet.map((item) =>
          item.id === selectedId ? { ...item, x: targetX, z: targetZ } : item
        )
      );
      setSelectedId(null);
    }
  };

  return (
    <div style={{ width: '100vw', height: '100vh',  position: 'relative' }} 
    className="relative bg-gradient-to-tr from-gray-900 to-black">
      <Helmet>
        <title>Mohamed Samir | Chess Portfolio & MERN Developer</title>
        <meta name="description" content="Portfolio of Mohamed Samir, a Software Engineer specializing in MERN stack, Three.js, and network auditing." />
        <link rel="canonical" href="https://MohamedSamir1919.github.io/portfolio" />
      </Helmet>
      <Navbar className="z-[1000]"/>
     

<ChessSection pieces={pieces} className="z-[10]" onSelectPiece={handleSelectPiece} onGridSquareClick={handleGridSquareClick} />

     
    </div>
  );
}





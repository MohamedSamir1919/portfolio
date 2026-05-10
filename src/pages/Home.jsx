import React, { Suspense, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas,useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, useTexture, Text ,PerspectiveCamera ,  AsciiRenderer  } from '@react-three/drei';
import * as THREE from 'three'
import { Helmet } from 'react-helmet-async';
import Navbar from '../components/Navbar'
function King({ position, color = "black" ,onClick}) {
  const texture = useTexture("Linear_Gradient.png")

  return (
    <group position={position} onClick={onClick} castShadow>
      {/* 1. Large Stable Base */}
      <mesh position={[0, 0.1, 0]}>
        <cylinderGeometry args={[0.45, 0.45, 0.2, 32]} />
        <meshStandardMaterial map={texture} roughness={0.3} />
      </mesh>

      {/* 2. Main Body */}
      <mesh position={[0, 0.9, 0]}>
        <cylinderGeometry args={[0.22, 0.42, 1.6, 32]} />
        <meshStandardMaterial map={texture} roughness={0.3} />
      </mesh>

      {/* 3. Decorative Neck Ring */}
      <mesh position={[0, 1.45, 0]}>
        <torusGeometry args={[0.25, 0.05, 16, 32]} rotation={[Math.PI / 2, 0, 0]} />
        <meshStandardMaterial map={texture} />
      </mesh>

      {/* 4. The Crown Base */}
      <mesh position={[0, 1.8, 0]}>
        <cylinderGeometry args={[0.28, 0.15, 0.4, 32]} />
        <meshStandardMaterial map={texture} />
      </mesh>

      {/* 5. The "M" Topper */}
      <group position={[0, 2.1, 0]}>
        <Text
          color={"white"}
          fontSize={0.4}
          maxWidth={200}
          lineHeight={1}
          letterSpacing={0.02}
          textAlign="center"
          // font="https://fonts.gstatic.com/s/robotoslab/v7/B04b38zW-v7zbc9G_S63vS8.woff" // You can use any font URL
          anchorX="center"
          anchorY="middle"
        >
          M
        </Text>
        
        {/* Connection Pin */}
        <mesh position={[0, -0.15, 0]}>
          <cylinderGeometry args={[0.04, 0.04, 0.1, 16]} />
          <meshStandardMaterial map={texture} />
        </mesh>
      </group>
    </group>
  );
}

// 1. The Board Component
function ChessBoard() {
  // Replace 'board_texture.png' with your OpenCV generated image path
  const [pos, setPos] = useState(null);
  const [rot,setRot] = useState(null);
  // useFrame((state) => {
  //   const { position, rotation } = state.camera;

  //   const zoom = state.camera.zoom;
  //   setPos(position)
  //   setRot(rotation)
  //   // "احداثيات" (Coordinates)
  //   console.log(`X: ${position.x}, Y: ${position.y}, Z: ${position.z}`);
  //   console.log(`Zoom level: ${zoom}`);
  // });
  
  const texture = useTexture('/chess_board.png'); 

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>

      <boxGeometry args={[8, 8, 0.2]} /> 
      <meshStandardMaterial map={texture} />
    </mesh>
  );
}

// 2. A Simple Procedural Pawn (Built with Cylinder + Sphere)
function Pawn({ position , txt, onClick}) {
const texture = useTexture('/ninja_texture.png');
const texture2 = useTexture('/ninja_texture_body.png');
  const textur3 = useTexture("Linear_Gradient.png")

  return (
    <group position={position} onClick={onClick}   castShadow>
      <Text
        position={[0, 1.5, 0]} // Positioned above the head (which is at y=1)
        fontSize={0.2}
        color="black"
        anchorX="center"
        anchorY="middle"
        // Optional: keeps text facing the camera
        // onBeforeRender={(renderer) => renderer.autoClear = false} 
      className="text-bold"
      >
        {txt}
      </Text>
      {/* Base */}
      <mesh position={[0, 0.1, 0]}>
        <cylinderGeometry args={[0.4, 0.4, 0.2, 32]} />
        <meshStandardMaterial color="black" map={textur3}  />
      </mesh>
      {/* Body */}
      <mesh rotation={[0, -Math.PI , 0]}  position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.2, 0.4, 0.8, 32]} />
        <meshStandardMaterial  map={textur3}
        // map={body_texture} transparent={true} side={THREE.DoubleSide}
        />
      </mesh>
      {/* Head */}
      <mesh rotation={[0, -Math.PI / 2, 0]} position={[0, 1,0]}>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial map={textur3}
        //  map={texture} transparent={true} side={THREE.DoubleSide}
         />
      </mesh>
    </group>
  );
}


function Rook({ position, color = "black",onClick }) {
  const texture = useTexture("Linear_Gradient.png")

  return (
    <group position={position} onClick={onClick} castShadow>
      {/* Base */}
      <mesh position={[0, 0.1, 0]}>
        <cylinderGeometry args={[0.4, 0.4, 0.2, 32]} />
        <meshStandardMaterial map={texture} />
      </mesh>
      {/* Body */}
      <mesh position={[0, 0.6, 0]}>
        <cylinderGeometry args={[0.3, 0.3, 1, 32]} />
        <meshStandardMaterial map={texture} />
      </mesh>
      {/* Top Part */}
      <mesh position={[0, 1.1, 0]}>
        <cylinderGeometry args={[0.35, 0.35, 0.2, 6]} /> {/* سداسي ليعطي شكل القلعة */}
        <meshStandardMaterial map={texture} />
      </mesh>
    </group>
  );
}
function Knight({ position, color = "black", onClick }) {
  const texture = useTexture('/Linear_Gradient.png'); 

  return (
    <group position={position} onClick={onClick} castShadow>
      {/* Base */}
      <mesh position={[0, 0.1, 0]}>
        <cylinderGeometry args={[0.42, 0.42, 0.2, 32]} />
        <meshStandardMaterial map={texture} />
      </mesh>

      {/* Lower Body/Chest */}
      <mesh position={[0, 0.5, 0]} rotation={[0.2, 0, 0]}>
        <cylinderGeometry args={[0.25, 0.35, 0.8, 32]} />
        <meshStandardMaterial map={texture} />
      </mesh>

      {/* Neck - Angled forward */}
      <mesh position={[0, 1.1, 0.1]} rotation={[-0.5, 0, 0]}>
        <boxGeometry args={[0.3, 0.7, 0.4]} />
        <meshStandardMaterial map={texture} />
      </mesh>

      {/* Head - Facing forward */}
      <mesh position={[0, 1.4, 0.3]} rotation={[-0.2, 0, 0]}>
        <boxGeometry args={[0.3, 0.3, 0.6]} />
        <meshStandardMaterial map={texture} />
      </mesh>

      {/* Ears */}
      <mesh position={[0.1, 1.6, 0.1]}>
        <boxGeometry args={[0.08, 0.15, 0.08]} />
        <meshStandardMaterial map={texture} />
      </mesh>
      <mesh position={[-0.1, 1.6, 0.1]}>
        <boxGeometry args={[0.08, 0.15, 0.08]} />
        <meshStandardMaterial map={texture} />
      </mesh>
    </group>
  );
}
function Bishop({ position, color = "black" , onClick}) {
  const texture = useTexture("Linear_Gradient.png")
  return (
    <group position={position} onClick={onClick} castShadow>
      {/* Base - Slightly wider than the Rook */}
      <mesh position={[0, 0.1, 0]}>
        <cylinderGeometry args={[0.42, 0.42, 0.2, 32]} />
        <meshStandardMaterial map={texture} />
      </mesh>

      {/* Main Body - Tapered (thinner at the top) */}
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.2, 0.35, .5, 32]} />
        <meshStandardMaterial map={texture} />
      </mesh>

      {/* Neck Collar - A small ring before the head */}
      <mesh position={[0, 1.3, 0]}>
        <torusGeometry args={[0.15, 0.05, 16, 32]} rotation={[Math.PI / 2, 0, 0]} />
        <meshStandardMaterial map={texture} />
      </mesh>

      {/* Head - The "Miter" shape */}
      <mesh position={[0, 1, 0]}>
        <sphereGeometry args={[0.25, 32, 32]} />
        <meshStandardMaterial map={texture} />
      </mesh>

      {/* Top Tip (The small ball on top) */}
      <mesh position={[0, 1.3, 0]}>
        <sphereGeometry args={[0.07, 16, 16]} />
        <meshStandardMaterial map={texture} />
      </mesh>
    </group>
  );
}
function Queen({ position, color = "black" ,onClick}) {
  const texture = useTexture("Linear_Gradient.png")
  return (
    <group position={position} onClick={onClick} castShadow>
      {/* 1. The Base */}
      <mesh position={[0, 0.1, 0]}>
        <cylinderGeometry args={[0.45, 0.45, 0.2, 32]} />
        <meshStandardMaterial map={texture} />
      </mesh>

      {/* 2. The Main Body - Tall and Slender */}
      <mesh position={[0, 0.85, 0]}>
        <cylinderGeometry args={[0.2, 0.4, 1.5, 32]} />
        <meshStandardMaterial map={texture} />
      </mesh>

      {/* 3. The Decorative Collar (Waist) */}
      <mesh position={[0, 1.3, 0]}>
        <torusGeometry args={[0.22, 0.04, 16, 32]} rotation={[Math.PI / 2, 0, 0]} />
        <meshStandardMaterial map={texture} />
      </mesh>

      {/* 4. The Head (Crown Base) */}
      <mesh position={[0, 1.7, 0]}>
        <sphereGeometry args={[0.28, 32, 32]} />
        <meshStandardMaterial map={texture} />
      </mesh>

      {/* 5. The Coronet Top - A small sphere or spike */}
      <mesh position={[0, 1.95, 0]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial map={texture} />
      </mesh>
    </group>
  );
}

// 3. The Main Scene
export default function Home() {
   
const [selectedData, setSelectedData] = useState(null);

  
  const personalInfo = {
    name: "Mohamed Samir",
    birthYear: "1998",
    location: "10th of Ramadan City, Egypt",
    github: "github.com/yourusername" // Update with your actual link
  };

const [isMobile, setIsMobile] = useState()
   useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', handleResize)
    
    handleResize();
    return () => window.removeEventListener('resize', handleResize)
  }, []) 
  return (
    <div style={{ width: '100vw', height: '100vh',  position: 'relative' }} 
    className="bg-gradient-to-tr relative from-blue-300 to-green-300">
      <Helmet>
        <title>Mohamed Samir | Chess Portfolio & MERN Developer</title>
        <meta name="description" content="Portfolio of Mohamed Samir, a Software Engineer specializing in MERN stack, Three.js, and network auditing." />
        <link rel="canonical" href="https://MohamedSamir1919.github.io/portfolio" />
      </Helmet>
      <Navbar/>
     <div className='absolute top-[100px] left-[10px]'>
      <h1>Rule: <b>Portfolio</b></h1>
      <h1>Name: <b>Mohamed Nasef</b></h1>
     </div>
      {/* 2D UI Overlay */}
      <AnimatePresence>
     
        {selectedData && (
          <motion.div 
            initial={{ scale: 0, opacity: 0, x: "-50%", y: "-50%" }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            style={{
              position: 'absolute', top: '50%', left: '50%',
              zIndex: 10, background: 'rgba(255, 255, 255, 0.9)',
              padding: '20px', borderRadius: '15px', minWidth: '300px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.5)', color: '#333'
            }}
          >
            <button onClick={() => setSelectedData(null)} style={{ float: 'right', cursor: 'pointer' }} className='ml-'>X</button>
            
            {selectedData.type == 'whatsapp' ?
             (<div><a href={`https://wa.me/201026457619`} target="blank">Whatsme</a></div>) 
              :selectedData.type === 'personal' ? (
              <div>
                <h2 style={{ margin: 0 }} className='bg-blue-400 mt-4 '>{selectedData.name}</h2>
                <p><b>Born:</b> {selectedData.birthYear}</p>
                <p><b>From:</b> {selectedData.location}</p>
                <a href={`https://${selectedData.github}`} target="_blank" rel="noreferrer">GitHub Profile</a>
              </div>
            ) :selectedData.type == 'email'?             (<div><a href="mailto:mohamed.nasef1919@gmail.com?subject=Project%20Inquiry">
  Send me an email
</a></div>) 

            : selectedData.type == 'frappe'?(
               <div className="flex flex-col justify-center">

                <div className="">
                <h1 className="bg-blue-400">Frappe</h1>
                </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr ', gap: '10px' }}>
                    <p>
                      Using frappe framework for develope systems in web app, devolope erpnext, hrms, ...etc
                      it's work in python for backend and javascript, it's simple with full solving problems
                    </p>
</div>
              </div>
            ):selectedData.type === 'MERN'?(
               <div className="flex flex-col justify-center">

                <div className="">
                <h1 className="bg-blue-400">Mern stack</h1>
                </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '10px' }}>
                    <p>
                      using mongodb,express server, react.js, and node.js for building and developing simple solutions for any problem in some web app
                      </p>
</div>
              </div>
            ):selectedData.type === 'react-native'?(
               <div className="flex flex-col justify-center">

                <div className="">
                <h1 className="bg-blue-400">React Native</h1>
                </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '10px' }}>
                    <p>
                      it's some good framework to build mobile apps, it's using react.js
                      </p>
</div>
              </div>
            ):selectedData.type === 'bettercap'?(
               <div className="flex flex-col justify-center">

                <div className="">
                <h1 className="bg-blue-400">bettercap</h1>
                </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '10px' }}>
                    <p>
                    it's some app for ManInTheMiddle attack,
                     not proffisional but can make arp spoof, and sniff packets
                      can using scapy and socket libraries in python, scapy is awesome lib
                     </p>
</div>
              </div>
            ):selectedData.type === 'Network'?(
               <div className="flex flex-col justify-center">

                <div className="">
                <h1 className="bg-blue-400">Network</h1>
                </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '10px' }}>
                    <p>
                     Can use wireshark, but I see scapy good, or socket, 
                     it's depend on what layer you will built on in your project
                      I know some about CSI, it's have electromagnatic waves infos,

                      </p>
</div>
              </div>
            ):selectedData.type === 'THREE.js'?(
               <div className="flex flex-col justify-center">

                <div className="">
                <h1 className="bg-blue-400">Design</h1>
                </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '10px' }}>
                    <p>
                      
                     three.js in javascript, python opencv, blender python "not very good",
                      </p>
</div>
              </div>
            ):selectedData.type === 'top'?(
               <div className="flex flex-col justify-center">

                <div className="">
                <h1 className="bg-blue-200">Working on...</h1>
                </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '10px' }}>
                    <p>
                      I working on some project, the effect of sound, light and electromagnatic waves, but need to build my lab , buy some tools,
                       so it's long project plan

                      
                      </p>
</div>
              </div>
            ):(

              <div className="flex flex-col justify-center">

                <div className="">
                <h1 className="">Skills</h1>
                </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                {selectedData.skills.map((s, i) => (
                  <div key={i} style={{ border: '1px solid #ddd', padding: '5px', borderRadius: '5px' }}>
                    <h4 style={{ margin: '0 0 5px 0', fontSize: '12px' }}>{s.title}</h4>
                    <p style={{ fontSize: '10px', margin: 0 }}>{s.desc}</p>
                  </div>
                ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <Canvas camera={{ position: [50, 10, 25], fov: isMobile ? 20 : 10 }} shadows>
        
        <OrbitControls />
        <ambientLight intensity={1} />
        <pointLight position={[10, 10, 10]} castShadow />
        
        <Suspense fallback={null}>
          <ChessBoard />
          {/* Add onClick to the King */}
          <King 
            position={[.5, .1, -3.5]} 
            onClick={() => setSelectedData({ type: 'personal', ...personalInfo })} 
          />
          <Bishop 
          position={[1.5, .1, -3.5]} 
            onClick={() => setSelectedData({ type: 'bettercap', ...personalInfo })} 
          />
           <Bishop 
          position={[-1.5, .1, -3.5]} 
            onClick={() => setSelectedData({ type: 'Network', ...personalInfo })} 
          />
          <Knight
            position={[2.5, .1, -3.5]} 
            onClick={() => setSelectedData({ type: 'react-native', ...personalInfo })} 
          />
          <Knight
            position={[-2.5, .1, -3.5]} 
            onClick={() => setSelectedData({ type: 'THREE.js', ...personalInfo })} 
          />
          <Pawn txt="whatsapp" 
          
            onClick={() => setSelectedData({ type: 'whatsapp'   })} 
          position={[.5,.1,-2.5]}/>
          <Pawn
          txt="email" position={[-.5,.1,-2.5]}
            onClick={() => setSelectedData({ type: 'email'   })} 
          />

          <Rook
        onClick={() => setSelectedData({ type: 'frappe'   })} 

           position={[-3.5, .1, -3.5]}/>
          <Rook
            onClick={() => setSelectedData({ type: 'MERN'})} 
          
           position={[3.5, .1, -3.5]}/>
          <Queen 
            onClick={() => setSelectedData({ type: 'top'   })} 
          
          position={[-.5, .1, -3.5]}/>
          
        </Suspense>
      </Canvas>
    </div>
  );
}
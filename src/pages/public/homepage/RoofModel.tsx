import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Text } from '@react-three/drei';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

// Type guard for THREE.Mesh
function isMesh(obj: any): obj is THREE.Mesh {
  return obj && obj.isMesh === true && obj.material;
}

function Model() {
  const { scene } = useGLTF('royalty3d.glb');

  React.useEffect(() => {
    scene.traverse((child) => {
      if (isMesh(child)) {
        // Ensure material is a MeshStandardMaterial or compatible
        if ((child.material as any).color) {
          (child.material as any).color = new THREE.Color('#1C1C1C');
        }
        if ('metalness' in child.material) {
          (child.material as any).metalness = 0.9;
        }
        if ('roughness' in child.material) {
          (child.material as any).roughness = 0.11;
        }
        if ('needsUpdate' in child.material) {
          (child.material as any).needsUpdate = true;
        }
      }
    });
  }, [scene]);

  return <primitive object={scene} scale={[0.17, 0.17, 0.17]} position={[0, 1, -4]} />;
}

const RoofModel = () => {
  const [showInteractionHint, setShowInteractionHint] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowInteractionHint(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col md:flex-row">
      <div className="w-full md:w-3/5 relative bg-gray-600" style={{ height: '100vh' }}>
        <Canvas 
          camera={{ position: [5, 10, 5], fov: 50 }} 
          style={{ height: '100%', background: 'transparent' }}
        >
          <Suspense fallback={null}>
            <Model />
            <OrbitControls 
              enableDamping 
              dampingFactor={0.05} 
              enableZoom={false} 
              target={[0, 1, 0]}
            />
            <ambientLight intensity={0.8} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} />
            <pointLight position={[-10, -10, -10]} intensity={1000} />
            <directionalLight position={[5, 5, 5]} intensity={100} />
            {/* hemisphereLight props fixed: use 'args' for colors */}
            <hemisphereLight args={['#ffffff', '#444444', 1]} />
            <rectAreaLight
              width={10}
              height={10}
              intensity={5}
              position={[0, 2, 0]}
              lookAt={[0, 1, 0]}
            />
            <pointLight position={[10, -10, 10]} intensity={1.5} />
            <pointLight position={[-5, 5, -5]} intensity={9000} />
            <directionalLight position={[-5, -5, -5]} intensity={500} />
            <rectAreaLight
              width={5}
              height={5}
              intensity={5}
              position={[0, -4, 0]}
              lookAt={[0, 1, 0]}
            />
            <pointLight position={[5, 0, 5]} intensity={1} />
            <spotLight position={[10, -10, -10]} angle={0.4} penumbra={0.8} intensity={2} />
            <Text
              position={[0, 4, 0]}
              fontSize={0.5}
              color="#111827"
              anchorX="center"
              anchorY="middle"
            >
              Royalty Tilespan Roofing
            </Text>
          </Suspense>
        </Canvas>
        <AnimatePresence>
          {showInteractionHint && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-70 text-white px-4 py-2 rounded-full text-sm"
            >
              Click and drag to rotate the 3D model
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="w-full md:w-2/5 p-8 flex items-center bg-gradient-to-br from-gray-200 to-gray-400 rounded-lg shadow-xl">
        <div className="max-w-lg mx-auto">
          <h2 className="text-5xl font-extrabold mb-6 text-gray-900 leading-tight">
            Royalty Tilespan <span className="text-[#F71F27]">Roofing</span>
          </h2>
          <p className="text-xl text-gray-700 mb-8 leading-relaxed">
            Experience the pinnacle of roofing technology with our Royalty Tilespan Roofing. 
            This innovative solution combines:
          </p>
          <ul className="grid grid-cols-2 gap-4 text-gray-700 mb-8">
            <li className="flex items-center">
              <svg className="w-6 h-6 mr-2 text-[#F71F27]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Unmatched durability
            </li>
            <li className="flex items-center">
              <svg className="w-6 h-6 mr-2 text-[#F71F27]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Elegant style
            </li>
            <li className="flex items-center">
              <svg className="w-6 h-6 mr-2 text-[#F71F27]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Superior energy efficiency
            </li>
            <li className="flex items-center">
              <svg className="w-6 h-6 mr-2 text-[#F71F27]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Advanced weather resistance
            </li>
          </ul>
          <p className="text-xl text-gray-700 mb-8 leading-relaxed">
            Designed to withstand harsh conditions while maintaining its aesthetic appeal, 
            Royalty Tilespan Roofing is the perfect choice for discerning homeowners who demand excellence.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <Link to="/products" className="bg-[#F71F27] text-white px-8 py-4 rounded-full font-bold hover:bg-red-700 transition duration-300 inline-flex items-center justify-center shadow-lg transform hover:scale-105">
              Learn More
              <svg className="w-6 h-6 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            <Link to="/quotation-form" className="bg-white text-[#F71F27] border-2 border-[#F71F27] px-8 py-4 rounded-full font-bold hover:bg-gray-100 transition duration-300 inline-flex items-center justify-center shadow-lg transform hover:scale-105">
              Request Quote
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoofModel;

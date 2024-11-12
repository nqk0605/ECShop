import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

const ModelViewer = ({ ModelComponent }) => {
    return (
        <Canvas style={{ width: '100%', height: '100%' }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} castShadow={true} />
            <pointLight position={[-10, -10, -5]} intensity={1} />
            <OrbitControls enableZoom={true} />
            <ModelComponent />
        </Canvas>
    );
};

export default ModelViewer;

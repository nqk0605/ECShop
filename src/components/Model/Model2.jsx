import React, { useEffect, useRef } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

function Model2() {
    const { scene, animations } = useGLTF('/model2.glb');
    const { actions } = useAnimations(animations, scene);
    const modelRef = useRef();

    useEffect(() => {
        if (actions && animations.length > 0) {
            actions[animations[0].name].play();
        }
    }, [actions, animations]);

    useFrame(() => {
        if (modelRef.current) {
            modelRef.current.rotation.y += 0.005;
        }
    });

    return <primitive ref={modelRef} object={scene} scale={0.3} position={[0, -1, 0]} />;
}

export default Model2;

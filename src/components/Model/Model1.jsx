import React, { useEffect, useRef } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

function Model1() {
    const { scene, animations } = useGLTF('/model.glb');
    const { actions } = useAnimations(animations, scene);
    const modelRef = useRef();

    useEffect(() => {
        if (actions && animations.length > 0) {
            actions[animations[0].name].play();
        }
    }, [actions, animations]);

    useFrame(() => {
        if (modelRef.current) {
            modelRef.current.rotation.y += 0.01;
        }
    });

    return <primitive ref={modelRef} object={scene} scale={1.5} position={[0, -1, 0]} />;
}

export default Model1;

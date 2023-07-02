'use client';

import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Model from "./Model";

export default function Scene () {
    return (
        <div className="w-fit h-fit sm:w-1/3 sm:h-1/3 fixed z-10 right-[-100px] sm:left-[-200px] bottom-10">
            <Canvas shadows>
                <OrbitControls enableZoom={false} enableRotate={false} />
                <ambientLight intensity={.15} position={[0.07, 0.6, -1.5]} />
                <pointLight intensity={2} position={[0, 0, -1000]} />
                <directionalLight 
                    position={[1.091, 5.913, 10.491]}
                    intensity={.9}
                    shadow-mapSize-width={1024}
                    shadow-mapSize-height={1024}
                    castShadow
                />
                <Model receiveShadow castShadow position={[1.5, -4, -1.8]} rotation={[0, -.2, 0]} scale={8} />
            </Canvas>
        </div>
    )
}
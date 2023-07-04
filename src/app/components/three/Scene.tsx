'use client';

import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import Loading from "./Loading";
import Model from "./Model";

export default function Scene ({ page }: { page: string}) {
    return (
        <div className={`${page === 'home' ? 'w-fit h-fit lg:w-1/2 lg:h-1/2 mx-auto' : 'bottom-10 right-0 w-fit h-fit sm:w-1/3 sm:h-1/3 fixed'} z-10 `}>
            <Canvas shadows>
                <Suspense fallback={<Loading />}>
                    <OrbitControls enableZoom={false}  
                        enableRotate={page === 'blog' ? false : true}
                        minAzimuthAngle={-Math.PI / 4}
                        maxAzimuthAngle={Math.PI / 4}
                        minPolarAngle={Math.PI / 7}
                        maxPolarAngle={Math.PI * 0.5}
                    />
                    <ambientLight intensity={.15} position={[0.07, 0.6, -1.5]} />
                    <pointLight intensity={2} position={[0, 0, -1000]} />
                    <directionalLight 
                        position={[1.091, 5.913, 10.491]}
                        intensity={.9}
                        shadow-mapSize-width={1024}
                        shadow-mapSize-height={1024}
                        castShadow
                    />
                    <Model receiveShadow castShadow position={[1.5, -4, -1.8]} rotation={[0, -.2, 0]} scale={8} page={page} />
                </Suspense>
            </Canvas>
        </div>
    )
}
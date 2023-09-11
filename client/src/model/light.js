import * as THREE from "three";
export const addLight = (scene) => {
    const ambientLight = new THREE.AmbientLight(0x999999); // soft white light
    scene.add(ambientLight);

    const spotLight = new THREE.PointLight(0xffffff, 300, 30, 2);
    spotLight.position.set(2, 10, 3);
    scene.add(spotLight);
};

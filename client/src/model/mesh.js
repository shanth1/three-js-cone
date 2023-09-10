import * as THREE from "three";

export const getMesh = () => {
    const geometry = new THREE.ConeGeometry(2, 4, 10);
    const material = new THREE.MeshNormalMaterial();
    const cone = new THREE.Mesh(geometry, material);

    return cone;
};

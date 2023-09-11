import * as THREE from "three";

export const getMesh = (vertices, indices) => {
    const geometry = new THREE.BufferGeometry();

    geometry.setIndex(indices);
    geometry.setAttribute("position", new THREE.BufferAttribute(vertices, 3));
    geometry.computeVertexNormals();

    const material = new THREE.MeshLambertMaterial({
        color: 0xff0000,
        side: THREE.DoubleSide,
    });
    const mesh = new THREE.Mesh(geometry, material);

    const wireframe = new THREE.WireframeGeometry(geometry);
    const line = new THREE.LineSegments(wireframe);

    const group = new THREE.Group();
    group.add(mesh);
    group.add(line);

    return group;
};

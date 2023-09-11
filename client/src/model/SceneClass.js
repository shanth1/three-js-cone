import * as THREE from "three";

export class SceneClass {
    constructor(width, height, element) {
        this.renderer = new THREE.WebGLRenderer({
            alpha: false,
            powerPreference: "high-performance",
        });
        this.renderer.setSize(width, height);

        element.appendChild(this.renderer.domElement);

        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(
            75,
            width / height,
            0.1,
            1000,
        );
        this.camera.position.y = 6;
        this.camera.position.z = 1;
        this.camera.rotation.x = -Math.PI / 2;
        this.camera.rotation.z = -Math.PI;
    }

    addMesh(vertices, indices) {
        const geometry = new THREE.BufferGeometry();

        geometry.setIndex(indices);
        geometry.setAttribute(
            "position",
            new THREE.BufferAttribute(vertices, 3),
        );
        geometry.computeVertexNormals();

        const material = new THREE.MeshLambertMaterial({
            color: 0xff0000,
            // side: THREE.DoubleSide,
        });
        const cone = new THREE.Mesh(geometry, material);

        const wireframe = new THREE.WireframeGeometry(geometry);
        const line = new THREE.LineSegments(wireframe);

        this.group = new THREE.Group();
        this.group.add(cone);
        this.group.add(line);
        this.scene.add(this.group);

        this._render();
    }

    updateMesh(vertices, indices) {
        if (this.group) this.group.removeFromParent();
        this.addMesh(vertices, indices);
    }

    addLight() {
        const ambientLight = new THREE.AmbientLight(0x999999);
        this.scene.add(ambientLight);

        const spotLight = new THREE.PointLight(0xffffff, 300, 30, 2);
        spotLight.position.set(2, 10, 3);
        this.scene.add(spotLight);
    }

    updateScene(width, height) {
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(width, height);
    }

    _animate = () => {
        requestAnimationFrame(this._animate);
        if (this.group) {
            this.group.rotation.x += 0;
            this.group.rotation.y += 0;
            this.group.rotation.z += 0.03;
            this._render();
        } else {
            this._render();
        }
    };

    start() {
        this._animate();
    }

    _render() {
        this.renderer.render(this.scene, this.camera);
    }
}

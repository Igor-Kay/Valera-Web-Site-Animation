import * as THREE from "three";
import { RectanglePlane } from "./RectanglePlane.js";

export class SceneManager {
  constructor() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.renderer = new THREE.WebGLRenderer({ antialias: true });

    this.init();
  }

  init() {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setClearColor(0xffffff);
    document.body.appendChild(this.renderer.domElement);

    this.camera.position.set(0, 0, 700);
    this.camera.rotation.set(0, 0, 0);

    const light = new THREE.AmbientLight(0xffffff, 1.5);
    this.scene.add(light);

    this.scene.add(new THREE.AxesHelper(5));

    this.rectanglePlane = new RectanglePlane(
      window.innerWidth,
      window.innerHeight,
      0x808080
    );
    this.scene.add(this.rectanglePlane.getMesh());

    window.addEventListener("resize", () => this.onWindowResize(), false);
    this.animate();
  }

  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    this.rectanglePlane = new RectanglePlane(
      window.innerWidth,
      window.innerHeight,
      0x808080
    );
    this.scene.add(this.rectanglePlane.getMesh());
  }

  animate() {
    requestAnimationFrame(() => this.animate());
    this.renderer.render(this.scene, this.camera);
  }

  async animatePlaneUp() {
    const targetY = 0;
    const targetRotation = 0;
    const duration = 1000;

    await this.rectanglePlane.animateToPosition(
      targetY,
      targetRotation,
      duration
    );
  }
}

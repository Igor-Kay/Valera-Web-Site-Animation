import * as THREE from "three";
import { RectanglePlane } from "./RectanglePlane.js";

export class SceneManager {
  constructor() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      10000
    );
    this.renderer = new THREE.WebGLRenderer({ antialias: true });

    this.init();
  }

  init() {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setClearColor(0xffffff);
    document.body.appendChild(this.renderer.domElement);

    this.rectanglePlane = new RectanglePlane(
      window.innerWidth,
      window.innerHeight,
      0x808080
    );
    this.scene.add(this.rectanglePlane.getMesh());

    this.adjustCamera();
    
    const light = new THREE.AmbientLight(0xffffff, 1.5);
    this.scene.add(light);

    window.addEventListener("resize", () => this.onWindowResize(), false);
    this.animate();
  }

  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    this.adjustCamera();
  }

  adjustCamera() {
    const width = this.rectanglePlane.width;
    const height = this.rectanglePlane.height;

    const fovRad = (this.camera.fov * Math.PI) / 180;
    const distance = height / 2 / Math.tan(fovRad / 2);

    this.camera.position.set(0, 0, distance);
    this.camera.lookAt(0, 0, 0);
  }

  animate() {
    requestAnimationFrame(() => this.animate());
    this.renderer.render(this.scene, this.camera);
  }

  async animatePlaneUp() {
    await this.rectanglePlane.animateRotateAndMoveAndScale();
  }
}

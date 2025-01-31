import * as THREE from "three";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";

export class RectanglePlane {
  constructor(width, height, color, borderRadius = 0.2) {
    this.color = color;

    const aspectRatio = 3.82 / 2.46;

    this.width = window.innerWidth * 0.95;
    this.height = window.innerHeight * 0.95;

    this.geometry = new RoundedBoxGeometry(
      this.width,
      this.height,
      0.08,
      8,
      borderRadius
    );
    this.material = new THREE.MeshStandardMaterial({
      color: this.color,
      side: THREE.DoubleSide,
    });

    this.mesh = new THREE.Mesh(this.geometry, this.material);

    this.mesh.position.set(0, -(this.height * 0.85), 8);

    this.mesh.rotation.set(0.06, 0, 0);
  }

  getMesh() {
    return this.mesh;
  }

  animateToPosition(targetY, targetRotation, duration) {
    return new Promise((resolve) => {
      const startY = this.mesh.position.y;
      const startRotation = this.mesh.rotation.x;
      const startTime = performance.now();

      const animate = (currentTime) => {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);

        this.mesh.position.y = startY + (targetY - startY) * progress;
        this.mesh.rotation.x =
          startRotation + (targetRotation - startRotation) * progress;

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          resolve();
        }
      };

      requestAnimationFrame(animate);
    });
  }
}

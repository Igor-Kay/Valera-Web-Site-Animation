import * as THREE from "three";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";

function easeOut(t) {
  return 1 - Math.pow(1 - t, 3);
}

export class RectanglePlane {
  constructor( color, borderRadius = 15) {
    this.color = color;
    this.width = window.innerWidth;
    this.height = window.innerHeight;

    console.log("height: ", this.height);
    console.log("width: ", this.width);

    this.video = document.createElement("video");
    this.video.src = "../assets/desig-show-real.mp4";
    this.video.load();
    this.video.muted = true;
    this.video.play();
    this.video.loop = true;

    this.videoTexture = new THREE.VideoTexture(this.video);
    this.videoTexture.minFilter = THREE.LinearFilter;
    this.videoTexture.magFilter = THREE.LinearFilter;
    this.videoTexture.format = THREE.RGBFormat;

    this.geometry = new RoundedBoxGeometry(
      this.width,
      this.height,
      20,
      32,
      borderRadius
    );
    this.material = new THREE.MeshStandardMaterial({
      map: this.videoTexture,
      side: THREE.DoubleSide,
    });

    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.position.set(0, -(this.height * 0.7), 0);
    this.mesh.rotation.set(0.2, 0, 0);
    this.mesh.scale.set(0.85, 0.85, 0.85);
  }

  getMesh() {
    return this.mesh;
  }

  animatePositionAndRotation(
    targetY,
    targetRotation,
    duration,
    easeFunction = easeOut
  ) {
    return new Promise((resolve) => {
      const startY = this.mesh.position.y;
      const startRotation = this.mesh.rotation.x;
      const startTime = performance.now();

      const animate = (currentTime) => {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        const easedProgress = easeFunction(progress);

        this.mesh.position.y = startY + (targetY - startY) * easedProgress;

        this.mesh.rotation.x =
          startRotation + (targetRotation - startRotation) * easedProgress;

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          resolve();
        }
      };

      requestAnimationFrame(animate);
    });
  }

  animateToScale(targetScale, duration, easeFunction = easeOut) {
    return new Promise((resolve) => {
      const startScale = this.mesh.scale.x;
      const startTime = performance.now();

      const animate = (currentTime) => {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        const easedProgress = easeFunction(progress);

        const newScale =
          startScale + (targetScale - startScale) * easedProgress;
        this.mesh.scale.set(newScale, newScale, newScale);

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          resolve();
        }
      };

      requestAnimationFrame(animate);
    });
  }

  animateRotateAndMoveAndScale() {
    return new Promise(async (resolve) => {
      await this.animatePositionAndRotation(0, 0, 1000);
      await this.animateToScale(1, 1000);

      resolve();
    });
  }
}

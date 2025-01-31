import { SceneManager } from "./SceneManager.js";

const sceneManager = new SceneManager();

document.getElementById("animateButton").addEventListener("click", () => {
  sceneManager.animatePlaneUp();
});

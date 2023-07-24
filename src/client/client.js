import {Engine, FreeCamera, HemisphericLight, MeshBuilder, Scene, SceneLoader, Vector3} from "@babylonjs/core";
import '@babylonjs/loaders/glTF'
import plan from './plan.glb'

const canvas = document.getElementById("canvas")
const engine = new Engine(canvas, true)


const createScene = () => {
    const scene = new Scene(engine)
    const camera = new FreeCamera("camera", new Vector3(0, 10, -10), scene)
    camera.inputs.addMouseWheel()
    camera.setTarget(Vector3.Zero())
    camera.attachControl(false)

    const light = new HemisphericLight("light", new Vector3(0, 1, 0), scene)
    light.intensity = 0.9



    const ground = SceneLoader.ImportMesh(["Landscape"], "assets/", plan, scene, () => {
        console.log("Загружено")
    } )

    return scene
}

const scene = createScene()

engine.runRenderLoop(() => scene.render())
window.addEventListener("resize", () => {engine.resize()})
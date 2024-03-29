import * as THREE from "three"
import gsap from "gsap"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

// scene
const scene = new THREE.Scene();

//geometry (create our shape)
const geometry = new THREE.SphereGeometry(3, 64, 64);

// material (Gives top material)
const material = new THREE.MeshStandardMaterial({
    color: "#00ff83",
    roughness: 0.2
})

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

//sizez
const sizez = {
    width: window.innerWidth,
    height: window.innerHeight
}

//lights
const light = new THREE.PointLight(0xffffff, 70, 100, 1.7)
light.position.set(0, 10, 10);
scene.add(light);

// camera
const camera = new THREE.PerspectiveCamera(45, sizez.width / sizez.height, 0.1, 100);
camera.position.z = 20
scene.add(camera);



//renderer
const canvas = document.querySelector('.webgl');
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizez.width, sizez.height)
renderer.setPixelRatio(2);
renderer.render(scene, camera);

//controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true;
controls.enablePan = false
controls.enableZoom = false
controls.autoRotate = true
controls.autoRotateSpeed = 5


// resize

window.addEventListener('resize', () => {
    //update sizes
    // console.log(window.innerWidth, window.innerHeight)
    sizez.width = window.innerWidth;
    sizez.height = window.innerHeight;

    //update camera aspect ratio
    camera.aspect = sizez.width / sizez.height;
    camera.updateProjectionMatrix();
    renderer.setSize(sizez.width, sizez.height);
})

const loop = () => {
    controls.update();
    renderer.render(scene, camera);
    window.requestAnimationFrame(loop);
}

loop();


// Gsap Maggic
const tl = gsap.timeline({ defaults: { duration: 1 } })
tl.fromTo(mesh.scale, { z: 0, x: 0, y: 0 }, { z: 1, x: 1, y: 1 })
tl.fromTo("nav", { y: "-100%" }, { y: "0%" },)
tl.fromTo(".title", { opacity: 0 }, { opacity: 1 },)

// Change in color on mouse move

var mouseDown = false
let rgb = []
window.addEventListener("mousedown", () => (mouseDown = true))
window.addEventListener("mouseup", () => (mouseDown = false))

window.addEventListener("mousemove", (e) => {
    if (mouseDown) {
        rgb = [
            Math.round((e.pageX / sizez.width) * 255),
            Math.round((e.pageY / sizez.height) * 255),
            155
        ]
        //animate the color
        // console.log(rgb)
        let newColor = new THREE.Color(`rgb(${rgb.join(',')})`)
        gsap.to(mesh.material.color, { r: newColor.r, g: newColor.g, b: newColor.b })
    }
})
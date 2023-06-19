import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"

// Scene
const scene = new THREE.Scene();

// Floor
const geometryFloor = new THREE.PlaneGeometry( 5, 5, 1, 1 );
const materialFloor = new THREE.MeshBasicMaterial( { color: 0X368C0E });
const floor = new THREE.Mesh( geometryFloor, materialFloor );
floor.material.side = THREE.DoubleSide;
floor.rotation.x = 90;
floor.rotation.y = 0;
scene.add( floor );


// Spheres
const spheres = [
    {
        colorSphere : 0xFF6133,
        positionx : 0,
        positiony : 0.34,
        positionz : 0,
    },
    {
        colorSphere : 0xFF33E3,
        positionx : 1,
        positiony : -0.15,
        positionz : 1,
    },
    {
        colorSphere : 0x3399FF,
        positionx : -0.5,
        positiony : -0.65,
        positionz : 2,
    }
]

for (let value of spheres){
    const geometrySphere = new THREE.SphereGeometry( 0.3, 20, 20);
    const materialSphere = new THREE.MeshBasicMaterial ({color: value.colorSphere});
    const sphere = new THREE.Mesh(geometrySphere, materialSphere);
    sphere.position.y = value.positiony;
    sphere.position.x = value.positionx;
    sphere.position.z = value.positionz;
    scene.add(sphere);
}

// Light
const light = new THREE.AmbientLight( 0x404040 );
scene.add( light );

// Sizes
const sizes = {
    width: 1000,
    height: 600
}

// Camera
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height)
camera.position.set(0, 0, 4)
scene.add( camera );

// Renderer
const canvas = document.querySelector(".webgl");
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})

renderer.setSize( sizes.width, sizes.height );

// Controls
const controls = new OrbitControls( camera, canvas )
controls.enableDamping = true

// Animate
const animate = () => {
    controls.update()

    renderer.render( scene, camera );

    window.requestAnimationFrame(animate)
}

animate()
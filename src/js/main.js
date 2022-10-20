import * as THREE from 'three';
import { OrbitControls } from 'https://unpkg.com/three@0.125.2/examples/jsm/controls/OrbitControls.js'



// import starsTexture from '../../img/stars.jpg';
// import sunTexture from '../img/sun.jpg';
// import mercuryTexture from '../img/mercury.jpg';
// import venusTexture from '../img/venus.jpg';
// import earthTexture from '../img/earth.jpg';
// import marsTexture from '../img/mars.jpg';
// import jupiterTexture from '../img/jupiter.jpg';
// import saturnTexture from '../img/saturn.jpg';
// import saturnRingTexture from '../img/saturn ring.png';
// import uranusTexture from '../img/uranus.jpg';
// import uranusRingTexture from '../img/uranus ring.png';
// import neptuneTexture from '../img/neptune.jpg';
// import plutoTexture from '../img/pluto.jpg';


//create renderer
const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement);

//create scene and camera
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

camera.position.set(-100, 180, 180);




// const grid = new THREE.GridHelper(3, 20, "white");
// grid.material.opacity = 0.2;
// grid.material.transparent = true;
// scene.add(grid);


//create orbit controls
const controle = new OrbitControls(camera, renderer.domElement)
controle.update()

const ambientLight = new THREE.AmbientLight(0x333333)
scene.add(ambientLight)


const cubeTextureLoader = new THREE.CubeTextureLoader()
scene.background = cubeTextureLoader.load([
    './img/stars.jpg',
    './img/stars.jpg',
    './img/stars.jpg',
    './img/stars.jpg',
    './img/stars.jpg',
    './img/stars.jpg',

])


const textureLoader = new THREE.TextureLoader()

//create sun :
const sunGeo = new THREE.SphereGeometry(16,30,30)
const sunMat = new THREE.MeshBasicMaterial({
    map:textureLoader.load('../src/img/sun.jpg')
})
const sun = new THREE.Mesh(sunGeo,sunMat)
scene.add(sun)


//create mercury :
const mercuryGeo = new THREE.SphereGeometry(3.2,30,30)
const mercuryMat = new THREE.MeshStandardMaterial({
    map:textureLoader.load('../src/img/mercury.jpg')
})
const mercury = new THREE.Mesh(mercuryGeo,mercuryMat)
sun.add(mercury)
mercury.position.x=28

const pointLight = new THREE.PointLight("white",2,300)
scene.add(pointLight)
//animate function
function animate() {
    // requestAnimationFrame(animate)
    sun.rotateY(0.004)
    // sun.rotation.y =0.0004
    mercury.rotateY(0.004)
    renderer.render(scene, camera)
}
renderer.setAnimationLoop(animate)

window.addEventListener('resize', function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
})
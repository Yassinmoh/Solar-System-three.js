import * as THREE from 'three';
import { OrbitControls } from 'https://unpkg.com/three@0.125.2/examples/jsm/controls/OrbitControls.js'




//create renderer
const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement);

//create scene and camera
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

camera.position.set(-100, 180, 180);


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
const sunGeo = new THREE.SphereGeometry(16, 30, 30)
const sunMat = new THREE.MeshBasicMaterial({
    map: textureLoader.load('../src/img/sun.jpg')
})
const sun = new THREE.Mesh(sunGeo, sunMat)
scene.add(sun)


//function Create Planet
const createPlanet = (size, texture, position, ring) => {
    const Geo = new THREE.SphereGeometry(size, 30, 30)
    const Mat = new THREE.MeshStandardMaterial({
        map: textureLoader.load(texture)
    })
    const mesh = new THREE.Mesh(Geo, Mat)
    const Obj = new THREE.Object3D()
    Obj.add(mesh)
    if (ring) {
        const RingGeo = new THREE.RingGeometry(ring.innerRadius, ring.outerRadius, 32)
        const RingMat = new THREE.MeshBasicMaterial({
            map: textureLoader.load(ring.texture),
            side: THREE.DoubleSide
        })
        const ringMesh = new THREE.Mesh(RingGeo, RingMat)
        Obj.add(ringMesh)

        ringMesh.position.x = position
        ringMesh.rotation.x = -0.5 * Math.PI
    }
    scene.add(Obj)
    mesh.position.x = position
    return { mesh, Obj }
}


//create mercury :
const mercury = createPlanet(3.2, "../src/img/mercury.jpg", 28)

//create venus :
const venus = createPlanet(5.8, "../src/img/venus.jpg", 44)

//create earth :
const earth = createPlanet(6, "../src/img/earth.jpg", 62)

//create mars :
const mars = createPlanet(4, "../src/img/mars.jpg", 78)

//create jupiter :
const jupiter = createPlanet(12, "../src/img/jupiter.jpg", 78)

//create pluto :
const pluto = createPlanet(2.8, "../src/img/pluto.jpg", 216)

//create neptune :
const neptune = createPlanet(7, "../src/img/neptune.jpg", 200)


//create uranus :
const uranus = createPlanet(7, "../src/img/uranus.jpg", 176,{
    innerRadius:7,
    outerRadius:12,
    texture: "../src/img/uranusring.png"
})



//create saturn :
const saturn = createPlanet(10, "../src/img/saturn.jpg", 138,{
    innerRadius:10,
    outerRadius:20,
    texture: "../src/img/saturnring.png"
})





const pointLight = new THREE.PointLight("white", 2, 300)
scene.add(pointLight)

//animate function
function animate() {

    //SELF ROTATION:
    sun.rotateY(0.004)
    mercury.mesh.rotateY(0.004)
    venus.mesh.rotateY(0.002)
    earth.mesh.rotateY(0.002)
    mars.mesh.rotateY(0.018)
    jupiter.mesh.rotateY(0.004)
    saturn.mesh.rotateY(0.038)
    uranus.mesh.rotateY(0.003)
    neptune.mesh.rotateY(0.032)
    pluto.mesh.rotateY(0.008)
    
    //AROUND SUN ROTATION: 
    mercury.Obj.rotateY(0.004)
    venus.Obj.rotateY(0.0015)
    earth.Obj.rotateY(0.002)
    mars.Obj.rotateY(0.008)
    jupiter.Obj.rotateY(0.004)
    saturn.Obj.rotateY(0.0009)
    uranus.Obj.rotateY(0.0018)
    neptune.Obj.rotateY(0.0011)
    pluto.Obj.rotateY(0.00060)


    saturn.mesh.rotateY(0.038)
    renderer.render(scene, camera)
}
renderer.setAnimationLoop(animate)

window.addEventListener('resize', function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
})
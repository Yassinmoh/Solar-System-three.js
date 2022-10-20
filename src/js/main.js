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

//create saturn :
const saturn = createPlanet(10, "../src/img/saturn.jpg", 138,{
    innerRadius:10,
    outerRadius:20,
    texture: "../src/img/saturnring.png"
})



//create saturn :
// const saturnRingGeo = new THREE.RingGeometry(10,20,32)
// const saturnRingMat = new THREE.MeshBasicMaterial({
//     map:textureLoader.load('../src/img/saturn ring.png'),
//     side: THREE.DoubleSide
// })
// const saturnRing = new THREE.Mesh(saturnRingGeo,saturnRingMat)
// saturnObj.add(saturnRing)

// saturnRing.position.x=138
// saturnRing.rotation.x=-0.5 * Math.PI






const pointLight = new THREE.PointLight("white", 2, 300)
scene.add(pointLight)
//animate function
function animate() {
    // requestAnimationFrame(animate)
    sun.rotateY(0.004)
    mercury.mesh.rotateY(0.004)
    mercury.Obj.rotateY(0.010)
    saturn.Obj.rotateY(0.0009)
    saturn.mesh.rotateY(0.038)
    renderer.render(scene, camera)
}
renderer.setAnimationLoop(animate)

window.addEventListener('resize', function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
})
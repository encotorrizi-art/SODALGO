import * as THREE from "three";

const scene =
new THREE.Scene();

const camera =
new THREE.PerspectiveCamera(
45,
innerWidth/innerHeight,
0.1,
1000
);

camera.position.z=6;

const renderer =
new THREE.WebGLRenderer({
antialias:true,
alpha:true
});

renderer.setSize(
innerWidth,
innerHeight
);

renderer.setPixelRatio(
Math.min(
window.devicePixelRatio,
2
)
);

document
.getElementById("scene")
.appendChild(renderer.domElement);


/* ---------- TEXTURE ---------- */

const loader =
new THREE.TextureLoader();

loader.load(

"./logo.png",

(texture)=>{

texture.colorSpace=THREE.SRGBColorSpace;

const ratio=texture.image.height/
texture.image.width;

const geometry=
new THREE.PlaneGeometry(
4,
4*ratio,
250,
250
);

const material=
new THREE.MeshPhysicalMaterial({

map:texture,

transparent:true,

metalness:1,

roughness:.12,

clearcoat:1,

clearcoatRoughness:.08,

reflectivity:1,

transmission:0,

side:THREE.DoubleSide

});

const mesh=
new THREE.Mesh(
geometry,
material
);

scene.add(mesh);


/* ---------- LIGHT ---------- */

const key =
new THREE.PointLight(
0xffffff,
14,
100
);

key.position.set(
3,
4,
5
);

scene.add(key);


const rim =
new THREE.PointLight(
0xaecbff,
7,
100
);

rim.position.set(
-5,
2,
4
);

scene.add(rim);


const ambient =
new THREE.AmbientLight(
0xffffff,
1.3
);

scene.add(ambient);


/* ---------- INTERACTION ---------- */

let targetX=0;
let targetY=0;

let currentX=0;
let currentY=0;

window.addEventListener(
"mousemove",
(e)=>{

targetY=
(
e.clientX/
innerWidth-.5
)*0.65;

targetX=
(
e.clientY/
innerHeight-.5
)*0.4;

document
.querySelector(".background")
.style.transform=

`translate(
${targetY*30}px,
${targetX*30}px
)`;

key.position.x=
targetY*10;

key.position.y=
-targetX*8;

}
);


function animate(){

requestAnimationFrame(
animate
);

currentX+=
(
targetX-currentX
)*0.07;

currentY+=
(
targetY-currentY
)*0.07;


mesh.rotation.x=
currentX;

mesh.rotation.y=
currentY;

mesh.position.y=
Math.sin(
Date.now()*0.0012
)*0.08;


renderer.render(
scene,
camera
);

}

animate();

}
);


window.addEventListener(
"resize",
()=>{

camera.aspect=
innerWidth/
innerHeight;

camera.updateProjectionMatrix();

renderer.setSize(
innerWidth,
innerHeight
);

}
);

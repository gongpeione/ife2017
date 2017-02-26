import template from './template.html';
import { g } from '../../gtool';
import './style.scss';

export function create (parent, option = []) {
    parent = typeof parent === 'string' ? g.$(parent) : parent;

    parent.innerHTML = template;
    loadLibraries(buildACar);
}

function buildACar () {

    const three = window.THREE;
    const renderer = new three.WebGLRenderer({
        canvas: g.$('#mainCanvas'),
        antialias:true,
    });

    renderer.setClearColor(0xcccccc);
    renderer.shadowMapEnabled = true;

    const scene = window.scene = new three.Scene();
    const camera = new THREE.PerspectiveCamera(30, 4 / 3, 1, 1000);
    // const camera = new three.OrthographicCamera(-100, 100, -80, 80, 1, 100);
    camera.position.set(60, 70, 60);
    scene.add(camera);
    camera.lookAt(new three.Vector3(-50, 0, -50));

    const material = new three.MeshLambertMaterial({
        color: 0xcccccc,
    })

    const plane = new three.PlaneGeometry(260, 260);
    const planeMesh = new three.Mesh(plane, new three.MeshLambertMaterial({
        color: 0x444444,
    }));
    scene.add(planeMesh);

    planeMesh.rotation.x = 80;
    planeMesh.position.set(-50, 5, -50);
    
    planeMesh.receiveShadow = true;

    const cube = new three.Mesh(
        new three.CubeGeometry(40, 20, 20), 
        material
    );
    scene.add(cube);
    cube.position.set(-10, 30, 0);
    cube.castShadow = true;

    const torusList = torusGenerator();

    torusList.forEach(torus => {
        scene.add(torus);
    });

    var light = new THREE.PointLight(0xffffff);
    light.position.set(100, 100, 50);
    scene.add(light);
    light.castShadow = true;

    var light2 = new THREE.DirectionalLight(0xffffff, .6);
    light2.position.set(0, 100, 200);
    scene.add(light2);
    light2.castShadow = true;

    
    renderer.render(scene, camera);
}

function torusGenerator () {
    const material = new THREE.MeshLambertMaterial({
        color: 0xcccccc,
    });
    const torusShape = new THREE.TorusGeometry(5, 2, 20, 20);
    const torusList = [];
    const torusPositions = [
        [0, 20, 10],
        [-20, 20, 10],
        [0, 20, -10],
        [-20, 20, -10]
    ];
    for (let i = 0; i < 4; i++) {
        const torus = new THREE.Mesh(
            torusShape,
            material
        );
        torus.position.set(...torusPositions[i]);
        torus.castShadow = true;
        torusList.push(torus);
    }

    return torusList;
}

function loadLibraries (afterLoaded) {
    const script = document.createElement("script");

    script.src = "//cdn.bootcss.com/three.js/r83/three.min.js";
    script.async = true;
    script.addEventListener('load', () => {
        afterLoaded();
    });

    document.body.appendChild(script);
}
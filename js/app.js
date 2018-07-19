/**************** Defining Scene and Cameras ****************/

// Adding scene and camera
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 6000);


/**************** Defining Reder WebGL ****************/

// Adding renderer WebGL
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight*0.95);
document.body.appendChild(renderer.domElement);
renderer.setClearColor( 0x999999 ); 

/******* Defining Lights and adding them to scene ******/

var pointLight = new THREE.PointLight( 0xffffff, 0.8 );
camera.add( pointLight );
scene.add( camera );

var ambientLight = new THREE.AmbientLight( 0xcccccc, 0.4 );
scene.add( ambientLight );

// Allow update viewport size on resize
window.addEventListener('resize', function () {
	var width = window.innerWidth;
	var height = window.innerHeight;
	renderer.setSize(width, height);
	camera.aspect = width / height;
	camera.updateProjectionMatrix();
});


/**************** Defining controls ****************/

// Add orbit controls (Cool)
var controls = new THREE.OrbitControls(camera, renderer.domElement);


/*************** Trasformation Matrix **************/

//var material = new THREE.MeshBasicMaterial( {color: 0xffff00, wireframe:false} );
var material1 = new THREE.ShaderMaterial({
	uniforms: {
		trans: {
			type: "mat4",
			value: new THREE.Matrix4().set(
				25, 0, 0, 700,
				0, 25, 0, 0,
				0, 0, 25, 0,
				0, 0, 0, 1
			)
		}
	},

	vertexShader: document.getElementById("vertexShaders2").textContent,
	fragmentShader: document.getElementById("fragmentShaders").textContent
});

//var material = new THREE.MeshBasicMaterial( {color: 0xffff00, wireframe:false} );
var material2 = new THREE.ShaderMaterial({
	uniforms: {
		trans: {
			type: "mat4",
			value: new THREE.Matrix4().set(
				10, 0, 0, 700,
				0, 10, 0, 0,
				0, 0, 10, 0,
				0, 0, 0, 1
			)
		}
	},

	vertexShader: document.getElementById("vertexShaders1").textContent,
	fragmentShader: document.getElementById("fragmentShaders").textContent
});


/********** Defining objects and textures **********/

//var material = new THREE.MeshBasicMaterial( {color: 0xffff00, wireframe:false} );
var material3 = new THREE.ShaderMaterial({
	vertexShader: document.getElementById("vertexShaders1").textContent,
	fragmentShader: document.getElementById("fragmentShaders").textContent
});


/********** Loading objects and textures **********/

// While on progress and when a error occoues messeges */
var onProgress = function (xhr) {
		console.log((xhr.loaded / xhr.total * 100) + '% loaded');
	}

var onError = function (error) {
		console.log('An error happened');
	}

// Load DDSLoader
THREE.Loader.Handlers.add(/\.dds$/i, new THREE.DDSLoader());


// Objects list
var casa;
var knuckles;

// Load house.obj
objLoader = new THREE.OBJLoader();
objLoader.setPath('obj/house/');
objLoader.load(
	// Resource URL
	'house.obj',

	// Called when resource is loaded
	function (object) {
		object.traverse(function (child) {
			if (child instanceof THREE.Mesh) {
				// Assigned a personal shader
				child.material = material1;
			}
		});
		object.scale.set(10.0, 10.0, 10.0);
		object.position.set(0.5, 10.5, 0.5);
		casa = object
		scene.add(object);
	}, onProgress, onError
);

mtlLoader = new THREE.MTLLoader();
mtlLoader.setPath('obj/knuckles/');
mtlLoader.load("Knuckles.obj.mtl", function(materials) {
    materials.preload();
    
    //Carregamento do objeto para a cena
    objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.setPath('obj/knuckles/');
    objLoader.load("Knuckles.obj", function(object){

	    console.log("Objeto da bateria foi carregado");
	        //Configuração de posição, escala e rotaçaõ do objeto
	        object.position.set(0, 0, 0);
	        object.scale.set(0.5, 0.5, 0.5);
	        object.rotation.set(0, 0.7, 2); 
	        knuckles = object;
	        scene.add(object);
    });
}); 

mtlLoader = new THREE.MTLLoader();
mtlLoader.setPath('obj/Battery/');
mtlLoader.load("battery.mtl", function(materials) {
    materials.preload();
    console.log("Material da bateria foi carregado");
    
    //Carregamento do objeto para a cena
    objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.setPath('obj/Battery/');
    objLoader.load("battery.obj", function(object){

    console.log("Objeto da bateria foi carregado");
        //Configuração de posição, escala e rotaçaõ do objeto
        object.position.set(170, 130, -300);
        object.scale.set(100.01, 100.01, 100.01);
        object.rotation.set(0, 0.7, 2);
        
        battery = object;

        scene.add(object);
    });
}); 

mtlLoader = new THREE.MTLLoader();
mtlLoader.setPath('obj/tree/');
mtlLoader.load("tree.mtl", function(materials) {
    materials.preload();
    
    //Carregamento do objeto para a cena
    objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.setPath('obj/tree/');
    objLoader.load("tree.obj", function(object){
        //Configuração de posição, escala e rotaçaõ do objeto
       	object.position.x = 100;
		object.position.y = 0;
		object.position.z = -400;
		object.scale.set(4, 4, 4);
        
        tree = object;

        scene.add(object);
    });
}); 

// Load tree.obj
new THREE.OBJLoader().load(
	// Resource URL
	'obj/tree/tree.obj',

	// Called when resource is loaded
	function (object) {
		object.traverse(function (child) {
			if (child instanceof THREE.Mesh) {
				// Assigned a personal shader
				child.material = material1;
			}
		});
		object.scale.set(1.0, 1.0, 1.0);
		object.position.set(0.5, 10.5, 0.5);
		casa = object
		scene.add(object);
	}, onProgress, onError
);

var star;

function criarCeu () {
	var startx = 0;
	var starty = 0;
	var startz = 0;
	var distance = 10;

	// Phong material
	var phongMaterial = new THREE.MeshPhongMaterial({color: 0x88aacc, specular: 0x333333});
	// Load tree.obj
	new THREE.OBJLoader().load(
		// Resource URL
		'obj/Rock1/Rock1.obj',

		// Called when resource is loaded
		function (object) {
			object.traverse(function (child) {
				if (child instanceof THREE.Mesh) {
					// Assigned a personal shader
					child.material = phongMaterial;
				}
			});
			object.scale.set(10.0, 10.0, 10.0);
			object.position.set(0, 50, 0);
			star = object
			scene.add(object);
			criarEstrela(startx, startz, distance);
		}, onProgress, onError
	);
}

function criarEstrela (startx, startz, distance) {
	for (i = startx; i < startx+distance*10; i = i+distance ){
		for (z = startz; z < startz+distance*10; z = z+distance){
			var newStar = star.clone();
			newStar.position.x = x;
			newStar.position.z = z;
			scene.add(newStar);
		}
	}
}

criarCeu();

// Change the position of the camera
camera.position.z = 1000;

//Curva de Bezier
curve1 = new THREE.CubicBezierCurve3(
	new THREE.Vector3(0, 0, 0),//v0
	new THREE.Vector3(-600, 0, -500),//v1
	new THREE.Vector3(-100, 0, -1000),//v2
	new THREE.Vector3(800, 0, -800)//v3
);

curve2 = new THREE.CubicBezierCurve3(
	new THREE.Vector3(800, 0, -800),//v0
	new THREE.Vector3(1700, 0, -500),//v1
	new THREE.Vector3(1800, 0, 1000),//v2
	new THREE.Vector3(0, 0, 0)//v3
);
curve = curve1;
curve_cont = 0;

//Botão para mudar a camera
flagCamera = 1;
function changeCamera() {
	
	if (flagCamera == 1) {
		camera.position.set(300,0,0);
		camera.up = new THREE.Vector3(0,0,1);
		camera.rotation.y = 90 * Math.PI / 180;
		
		controls.enabled = false;
		
		flagCamera = 0;
	}
	else {
		camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 6000);
		camera.position.x = 0;
		camera.position.y = 0;
		camera.position.z = 1000;
		camera.rotation.y = 270 * Math.PI / 180;
		
		controls = new THREE.OrbitControls(camera, renderer.domElement);
		controls.enabled = true;
		
		flagCamera = 1;

	}
	controls.update();
}

// Game logic
var update = function () {

};

// Draw Scene
var render = function () {

	//Calcula o ponto
	var point = curve.getUtoTmapping(curve_cont / 100);
	//Posiciona o objeto no ponto
	knuckles.position.set(curve.getPointAt(point).x, curve.getPointAt(point).y, curve.getPointAt(point).z);
	//Altera a posição da camera do objeto
	knuckles.lookAt(curve.getPointAt(curve.getUtoTmapping((curve_cont+0.01) / 100)));
	
	//Contadores e troca de curva
	curve_cont += 0.5;
	if (curve_cont > 100) {
		if (curve == curve1) {
			curve = curve2;
		}
		else {
			curve = curve1;
		}
		curve_cont = 0;
	}
	
	if (flagCamera == 0) {
		camera.lookAt(curve.getPointAt(curve.getUtoTmapping((curve_cont+0.01) / 100)));
		camera.position.x = 750;
		camera.position.y = 2000;
		camera.position.z = 0;

	}
	renderer.render(scene, camera);
};

// Run game loop
var GameLoop = function () {

	requestAnimationFrame(GameLoop);
	update();
	render();
};

// Where the program really runs
GameLoop();

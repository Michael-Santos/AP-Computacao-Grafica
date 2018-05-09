// Adding scene and camera
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 4000);

// Adding renderer WebGL
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Allow update viewport size on resize
window.addEventListener('resize', function ()
{
	var width = window.innerWidth;
	var height = window.innerHeight;
	renderer.setSize(width, height);
	camera.aspect = width/height;
	camera.updateProjectionMatrix();
});

// Add orbit controls (Cool)
var controls = new THREE.OrbitControls( camera, renderer.domElement );

//var material = new THREE.MeshBasicMaterial( {color: 0xffff00, wireframe:false} );
var material1 = new THREE.ShaderMaterial({
	uniforms: {
		trans : {type: "mat4", value: new THREE.Matrix4().set(
				25, 0, 0, 700,
				0, 25, 0, 0,
				5, 0, 25, 0,
				0, 0, 0, 1
		)}
	},

	vertexShader: document.getElementById("vertexShaders2").textContent,
	fragmentShader: document.getElementById("fragmentShaders").textContent
});


//var material = new THREE.MeshBasicMaterial( {color: 0xffff00, wireframe:false} );
var material2 = new THREE.ShaderMaterial({
	vertexShader: document.getElementById("vertexShaders1").textContent,
	fragmentShader: document.getElementById("fragmentShaders").textContent
});


//var material = new THREE.MeshBasicMaterial( {color: 0xffff00, wireframe:false} );
var material3 = new THREE.ShaderMaterial({
	vertexShader: document.getElementById("vertexShaders1").textContent,
	fragmentShader: document.getElementById("fragmentShaders").textContent
});


// Load a model and add it to the scene
var objloader = new THREE.OBJLoader();

// Load house.obj
objloader.load(
	// Resource URL
	'obj/house/house.obj',

	// Called when resource is loaded
	function(object){
		object.traverse( function (child) {
            if (child instanceof THREE.Mesh) {
                child.material = material1;
            }
        });
		scene.add(object);	
	},

	// Called when loading is in progresses
	function (xhr) {
		console.log((xhr.loaded/xhr.total*100) + '% loaded');
	},

	// Called when loading has errors
	function (error) {
		console.log('An error happened');
	}
);

// Load Knuckles.obj
objloader.load(
	// Resource URL
	'obj/knuckles/Knuckles.obj',
	
	// Called when resource is loaded
	function(object){
		object.traverse( function (child) {
            if (child instanceof THREE.Mesh) {
                child.material = material2;
            }
        });
		scene.add(object);	
	},

	// Called when loading is in progresses
	function (xhr) {
		console.log((xhr.loaded/xhr.total*100) + '% loaded');
	},

	// Called when loading has errors
	function (error) {
		console.log('An error happened');
	}
);

// Load tree.obj
objloader.load(
	// Resource URL
	'obj/tree/tree.obj',
	
	// Called when resource is loaded
	function(object){
		object.traverse( function (child) {
            if (child instanceof THREE.Mesh) {
                child.material = material3;
            }
        });
		object.position.x = 100;
		object.position.y = 0;
		object.position.z = -200;
		object.scale.set(4,4,4);
		scene.add(object);	
	},

	// Called when loading is in progresses
	function (xhr) {
		console.log((xhr.loaded/xhr.total*100) + '% loaded');
	},

	// Called when loading has errors
	function (error) {
		console.log('An error happened');
	}
);

// Change the position of the camera
	camera.position.z = 1000;

// Game logic
var update = function() 
{

};

// Draw Scene
var render = function()
{
	renderer.render(scene, camera);
};

// Run game loop
var GameLoop = function()
{
	requestAnimationFrame(GameLoop);

	update();
	render();
};

// Where the program really runs
GameLoop();
var loading = false;

var three = $("<div id = 'three'></div>");
$("body").append(three);
$(three).innerHeight(window.innerHeight);
$(three).innerWidth(window.innerWidth*.8);
var taxis = $("<div id = 'inset'></div>");
$("body").append(taxis);

//-----Three.js Setup-----//
container = document.createElement( 'div' );
document.getElementById( 'three' ).appendChild( container );
stats = new Stats();
container.appendChild( stats.dom );
//Scene Setup
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, (window.innerWidth*.8)/window.innerHeight, 0.1, 1000 );
var renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio( window.devicePixelRatio);
renderer.setSize( window.innerWidth*.8, window.innerHeight );
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.shadowMapSoft = true;
renderer.gammaInput = true;
renderer.gammaOutput = true;
scene.background = new THREE.Color('white');
container.appendChild( renderer.domElement );

var controls = new THREE.TrackballControls( camera, document.getElementById("three"));
controls.enableKeys = false;
camera.position.set( 0, 0, 2);
controls.update();

//axis
var axes = document.getElementById( 'inset' );
var renderer2 = new THREE.WebGLRenderer();
renderer2.setClearColor( 0x000000, 1 );
renderer2.setSize( 100, 100 );
axes.appendChild( renderer2.domElement );
var scene2 = new THREE.Scene();
var camera2 = new THREE.PerspectiveCamera( 50, 1, 1, 1000 );
camera2.up = camera.up;
var axesHelper = new THREE.AxesHelper( 5 );
scene2.add( axesHelper );

//box
var geometry = new THREE.BoxGeometry( 10, 5, 10);
var edge = new THREE.EdgesGeometry( geometry );
var mat = new THREE.LineBasicMaterial( { color: 0x000000, linewidth: 2 } );
var wireframe = new THREE.LineSegments( edge, mat );
wireframe.name = "plane";
scene.add( wireframe );

//lights
var light = new SRLight(scene);
var light2 = new SRLight(scene);
light2.type("Point");
light2.position(0,-10,10);

//objects
var objects = [];
let surf1 = new SRSurface(scene);
let surf2 = new SRSurface(scene);
let surf3 = new SRSurface(scene);
let surf4 = new SRSurface(scene);
let line1 = new SRSeedingCurve(scene);
let line2 = new SRSeedingCurve(scene);
GenerateCurves("data/seeding_curve_1.txt", line1);
GenerateCurves("data/seeding_curve_2.txt", line2);
AddObject("data/surface1_1.obj", surf1);
AddObject("data/surface1_2.obj", surf2);
AddObject("data/surface2_1.obj", surf3);
AddObject("data/surface2_2.obj", surf4);

//shadow plane
var shadowPlane = new SRMesh(scene);
shadowPlane.updateMesh(shadowPlane.object);

//drag controls
var dragControls = new THREE.DragControls( objects, camera, renderer.domElement );
dragControls.addEventListener( 'dragstart', function (event) {
	controls.enabled = false;
} );
dragControls.addEventListener( 'dragend', function (event) {
	controls.enabled = true;
} );

function animate() {
	if(loading){
		$("#loading").addClass('spinner-border');
	}
	else{
		$("#loading").removeClass('spinner-border');
	}
	requestAnimationFrame( animate );
	controls.update();
	camera2.position.copy( camera.position );
	camera2.position.sub( controls.target );
	camera2.position.setLength( 15 );
    camera2.lookAt( scene2.position );
	stats.begin();
	renderer.render( scene, camera );
	stats.end();
	renderer2.render( scene2, camera2 );
};
animate();
function AddObject(name2){
	var loader = new THREE.OBJLoader();
	loader.load(name, function ( object ) {
		scene.add( object );
		console.log("object loaded");},
	function ( xhr ) {
		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
	},
	function ( error ) {
		alert( 'An error happened' );
	}
	);
};

function AddObject(name2){
	console.log("run");
	var loader = new THREE.OBJLoader();
	loader.load(name2, function ( object ) {
    	//object.traverse( function ( child ) {
        	//if ( child instanceof THREE.Mesh ) {
            	//child.material.side = THREE.DoubleSide;
        	//}
    	//} );
		scene.add( object );},
	function ( xhr ) {
		//console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
	},
	function ( error ) {
		alert( 'An error happened' );
	}
	);
};
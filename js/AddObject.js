function AddObject(name2){
	console.log("run");
	var loader = new THREE.OBJLoader();
	loader.load(name2, function ( object ) {
    	object.traverse( function ( child ) {
        	if ( child instanceof THREE.Mesh ) {
            	child.material.side = THREE.BackSide;
            	child.material.color.setHex(0x808080);
				child.material.transparent = true;
				child.material.opacity = .5;
        	}
    	} );
		scene.add( object );},
	function ( xhr ) {
		document.getElementByID('UI').innerHTML = name2;
	},
	function ( error ) {
		alert( 'An error happened' );
	}
	);
};
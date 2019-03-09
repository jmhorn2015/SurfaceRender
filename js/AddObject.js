function AddObject(name2){
	var loader = new THREE.OBJLoader();
	loader.load(name2, function ( object ) {
    	object.traverse( function ( child ) {
        	if ( child instanceof THREE.Mesh ) {
				console.log("found mesh");
            	child.material.side = THREE.DoubleSide;
            	child.material.color.setHex(0x808080);
				child.material.transparent = true;
				child.material.opacity = .5;
        	}
			else{
				child.traverse( function ( child2 ) {
					if ( child2 instanceof THREE.Mesh ) {
					}
					else{
					}
				});
			}
    	} );
		scene.add( object );},
	function ( xhr ) {
		
	},
	function ( error ) {
		alert( 'An error happened' );
	}
	);
};
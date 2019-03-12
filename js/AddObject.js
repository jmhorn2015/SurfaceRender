function AddObject(name2){
	$("#loading").addClass('spinner-border');
	var loader = new THREE.OBJLoader();
	loader.load(name2, function ( object ) {
    	object.traverse( function ( child ) {
        	if ( child instanceof THREE.Mesh ) {
            	child.material.side = THREE.BackSide;
            	child.material.color.setHex(0x808080);
				child.material.transparent = true;
				child.material.opacity = .5;
        	}
			else if ( child instanceof THREE.Geometry ) {
				console.log("found geo");
        	}
			else if ( child instanceof THREE.BufferGeometry ) {
				console.log("found buff geo");
        	}
			else{
				var temp = object;
				console.log(name2);
				//object = new THREE.Mesh( temp, new THREE.MeshPhongMaterial( { color: 0xffffff, dithering: true } ));
			}
    	} );
		scene.add( object );
		},
	function ( xhr ) {
		
	},
	function ( error ) {
		alert( 'An error happened' );
	}
	);
	$("#loading").removeClass('spinner-border');
};
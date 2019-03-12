function AddObject(name2){
	var loader = new THREE.OBJLoader();
	loader.load(name2, function ( object ) {
    	object.traverse( function ( child ) {
        	if ( child instanceof THREE.Mesh ) {
            	child.material.side = THREE.BackSide;
            	child.material.color.setHex(0x808080);
				child.material.transparent = true;
				child.material.opacity = .5;
        	}
			else{
				var temp = object;
				//object = new THREE.Mesh( temp, new THREE.MeshPhongMaterial( { color: 0xffffff, dithering: true } ));
			}
    	} );
		object.name = "surface";
		scene.add( object );
		loading = false;
		console.log("end");
		},
	function ( xhr ) {
		loading = true;
	},
	function ( error ) {
		alert( 'An error happened' );
	}
	);
	//$("#loading").removeClass('spinner-border');
};
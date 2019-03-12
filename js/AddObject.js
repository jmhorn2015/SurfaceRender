function AddObject(name2){
	$("#loading").addClass('spinner-border');
	console.log("add");
	loaded = false;
	hasloaded = false;
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
		loaded = true;
		},
	function ( xhr ) {
		
	},
	function ( error ) {
		alert( 'An error happened' );
	}
	);
	//$("#loading").removeClass('spinner-border');
};
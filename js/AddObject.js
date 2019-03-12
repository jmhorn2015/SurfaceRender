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
				child.rotation.set(-90,0,0);
        	}
			else if (child instanceof Three.Material ){
				var temp = object;
				console.log(name2);
				//object = new THREE.Mesh( temp, new THREE.MeshPhongMaterial( { color: 0xffffff, dithering: true } ));
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
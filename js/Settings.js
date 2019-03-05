function Transparency(num){
	var arr = scene.children;
	for( int x = 0; x < arr.length; x++){
		var object = arr[x];
		object.traverse( function ( child ) {
        	if ( child instanceof THREE.Mesh ) {
            	//child.material.side = THREE.BackSide;
            	//child.material.color.setHex(0x808080);
				child.material.transparent = true;
				child.material.opacity = num;
        	}
    	};
	}
};
function Transparency(num){
	var arr = scene.children;
	for( var x = 0; x < arr.length; x++){
		var object = arr[x];
		object.traverse( function ( child ) {
        	if ( child instanceof THREE.Mesh ) {
				child.material.side = THREE.BackSide;
            	child.material.color.setHex(0x808080);
				child.material.transparent = true;
				child.material.opacity = num;
        	}
    	});
	}
};
function Hue(num){
	var arr = scene.children;
	for( var x = 0; x < arr.length; x++){
		var object = arr[x];
		object.traverse( function ( child ) {
        	if ( child instanceof THREE.Mesh ) {
            	child.material.color.setHSL(num, 1, .5);
        	}
    	});
	}
};
function Light(num){
	var arr = scene.children;
	for( var x = 0; x < arr.length; x++){
		var object = arr[x];
		if(object.isPointLight){
			console.log("run");
			object.position.set(num, -10 + Math.abs(num), 0);
		}
	}
};
function Material(num){
	var arr = scene.children;
	for( var x = 0; x < arr.length; x++){
		var object = arr[x];
		object.traverse( function ( child ) {
        	if ( child instanceof THREE.Mesh ) {
            	
        	}
    	});
	}
};
function Texture(num){
	var arr = scene.children;
	for( var x = 0; x < arr.length; x++){
		var object = arr[x];
		object.traverse( function ( child ) {
        	if ( child instanceof THREE.Mesh ) {
            	
        	}
    	});
	}
};
function Shadow(bool){
	var arr = scene.children;
	for( var x = 0; x < arr.length; x++){
		var object = arr[x];
		object.traverse( function ( child ) {
        	if ( child instanceof THREE.Mesh ) {
				
        	}
    	});
	}
};
function Reflection(bool){
	var arr = scene.children;
	for( var x = 0; x < arr.length; x++){
		var object = arr[x];
		object.traverse( function ( child ) {
        	if ( child instanceof THREE.Mesh ) {
				
        	}
    	});
	}
};
	
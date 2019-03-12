function Transparency(num){
	var arr = scene.children;
	for( var x = 0; x < arr.length; x++){
		var object = arr[x];
		object.traverse( function ( child ) {
        	if ( child instanceof THREE.Mesh & object.name == "surface") {
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
        	if ( child instanceof THREE.Mesh & object.name == "surface") {
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
				var oldMat = child.material;
            	switch(num){
					case 0:
						child.material = new THREE.MeshPhongMaterial( { color: 0x808080, dithering: true } );
						break;
					case 1:
						child.material = new THREE.MeshBasicMaterial( { color: 0x808080, dithering: true } );
						break;
					case 2:
						child.material = new THREE.MeshLambertMaterial( { color: 0x808080, dithering: true } );
						break;
				}
				child.material.side = THREE.BackSide;
            	child.material.color = new THREE.Color(oldMat.color);
				child.material.transparent = true;
				child.material.opacity = oldMat.opacity;
        	}
    	});
	}
	console.log(num);
};
function Texture(num){
	var arr = scene.children;
	for( var x = 0; x < arr.length; x++){
		var object = arr[x];
		object.traverse( function ( child ) {
        	if ( child instanceof THREE.Mesh & object.name == "surface") {
            	
        	}
    	});
	}
};
function Shadow(bool){
	var arr = scene.children;
	for( var x = 0; x < arr.length; x++){
		var object = arr[x];
		object.traverse( function ( child ) {
        	if ( child instanceof THREE.Mesh & object.name == "surface") {
				
        	}
    	});
	}
};
function Reflection(bool){
	var arr = scene.children;
	for( var x = 0; x < arr.length; x++){
		var object = arr[x];
		object.traverse( function ( child ) {
        	if ( child instanceof THREE.Mesh & object.name == "surface") {
				
        	}
    	});
	}
};
	
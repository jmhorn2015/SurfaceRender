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
			object.position.set(num, -10 + Math.abs(num), 10);
		}
	}
};
function Material(num){
	var arr = scene.children;
	for( var x = 0; x < arr.length; x++){
		var object = arr[x];
		object.traverse( function ( child ) {
        	if ( child instanceof THREE.Mesh & object.name == "surface") {
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
function Texture(bool){
	var arr = scene.children;
	var textureMap = new THREE.TextureLoader().load( 'textures/UV_Grid_Sm.jpg' );
	textureMap.wrapS = textureMap.wrapT = THREE.RepeatWrapping;
	textureMap.anisotropy = 16;
	for( var x = 0; x < arr.length; x++){
		var object = arr[x];
		object.traverse( function ( child ) {
        	if ( child instanceof THREE.Mesh & object.name == "surface") {
            	texturedMaterial = new THREE.MeshPhongMaterial( { color: materialColor, map: textureMap, side: THREE.DoubleSide } );
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
				if(bool){
					child.castShadow = true;
					materialP.opacity = 1;
				}
				else{
					child.castShadow = false;
					materialP.opacity = 0;
				}
        	}
    	});
	}
};
function Reflection(bool){
	var arr = scene.children;
	var path = "data/skybox/";
	var urls = [
		path + "px.jpg", path + "nx.jpg",
		path + "py.jpg", path + "ny.jpg",
		path + "pz.jpg", path + "nz.jpg"
	];
	textureCube = new THREE.CubeTextureLoader().load( urls );
	textureCube.format = THREE.RGBFormat;
	for( var x = 0; x < arr.length; x++){
		var object = arr[x];
		object.traverse( function ( child ) {
        	if ( child instanceof THREE.Mesh & object.name == "surface") {
				if(bool){
					scene.background = textureCube;
					child.material.envMap = textureCube;
					child.material.needsUpdate = true;
				}
				else{
					scene.background = null;
					child.material.envMap = null;
					scene.background = new THREE.Color('white');
				}
        	}
    	});
	}
};
	
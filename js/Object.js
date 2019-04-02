class SRObject{
	object;
	constructor(scene){
		object = new THREE.Object3D();
		object.position.set(0, 0, 0);
		object.castShadow = false;
		object.receiveShadow = false;
		scene.add( plane );
		object.opacity = 0;
	}
	allObjects;
	Position(x,y,z){
		object.position.set(x, y, z);
	}
	Rotate(x,y,z){
		object.rotation.set(x,y,z);
	}
	Shadow(onoff){
		object.recieveShadow = onoff;
	}
	get Position(){
		return object.position;
	}
	get Rotation(){
		return object.rotation;
	}
	get Shadow(){
		return object.recieveShadow;
	}
	LoadSettings(){
	}
}
class SRlight extends SRObject{
	constructor(scene){
		object = new THREE.AmbientLight(0x777777);
		object.position.set(0, 0, 0);
		object.castShadow = false;
		object.receiveShadow = false;
		scene.add( plane );
		object.opacity = 0;
		scene.add(light);
	}
	Intensity(x){
		object.intensity = x;
	}
	Type(x){
		var temp = object;
		if(x = "Point"){
			object = new Three.PointLight
		}
	}
	Color(hue){
		object.color.setHex(hue.toString(16));
	}
	get Intensity(){
		return object.intensity;
	}
	get Type(){
		if (object.isAmbientLight){
			return "Ambient";
		}
		else{
			return "Point";
		}
	}
	get Color(){
		return object.color.getHex();
	}
}
class SRMesh extends SRObject{
	geo;
	mat;
	constructor(scene, shape){
		if(shape == "Sphere"){
			geo = new THREE.SphereGeometry(5,32,32);
		}
		else if(shape == "Box"){
			geo = new THREE.BoxGeometry(5,5,5);
		}
		else{
			//geo = new THREE.PlaneGeometry(9,9);
		}
		mat= new THREE.MeshPhongMaterial( { color: 0x888888, dithering: true } );
		mat.transparent = true;
		mat.opacity = 0;
		object = new THREE.Mesh( geo, mat);
		plane.position.set(0, 0, -1);
		plane.castShadow = false;
		plane.receiveShadow = false;
		scene.add( object );
	}
	add(newobject){
		
	}
	Color(hue){
		object.color.setHex(hue.toString(16));
	}
	Material(x){
		object.traverse( function ( child ) {
        	if ( child instanceof THREE.Mesh & object.name == "surface") {
				var oldMat = child.material;
            	switch(x){
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
				child.material.map = oldMat.map;
        	}
    	});
	}
	Texture(onoff){
		var loader = new THREE.TextureLoader();
		loader.load(
			"data/graniteTXT.jpg",
			function ( texture ) {
				texture.repeat.set(.01,.01); 
				texture.wrapS = THREE.RepeatWrapping;
				texture.wrapT = THREE.RepeatWrapping;
				object.traverse( function ( child ) {
				if(child.material.map == null)
					child.material.map = texture;
				else
					child.material.map = null;
				child.material.needsUpdate = true;
				});
			},
			undefined,
			function ( err ) {
				console.error( 'An error happened.' );
			}
		);
		
	}
	Refletive(onoff){
		var path = "data/skybox/";
		var urls = [
			path + "px.jpg", path + "nx.jpg",
			path + "py.jpg", path + "ny.jpg",
			path + "pz.jpg", path + "nz.jpg"
		];
		var textureCube = new THREE.CubeTextureLoader().load( urls );
		textureCube.format = THREE.RGBFormat;
		object.traverse( function ( child ) {
			if(bool){
				scene.background = textureCube;
				child.material.envMap = textureCube;
				child.material.needsUpdate = true;
			}
			else{
				scene.background = null;
				child.material.envMap = null;
				child.material.needsUpdate = true;
				scene.background = new THREE.Color('white');
			}
		});
	}
	Transparency(x){
		object.traverse( function ( child ) {
			child.material.opacity = num;
    	});
	}
	Wireframe(onoff){
		
	}
	get Color(){
		
	}
	get Material(){
		
	}
	get Texture(){
		
	}
	get Refletive(){
		
	}
	get Transparency(){
		
	}
	get Wireframe(){
		
	}
}
class SRBoundingBox extends SRObject{
	constructor(scene){
		
	}
	Resize(){
		
	}
}
class SRSurface extends SRMesh{
	constructor(filename, scene){
		super(scene);
		var loader = new THREE.OBJLoader();
		loader.load(filename, function ( object ) {
			object.traverse( function ( child ) {
				if ( child instanceof THREE.Mesh ) {
					child.material.side = THREE.BackSide;
					child.material.color.setHex(0x808080);
					child.material.transparent = true;
					child.material.opacity = .5;
					child.recieveShadow = true;
				}
			} );
			object.name = "surface";
			scene.add( object );
			loading = false;
			},
		function ( xhr ) {
			loading = true;
		},
		function ( error ) {
			alert( 'An error happened' );
		}
		);
	}
}
class SRSeedingCurve extends SRMesh{
	extrudeSettings;
	bigData = [];
	constructor(filename, scene){
		super(scene);
		$.get(name,	function(data) {
			var texts = data.split(" ");
			var lineData = [];
			var prevPos = 0;
			var tempVal = 0;
			var counter = 0;
			var lineCounter = 0;
			var x = 0;
			var y = 0;
			var z = 0;
			for(var a = 0; a < texts.length; a++){
				if(texts[a].charAt(texts[a].length-1)!=','){
					counter++;
					tempVal = Number(texts[a]);
					prevPos = a+1;
					if(counter == 1){
						x = tempVal;
					}
					else if(counter == 2){
						y = tempVal;
					}
					else if(counter == 3){
						z = tempVal;
						lineData.push(new THREE.Vector3(x,y,z));
						counter = 0;
					}
				}
				else{
					tempVal = Number(texts[a].substring(0, texts[a].length-1));
					z = tempVal;
					lineData.push(new THREE.Vector3(x,y,z));
					var draw = new THREE.CatmullRomCurve3( lineData );
					bigData[lineCounter] = draw;
					lineCounter++;
					extrudeSettings = {
						steps: 40,
						bevelEnabled: false,
						extrudePath: draw
					};
					var geo = new THREE.ExtrudeBufferGeometry( circleShape, extrudeSettings );
					var mat = new THREE.MeshLambertMaterial( { color: Math.random() * 0xffffff , wireframe: false } );
					var mesh = new THREE.Mesh( geo, mat );
					mesh.name = "mesh";
					scene.add( mesh );
					lineData = [];
					counter = 0;
					prevPos = a+1;
				}
			}
		})
		.fail(function() {
			alert( "error" );	
		});
	}
}
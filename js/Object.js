var check = false;

class SRObject{
	object;
	constructor(scene){
		this.object = new THREE.Object3D();
	}
	allObjects;
	Position(x,y,z){
		this.object.position.set(x, y, z);
	}
	Rotate(x,y,z){
		this.object.rotation.set(x,y,z);
	}
	Shadow(onoff){
		this.object.recieveShadow = onoff;
	}
	get Position(){
		return this.object.position;
	}
	get Rotation(){
		return this.object.rotation;
	}
	get Shadow(){
		return this.object.recieveShadow;
	}
	LoadSettings(){
	}
}
class SRlight extends SRObject{
	constructor(scene){
		super(scene);
		this.object = new THREE.AmbientLight(0x777777);
		this.object.position.set(0, 0, 0);
		this.object.castShadow = false;
		this.object.receiveShadow = false;
		scene.add( this.object );
		this.object.opacity = 0;
	}
	Intensity(x){
		this.object.intensity = x;
	}
	Type(x){
		var temp = this.object;
		if(x = "Point"){
			this.object = new Three.PointLight(0xffffff);
		}
		else{
			this.object = new THREE.AmbientLight(0x777777);
		}
		this.object.position = temp.position;
		this.object.castShadow = temp.castShadow;
		this.object.receiveShadow = temp.recieveShadow;
		scene.add( this.object );
		this.object.opacity = temp.opacity;
		
	}
	Color(hue){
		this.object.color.setHex(hue.toString(16));
	}
	get Intensity(){
		return this.object.intensity;
	}
	get Type(){
		if (this.object.isAmbientLight){
			return "Ambient";
		}
		else{
			return "Point";
		}
	}
	get Color(){
		return this.object.color.getHex();
	}
}
class SRMesh extends SRObject{
	geo;
	mat;
	constructor(scene, shape){
		super(scene);
		this.geo = new THREE.PlaneGeometry(9,9,32);
		this.mat = new THREE.MeshPhongMaterial( { color: 0x888888, dithering: true } );
		if(shape == "Sphere"){
			this.geo = new THREE.SphereGeometry(5,32,32);
		}
		else if(shape == "Box"){
			this.geo = new THREE.BoxGeometry(5,5,5);
		}
		this.mat.transparent = true;
		this.mat.opacity = 0;
		this.object = new THREE.Mesh( this.geo, this.mat);
		this.object.position.set(0, 0, -1);
		this.object.castShadow = false;
		this.object.receiveShadow = false;
		scene.add( this.object );
	}
	add(newobject){
		
	}
	Color(hue){
		this.object.color.setHex(hue.toString(16));
	}
	Material(x){
		this.object.traverse( function ( child ) {
        	if ( child instanceof THREE.Mesh) {
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
				this.object.traverse( function ( child ) {
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
		this.object.traverse( function ( child ) {
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
	transparency(x){
		this.object.traverse( function ( child ) {
			console.log("test");
			child.material.opacity = num;
    	});
	}
	Wireframe(onoff){
		
	}
	getColor(){
		
	}
	getMaterial(){
		
	}
	getTexture(){
		
	}
	getRefletive(){
		
	}
	getTransparency(){
		
	}
	getWireframe(){
		
	}
}
class SRBoundingBox extends SRObject{
	constructor(scene){
		super(scene);
	}
	Resize(){
		
	}
}
class SRSurface extends SRMesh{
	constructor(filename, scene){
		super(scene);
		var loaderCheck = new Promise(function(resolve,reject){
			var loader = new THREE.OBJLoader();
			var tempOBJ;
			loader.load(filename, function ( object ) {
				object.traverse( function ( child ) {
					if ( child instanceof THREE.Mesh ) {
						child.material.side = THREE.BackSide;
						child.material.color.setHex(0x808080);
						child.material.transparent = true;
						child.material.opacity = .5;
						child.recieveShadow = true;
						tempOBJ = child;
					}
				} );
				tempOBJ.name = filename;
				resolve(tempOBJ);
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
		);
		this.object = loaderCheck.then(function(response){
			var obj = response;
			console.log(obj.geometry);
			obj.material.transparent = true;
			obj.material.opacity = 0.5;
			obj.position.set(0, 0, 0);
			obj.castShadow = false;
			obj.receiveShadow = false;
			scene.add(obj);
			return obj;
		}, function(err) {
                console.log(err);
		});
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
					this.geo = new THREE.ExtrudeBufferGeometry( circleShape, extrudeSettings );
					this.mat = new THREE.MeshLambertMaterial( { color: Math.random() * 0xffffff , wireframe: false } );
					this.object = new THREE.Mesh( this.geo, this.mat );
					scene.add( this.object );
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
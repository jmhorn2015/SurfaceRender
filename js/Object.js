class SRObject{
	object;
	constructor(scene){
		this.object = new THREE.Object3D();
	}
	allObjects;
	position(x,y,z){
		this.object.position.set(x, y, z);
	}
	rotate(x,y,z){
		this.object.rotation.set(x,y,z);
	}
	shadow(onoff){
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
class SRLight extends SRObject{
	constructor(scene){
		super(scene);
		this.object = new THREE.AmbientLight(0x777777);
		this.object.position.set(0, 0, 0);
		scene.add( this.object );
		this.object.opacity = 0;
	}
	intensity(x){
		this.object.intensity = x;
	}
	type(x){
		var temp = this.object;
		if(x = "Point"){
			this.object = new THREE.PointLight(0xffffff);
			this.object.castShadow = true;
		}
		else{
			this.object = new THREE.AmbientLight(0x777777);
		}
		this.object.position.set(temp.position);
		scene.add( this.object );
		this.object.opacity = temp.opacity;
		
	}
	color(hue){
		this.object.color.setHSL(hue/100, 1, .5);
	}
	getIntensity(){
		return this.object.intensity;
	}
	getType(){
		if (this.object.isAmbientLight){
			return "Ambient";
		}
		else{
			return "Point";
		}
	}
	getColor(){
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
	}
	add(newobject){
		
	}
	color(hue){
		this.mat.color.setHSL(hue, 1, .5);
	}
	material(x){
		var oldMat = this.mat;
        switch(x){
			case 0:
				this.mat = new THREE.MeshPhongMaterial( { color: 0x808080, dithering: true } );
				break;
			case 1:
				this.mat = new THREE.MeshBasicMaterial( { color: 0x808080, dithering: true } );
				break;
			case 2:
				this.mat = new THREE.MeshLambertMaterial( { color: 0x808080, dithering: true } );
				break;
		}
		this.mat.side = THREE.BackSide;
        this.mat.color = new THREE.Color(oldMat.color);
		this.mat.transparent = true;
		this.mat.opacity = oldMat.opacity;
		this.mat.map = oldMat.map;
		console.log(this.object.name);
		scene.remove(this.object.name);
		this.object = new THREE.Mesh(this.geo, this.mat);
		scene.add(this.object);
	}
	texture(onoff){
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
	reflective(onoff, scene){
		var path = "data/skybox/";
		var urls = [
			path + "px.jpg", path + "nx.jpg",
			path + "py.jpg", path + "ny.jpg",
			path + "pz.jpg", path + "nz.jpg"
		];
		var textureCube = new THREE.CubeTextureLoader().load( urls );
		textureCube.format = THREE.RGBFormat;
		this.object.traverse( function ( child ) {
			if(onoff){
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
		this.mat.opacity = num/100;
	}
	Wireframe(onoff){
		
	}
	updateMesh(mesh){
		this.geo = mesh.geometry;
		this.mat = mesh.material;
		this.mat.transparent = true;
		this.mat.opacity = 0.5;
		this.object = new THREE.Mesh( this.geo, this.mat);
		this.object.name = mesh.name;
		this.object.position.set(0, 0, 0);
		this.object.castShadow = false;
		this.object.receiveShadow = false;
		scene.add(this.object);
		objects.push(this.object);
	};
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
	constructor(scene){
		super(scene);
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
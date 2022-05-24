
// Posicion de ramas.
function Branch(length, angle, level) {
	this.vel = 0;
	this.acc = 0
	this.level = level;
	this.angle = angle;
	this.restAngle = angle;
	this.length = length;
	this.children = [];
	this.leaves = [];
	count++;
	this.index = count;
	
	// Genera rama hija nueva.
	this.newBranch = function(angle, mult) {
		let newBranch = new Branch(this.length * mult, angle, this.level + 1)
		this.children.push(newBranch);
    return newBranch;
	}
	
	this.applyForce = function(force) {
    this.acc += force;
	}
	
	// Angulo.
	this.move = function() {
		// Viento sutil.
		let windMult = map(this.level, 0, maxLevel, 0.1, 1) * random(0.75, 1.25);
		let wind = noise((frameCount + this.index) * 0.005) * windMult;
		this.applyForce(wind);
		
		// Genera tendencia de las ramas a volver a su angulo (posicion) original.
		
		let angleThresh = 10;
		let spring = new p5.Vector(this.restAngle, 0);
		let distance = dist(this.angle, 0, this.restAngle, 0);
		let force = map(min(distance, angleThresh), 0, angleThresh, 0, branchForce);
		//aceleracion y velocidad de la accion del viento
		spring.sub(new p5.Vector(this.angle, 0));
		spring.normalize();
		spring.mult(force);
		this.applyForce(spring.x);
		this.vel *= 0.95;
		this.vel += this.acc;
		this.angle += this.vel;
                //limita angulos de rotacion para que el vector no de un giro entero
		this.angle = constrain(this.angle, this.restAngle - 45, this.restAngle + 45); 
		this.acc = 0;
	}
}











// Subdivide ramas principales en ramas hijas.
// Estructura del arbol.

function subDivide(branch) {
let newBranches = [];
        let newBranchCount = int(random(1, 4));
        let minLength = 0.7;
        let maxLength = 0.85;
        // Mide valor de angulos según cantidad de ramas creadas, no es aleatorio.
        
        if (newBranchCount == 2) {
newBranches.push(branch.newBranch(random( - 45.0, - 10.0), random(minLength, maxLength)));
        newBranches.push(branch.newBranch(random(10.0, 45.0), random(minLength, maxLength)));
        } else if (newBranchCount == 3) {
newBranches.push(branch.newBranch(random( - 45.0, - 15.0), random(minLength, maxLength)));
        newBranches.push(branch.newBranch(random( - 10.0, 10.0), random(minLength, maxLength)));
        newBranches.push(branch.newBranch(random(15.0, 45.0), random(minLength, maxLength)));
        } else {
newBranches.push(branch.newBranch(random( - 45.0, 45.0), random(minLength, maxLength)));
        }

// Crea ramas hasta valor máximo setteado.
for (let i = 0; i < newBranches.length; i++) {
if (newBranches[i].level < maxLevel) {
subDivide(newBranches[i]);
        }
}
}


// Crea arbol.
function generateNewTree() {
rootBranches = [];
        for (let a = 0; a < 360; a += 12) {
let newBranch = new Branch(random(30.0, 100.0), a, 0)
        rootBranches.push(newBranch);
        subDivide(newBranch);
        }
}


// Posiciona ramas como vectores, con su respectivo largo y ángulo (no guarda posiciones). Las crea e ingresa en un array.

function treeIterator(branch, worldX, worldY, worldA) {
    
// Igual se guarda la rotacion, y "posicion" para saber donde se encuentra cada una aprox, para interaccionar con el mouse.

worldA += branch.angle;
        let vec = new p5.Vector(branch.length, 2);
        vec.rotate(radians(worldA));
        worldX += vec.x;
        worldY += vec.y;
        let d = dist(mouseX, mouseY, worldX + width / 2, worldY + height - 20);
        push();
        stroke(252, 225, 194, 25 * branch.level);
        strokeWeight(maxLevel - branch.level);
        
        // Segun distancia del mouse al vector, los mueve o no.

        let distThresh = 300;
        if (d < distThresh) {
let force = map(d, 0, distThresh, 1.5, 0); 

        // Se invierte angulo segun posicion del mouse.
        if (mouseX > worldX + width / 2) {
force *= - 1;
        }

// Resistencia a movimiento segun nivel de rama.
force *= map(branch.level, 0, maxLevel, 0.4, 2);
        branch.applyForce(force);
        if (debug) {
while (colp < 51) {
colp += 1;
        stroke(255, 219, 210, 5 * colp); }}

}

// Movimientos segun posicion de mouse, cambia angulos.
branch.move();
        rotate(radians(branch.angle));
        let valor = mouseX;
        let valposta;
        
        // Centro de pantalla como valor 0, crece hacia los extremos.
        if (valor < width / 2) { valposta = width / 2 - valor}
else { valposta = valor - width / 2}


// Dibuja rama.

if (branch.level > 1){
noFill();
        triangle(0, 0, valposta / 3, 0, 12 * branch.level, 15 * branch.level);
        line(12 * branch.level, 15 * branch.level, 22 * branch.level, 16 * branch.level);
        strokeWeight(random(3));
        point(0, 0);
        point(valposta / 3, 0);
        point(12 * branch.level, 15 * branch.level);
        point(52 * branch.level, 55 * branch.level);
        }

if (debug) {
    
// Dibuja puntitos.
if (d < 200) {
stroke(255, 219, 210);
        strokeWeight(random(3));
        point(0, 0); }
}




translate(branch.length, 0);
        // Sigue iterando a ramas hijas.
        for (let i = 0; i < branch.children.length; i++) {
treeIterator(branch.children[i], worldX, worldY, worldA);
        }
pop();
}


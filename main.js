/*
 
 Basado en la pieza T-Virus de Jason Labbe
 Site: jasonlabbe3d.com
 
 */

var randompoe;
var maxLevel = 3; // Máximo de subdivisiones 
var branchForce = 0.6; // Resistencia contra el mouse. Mayor valor = Mas movedizo
var rootBranches = [];
var debug = false;
var count = 0;
let val1;
let val2;
let reverb;
let filter;
var primerClick = true;
let poe = 0;
let colp = 0;
let part1;
let part2;
var allParticles = [];
var maxLevell = 4;
var useFill = false;
var data = [];
let sonidon;
let ran;
var poemas = [];
let delay;




// Mueve ejes hacia posiciones random, genera ejes (partículas) nuevos durante su "vida", existencia.

function Particle(x, y, level) {
        this.level = level;
        this.life = 0;
        this.pos = new p5.Vector(x, y);
        this.vel = p5.Vector.random2D();
        this.vel.mult(map(this.level, 0, maxLevell, 5, 2));
        this.move = function () {
                this.life++;
                // Friccion.
                this.vel.mult(.97);
                this.pos.add(this.vel);
                // Segun condicion, sigue generando ejes nuevos.
                if (this.life % 10 == 0) {
                        if (this.level > 0) {
                                this.level -= 1;
                                var newParticle = new Particle(this.pos.x, this.pos.y, this.level - 1);
                                allParticles.push(newParticle);
                        }
                }
        }
}

function setup() {



        createCanvas(displayWidth, displayHeight);
        //array de fragmentos de sonidos para Playear randomicamente,


        generateNewTree();


}


function draw() {


        background(0);
        debug = !debug; colp = 0;
        colorMode(RGB, 255);
        push();
        translate(width / 2, height / 2);
        for (let i = 0; i < rootBranches.length; i++) {

                treeIterator(rootBranches[i], 0, - height / 2, 0);
        }




        pop();

        noStroke();
        fill(360, 30);
        rect(0, 0, width, height);
        // Mueve y genera particulas, elimina las que deben morir.
        for (var i = allParticles.length - 1; i > - 1; i--) {
                allParticles[i].move();
                if (allParticles[i].vel.mag() < 0.01) {
                        allParticles.splice(i, 1);
                }
        }

        if (allParticles.length > 0) {
                // Genera triangulacion, obtiene vértices.
                data = Delaunay.triangulate(allParticles.map(function (pt) {
                        return [pt.pos.x, pt.pos.y];
                }));
                strokeWeight(0.1);
                // Display de triangulos.
                for (var o = 0; o < data.length; o += 3) {
                        // Junta vertices para generar triangulos.
                        var p1 = allParticles[data[o]];
                        var p2 = allParticles[data[o + 1]];
                        var p3 = allParticles[data[o + 2]];
                        // Si el area mayor, no los genera.
                        var distThresh = 75;
                        if (dist(p1.pos.x, p1.pos.y, p2.pos.x, p2.pos.y) > distThresh) {
                                continue;
                        }

                        if (dist(p2.pos.x, p2.pos.y, p3.pos.x, p3.pos.y) > distThresh) {
                                continue;
                        }

                        if (dist(p1.pos.x, p1.pos.y, p3.pos.x, p3.pos.y) > distThresh) {
                                continue;
                        }

                        // Cambia de color segun tiempo de vida.

                        noFill();
                        stroke(165 + p1.life * 1.5, 255, 255);
                        triangle(p1.pos.x, p1.pos.y,
                                p2.pos.x, p2.pos.y,
                                p3.pos.x, p3.pos.y);
                        let circu = random(2);
                        ellipse(p1.pos.x, p1.pos.y, circu, circu)
                        ellipse(p2.pos.x, p2.pos.y, circu, circu)
                        ellipse(p3.pos.x, p3.pos.y, circu, circu)
                }
        }


}

function mouseDragged() {
        allParticles.push(new Particle(mouseX, mouseY, maxLevell));
        let valor = mouseX;
        let valposta;

        //valor cambia segun cercania con el centro de la pantalla
        if (valor < width / 2) { valposta = width / 2 - valor }
        else { valposta = valor - width / 2 }

}


function mousePressed() {
        //acciona sonido
        if (primerClick) {
               
                primerClick = false;
        } else {




                if (mouseButton == LEFT) {
                        //genera particulas nuevas segun posicion de mouse
                        allParticles.push(new Particle(mouseX, mouseY, maxLevell));
                        allParticles.push(new Particle(mouseX, mouseY, maxLevell));
                        allParticles.push(new Particle(mouseX, mouseY, maxLevell));
                        allParticles.push(new Particle(mouseX, mouseY, maxLevell));
                        allParticles.push(new Particle(mouseX, mouseY, maxLevell));
                        allParticles.push(new Particle(mouseX, mouseY, maxLevell));
                        allParticles.push(new Particle(mouseX, mouseY, maxLevell));
                        allParticles.push(new Particle(mouseX, mouseY, maxLevell));
                        allParticles.push(new Particle(mouseX, mouseY, maxLevell));
                }

        }
}


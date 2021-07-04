let canvasWidth, canvasHeight;

class Keyword {
    constructor(index, x, y, text, color) {
        this.index = index;
        this.text = text;
        this.x = x;
        this.y = y;
        this.w = this.text.length*9; // width depends on text length
        this.h = 30;
        this.color = color;
    }
    draw() {
        // shape (currently rect with rounded corners)
        fill(this.color);
        rectMode(CENTER);
        rect(this.x, this.y, this.w, this.h, 2);
        // text
        fill("black");
        textAlign("center", "center");
        textSize(15);
        text(this.text, this.x, this.y);
    }
}

function setup() {
    canvasWidth = 600;
    canvasHeight = 400;
    // putting canvas into the div
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent("canvas");
    // auto resizing canvasDiv to canvas width and height
    const canvasDiv = document.getElementById("canvas");
    canvasDiv.style.width = canvasWidth + "px";
    canvasDiv.style.height = canvasHeight + "px";
}

function draw() {
    background("lightGrey");
    let coreKeyword = new Keyword(0, canvasWidth/2, canvasHeight/2, "Core Keyword", "white");
    coreKeyword.draw();
    let someKeyword  = new Keyword(1, 150, 150, "some other Keyword", "lightBlue");
    someKeyword.draw();
}
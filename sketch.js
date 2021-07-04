let canvasWidth, canvasHeight, mindmap, input, newText;

class MindMap {
    constructor() {
        this.keywords = Array(0);
    }
    addKeyword(keyword) {
        const keywords = this.keywords.slice();
        keywords.push(keyword);
        this.keywords = keywords;

        console.log("new keyword was added:");
        console.log(keyword);
        console.log(this.keywords);
    }
    editKeyword(i, text) {
        const keywords = this.keywords.slice();
        keywords[i].text = text;
        this.keywords = keywords;
    }
    draw() {
        for (let i = 0; i < this.keywords.length; i++) {
            this.keywords[i].draw();
        }
    }
    onClick(i) {
        console.log("you've clicked on " + i + " keyword:");
        console.log(mindmap.keywords[i]);
        input = createInput("");
        input.position(10, 10);
        input.input(() => {
            newText = input.value();
                
        });
        let button = createButton("save new text");
        button.position(10 + input.width, 10);
        button.mouseReleased(() => {
            this.editKeyword(i, newText);
            input.hide();
            button.hide();
        });  
    }
}

class Keyword {
    constructor(x, y, text, color) {
        this.text = text;
        this.x = x;
        this.y = y;
        this.w = this.text.length*8; // width depends on text length
        this.h = 30;
        this.color = color;
    }
    draw() {
        // shape (currently rect with rounded corners)
        fill(this.color);
        rectMode(CENTER);
        rect(this.x, this.y, this.w, this.h, 5);
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

    mindmap = new MindMap();

    let coreKeyword = new Keyword(canvasWidth/2, canvasHeight/2, "click to input the Core Keyword here", "white");
    //coreKeyword.draw();

    mindmap.addKeyword(coreKeyword);

    let someKeyword  = new Keyword(150, 150, "some other Keyword", "lightBlue");
    //someKeyword.draw();

    mindmap.addKeyword(someKeyword);

    let someAnotherKeyword  = new Keyword(350, 150, "some another Keyword", "lightGreen");
    mindmap.addKeyword(someAnotherKeyword);
}

function mouseReleased(i) {
    for (let i = 0; i < mindmap.keywords.length; i++) {
        if (mouseX >= mindmap.keywords[i].x - mindmap.keywords[i].w/2 &&
            mouseX <= mindmap.keywords[i].x + mindmap.keywords[i].w/2 &&
            mouseY >= mindmap.keywords[i].y - mindmap.keywords[i].h/2 &&
            mouseY <= mindmap.keywords[i].y + mindmap.keywords[i].w/2) {
                mindmap.onClick(i);
            }
    }
}

function draw() {
    background("lightGrey");
    
    mindmap.draw();
}

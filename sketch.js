let canvas, canvasDiv, canvasWidth, canvasHeight, mindmap, input, newText;

class MindMap {
    constructor() {
        this.keywords = Array({x: 300, y: 200, w: 270, h: 30, text: "click to edit the Core Keyword", color: "pink"});
    }
    addKeyword(keyword) {
        const keywords = this.keywords.slice();
        keywords.unshift(keyword);
        this.keywords = keywords;

        console.log("new keyword was added:");
        console.log(keyword);
        console.log(this.keywords);
    }
    editKeyword(i, text) {
        const keywords = this.keywords.slice();
        keywords[i].text = text;
        keywords[i].w = text.length*9;
        this.keywords = keywords;
    }
    draw() {
        for (let i = 0; i < this.keywords.length; i++) {
            //this.keywords[i].draw();
            let keyword = this.keywords[i];
            //line
            line(keyword.x, keyword.y, this.keywords[this.keywords.length - 1].x, this.keywords[this.keywords.length - 1].y);
            // shape (currently rect with rounded corners)
            fill(keyword.color);
            rectMode(CENTER);
            rect(keyword.x, keyword.y, keyword.w, keyword.h, 5);
            // text
            fill("black");
            textAlign("center", "center");
            textSize(15);
            text(keyword.text, keyword.x, keyword.y);
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
        this.w = this.text.length*9; // width depends on text length
        this.h = 30;
        this.color = color;
    }
    /*
    draw() {
        //line
        line(this.x, this.y, 300, 200);
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
    */
}

function setup() {
    canvasWidth = 600;
    canvasHeight = 400;
    // putting canvas into the div
    canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent("canvas");
    // auto resizing canvasDiv to canvas width and height
    canvasDiv = document.getElementById("canvas");
    canvasDiv.style.width = canvasWidth + "px";
    canvasDiv.style.height = canvasHeight + "px";

    mindmap = new MindMap();
    
    canvasDiv.addEventListener("click", (e) => {
        for (let i = 0; i < mindmap.keywords.length; i++) {
            if (mouseX >= mindmap.keywords[i].x - mindmap.keywords[i].w/2 &&
                mouseX <= mindmap.keywords[i].x + mindmap.keywords[i].w/2 &&
                mouseY >= mindmap.keywords[i].y - mindmap.keywords[i].h/2 &&
                mouseY <= mindmap.keywords[i].y + mindmap.keywords[i].h/2) {
                   return;
            }
        }
        let newKeyword = new Keyword(mouseX, mouseY, "new Keyword", "white");
        mindmap.addKeyword(newKeyword);
    })
    
}

function doubleClicked(i) {
    for (let i = 0; i < mindmap.keywords.length; i++) {
        if (mouseX >= mindmap.keywords[i].x - mindmap.keywords[i].w/2 &&
            mouseX <= mindmap.keywords[i].x + mindmap.keywords[i].w/2 &&
            mouseY >= mindmap.keywords[i].y - mindmap.keywords[i].h/2 &&
            mouseY <= mindmap.keywords[i].y + mindmap.keywords[i].h/2) {
            mindmap.onClick(i);
        }
    }
}

function draw() {
    background("lightGrey");
    mindmap.draw();
}

let canvas, canvasDiv, canvasWidth, canvasHeight, mindmap, input, newText, menu, backgroundColorPicker, backgroundColor;

class MindMap {
    constructor() {
        this.keywords = Array({text: "click to edit the Core Keyword", x: canvasWidth/2, y: canvasHeight/2, w: 270, h: 30, fontColor: "black", backgroundColor: "pink"});
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
    changeKeywordBackgroundColor(i, color) {
        const keywords = this.keywords.slice();
        keywords[i].backgroundColor = color;
        this.keywords = keywords;
    }
    changeKeywordFontColor(i, color) {
        const keywords = this.keywords.slice();
        keywords[i].fontColor = color;
        this.keywords = keywords;
    }
    deleteKeyword(i) {
        const keywords = this.keywords.slice();
        keywords.splice(i, 1);
        this.keywords = keywords;
    }
    draw() {
        for (let i = 0; i < this.keywords.length; i++) {
            //this.keywords[i].draw();
            let keyword = this.keywords[i];
            //line
            line(keyword.x, keyword.y, this.keywords[this.keywords.length - 1].x, this.keywords[this.keywords.length - 1].y);
            // shape (currently rect with rounded corners)
            fill(keyword.backgroundColor);
            rectMode(CENTER);
            rect(keyword.x, keyword.y, keyword.w, keyword.h, 5);
            // text
            fill(keyword.fontColor);
            textAlign("center", "center");
            textSize(15);
            text(keyword.text, keyword.x, keyword.y);
            textSize(12);
            fill("grey");
            text("created with MindMapApp", 625, 485);
        }
    }
    onDoubleClick(i) {
        console.log("you've clicked on " + i + " keyword:");
        console.log(mindmap.keywords[i]);
        input = createInput("");
        input.position(10, 35);
        input.input(() => {
            newText = input.value(); 
        });

        let buttonEdit = createButton("save new text");
        buttonEdit.position(10 + input.width, 35);
        buttonEdit.mouseReleased(() => {
            this.editKeyword(i, newText);
            clearAll();
        });

        let buttonDelete = createButton("delete keyword");
        buttonDelete.position(10 + input.width + buttonEdit.width, 35);
        buttonDelete.style("background-color", "red");
        buttonDelete.style("color", "white");
        buttonDelete.mouseReleased(() => {
            this.deleteKeyword(i);
            clearAll();
        });

        let label = createSpan("set background color:");
        label.position(10 + input.width + buttonEdit.width + buttonDelete.width, 35);
        let backgroundColorPicker = createColorPicker("#000000");
        backgroundColorPicker.position(10 + input.width + buttonEdit.width + buttonDelete.width + label.width, 35);
        backgroundColorPicker.input(() => {
            let color = backgroundColorPicker.color();
            this.changeKeywordBackgroundColor(i, color);
        });

        let label2 = createSpan("set font color:");
        label2.position(10 + input.width + buttonEdit.width + buttonDelete.width, 60);
        let fontColorPicker = createColorPicker("#000000");
        fontColorPicker.position(10 + input.width + buttonEdit.width + buttonDelete.width + label.width, 60);
        fontColorPicker.input(() => {
            let color = fontColorPicker.color();
            this.changeKeywordFontColor(i, color);
        });

        let saveChangesButton = createButton("save color changes");
        saveChangesButton.position(10 + input.width + buttonEdit.width + buttonDelete.width + label.width + 50, 35);
        saveChangesButton.style("background-color", "lightGreen");
        saveChangesButton.mouseReleased(() => {
            clearAll();
        });

        function clearAll() {
            buttonDelete.hide();
            input.hide();
            buttonEdit.hide();
            label.hide();
            backgroundColorPicker.hide();
            label2.hide();
            fontColorPicker.hide();
            saveChangesButton.hide();
        }
    }
    onMouseDragged(i) {
        const keywords = this.keywords.slice();
        keywords[i].x = mouseX;
        keywords[i].y = mouseY;
        this.keywords = keywords;
    }
}

class Keyword {
    constructor(x, y, text, fontColor, backgroundColor) {
        this.text = text;
        this.x = x;
        this.y = y;
        this.w = this.text.length*9; // width depends on text length
        this.h = 30;
        this.fontColor = fontColor;
        this.backgroundColor = backgroundColor;
    }
}

function setup() {
    canvasHeight = 500;
    canvasWidth = canvasHeight*1.414;
    //menu
    /*
    menu = document.getElementById("menu");
    menu.style.width = canvasWidth + "px";
    menu.style.height = "auto";
    */
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
        let newKeyword = new Keyword(mouseX, mouseY, "new Keyword", "black", "white");
        mindmap.addKeyword(newKeyword);
    });

    // set background color function:
    backgroundColor = "rgb(248, 249, 250)";
    /*
    backgroundColorPicker = document.getElementById("backgroundColorPicker");
    backgroundColorPicker.addEventListener("input", (e) => {
        //console.log(e.target.value);
        backgroundColor = e.target.value;
    });
    */
}

function doubleClicked(i) {
    for (let i = 0; i < mindmap.keywords.length; i++) {
        if (mouseX >= mindmap.keywords[i].x - mindmap.keywords[i].w/2 &&
            mouseX <= mindmap.keywords[i].x + mindmap.keywords[i].w/2 &&
            mouseY >= mindmap.keywords[i].y - mindmap.keywords[i].h/2 &&
            mouseY <= mindmap.keywords[i].y + mindmap.keywords[i].h/2) {
            mindmap.onDoubleClick(i);
        }
    }
}

function mouseDragged(i) {
    for (let i = 0; i < mindmap.keywords.length; i++) {
        if (mouseX >= mindmap.keywords[i].x - mindmap.keywords[i].w/2 &&
            mouseX <= mindmap.keywords[i].x + mindmap.keywords[i].w/2 &&
            mouseY >= mindmap.keywords[i].y - mindmap.keywords[i].h/2 &&
            mouseY <= mindmap.keywords[i].y + mindmap.keywords[i].h/2) {
            mindmap.onMouseDragged(i);
        }
    }
}

function draw() {
    background(backgroundColor);
    mindmap.draw();
}

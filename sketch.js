let canvas, canvasDiv, canvasWidth, canvasHeight, mindmap, input, newText, menu, backgroundColor;

class MindMap {
    constructor() {
        this.coreKeyword = {text: "Core Keyword", x: canvasWidth/2, y: canvasHeight/2, w: 270, h: 30, fontColor: "white", backgroundColor: "red"};
        this.selectedKeyword = this.coreKeyword;
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
    /*
    editKeyword(i, text) {
        const sections = this.sections.slice();
        sections[this.currentSection][i].text = text;
        sections[this.currentSection][i].w = text.length*9;
        this.sections = sections;
    }
    changeKeywordBackgroundColor(i, color) {
        const sections = this.sections.slice();
        sections[this.currentSection][i].backgroundColor = color;
        this.sections = sections;
    }
    changeKeywordFontColor(i, color) {
        const sections = this.sections.slice();
        sections[this.currentSection][i].fontColor = color;
        this.sections = keywords;
    }
    deleteKeyword(i) {
        const sections = this.sections.slice();
        sections[this.currentSection].splice(i, 1);
        this.sections = sections;
    }
    */
    draw() {
        // highlighting selected keyword (default: this.coreKeyword):
        rectMode(CENTER);
        fill("yellow");
        rect(this.selectedKeyword.x, this.selectedKeyword.y, this.selectedKeyword.w + 7, this.selectedKeyword.h + 7, 5);
        for (let i = this.keywords.length; i > 0; i--) {
            let keyword = this.keywords[i - 1];
            rectMode(CENTER);
            line(keyword.x, keyword.y, keyword.parent.x, keyword.parent.y);
            fill(keyword.backgroundColor);
            rect(keyword.x, keyword.y, keyword.w, keyword.h, 5);
            // keyword text
            fill(keyword.fontColor);
            textAlign("center", "center");
            textSize(15);
            text(keyword.text, keyword.x, keyword.y);
        }
        let coreKeyword = this.coreKeyword;
        rectMode(CENTER);
        fill(coreKeyword.backgroundColor);
        rect(coreKeyword.x, coreKeyword.y, coreKeyword.w, coreKeyword.h, 5);
        // text
        fill(coreKeyword.fontColor);
        textAlign("center", "center");
        textSize(15);
        text(coreKeyword.text, coreKeyword.x, coreKeyword.y);
        textSize(12);

        // watermark:
        fill("grey");
        text("created with MindMapApp", 625, 485);
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
    constructor(x, y, text, fontColor, backgroundColor, parent) {
        this.text = text;
        this.x = x;
        this.y = y;
        this.w = this.text.length*9; // width depends on text length
        this.h = 30;
        this.fontColor = fontColor;
        this.backgroundColor = backgroundColor;
        this.parent = parent;
    }
}

function setup() {
    canvasHeight = 500;
    canvasWidth = canvasHeight*1.414;
    // putting canvas into the div
    canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent("canvas");
    // auto resizing canvasDiv to canvas width and height
    canvasDiv = document.getElementById("canvas");

    mindmap = new MindMap();
    
    canvasDiv.addEventListener("click", () => {
        for (let i = 0; i < mindmap.keywords.length; i++) {
            if (mouseX >= mindmap.keywords[i].x - mindmap.keywords[i].w/2 &&
                mouseX <= mindmap.keywords[i].x + mindmap.keywords[i].w/2 &&
                mouseY >= mindmap.keywords[i].y - mindmap.keywords[i].h/2 &&
                mouseY <= mindmap.keywords[i].y + mindmap.keywords[i].h/2) {
                return;
            }            
        }
        if (mouseX >= mindmap.coreKeyword.x - mindmap.coreKeyword.w/2 && // if this.coreKeyword wad clicked:
            mouseX <= mindmap.coreKeyword.x + mindmap.coreKeyword.w/2 &&
            mouseY >= mindmap.coreKeyword.y - mindmap.coreKeyword.h/2 &&
            mouseY <= mindmap.coreKeyword.y + mindmap.coreKeyword.h/2) {
            // change selectedKeyword on this coreKeyword
            return;
        }
        let newKeyword = new Keyword(mouseX, mouseY, "new Keyword", "black", "white", mindmap.selectedKeyword);
        mindmap.addKeyword(newKeyword);
    });

    canvasDiv.addEventListener("dblclick", () => {
        for (let i = 0; i < mindmap.keywords.length; i++) {
            if (mouseX >= mindmap.keywords[i].x - mindmap.keywords[i].w/2 &&
                mouseX <= mindmap.keywords[i].x + mindmap.keywords[i].w/2 &&
                mouseY >= mindmap.keywords[i].y - mindmap.keywords[i].h/2 &&
                mouseY <= mindmap.keywords[i].y + mindmap.keywords[i].h/2) {
                // change selectedKeyword on this keyword
                mindmap.selectedKeyword = mindmap.keywords[i];
            }            
        }
        
        if (mouseX >= mindmap.coreKeyword.x - mindmap.coreKeyword.w/2 && // if this.coreKeyword wad clicked:
            mouseX <= mindmap.coreKeyword.x + mindmap.coreKeyword.w/2 &&
            mouseY >= mindmap.coreKeyword.y - mindmap.coreKeyword.h/2 &&
            mouseY <= mindmap.coreKeyword.y + mindmap.coreKeyword.h/2) {
            // change selectedKeyword on this coreKeyword
            mindmap.selectedKeyword = mindmap.coreKeyword;
        }
    });

    // set background color function:
    backgroundColor = "rgb(248, 249, 250)";
    
    navColorPicker = document.getElementById("navColorPicker");
    navColorPicker.addEventListener("input", (e) => {
        backgroundColor = e.target.value;
    });
}

function doubleClicked() {
    for (let i = 0; i < mindmap.sections.length; i++) {
        for (let j = 0; j < mindmap.sections[i].length; j++) {
            if (mouseX >= mindmap.sections[i][j].x - mindmap.sections[i][j].w/2 &&
                mouseX <= mindmap.sections[i][j].x + mindmap.sections[i][j].w/2 &&
                mouseY >= mindmap.sections[i][j].y - mindmap.sections[i][j].h/2 &&
                mouseY <= mindmap.sections[i][j].y + mindmap.sections[i][j].h/2) {
                // if keyword is clicked = selected:
                console.log("selected:");
                console.log(mindmap.sections[i][j]);
                console.log("i = " + i);
                console.log("j = " + j);
            }
        }
    }
}
/*
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
*/
function draw() {
    background(backgroundColor);
    mindmap.draw();
}

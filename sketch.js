let canvas, canvasDiv, canvasWidth, canvasHeight, mindmap, input, newText, menu, backgroundColor;

class MindMap {
    constructor() {
        this.coreKeyword = {text: "Core Keyword", x: canvasWidth/2, y: canvasHeight/2, w: 270, h: 30, fontColor: "white", backgroundColor: "red"};
        this.selectedKeyword = this.coreKeyword;
        this.selectedIndex = null;
        this.keywords = Array(0);
        this.colorFor = null;
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
    // => changeKeywordLineColor
    // => changeKeywordBorderColor
    deleteKeyword(i) {
        const keywords = this.keywords.slice();
        keywords.splice(i, 1);
        this.keywords = keywords;
        this.selectedKeyword = this.coreKeyword;
        this.selectedIndex = null;
    }
    
    draw() {
        // highlighting selected keyword (default: this.coreKeyword):
        rectMode(CENTER);
        //noStroke();
        fill("yellow");
        rect(this.selectedKeyword.x, this.selectedKeyword.y, this.selectedKeyword.w + 7, this.selectedKeyword.h + 7, 5);
        // draw keywords:
        for (let i = this.keywords.length; i > 0; i--) {
            let keyword = this.keywords[i - 1];
            rectMode(CENTER);
            line(keyword.x, keyword.y, keyword.parent.x, keyword.parent.y);
            fill(keyword.backgroundColor);
            //stroke("black");
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
        clearInputs();
    });

    canvasDiv.addEventListener("dblclick", () => {
        for (let i = 0; i < mindmap.keywords.length; i++) {
            if (mouseX >= mindmap.keywords[i].x - mindmap.keywords[i].w/2 &&
                mouseX <= mindmap.keywords[i].x + mindmap.keywords[i].w/2 &&
                mouseY >= mindmap.keywords[i].y - mindmap.keywords[i].h/2 &&
                mouseY <= mindmap.keywords[i].y + mindmap.keywords[i].h/2) {
                
                mindmap.selectedKeyword = mindmap.keywords[i];
                mindmap.selectedIndex = i;
                console.log("selected: " + mindmap.selectedIndex);
                clearInputs();
            }            
        }
        
        if (mouseX >= mindmap.coreKeyword.x - mindmap.coreKeyword.w/2 && // if this.coreKeyword wad clicked:
            mouseX <= mindmap.coreKeyword.x + mindmap.coreKeyword.w/2 &&
            mouseY >= mindmap.coreKeyword.y - mindmap.coreKeyword.h/2 &&
            mouseY <= mindmap.coreKeyword.y + mindmap.coreKeyword.h/2) {
            
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

function mouseDragged(i) {
    for (let i = 0; i < mindmap.keywords.length; i++) {
        if (mouseX >= mindmap.keywords[i].x - mindmap.keywords[i].w/2 &&
            mouseX <= mindmap.keywords[i].x + mindmap.keywords[i].w/2 &&
            mouseY >= mindmap.keywords[i].y - mindmap.keywords[i].h/2 &&
            mouseY <= mindmap.keywords[i].y + mindmap.keywords[i].h/2) {
            mindmap.onMouseDragged(i);
        }
    }
    // enable to drag the coreKeyword ??
}

//========================== keyword settings navbar event listeners: ==================
let keywordInput = document.getElementById("keyword-input");
keywordInput.addEventListener("input", (e) => {
    let newText = e.target.value;
    if (mindmap.selectedKeyword !== mindmap.coreKeyword) {
        mindmap.editKeyword(mindmap.selectedIndex, newText);
    } else {
        mindmap.coreKeyword.text = newText;
    }
});

let keywordSelectColorFor = document.getElementById("keyword-select-color-for");
keywordSelectColorFor.addEventListener("change", () => {
    mindmap.colorFor = keywordSelectColorFor.value;
    console.log(mindmap.colorFor);
});

let keywordColorPicker = document.getElementById("keyword-color-picker");
keywordColorPicker.addEventListener("input", (e) => {
    let color = e.target.value;
    if (mindmap.selectedKeyword !== mindmap.coreKeyword) {
        if (mindmap.colorFor === "background") {
            mindmap.changeKeywordBackgroundColor(mindmap.selectedIndex, color);
        } else if (mindmap.colorFor === "text") {
            mindmap.changeKeywordFontColor(mindmap.selectedIndex, color);
        }
    } else {
        if (mindmap.colorFor === "background") {
            mindmap.coreKeyword.backgroundColor = color;
        } else if (mindmap.colorFor === "text") {
            mindmap.coreKeyword.fontColor = color;
        }
    }
});

let saveKeywordChangesBtn = document.getElementById("save-keyword-changes-btn");
saveKeywordChangesBtn.addEventListener("click", () => {
    clearInputs();
});

let deleteKeywordBtn = document.getElementById("delete-keyword-btn");
deleteKeywordBtn.addEventListener("click", () => {
    console.log("index selected to delete: " + mindmap.selectedIndex);
    mindmap.deleteKeyword(mindmap.selectedIndex);
    clearInputs();
});

function clearInputs() {
    keywordInput.value = "";
    keywordSelectColorFor.value = "set color for...";
    keywordColorPicker.value = "#000000";
    mindmap.colorFor = null;
}

//============================== DRAW() ==========================
function draw() {
    background(backgroundColor);
    mindmap.draw();
}

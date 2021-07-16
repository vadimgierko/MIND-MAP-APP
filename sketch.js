let canvas, canvasDiv, canvasWidth, canvasHeight, mindmap, input, newText, menu, backgroundColor;

class MindMap {
    constructor() {
        this.coreKeyword = {text: "Core Keyword", x: canvasWidth/2, y: canvasHeight/2, w: 270, h: 30, fontColor: "white", backgroundColor: "rgb(0, 123, 255)", lineColor: "black", borderColor: "black"};
        this.selectedKeyword = this.coreKeyword;
        this.selectedIndex = null;
        this.keywords = Array(0);
        this.colorFor = null;
        this.name = "";
        this.backgroundColor = "rgb(248, 249, 250)";
        this.settingsFor = "keyword";
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
    changeKeywordLineColor(i, color) {
        const keywords = this.keywords.slice();
        keywords[i].lineColor = color;
        this.keywords = keywords;
    }
    changeKeywordBorderColor(i, color) {
        const keywords = this.keywords.slice();
        keywords[i].borderColor = color;
        this.keywords = keywords;
    }
    deleteKeyword(i) {
        const keywords = this.keywords.slice();
        keywords.splice(i, 1);
        this.keywords = keywords;
        this.selectedKeyword = this.coreKeyword;
        this.selectedIndex = null;
    }
    saveMindMap() {
        let savedMindMap = {
            name: this.name,
            coreKeyword: this.coreKeyword,
            keywords: this.keywords,
            backgroundColor: this.backgroundColor,
        }
        window.localStorage.setItem(savedMindMap.name, JSON.stringify(savedMindMap));
        console.log("You've saved this mindmap:");
        console.log(JSON.parse(window.localStorage.getItem(savedMindMap.name)));
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
            //line color:
            stroke(keyword.lineColor);
            line(keyword.x, keyword.y, keyword.parent.x, keyword.parent.y);
            fill(keyword.backgroundColor);
            // border color:
            stroke(keyword.borderColor);
            rect(keyword.x, keyword.y, keyword.w, keyword.h, 5);
            // keyword text
            noStroke();
            fill(keyword.fontColor);
            textAlign("center", "center");
            textSize(15);
            text(keyword.text, keyword.x, keyword.y);
        }
        let coreKeyword = this.coreKeyword;
        rectMode(CENTER);
        stroke(coreKeyword.borderColor);
        fill(coreKeyword.backgroundColor);
        rect(coreKeyword.x, coreKeyword.y, coreKeyword.w, coreKeyword.h, 5);
        // text
        noStroke();
        fill(coreKeyword.fontColor);
        textAlign("center", "center");
        textSize(17);
        text(coreKeyword.text, coreKeyword.x, coreKeyword.y);

        // watermark:
        textSize(13);
        fill("grey");
        text("created with MindMapApp", canvasWidth - 90, canvasHeight - 20);
    }
    
    onMouseDragged(i) {
        const keywords = this.keywords.slice();
        keywords[i].x = mouseX;
        keywords[i].y = mouseY;
        this.keywords = keywords;
    }
}

class Keyword {
    constructor(x, y, text, fontColor, backgroundColor, lineColor, borderColor, parent) {
        this.text = text;
        this.x = x;
        this.y = y;
        this.w = this.text.length*9; // width depends on text length
        this.h = 30;
        this.fontColor = fontColor;
        this.backgroundColor = backgroundColor;
        this.lineColor = lineColor;
        this.borderColor = borderColor;
        this.parent = parent;
    }
}

function setup() {
    canvasHeight = 650;
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
        let newKeyword = new Keyword(mouseX, mouseY, "new Keyword", "black", "white", "black", "black", mindmap.selectedKeyword);
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
    backgroundColor = mindmap.backgroundColor;
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

//=============== SETTINGS FOR =========================================
let deleteKeywordBtn = document.getElementById("delete-keyword-btn");
let deleteMindMapBtn = document.getElementById("delete-mind-map-btn");

let settingsChanger = document.getElementById("settings-for-select");
settingsChanger.addEventListener("change", () => {
    console.log("selected: " + settingsChanger.value);
    mindmap.settingsFor = settingsChanger.value;
});

let keywordInput = document.getElementById("keyword-input");

keywordInput.addEventListener("input", (e) => {
    if (settingsChanger.value !== "mindmap") {
        let newText = e.target.value;
        if (mindmap.selectedKeyword !== mindmap.coreKeyword) {
            mindmap.editKeyword(mindmap.selectedIndex, newText);
        } else {
            mindmap.coreKeyword.text = newText;
        }
    } else {
        alert("You can't change selected keyword text in mind map settings mode! If you want to change selected keyword text, change settings for on keyword.");
    }
});

let selectColorFor = document.getElementById("select-color-for");
selectColorFor.addEventListener("change", () => {
    mindmap.colorFor = selectColorFor.value;
    console.log(mindmap.colorFor);
});

let colorPicker = document.getElementById("color-picker");
colorPicker.addEventListener("input", (e) => {
    let color = e.target.value;
    if (settingsChanger.value === "keyword") {
        if (mindmap.selectedKeyword !== mindmap.coreKeyword) {
            if (mindmap.colorFor === "keyword background") {
                mindmap.changeKeywordBackgroundColor(mindmap.selectedIndex, color);
            } else if (mindmap.colorFor === "text") {
                mindmap.changeKeywordFontColor(mindmap.selectedIndex, color);
            } else if (mindmap.colorFor === "line") {
                mindmap.changeKeywordLineColor(mindmap.selectedIndex, color);
            } else if (mindmap.colorFor === "border") {
                mindmap.changeKeywordBorderColor(mindmap.selectedIndex, color);
            }
        } else {
            if (mindmap.colorFor === "keyword background") {
                mindmap.coreKeyword.backgroundColor = color;
            } else if (mindmap.colorFor === "text") {
                mindmap.coreKeyword.fontColor = color;
            } else if (mindmap.colorFor === "line") {
                mindmap.coreKeyword.lineColor = color;
            } else if (mindmap.colorFor === "border") {
                mindmap.coreKeyword.borderColor = color;
            }
        }
    } else if (settingsChanger.value === "mindmap") {
        if (mindmap.colorFor === "mind map background") {
            backgroundColor = color;
            mindmap.backgroundColor = backgroundColor;
        } else if (mindmap.colorFor === "text") {
            for (let i = 0; i < mindmap.keywords.length; i++) {
                mindmap.changeKeywordFontColor(i, color);
            }
        } else if (mindmap.colorFor === "keyword background") {
            for (let i = 0; i < mindmap.keywords.length; i++) {
                mindmap.changeKeywordBackgroundColor(i, color);
            }
        } else if (mindmap.colorFor === "line") {
            for (let i = 0; i < mindmap.keywords.length; i++) {
                mindmap.changeKeywordLineColor(i, color);
            }
        } else if (mindmap.colorFor === "border") {
            for (let i = 0; i < mindmap.keywords.length; i++) {
                mindmap.changeKeywordBorderColor(i, color);
            }
        }
    }
});

let saveChangesBtn = document.getElementById("save-changes-btn");
saveChangesBtn.addEventListener("click", () => {
    clearInputs();
    // here saving entire map into local storage must be !!!
});

deleteKeywordBtn.addEventListener("click", () => {
    if (settingsChanger.value === "keyword") {
        console.log("index selected to delete: " + mindmap.selectedIndex);
        mindmap.deleteKeyword(mindmap.selectedIndex);
        clearInputs();
    } else {
        alert("You can't delete keywords in mind map settings mode! If you want to delete selected keyword, change settings for on keyword.");
    }
});

deleteMindMapBtn.addEventListener("click", () => {
    if (settingsChanger.value === "mindmap") {
        mindmap.keywords = Array(0);
        mindmap.coreKeyword = {text: "Core Keyword", x: canvasWidth/2, y: canvasHeight/2, w: 270, h: 30, fontColor: "white", backgroundColor: "rgb(0, 123, 255)", lineColor: "black", borderColor: "black"};
        mindmap.selectedKeyword = mindmap.coreKeyword;
        backgroundColor = "rgb(248, 249, 250)";
        clearInputs();
    } else {
        alert("You can't delete mind map in keyword settings mode! If you want to delete current mind map, change settings for on mind map.");
    }
});

function clearInputs() {
    settingsChanger.value = "keyword";
    keywordInput.value = "";
    selectColorFor.value = "set color for...";
    colorPicker.value = "#000000";
    mindmap.colorFor = null;
}

//========================== mind map seetings navbar event listeners: =================

let saveInput = document.getElementById("save-input");
let mindMapName;
saveInput.addEventListener("input", (e) => {
    mindMapName = e.target.value;
    console.log(mindMapName);
});

let saveBtn = document.getElementById("save-btn");
saveBtn.addEventListener("click", () => {
    mindmap.name = mindMapName;
    console.log("Current mindmap will be saved under the name: " + mindmap.name);
    mindmap.saveMindMap();
});

let openInput = document.getElementById("open-input");
openInput.addEventListener("input", (e) => {
    mindMapName = e.target.value;
    console.log(mindMapName);
});

let openBtn = document.getElementById("open-btn");
openBtn.addEventListener("click", () => {
    let openedMindMap = JSON.parse(window.localStorage.getItem(mindMapName));
    mindmap.name = openedMindMap.name;
    mindmap.coreKeyword = openedMindMap.coreKeyword;
    mindmap.keywords = openedMindMap.keywords;
    mindmap.backgroundColor = openedMindMap.backgroundColor;

    backgroundColor = mindmap.backgroundColor;
});

//============================== DRAW() ==========================
function draw() {
    background(backgroundColor);
    mindmap.draw();
}
// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDEtbRV4bP1k3skVQoHfvwrsC2dO0pp4lQ",
    authDomain: "mindmapsapp-536fa.firebaseapp.com",
    projectId: "mindmapsapp-536fa",
    storageBucket: "mindmapsapp-536fa.appspot.com",
    messagingSenderId: "422593172613",
    appId: "1:422593172613:web:7435d6bb408714794045ec"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

let currentUser;

let canvas, canvasDiv, canvasWidth, canvasHeight, mindmap, input, newText, menu, backgroundColor;

let saveInput = document.getElementById("save-input");

//=== !!! all saved mind maps will be saved in local storage - they will be pushed in "mindmaps" item !!! ===//

// if you want to clear storage for this app (all saved pictures) uncomment the code below:
//window.localStorage.removeItem("mindmaps");

class User {
    constructor(uid, name, mindmaps, email) {
        this.uid = uid;
        this.name = name;
        this.mindmaps = mindmaps;
        this.email = email;
        this.currentMindMap = null;
        this.isLogged = false;

    }
    signUp(email, password) {
        firebase.auth().createUserWithEmailAndPassword(email, password).catch(error => alert(error.message));
    }
    signIn(email, password) {
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(auth => {
            //userInfo.textContent = auth.user.email + " is logged in; user's id = " + auth.user.uid;
        }) //console.log(auth.user.email)
        .catch(error => alert(error.message));
    }
    signOut() {
        firebase.auth().signOut();
    }
    clearData() {
        this.uid = null;
        this.name = null;
        this.mindmaps = null;
        this.currentMindMap = null;
        this.isLogged = false;
        this.email = null;
    }
}

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
    save() {
        if (!this.name) { // if this is the new mind map without a name:
            const mindMapName = prompt("Input the name for your new mind map. It will be saved in your browser under this name.");
            this.name = mindMapName;
            const savedMindMap = {
                name: this.name,
                coreKeyword: this.coreKeyword,
                keywords: this.keywords,
                backgroundColor: this.backgroundColor,
            }
            if (window.localStorage.getItem("mindmaps")) {
                const savedMindMaps = JSON.parse(window.localStorage.getItem("mindmaps")); // return an array with objects inside
                savedMindMaps.push({name: savedMindMap.name, mindmap: savedMindMap});
                window.localStorage.setItem("mindmaps", JSON.stringify(savedMindMaps));
            } else {
                window.localStorage.setItem("mindmaps", JSON.stringify([{name: savedMindMap.name, mindmap: savedMindMap}]));
            }
            alert("You saved a new mind map named: " + savedMindMap.name + "! If you want to open it in the future, press open button and input the name.");
        } else { // if this is an existing (saved) mind map, which means that it has a name automatically (for example set after opening):
            const savedMindMap = {
                name: this.name,
                coreKeyword: this.coreKeyword,
                keywords: this.keywords,
                backgroundColor: this.backgroundColor,
            }
            const savedMindMaps = JSON.parse(window.localStorage.getItem("mindmaps")); // we are sure that there are such an item with an array inside
            // search the previously saved version of this mind map by filtering names:
            for (let i = 0; i < savedMindMaps.length; i++) {
                let mindMapNameWeSearchFor = this.name;
                if (savedMindMaps[i].name === mindMapNameWeSearchFor) {
                    // this means that we need to overwrite savedMindMaps[i].mindmap:
                    savedMindMaps[i].mindmap = savedMindMap; // or Object.assign...
                    // and now overwrite it:
                    window.localStorage.setItem("mindmaps", JSON.stringify(savedMindMaps));
                }
            }
        }  
    }
    new() {
        // ask if the mind map need saving?
        let needSave = confirm("Do you want to save changes to the current mind map?");
        if (needSave) {
            this.save();
        }
        this.name = ""
        this.keywords = Array(0);
        this.coreKeyword = {text: "Core Keyword", x: canvasWidth/2, y: canvasHeight/2, w: 270, h: 30, fontColor: "white", backgroundColor: "rgb(0, 123, 255)", lineColor: "black", borderColor: "black"};
        this.selectedKeyword = this.coreKeyword;
        backgroundColor = "rgb(248, 249, 250)";
    }
    open() {
        // ask if the mind map need saving?
        let needSave = confirm("Do you want to save changes to the current mind map?");
        if (needSave) {
            this.save();
        }
        if (window.localStorage.getItem("mindmaps")) {
            // check the names of saved mind maps in storage:
            let savedMindMapsNames = [];
            const savedMindMaps = JSON.parse(window.localStorage.getItem("mindmaps")); // return an array with objects inside
            for (let i = 0; i < savedMindMaps.length; i++) {
              let savedMindMapName = savedMindMaps[i].name;
              savedMindMapsNames.push(savedMindMapName);
            }
            // ask for name:
            let inputedMindMapName = prompt(`Input the name of your saved mind map. There are the names of saved mind maps in your storage: ${savedMindMapsNames}.`);
            // search the mind map by filtering names:
            if (inputedMindMapName) {
                for (let i = 0; i < savedMindMaps.length; i++) {
                    let savedMindMapName = savedMindMaps[i].name;
                    if (savedMindMapName === inputedMindMapName) {
                        this.name = savedMindMaps[i].mindmap.name;
                        this.coreKeyword = savedMindMaps[i].mindmap.coreKeyword;
                        this.keywords = savedMindMaps[i].mindmap.keywords;
                        this.backgroundColor = savedMindMaps[i].mindmap.backgroundColor;
                        this.selectedKeyword = this.coreKeyword;

                        backgroundColor = savedMindMaps[i].mindmap.backgroundColor;
                    }
                }
            } else {
              alert("You need to input some saved mind map name... or nothing will be opened...");
            }
          } else {
            alert("There is no saved mind maps yet... Create a new one, save it and then try to open it ;-)");
          }
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
        text("created with MindMapsApp", canvasWidth - 90, canvasHeight - 15);
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
    canvasHeight = 640;
    canvasWidth = canvasHeight*1.414;
    // putting canvas into the div
    canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent("canvas");
    // auto resizing canvasDiv to canvas width and height
    canvasDiv = document.getElementById("canvas");

    currentUser = new User(null, null, null, null);
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

const deleteKeywordBtn = document.getElementById("delete-keyword-btn");
deleteKeywordBtn.addEventListener("click", () => {
    if (settingsChanger.value === "keyword") {
        console.log("index selected to delete: " + mindmap.selectedIndex);
        mindmap.deleteKeyword(mindmap.selectedIndex);
        clearInputs();
    } else {
        alert("You can't delete keywords in mind map settings mode! If you want to delete selected keyword, change settings for on keyword.");
    }
});

//========================== mind map seetings navbar event listeners: =================

let newMindMapBtn = document.getElementById("new-mind-map-btn");
newMindMapBtn.addEventListener("click", () => {
    mindmap.new();
    clearInputs();
});

let saveBtn = document.getElementById("save-btn");
saveBtn.addEventListener("click", () => {
    mindmap.save();
    alert("You saved a mind map named: " + savedMindMap.name + "! If you want to open it in the future, press open button and input the name.");
    clearInputs();
});

let openBtn = document.getElementById("open-btn");
openBtn.addEventListener("click", () => {
    mindmap.open();
    clearInputs()
});

function clearInputs() {
    settingsChanger.value = "keyword";
    keywordInput.value = "";
    selectColorFor.value = "set color for...";
    colorPicker.value = "#000000";
    mindmap.colorFor = null;
}

// USER AUTH 

const signInBtn = document.getElementById("sign-in-btn");
const $signInBtn = $("#sign-in-btn");

const signUpBtn = document.getElementById("sign-up-btn");
const $signUpBtn = $("#sign-up-btn");

const signOutBtn = document.getElementById("sign-out-btn");
const $signOutBtn = $("#sign-out-btn");

const $userEmail = $("#user-email");

signUpBtn.addEventListener("click", () => {
    let email = prompt("Input your email address");
    let password = prompt("Input your password");
    if (email && password) {
        currentUser.signUp(email, password);
    }
});

signInBtn.addEventListener("click", () => {
    let email = prompt("Input your email address");
    let password = prompt("Input your password");
    if (email && password) {
        currentUser.signIn(email, password);
    }
});

signOutBtn.addEventListener("click", () => currentUser.signOut());

// CHECK IF USER IS SIGNED IN => assign uid to currentUserId and print it in console + get the user data:
firebase.auth().onAuthStateChanged(user => {
    if (user) {
        console.log("user is signed in");
        currentUser.isLogged = true;
        console.log("currentUser.isLogged ? " + currentUser.isLogged);
        currentUser.uid = user.uid;
        console.log("current user's id = " + currentUser.uid);
        currentUser.email = user.email;
        console.log("current user's email = " + currentUser.email);
        
        // show sign out button $ hide other:
        $signOutBtn.show();
        $userEmail.text(currentUser.email).show();
        $signInBtn.hide();
        $signUpBtn.hide();

        //getUserData(); // here we're gone to get all users mindmaps 
    } else {
        console.log("user is not signed in");
        currentUser.isLogged = false;
        console.log("currentUser.isLogged = ? " + currentUser.isLogged);
        currentUser.uid = "";
        console.log("current user's id = " + currentUser.uid);

        // show sign in / up buttons $ hide sign out:
        $signOutBtn.hide();
        $userEmail.hide();
        $signInBtn.show();
        $signUpBtn.show();

        currentUser.clearData();
    }
});

//============================== DRAW() ==========================
function draw() {
    background(backgroundColor);
    mindmap.draw();
}

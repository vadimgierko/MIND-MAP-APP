let canvas, canvasDiv, canvasWidth, canvasHeight, mindmap, input, newText, menu, backgroundColor;

let saveInput = document.getElementById("save-input");

const templateMindMap = {"name":"template-mind-map","coreKeyword":{"text":"MIND MAPS APP","x":452.47999999999996,"y":320,"w":270,"h":30,"fontColor":"white","backgroundColor":"rgb(0, 123, 255)","lineColor":"black","borderColor":"black"},"keywords":[{"text":" MIND MAPS ","x":452.1799949499309,"y":243.5999984741211,"w":99,"h":30,"fontColor":"black","backgroundColor":"white","lineColor":"black","borderColor":"black","parent":{"text":"MIND MAPS APP","x":452.47999999999996,"y":320,"w":270,"h":30,"fontColor":"white","backgroundColor":"rgb(0, 123, 255)","lineColor":"black","borderColor":"black"}},{"text":"How to use this App?","x":454.1799065521409,"y":391.5999984741211,"w":180,"h":30,"fontColor":"#fafafa","backgroundColor":"#f50000","lineColor":"black","borderColor":"black","parent":{"text":"MIND MAPS APP","x":452.47999999999996,"y":320,"w":270,"h":30,"fontColor":"white","backgroundColor":"rgb(0, 123, 255)","lineColor":"black","borderColor":"black"}},{"text":"diagram","x":587.1740280991022,"y":199.5999984741211,"w":63,"h":30,"fontColor":"black","backgroundColor":"white","lineColor":"black","borderColor":"black","parent":{"text":" MIND MAPS ","x":452.1799949499309,"y":243.5999984741211,"w":99,"h":30,"fontColor":"black","backgroundColor":"white","lineColor":"black","borderColor":"black","parent":{"text":"MIND MAPS APP","x":452.47999999999996,"y":320,"w":270,"h":30,"fontColor":"white","backgroundColor":"rgb(0, 123, 255)","lineColor":"black","borderColor":"black"}}},{"text":"visually organize information","x":712.1685032372237,"y":251.5999984741211,"w":261,"h":30,"fontColor":"black","backgroundColor":"white","lineColor":"black","borderColor":"black","parent":{"text":"diagram","x":587.1740280991022,"y":199.5999984741211,"w":63,"h":30,"fontColor":"black","backgroundColor":"white","lineColor":"black","borderColor":"black","parent":{"text":" MIND MAPS ","x":452.1799949499309,"y":243.5999984741211,"w":99,"h":30,"fontColor":"black","backgroundColor":"white","lineColor":"black","borderColor":"black","parent":{"text":"MIND MAPS APP","x":452.47999999999996,"y":320,"w":270,"h":30,"fontColor":"white","backgroundColor":"rgb(0, 123, 255)","lineColor":"black","borderColor":"black"}}}},{"text":"hierarchy","x":671.1703153919199,"y":132.5999984741211,"w":81,"h":30,"fontColor":"black","backgroundColor":"white","lineColor":"black","borderColor":"black","parent":{"text":"diagram","x":587.1740280991022,"y":199.5999984741211,"w":63,"h":30,"fontColor":"black","backgroundColor":"white","lineColor":"black","borderColor":"black","parent":{"text":" MIND MAPS ","x":452.1799949499309,"y":243.5999984741211,"w":99,"h":30,"fontColor":"black","backgroundColor":"white","lineColor":"black","borderColor":"black","parent":{"text":"MIND MAPS APP","x":452.47999999999996,"y":320,"w":270,"h":30,"fontColor":"white","backgroundColor":"rgb(0, 123, 255)","lineColor":"black","borderColor":"black"}}}},{"text":"keywords","x":452.1799949499309,"y":167.5999984741211,"w":72,"h":30,"fontColor":"black","backgroundColor":"white","lineColor":"black","borderColor":"black","parent":{"text":" MIND MAPS ","x":452.1799949499309,"y":243.5999984741211,"w":99,"h":30,"fontColor":"black","backgroundColor":"white","lineColor":"black","borderColor":"black","parent":{"text":"MIND MAPS APP","x":452.47999999999996,"y":320,"w":270,"h":30,"fontColor":"white","backgroundColor":"rgb(0, 123, 255)","lineColor":"black","borderColor":"black"}}},{"text":"Core Keyword","x":367.18375185600826,"y":107.5999984741211,"w":108,"h":30,"fontColor":"black","backgroundColor":"white","lineColor":"black","borderColor":"black","parent":{"text":"keywords","x":452.1799949499309,"y":167.5999984741211,"w":72,"h":30,"fontColor":"black","backgroundColor":"white","lineColor":"black","borderColor":"black","parent":{"text":" MIND MAPS ","x":452.1799949499309,"y":243.5999984741211,"w":99,"h":30,"fontColor":"black","backgroundColor":"white","lineColor":"black","borderColor":"black","parent":{"text":"MIND MAPS APP","x":452.47999999999996,"y":320,"w":270,"h":30,"fontColor":"white","backgroundColor":"rgb(0, 123, 255)","lineColor":"black","borderColor":"black"}}}},{"text":"(sub) keywords","x":523.176856828384,"y":107.5999984741211,"w":126,"h":30,"fontColor":"black","backgroundColor":"white","lineColor":"black","borderColor":"black","parent":{"text":"keywords","x":452.1799949499309,"y":167.5999984741211,"w":72,"h":30,"fontColor":"black","backgroundColor":"white","lineColor":"black","borderColor":"black","parent":{"text":" MIND MAPS ","x":452.1799949499309,"y":243.5999984741211,"w":99,"h":30,"fontColor":"black","backgroundColor":"white","lineColor":"black","borderColor":"black","parent":{"text":"MIND MAPS APP","x":452.47999999999996,"y":320,"w":270,"h":30,"fontColor":"white","backgroundColor":"rgb(0, 123, 255)","lineColor":"black","borderColor":"black"}}}},{"text":"in the center","x":269.188083347721,"y":59.599998474121094,"w":117,"h":30,"fontColor":"black","backgroundColor":"white","lineColor":"black","borderColor":"black","parent":{"text":"Core Keyword","x":367.18375185600826,"y":107.5999984741211,"w":108,"h":30,"fontColor":"black","backgroundColor":"white","lineColor":"black","borderColor":"black","parent":{"text":"keywords","x":452.1799949499309,"y":167.5999984741211,"w":72,"h":30,"fontColor":"black","backgroundColor":"white","lineColor":"black","borderColor":"black","parent":{"text":" MIND MAPS ","x":452.1799949499309,"y":243.5999984741211,"w":99,"h":30,"fontColor":"black","backgroundColor":"white","lineColor":"black","borderColor":"black","parent":{"text":"MIND MAPS APP","x":452.47999999999996,"y":320,"w":270,"h":30,"fontColor":"white","backgroundColor":"rgb(0, 123, 255)","lineColor":"black","borderColor":"black"}}}}},{"text":"main topic","x":401.18224909357735,"y":56.599998474121094,"w":90,"h":30,"fontColor":"black","backgroundColor":"white","lineColor":"black","borderColor":"black","parent":{"text":"Core Keyword","x":367.18375185600826,"y":107.5999984741211,"w":108,"h":30,"fontColor":"black","backgroundColor":"white","lineColor":"black","borderColor":"black","parent":{"text":"keywords","x":452.1799949499309,"y":167.5999984741211,"w":72,"h":30,"fontColor":"black","backgroundColor":"white","lineColor":"black","borderColor":"black","parent":{"text":" MIND MAPS ","x":452.1799949499309,"y":243.5999984741211,"w":99,"h":30,"fontColor":"black","backgroundColor":"white","lineColor":"black","borderColor":"black","parent":{"text":"MIND MAPS APP","x":452.47999999999996,"y":320,"w":270,"h":30,"fontColor":"white","backgroundColor":"rgb(0, 123, 255)","lineColor":"black","borderColor":"black"}}}}},{"text":"subtopics","x":537.1762380438536,"y":44.599998474121094,"w":81,"h":30,"fontColor":"black","backgroundColor":"white","lineColor":"black","borderColor":"black","parent":{"text":"(sub) keywords","x":523.176856828384,"y":107.5999984741211,"w":126,"h":30,"fontColor":"black","backgroundColor":"white","lineColor":"black","borderColor":"black","parent":{"text":"keywords","x":452.1799949499309,"y":167.5999984741211,"w":72,"h":30,"fontColor":"black","backgroundColor":"white","lineColor":"black","borderColor":"black","parent":{"text":" MIND MAPS ","x":452.1799949499309,"y":243.5999984741211,"w":99,"h":30,"fontColor":"black","backgroundColor":"white","lineColor":"black","borderColor":"black","parent":{"text":"MIND MAPS APP","x":452.47999999999996,"y":320,"w":270,"h":30,"fontColor":"white","backgroundColor":"rgb(0, 123, 255)","lineColor":"black","borderColor":"black"}}}}},{"text":"linked","x":668.170447988605,"y":57.599998474121094,"w":54,"h":30,"fontColor":"black","backgroundColor":"white","lineColor":"black","borderColor":"black","parent":{"text":"(sub) keywords","x":523.176856828384,"y":107.5999984741211,"w":126,"h":30,"fontColor":"black","backgroundColor":"white","lineColor":"black","borderColor":"black","parent":{"text":"keywords","x":452.1799949499309,"y":167.5999984741211,"w":72,"h":30,"fontColor":"black","backgroundColor":"white","lineColor":"black","borderColor":"black","parent":{"text":" MIND MAPS ","x":452.1799949499309,"y":243.5999984741211,"w":99,"h":30,"fontColor":"black","backgroundColor":"white","lineColor":"black","borderColor":"black","parent":{"text":"MIND MAPS APP","x":452.47999999999996,"y":320,"w":270,"h":30,"fontColor":"white","backgroundColor":"rgb(0, 123, 255)","lineColor":"black","borderColor":"black"}}}}},{"text":"help to remember & recall","x":778.1655861101519,"y":183.5999984741211,"w":225,"h":30,"fontColor":"black","backgroundColor":"white","lineColor":"black","borderColor":"black","parent":{"text":"diagram","x":587.1740280991022,"y":199.5999984741211,"w":63,"h":30,"fontColor":"black","backgroundColor":"white","lineColor":"black","borderColor":"black","parent":{"text":" MIND MAPS ","x":452.1799949499309,"y":243.5999984741211,"w":99,"h":30,"fontColor":"black","backgroundColor":"white","lineColor":"black","borderColor":"black","parent":{"text":"MIND MAPS APP","x":452.47999999999996,"y":320,"w":270,"h":30,"fontColor":"white","backgroundColor":"rgb(0, 123, 255)","lineColor":"black","borderColor":"black"}}}},{"text":"colors","x":264.18830434219615,"y":163.5999984741211,"w":54,"h":30,"fontColor":"black","backgroundColor":"white","lineColor":"black","borderColor":"black","parent":{"text":" MIND MAPS ","x":452.1799949499309,"y":243.5999984741211,"w":99,"h":30,"fontColor":"black","backgroundColor":"white","lineColor":"black","borderColor":"black","parent":{"text":"MIND MAPS APP","x":452.47999999999996,"y":320,"w":270,"h":30,"fontColor":"white","backgroundColor":"rgb(0, 123, 255)","lineColor":"black","borderColor":"black"}}},{"text":"images/ icons","x":128.1943153919199,"y":169.5999984741211,"w":117,"h":30,"fontColor":"black","backgroundColor":"white","lineColor":"black","borderColor":"black","parent":{"text":" MIND MAPS ","x":452.1799949499309,"y":243.5999984741211,"w":99,"h":30,"fontColor":"black","backgroundColor":"white","lineColor":"black","borderColor":"black","parent":{"text":"MIND MAPS APP","x":452.47999999999996,"y":320,"w":270,"h":30,"fontColor":"white","backgroundColor":"rgb(0, 123, 255)","lineColor":"black","borderColor":"black"}}},{"text":"different fonts / font sizes","x":181.1919728504834,"y":251.5999984741211,"w":252,"h":30,"fontColor":"black","backgroundColor":"white","lineColor":"black","borderColor":"black","parent":{"text":" MIND MAPS ","x":452.1799949499309,"y":243.5999984741211,"w":99,"h":30,"fontColor":"black","backgroundColor":"white","lineColor":"black","borderColor":"black","parent":{"text":"MIND MAPS APP","x":452.47999999999996,"y":320,"w":270,"h":30,"fontColor":"white","backgroundColor":"rgb(0, 123, 255)","lineColor":"black","borderColor":"black"}}},{"text":"How to select a keyword?","x":187.19170765711326,"y":391.5999984741211,"w":216,"h":30,"fontColor":"black","backgroundColor":"white","lineColor":"black","borderColor":"black","parent":{"text":"How to use this App?","x":454.1799065521409,"y":391.5999984741211,"w":180,"h":30,"fontColor":"#fafafa","backgroundColor":"#f50000","lineColor":"black","borderColor":"black","parent":{"text":"MIND MAPS APP","x":452.47999999999996,"y":320,"w":270,"h":30,"fontColor":"white","backgroundColor":"rgb(0, 123, 255)","lineColor":"black","borderColor":"black"}}},{"text":"double click","x":75.19665793335635,"y":445.5999984741211,"w":108,"h":30,"fontColor":"black","backgroundColor":"white","lineColor":"black","borderColor":"black","parent":{"text":"How to select a keyword?","x":187.19170765711326,"y":391.5999984741211,"w":216,"h":30,"fontColor":"black","backgroundColor":"white","lineColor":"black","borderColor":"black","parent":{"text":"How to use this App?","x":454.1799065521409,"y":391.5999984741211,"w":180,"h":30,"fontColor":"#fafafa","backgroundColor":"#f50000","lineColor":"black","borderColor":"black","parent":{"text":"MIND MAPS APP","x":452.47999999999996,"y":320,"w":270,"h":30,"fontColor":"white","backgroundColor":"rgb(0, 123, 255)","lineColor":"black","borderColor":"black"}}}},{"text":"How to add a new keyword?","x":300.1867131819751,"y":447.5999984741211,"w":225,"h":30,"fontColor":"black","backgroundColor":"white","lineColor":"black","borderColor":"black","parent":{"text":"How to use this App?","x":454.1799065521409,"y":391.5999984741211,"w":180,"h":30,"fontColor":"#fafafa","backgroundColor":"#f50000","lineColor":"black","borderColor":"black","parent":{"text":"MIND MAPS APP","x":452.47999999999996,"y":320,"w":270,"h":30,"fontColor":"white","backgroundColor":"rgb(0, 123, 255)","lineColor":"black","borderColor":"black"}}},{"text":"click at any place on canvas","x":175.1922380438536,"y":500.5999984741211,"w":252,"h":30,"fontColor":"black","backgroundColor":"white","lineColor":"black","borderColor":"black","parent":{"text":"How to add a new keyword?","x":300.1867131819751,"y":447.5999984741211,"w":225,"h":30,"fontColor":"black","backgroundColor":"white","lineColor":"black","borderColor":"black","parent":{"text":"How to use this App?","x":454.1799065521409,"y":391.5999984741211,"w":180,"h":30,"fontColor":"#fafafa","backgroundColor":"#f50000","lineColor":"black","borderColor":"black","parent":{"text":"MIND MAPS APP","x":452.47999999999996,"y":320,"w":270,"h":30,"fontColor":"white","backgroundColor":"rgb(0, 123, 255)","lineColor":"black","borderColor":"black"}}}},{"text":"will be linked to selected keyword","x":172.19237064053868,"y":553.5999984741211,"w":306,"h":30,"fontColor":"black","backgroundColor":"white","lineColor":"black","borderColor":"black","parent":{"text":"click at any place on canvas","x":175.1922380438536,"y":500.5999984741211,"w":252,"h":30,"fontColor":"black","backgroundColor":"white","lineColor":"black","borderColor":"black","parent":{"text":"How to add a new keyword?","x":300.1867131819751,"y":447.5999984741211,"w":225,"h":30,"fontColor":"black","backgroundColor":"white","lineColor":"black","borderColor":"black","parent":{"text":"How to use this App?","x":454.1799065521409,"y":391.5999984741211,"w":180,"h":30,"fontColor":"#fafafa","backgroundColor":"#f50000","lineColor":"black","borderColor":"black","parent":{"text":"MIND MAPS APP","x":452.47999999999996,"y":320,"w":270,"h":30,"fontColor":"white","backgroundColor":"rgb(0, 123, 255)","lineColor":"black","borderColor":"black"}}}}},{"text":"check menu for what you can do","x":454.1799065521409,"y":495.5999984741211,"w":270,"h":30,"fontColor":"black","backgroundColor":"white","lineColor":"black","borderColor":"black","parent":{"text":"How to use this App?","x":454.1799065521409,"y":391.5999984741211,"w":180,"h":30,"fontColor":"#fafafa","backgroundColor":"#f50000","lineColor":"black","borderColor":"black","parent":{"text":"MIND MAPS APP","x":452.47999999999996,"y":320,"w":270,"h":30,"fontColor":"white","backgroundColor":"rgb(0, 123, 255)","lineColor":"black","borderColor":"black"}}},{"text":"with selected keyword","x":332.1852988173342,"y":596.5999984741211,"w":189,"h":30,"fontColor":"black","backgroundColor":"white","lineColor":"black","borderColor":"black","parent":{"text":"check menu for what you can do","x":454.1799065521409,"y":495.5999984741211,"w":270,"h":30,"fontColor":"black","backgroundColor":"white","lineColor":"black","borderColor":"black","parent":{"text":"How to use this App?","x":454.1799065521409,"y":391.5999984741211,"w":180,"h":30,"fontColor":"#fafafa","backgroundColor":"#f50000","lineColor":"black","borderColor":"black","parent":{"text":"MIND MAPS APP","x":452.47999999999996,"y":320,"w":270,"h":30,"fontColor":"white","backgroundColor":"rgb(0, 123, 255)","lineColor":"black","borderColor":"black"}}}},{"text":"with entire mind map","x":547.1757960549033,"y":571.5999984741211,"w":180,"h":30,"fontColor":"black","backgroundColor":"white","lineColor":"black","borderColor":"black","parent":{"text":"check menu for what you can do","x":454.1799065521409,"y":495.5999984741211,"w":270,"h":30,"fontColor":"black","backgroundColor":"white","lineColor":"black","borderColor":"black","parent":{"text":"How to use this App?","x":454.1799065521409,"y":391.5999984741211,"w":180,"h":30,"fontColor":"#fafafa","backgroundColor":"#f50000","lineColor":"black","borderColor":"black","parent":{"text":"MIND MAPS APP","x":452.47999999999996,"y":320,"w":270,"h":30,"fontColor":"white","backgroundColor":"rgb(0, 123, 255)","lineColor":"black","borderColor":"black"}}}},{"text":"save your mind map!","x":621.1725253366712,"y":450.5999984741211,"w":171,"h":30,"fontColor":"black","backgroundColor":"white","lineColor":"black","borderColor":"black","parent":{"text":"How to use this App?","x":454.1799065521409,"y":391.5999984741211,"w":180,"h":30,"fontColor":"#fafafa","backgroundColor":"#f50000","lineColor":"black","borderColor":"black","parent":{"text":"MIND MAPS APP","x":452.47999999999996,"y":320,"w":270,"h":30,"fontColor":"white","backgroundColor":"rgb(0, 123, 255)","lineColor":"black","borderColor":"black"}}},{"text":"remember the name","x":807.1643043421961,"y":452.5999984741211,"w":153,"h":30,"fontColor":"black","backgroundColor":"white","lineColor":"black","borderColor":"black","parent":{"text":"save your mind map!","x":621.1725253366712,"y":450.5999984741211,"w":171,"h":30,"fontColor":"black","backgroundColor":"white","lineColor":"black","borderColor":"black","parent":{"text":"How to use this App?","x":454.1799065521409,"y":391.5999984741211,"w":180,"h":30,"fontColor":"#fafafa","backgroundColor":"#f50000","lineColor":"black","borderColor":"black","parent":{"text":"MIND MAPS APP","x":452.47999999999996,"y":320,"w":270,"h":30,"fontColor":"white","backgroundColor":"rgb(0, 123, 255)","lineColor":"black","borderColor":"black"}}}},{"text":"then you can open & edit it","x":759.1664258891575,"y":501.5999984741211,"w":243,"h":30,"fontColor":"black","backgroundColor":"white","lineColor":"black","borderColor":"black","parent":{"text":"remember the name","x":807.1643043421961,"y":452.5999984741211,"w":153,"h":30,"fontColor":"black","backgroundColor":"white","lineColor":"black","borderColor":"black","parent":{"text":"save your mind map!","x":621.1725253366712,"y":450.5999984741211,"w":171,"h":30,"fontColor":"black","backgroundColor":"white","lineColor":"black","borderColor":"black","parent":{"text":"How to use this App?","x":454.1799065521409,"y":391.5999984741211,"w":180,"h":30,"fontColor":"#fafafa","backgroundColor":"#f50000","lineColor":"black","borderColor":"black","parent":{"text":"MIND MAPS APP","x":452.47999999999996,"y":320,"w":270,"h":30,"fontColor":"white","backgroundColor":"rgb(0, 123, 255)","lineColor":"black","borderColor":"black"}}}}},{"text":"saved in your browser","x":756.1665584858425,"y":557.5999984741211,"w":189,"h":30,"fontColor":"black","backgroundColor":"white","lineColor":"black","borderColor":"black","parent":{"text":"save your mind map!","x":621.1725253366712,"y":450.5999984741211,"w":171,"h":30,"fontColor":"black","backgroundColor":"white","lineColor":"black","borderColor":"black","parent":{"text":"How to use this App?","x":454.1799065521409,"y":391.5999984741211,"w":180,"h":30,"fontColor":"#fafafa","backgroundColor":"#f50000","lineColor":"black","borderColor":"black","parent":{"text":"MIND MAPS APP","x":452.47999999999996,"y":320,"w":270,"h":30,"fontColor":"white","backgroundColor":"rgb(0, 123, 255)","lineColor":"black","borderColor":"black"}}}},{"text":"want a PNG file?","x":660.1708015797652,"y":394.5999984741211,"w":144,"h":30,"fontColor":"black","backgroundColor":"white","lineColor":"black","borderColor":"black","parent":{"text":"How to use this App?","x":454.1799065521409,"y":391.5999984741211,"w":180,"h":30,"fontColor":"#fafafa","backgroundColor":"#f50000","lineColor":"black","borderColor":"black","parent":{"text":"MIND MAPS APP","x":452.47999999999996,"y":320,"w":270,"h":30,"fontColor":"white","backgroundColor":"rgb(0, 123, 255)","lineColor":"black","borderColor":"black"}}},{"text":"click right mouse button","x":762.1662932924723,"y":335.5999984741211,"w":216,"h":30,"fontColor":"black","backgroundColor":"white","lineColor":"black","borderColor":"black","parent":{"text":"want a PNG file?","x":660.1708015797652,"y":394.5999984741211,"w":144,"h":30,"fontColor":"black","backgroundColor":"white","lineColor":"black","borderColor":"black","parent":{"text":"How to use this App?","x":454.1799065521409,"y":391.5999984741211,"w":180,"h":30,"fontColor":"#fafafa","backgroundColor":"#f50000","lineColor":"black","borderColor":"black","parent":{"text":"MIND MAPS APP","x":452.47999999999996,"y":320,"w":270,"h":30,"fontColor":"white","backgroundColor":"rgb(0, 123, 255)","lineColor":"black","borderColor":"black"}}}},{"text":"click & drag keywords","x":164.1927242316989,"y":335.5999984741211,"w":189,"h":30,"fontColor":"black","backgroundColor":"white","lineColor":"black","borderColor":"black","parent":{"text":"How to use this App?","x":454.1799065521409,"y":391.5999984741211,"w":180,"h":30,"fontColor":"#fafafa","backgroundColor":"#f50000","lineColor":"black","borderColor":"black","parent":{"text":"MIND MAPS APP","x":452.47999999999996,"y":320,"w":270,"h":30,"fontColor":"white","backgroundColor":"rgb(0, 123, 255)","lineColor":"black","borderColor":"black"}}}],"backgroundColor":"#adadad"};
console.log(templateMindMap);
// if you want to clear local storage (delete all saved mindmaps), uncomment this code below:
//window.localStorage.clear();

// check the storage:
console.log(window.localStorage);

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
    setMindMapName(name) {
        saveInput.value = "";
        this.name = name;
        console.log("You've set a name for this mindmap: " + this.name);
        // change save input value for the new name automatically
        saveInput.value = this.name;
        this.saveMindMap();
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

    mindmap = new MindMap();
    /*  UNCOMMENT THIS IF YOU WANT TO SHOW TEMPLATE MIND MAP AS A WELCOME MIND MAP
    mindmap.name = templateMindMap.name;
    mindmap.coreKeyword = templateMindMap.coreKeyword;
    mindmap.keywords = templateMindMap.keywords;
    mindmap.backgroundColor = templateMindMap.backgroundColor;
    mindmap.selectedKeyword = templateMindMap.coreKeyword;

    backgroundColor = mindmap.backgroundColor;
    */
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
let newMindMapBtn = document.getElementById("new-mind-map-btn");

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
    mindmap.saveMindMap();
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

newMindMapBtn.addEventListener("click", () => {
    if (settingsChanger.value === "mindmap") {
        alert("This mind map will be saved & deleted & new one blank will be initiated :-)");
        mindmap.saveMindMap();
        
        mindmap.keywords = Array(0);
        mindmap.coreKeyword = {text: "Core Keyword", x: canvasWidth/2, y: canvasHeight/2, w: 270, h: 30, fontColor: "white", backgroundColor: "rgb(0, 123, 255)", lineColor: "black", borderColor: "black"};
        mindmap.selectedKeyword = mindmap.coreKeyword;
        backgroundColor = "rgb(248, 249, 250)";
        clearInputs();
        askForNameForMindMap();     
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

let savedMindMapName;
let openedMindMapName;

saveInput.addEventListener("input", (e) => {
    savedMindMapName = e.target.value;
    console.log(savedMindMapName);
});

let saveBtn = document.getElementById("save-btn");
saveBtn.addEventListener("click", () => {
    savedMindMapName ? mindmap.name = savedMindMapName : mindmap.name = mindmap.name;
    console.log("Current mindmap will be saved under the name: " + mindmap.name);
    mindmap.saveMindMap();
});

let openInput = document.getElementById("open-input");
openInput.addEventListener("input", (e) => {
    openedMindMapName = e.target.value;
    console.log(openedMindMapName);
});

let openBtn = document.getElementById("open-btn");
openBtn.addEventListener("click", () => {
    // save current mindmap before open another one:
    console.log("Before you open a new mind map, current mindmap will be saved under the name: " + mindmap.name);
    mindmap.saveMindMap();

    let openedMindMap = JSON.parse(window.localStorage.getItem(openedMindMapName));
    mindmap.name = openedMindMap.name;
    mindmap.coreKeyword = openedMindMap.coreKeyword;
    mindmap.keywords = openedMindMap.keywords;
    mindmap.backgroundColor = openedMindMap.backgroundColor;
    mindmap.selectedKeyword = mindmap.coreKeyword;

    backgroundColor = mindmap.backgroundColor;
    //change input value for opened mind map name:
    saveInput.value = "";
    saveInput.value = mindmap.name;
});

//============================== DRAW() ==========================
function draw() {
    background(backgroundColor);
    mindmap.draw();
}

function askForNameForMindMap() {
    let nameForNewMindMap = prompt("Wait! Input the name for this new mind map first and remember the name. Your changes will be saved ander that name and you would be able to open this mind map in the future.");
    mindmap.setMindMapName(nameForNewMindMap);
    alert("You've saved this mind map. It's name is: " + mindmap.name);
}

//window.addEventListener("click", askForNameForMindMap, {once: true});

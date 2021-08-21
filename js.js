let arrayClasses = [];
const arrayNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
let classe = "";
let classRandom = "";
let numRand;
let btnClick;
let btnClick1 = undefined;
let pai = document.querySelector(".sudoku");

function trocarBg() {
    if(btnClick1 !== btnClick) {
        btnClick.style.backgroundColor = "#d8d7d7";
        if (btnClick1 !== undefined) {
            btnClick1.style.backgroundColor = "#ffffff";
        }
        btnClick1 = btnClick;
    } 
}

function checkContent(tag) {
    if (tag.text === true) {
        return tag;
    }
    else {
        return false;
    }
}

function removeFromArray(array) {
    let arrayNumbersModified = arrayNumbers;
    for (const value of array) {
        value1 = parseInt(value);
        for (const value of arrayNumbersModified) {
            value2 = parseInt(value);
            if (value1 === value2) {
                arrayNumbersModified.splice(arrayNumbersModified.indexOf(value2), 1);
            }
        }
    }
    return arrayNumbersModified;
}

function differentNumbers() {
    let threeClasses;
    for (let i = 0; i < pai.children.length; i++) {
        if (checkContent(pai.children[i]) !== true) {
            let arrayItemsr = [];
            let arrayItemsc = [];
            let arrayItemsq = [];
            threeClasses = pai.children[i].className;
            threeClasses = threeClasses.split(" ");
            for (let i = 0; i < pai.children.length; i++) {
                let classes = [];
                classes = pai.children[i].className;
                classes = classes.split(" ");
                if (classes[0] == threeClasses[0]) {
                    if (checkContent(pai.children[i] === true)) {
                        arrayItemsr += pai.children[i].text;
                    }
                }
                if (classes[0] == threeClasses[0]) {
                    if (checkContent(pai.children[i] === true)) {
                        arrayItemsc += pai.children[i].text;
                    }
                }
                if (classes[0] == threeClasses[0]) {
                    if (checkContent(pai.children[i] === true)) {
                        arrayItemsq += pai.children[i].text;
                    }
                }
            }
            for (let i = 0; i < pai.children.length; i++) {
                let classes = [];
                classes = pai.children[i].className;
                classes = classes.split(" ");
                if (classes[0] == threeClasses[0]) {
                    let rand = 
                    pai.children[i].innerHTML = `${classes}`;
                }
            }
        }
    }
}

function getClassDiv(cls) {
    for (let i = 0; i < pai.children.length; i++) {
        if(cls === pai.children[i].className) {
            return pai.children[i]
        }
    }
}

function bgRowColumn(cls) {
    let threeClasses;

    cls = cls.split(" ");
    console.log(cls);
    for (let i = 0; i < pai.children.length; i++) {
        pai.children[i].style.backgroundColor = "#ffffff"
        
    }
    for (let i = 0; i < arrayClasses.length; i++) {
        threeClasses = arrayClasses[i];
        threeClasses = threeClasses.split(" ");
        
        if (threeClasses[0] === cls[0] || threeClasses[1] === cls[1] || threeClasses[2] === cls[2]) {
            threeClasses = threeClasses.join(" ");
            getClassDiv(threeClasses).style.backgroundColor = "#d8d7d7";
            
        }
        
    }
}


function getClasses() {
    for(var i = 0; i < pai.children.length; i++){
        classe = pai.children[i].className;
        arrayClasses += classe+",";
        arrayClasses = arrayClasses.split(",");
    };
}
getClasses();

numRand = Math.floor(Math.random() * (10 - 1) + 1);
arrayClasses.pop();
classRandom = Math.floor(Math.random() * arrayClasses.length);

for(var i = 0; i < pai.children.length; i++){
    if(pai.children[i].className == arrayClasses[classRandom]) {
        pai.children[i].innerHTML = `${numRand}`;
    }
    
};

pai.addEventListener('click', function(e) {
    btnClick = e.target;
    trocarBg();
    bgRowColumn(btnClick.className);
});



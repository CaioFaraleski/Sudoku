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
    if (tag.innerText !== "") {
        return true;
    }
    else {
        return false;
    }
}

function removeFromArray(array) {
    let arrayNumbersModified = [1,2,3,4,5,6,7,8,9];
    for (const value of array) {
        let value1 = parseInt(value);
        for (const value of arrayNumbersModified) {
            let value2 = parseInt(value);
            if (value1 === value2) {
                arrayNumbersModified.splice(arrayNumbersModified.indexOf(value2), 1);
            }
        }
    }
    return arrayNumbersModified;
}

function differentNumbers() {
    for (let i = 0; i < pai.children.length; i++) {
        if (!checkContent(pai.children[i])) {
            let threeClasses = [];
            let arrayRCQ= [];
            threeClasses = pai.children[i].className;
            threeClasses = threeClasses.split(" ");
            console.log("começa")
            for (let i = 0; i < pai.children.length; i++) {
                let theArray = [];
                let classes = [];
                classes = pai.children[i].className;
                classes = classes.split(" ");
                if (classes[0] === threeClasses[0]) {
                    if (checkContent(pai.children[i])) {
                        // console.log(pai.children[i].innerText)
                        arrayRCQ += Number(pai.children[i].innerText);
                    }
                }
                else if (classes[1] === threeClasses[1]) {
                    if (checkContent(pai.children[i])) {
                        // console.log(pai.children[i].innerText)
                        arrayRCQ += Number(pai.children[i].innerText);
                    }
                }
                else if (classes[2] === threeClasses[2]) {
                    if (checkContent(pai.children[i])) {
                        // console.log(pai.children[i].innerText)
                        arrayRCQ += Number(pai.children[i].innerText);
                    }
                }
            }
            arrayRCQ =  removeFromArray(arrayRCQ)
            arrayRCQ = arrayRCQ.filter((item) => item !== 0)
            
            if (arrayRCQ.length !== 0) {
                pai.children[i].innerText = arrayRCQ[Math.floor(Math.random() * arrayRCQ.length)]
            }

            console.log(arrayRCQ);
            console.log("acaba")
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
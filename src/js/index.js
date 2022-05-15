import './imgs.js';
import '../scss/style.scss';

let arrayClasses = [];
const arrayNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
let classe = "";
let classRandom = "";
let numRand;
let btnClick;
let btnClick1 = undefined;
let pai = document.querySelector(".sudoku");

function trocarBg() {
    if (btnClick1 !== btnClick) {
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
    } else {
        return false;
    }
}

function removeFromArray(array) {
    let arrayNumbersModified = [1, 2, 3, 4, 5, 6, 7, 8, 9];
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
            let arrayRCQ = [];
            threeClasses = pai.children[i].className;
            threeClasses = threeClasses.split(" ");
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
                } else if (classes[1] === threeClasses[1]) {
                    if (checkContent(pai.children[i])) {
                        // console.log(pai.children[i].innerText)
                        arrayRCQ += Number(pai.children[i].innerText);
                    }
                } else if (classes[2] === threeClasses[2]) {
                    if (checkContent(pai.children[i])) {
                        // console.log(pai.children[i].innerText)
                        arrayRCQ += Number(pai.children[i].innerText);
                    }
                }
            }
            arrayRCQ = removeFromArray(arrayRCQ)
            arrayRCQ = arrayRCQ.filter((item) => item !== 0)

            if (arrayRCQ.length !== 0) {
                pai.children[i].innerText = arrayRCQ[Math.floor(Math.random() * arrayRCQ.length)]
            }
        }
    }
}

function getClassDiv(cls) {
    for (let i = 0; i < pai.children.length; i++) {
        if (cls === pai.children[i].className) {
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
    for (var i = 0; i < pai.children.length; i++) {
        classe = pai.children[i].className;
        arrayClasses += classe + ",";
        arrayClasses = arrayClasses.split(",");
    };
}
getClasses();

pai.addEventListener('click', event => {
    if (document.querySelector('.selected')) {
        document.querySelector('.selected').classList.remove('selected')
    };
    btnClick = event.target;
    trocarBg();
    bgRowColumn(btnClick.className);
    event.target.classList.add('selected');
});

document.querySelector('.new-game').addEventListener('click', event => {

    start();
});

document.querySelector('.numbers').querySelectorAll('button').forEach(event => {
    event.addEventListener('click', event => {
        if (document.querySelector('.selected')) {
            document.querySelector('.selected').innerText = event.target.innerText;
        };
    })
})

function whileNumbers() {
    let allSquares = false

    while (!allSquares) {
        differentNumbers();

        allSquares = true

        document.querySelector('.sudoku').querySelectorAll('div').forEach(element => {
            if (element.innerText === '') {
                allSquares = false;
            }
        });

        if (!allSquares) {
            document.querySelector('.sudoku').querySelectorAll('div').forEach(element => {
                element.innerText = '';
            });
        }
        console.log('.')
    }

    return;
}

async function start() {

    const p = new Promise((resolve, reject) => {
        try {
            document.querySelector('#load').classList.remove('d-none');
            document.querySelector('#bg-false').classList.remove('d-none');
            document.querySelector('#bg-false').style.opacity = '1';
            pai.querySelectorAll('div').forEach(element => {
                element.innerText = '';
                element.style.backgroundColor = '#ffffff'
            })

            setTimeout(() => {
                resolve();
            }, 200);

        } catch (e) {
            reject(e)
        }
    })


    p.then(() => {
        whileNumbers()
        document.querySelector('#bg-false').style.opacity = '0';
        document.querySelector('#load').classList.add('d-none');
        document.querySelector('#bg-false').classList.add('d-none');

        let sudokuNumbers = [];

        pai.querySelectorAll('div').forEach(element => {
            let object = {};
            let value = element.innerText;
            let keyClass = element.className

            object.class = keyClass;
            object.text = value;

            sudokuNumbers.push(object)

            element.innerText = '';
        });

        console.log('sudokuNumbers', sudokuNumbers)

        let sortedNumbers = [];

        for (let i = 0; i < 20; i++) {
            sortedNumbers.push(Math.floor(Math.random() * 81));
        }

        console.log('sortedNumbers', sortedNumbers)

        for (let i = 0; i < sortedNumbers.length; i++) {
            for (let j = 0; j < sudokuNumbers.length; j++) {
                if (sortedNumbers[i] === j) {

                    let classes = sudokuNumbers[j].class;
                    console.log('classes', classes)

                    classes = classes.split(' ');
                    let classOne = classes[0];
                    console.log('classOne', classOne)

                    let classTwo = classes[1];
                    console.log('classTwo', classTwo)

                    let classThree = classes[2];
                    console.log('classThree', classThree)

                    pai.querySelectorAll('div').forEach(element => {
                        console.log('pai', element.classList[2])
                        if (element.classList[0] === classOne && element.classList[1] === classTwo && element.classList[2] === classThree) {
                            console.log('pai entrou', element)
                            element.innerText = sudokuNumbers[j].text
                        }
                    })

                }

            }

        }

    })

}
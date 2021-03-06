import './imgs.js';
import '../scss/style.scss';
import './language.js';

//facil: 33
//medio: 30
//dificil: 28
//profissional: 24
//diabolico: 22

let arrayClasses = [];
const arrayNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
let classe = "";
let classRandom = "";
let numRand;
let btnClick;
let btnClick1 = undefined;
let pai = document.querySelector(".sudoku");
let checkErrorInput = document.querySelector('#flexSwitchCheckDefault');
let buttonTimer = document.querySelector('.timer').querySelector('button');
let sudokuNumbers = [];
let sec = 1;
let min = 0;
let hr = 0;
let count;

let selectedDifficulty;

if (localStorage.getItem('difficulty')) {
    document.querySelector('#selectedDifficulty').innerText = localStorage.getItem('difficulty');
    selectedDifficulty = localStorage.getItem('difficulty');
} else {
    document.querySelector('#selectedDifficulty').innerText = 'Fácil';
    selectedDifficulty = document.querySelector('#selectedDifficulty').innerText;
}

function trocarBg() {
    if (btnClick1 !== btnClick) {
        btnClick.style.backgroundColor = "#ebebeb";
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

    pai.querySelectorAll('div').forEach(element => {
        if (!checkContent(element)) {
            let threeClasses = [];
            let arrayRCQ = [];
            threeClasses = element.className;
            threeClasses = threeClasses.split(" ");
            pai.querySelectorAll('div').forEach(e => {
                let theArray = [];
                let classes = [];
                classes = e.className;
                classes = classes.split(" ");
                if (classes[0] === threeClasses[0]) {
                    if (checkContent(e)) {
                        arrayRCQ += Number(e.innerText);
                    }
                } else if (classes[1] === threeClasses[1]) {
                    if (checkContent(e)) {
                        arrayRCQ += Number(e.innerText);
                    }
                } else if (classes[2] === threeClasses[2]) {
                    if (checkContent(e)) {
                        arrayRCQ += Number(e.innerText);
                    }
                }

            });
            arrayRCQ = removeFromArray(arrayRCQ)
            arrayRCQ = arrayRCQ.filter((item) => item !== 0)

            if (arrayRCQ.length !== 0) {
                element.innerText = arrayRCQ[Math.floor(Math.random() * arrayRCQ.length)]
            }
        }
    });
}

function getClassDiv(cls) {

    // pai.querySelectorAll('div').forEach(element => {
    //     let classs = [];
    //     classs.push(element.classList[0]);
    //     classs.push(element.classList[1]);
    //     classs.push(element.classList[2]);
    //     classs = classs.join(' ')
    //     if (cls === classs) {
    //         return element
    //     }
    // })

    for (let i = 0; i < pai.children.length; i++) {
        let classs = [];
        classs.push(pai.children[i].classList[0]);
        classs.push(pai.children[i].classList[1]);
        classs.push(pai.children[i].classList[2]);
        classs = classs.join(' ')
        if (cls === classs) {
            return pai.children[i]
        }
    }
}

function bgRowColumn(cls) {
    let threeClasses;
    cls = cls.split(" ");

    pai.querySelectorAll('div').forEach(element => {
        element.style.backgroundColor = "#ffffff";
    });
    for (let i = 0; i < arrayClasses.length; i++) {
        threeClasses = arrayClasses[i];
        threeClasses = threeClasses.split(" ");

        if (threeClasses[0] === cls[0] || threeClasses[1] === cls[1] || threeClasses[2] === cls[2]) {
            threeClasses = threeClasses.join(" ");
            getClassDiv(threeClasses).style.backgroundColor = "#ebebeb";

        }

    }
}


function getClasses() {

    pai.querySelectorAll('div').forEach(element => {
        let classe = []
        classe.push(element.classList[0]);
        classe.push(element.classList[1]);
        classe.push(element.classList[2]);
        classe = classe.join(' ')
        arrayClasses += classe + ",";
        arrayClasses = arrayClasses.split(",");
    });
}
getClasses();

pai.querySelectorAll('div').forEach(element => {
    element.addEventListener('click', event => {
        if (document.querySelector('.selected')) {
            document.querySelector('.selected').classList.remove('selected')
        };
        let classs = [];
        btnClick = event.target;
        classs.push(btnClick.classList[0]);
        classs.push(btnClick.classList[1]);
        classs.push(btnClick.classList[2]);
        classs = classs.join(' ');
        trocarBg();
        bgRowColumn(classs);
        event.target.classList.add('selected');
    })
});

document.querySelector('.new-game').addEventListener('click', event => {
    start();
});

document.querySelector('.numbers').querySelectorAll('button').forEach(event => {
    event.addEventListener('click', event => {
        if (document.querySelector('.selected')) {
            document.querySelector('.selected').innerText = event.target.innerText;
            rightOrWrong();
            checkVitory();
        };
    })
});

document.addEventListener('keyup', event => {
    if (Number(event.key) >= 1 && Number(event.key) <= 9) {
        if (document.querySelector('.selected')) {
            document.querySelector('.selected').innerText = event.key;
            rightOrWrong();
            checkVitory();
        };
    } else if (event.key === 'Backspace') {
        if (document.querySelector('.selected')) {
            document.querySelector('.selected').innerText = '';
        };
    } else if (event.key === 'Control') {
        if (document.querySelector('.selected')) {
            let classs = [];
            classs.push(document.querySelector('.selected').classList[0]);
            classs.push(document.querySelector('.selected').classList[1]);
            classs.push(document.querySelector('.selected').classList[2]);

            classs = classs.join(' ');

            for (let i = 0; i < sudokuNumbers.length; i++) {
                if (sudokuNumbers[i].class === classs) {
                    document.querySelector('.selected').innerText = sudokuNumbers[i].text;
                }
            }
            checkVitory();
        }
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowRight' || event.key === 'ArrowUp' || event.key === 'ArrowDown') {
        let numberCase;

        if (document.querySelector('.selected')) {
            numberCase = Number(document.querySelector('.selected').id)
            document.querySelector('.selected').classList.remove('selected')
        } else {
            numberCase = 41;
        }


        switch (event.key) {
            case 'ArrowLeft':
                numberCase--;
                console.log(numberCase)
                break;
            case 'ArrowRight':
                numberCase++;
                console.log(numberCase)

                break;
            case 'ArrowUp':
                numberCase -= 9;
                console.log(numberCase)

                break;
            case 'ArrowDown':
                numberCase += 9;
                console.log(numberCase)

                break;

            default:
                break;
        }
        let classs = [];
        // console.log(document.querySelector(`#${numberCase}`))
        btnClick = document.getElementById(numberCase);
        classs.push(btnClick.classList[0]);
        classs.push(btnClick.classList[1]);
        classs.push(btnClick.classList[2]);
        classs = classs.join(' ');
        trocarBg();
        bgRowColumn(classs);
        document.getElementById(numberCase).classList.add('selected');
    }
});

checkErrorInput.addEventListener('click', event => {
    rightOrWrong();
    if (!checkErrorInput.checked) {
        pai.querySelectorAll('div').forEach(element => {
            if (element.innerText !== '' && element.classList[3] !== 'block') {
                element.style.color = '#8a8a8a'
            }
        })
    }
});

document.querySelector('#eraser').addEventListener('click', event => {
    if (document.querySelector('.selected')) {
        document.querySelector('.selected').innerText = '';
    };
});

document.querySelector('#tip').addEventListener('click', event => {
    if (document.querySelector('.selected')) {
        let classs = [];
        classs.push(document.querySelector('.selected').classList[0]);
        classs.push(document.querySelector('.selected').classList[1]);
        classs.push(document.querySelector('.selected').classList[2]);

        classs = classs.join(' ');

        for (let i = 0; i < sudokuNumbers.length; i++) {
            if (sudokuNumbers[i].class === classs) {
                document.querySelector('.selected').innerText = sudokuNumbers[i].text;
            }
        }
    }
});

buttonTimer.children[0].addEventListener('click', event => {
    console.log(sudokuNumbers)
    if (sudokuNumbers.length >= 1) {
        if (event.target.classList[1] === 'fa-play') {
            event.target.classList.remove('fa-play');
            event.target.classList.add('fa-pause');
            document.querySelector('#pause-page').style.display = 'none';
            count = setInterval(timer, 1000);
        } else {
            event.target.classList.remove('fa-pause');
            event.target.classList.add('fa-play');
            document.querySelector('#pause-page').style.display = 'flex';
            clearInterval(count);
        }
    }
});

document.querySelector('.difficulty').addEventListener('click', event => {
    if (document.querySelector('.difficulty').querySelector('i').classList[1] === 'fa-chevron-down') {
        document.querySelector('.difficulty').querySelector('i').classList.remove('fa-chevron-down');
        document.querySelector('.difficulty').querySelector('i').classList.add('fa-chevron-up');
        document.querySelector('.dif-options').style.display = 'flex';
    } else {
        document.querySelector('.difficulty').querySelector('i').classList.remove('fa-chevron-up');
        document.querySelector('.difficulty').querySelector('i').classList.add('fa-chevron-down');
        document.querySelector('.dif-options').style.display = 'none';
    }
    document.querySelector('.lang-options').style.display = 'none';
    document.querySelector('.btn-language').querySelector('i').classList.remove('fa-chevron-up');
    document.querySelector('.btn-language').querySelector('i').classList.add('fa-chevron-down');
});

document.querySelector('.dif-options').querySelectorAll('div').forEach(element => {
    element.addEventListener('click', event => {
        document.querySelector('.difficulty').querySelector('p').innerText = event.target.innerText;
        localStorage.setItem('difficulty', event.target.innerText)
        document.querySelector('.dif-options').style.display = 'none';
        document.querySelector('.difficulty').querySelector('i').classList.remove('fa-chevron-up');
        document.querySelector('.difficulty').querySelector('i').classList.add('fa-chevron-down');
    })
});

document.querySelector('.btn-language').addEventListener('click', event => {
    if (document.querySelector('.btn-language').querySelector('i').classList[1] === 'fa-chevron-down') {
        document.querySelector('.btn-language').querySelector('i').classList.remove('fa-chevron-down');
        document.querySelector('.btn-language').querySelector('i').classList.add('fa-chevron-up');
        document.querySelector('.lang-options').style.display = 'flex';
    } else {
        document.querySelector('.btn-language').querySelector('i').classList.remove('fa-chevron-up');
        document.querySelector('.btn-language').querySelector('i').classList.add('fa-chevron-down');
        document.querySelector('.lang-options').style.display = 'none';
    }
    document.querySelector('.dif-options').style.display = 'none';
    document.querySelector('.difficulty').querySelector('i').classList.remove('fa-chevron-up');
    document.querySelector('.difficulty').querySelector('i').classList.add('fa-chevron-down');
});

document.querySelector('.lang-options').querySelectorAll('div').forEach(element => {
    element.addEventListener('click', event => {
        document.querySelector('.btn-language').querySelector('p').innerText = event.target.innerText;
        document.querySelector('.btn-language').querySelector('img').src = event.target.children[0].src;
        localStorage.setItem('btn-language', event.target.innerText)
        document.querySelector('.lang-options').style.display = 'none';
        document.querySelector('.btn-language').querySelector('i').classList.remove('fa-chevron-up');
        document.querySelector('.btn-language').querySelector('i').classList.add('fa-chevron-down');
    })
});

document.addEventListener('click', event => {
    if (document.querySelector('.lang-options').style.display === 'flex') {
        if (event.target !== document.querySelector('.btn-language') && event.target !== document.querySelector('.btn-language').children[1] && event.target !== document.querySelector('.btn-language').children[0] && event.target !== document.querySelector('.btn-language').children[2]) {
            document.querySelector('.lang-options').style.display = 'none';
            document.querySelector('.btn-language').querySelector('i').classList.remove('fa-chevron-up');
            document.querySelector('.btn-language').querySelector('i').classList.add('fa-chevron-down');
        }
    }
    if (document.querySelector('.dif-options').style.display === 'flex') {
        if (event.target !== document.querySelector('.difficulty') && event.target !== document.querySelector('.difficulty').children[0] && event.target !== document.querySelector('.difficulty').children[1] && event.target !== document.querySelector('.difficulty').children[2]) {
            document.querySelector('.dif-options').style.display = 'none';
            document.querySelector('.difficulty').querySelector('i').classList.remove('fa-chevron-up');
            document.querySelector('.difficulty').querySelector('i').classList.add('fa-chevron-down');
        }
    }

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
                if (element.classList[3] === 'block') {
                    element.classList.remove('block');
                    if (element.classList[4] === 'selected') {
                        element.classList.remove('selected')
                    }
                } else if (element.classList[3] === 'selected') {
                    element.classList.remove('selected')
                }
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

        sudokuNumbers = [];

        pai.querySelectorAll('div').forEach(element => {
            let object = {};
            let value = element.innerText;
            let keyClass = element.className

            object.class = keyClass;
            object.text = value;

            sudokuNumbers.push(object)

            element.innerText = '';
        });
        console.log(sudokuNumbers)

        let sortedNumbers = [];

        for (let i = 0; i < 23; i++) {
            sortedNumbers.push(Math.floor(Math.random() * 81));
        }

        for (let i = 0; i < sortedNumbers.length; i++) {
            for (let j = 0; j < sudokuNumbers.length; j++) {
                if (sortedNumbers[i] === j) {

                    let classes = sudokuNumbers[j].class;
                    classes = classes.split(' ');

                    let classOne = classes[0];

                    let classTwo = classes[1];

                    let classThree = classes[2];

                    pai.querySelectorAll('div').forEach(element => {
                        if (element.classList[0] === classOne && element.classList[1] === classTwo && element.classList[2] === classThree) {
                            element.innerText = sudokuNumbers[j].text
                            element.classList.add('block')
                        }
                    })

                }

            }

        }

        sec = 1;
        min = 0;
        hr = 0;

        document.querySelector('#pause-page').style.display = 'none';
        buttonTimer.children[0].classList.remove('fa-play');
        buttonTimer.children[0].classList.add('fa-pause');
        clearInterval(count)
        count = setInterval(timer, 1000);


    })

}

function rightOrWrong() {
    if (checkErrorInput.checked) {
        for (let i = 0; i < sudokuNumbers.length; i++) {
            if (pai.children[i + 1].innerText !== '') {
                if (pai.children[i + 1].innerText !== sudokuNumbers[i].text) {
                    pai.children[i + 1].style.color = '#ff6868'
                } else {
                    if (pai.children[i + 1].classList[3] !== 'block' && pai.children[i + 1].classList[3] !== undefined) {
                        pai.children[i + 1].style.color = '#8a8a8a'
                    }
                }
            }
        }
    }
}


let timer = () => {
    let showTime = document.querySelector('.time');

    if (sec < 10 && min < 10 && hr < 10) {
        showTime.innerText = `0${hr}:0${min}:0${sec}`;
        countTimer();
        return;
    };
    if (sec < 10 && min < 10) {
        showTime.innerText = `${hr}:0${min}:0${sec}`;
        countTimer();
        return;
    };
    if (sec < 10 && hr < 10) {
        showTime.innerText = `0${hr}:${min}:0${sec}`;
        countTimer();
        return;
    };
    if (min < 10 && hr < 10) {
        showTime.innerText = `0${hr}:0${min}:${sec}`;
        countTimer();
        return;
    };
    if (sec < 10) {
        showTime.innerText = `${hr}:${min}:0${sec}`;
        countTimer();
        return;
    };
    if (min < 10) {
        showTime.innerText = `${hr}:0${min}:${sec}`;
        countTimer();
        return;
    };
    if (hr < 10) {
        showTime.innerText = `0${hr}:${min}:${sec}`;
        countTimer();
        return;
    };

}

function countTimer() {
    sec++;
    if (sec === 61) {
        sec = 1;
        min++;
        if (min === 61) {
            min = 1;
            hr++;
        }
    }
}

function checkVitory() {
    let isVitory = true
    for (let i = 0; i < sudokuNumbers.length; i++) {
        if (pai.children[i + 1].innerText === '' || pai.children[i + 1].innerText !== sudokuNumbers[i].text) {
            isVitory = false;
        }
    }

    if (isVitory) {
        console.log("parabennnnss")
    }
}
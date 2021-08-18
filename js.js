let arrayClasses = [];
let classe = "";
let classRandom = "";

var pai = document.querySelector(".sudoku");
for(var i = 0; i < pai.children.length; i++){
    classe = pai.children[i].className;
    arrayClasses += classe+",";
    arrayClasses = arrayClasses.split(",");
};

arrayClasses.pop();
classRandom = Math.floor(Math.random() * arrayClasses.length);
console.log(arrayClasses[classRandom]);

for(var i = 0; i < pai.children.length; i++){
    if(pai.children[i].className == arrayClasses[classRandom]) {
        pai.children[i].innerHTML = "1";
    }
};
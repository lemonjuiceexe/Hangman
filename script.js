const a = [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R',  'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z' ];

const left = document.querySelector(".left");
const right = document.querySelector(".right");
const upper = document.querySelector(".upper");
const hidden = document.querySelector(".upper > p");

const points = document.querySelector(".upper > div:first-of-type > p");
const time = document.querySelector(".upper > div:last-of-type > p");
const hm = document.querySelector(".hm");

let t;

let currword; let guessed = "";
let penalty = 0; let score = 0; let tleft = 10;

window.addEventListener("load", () => {
    //Generating keyboard
    for(let i = 0; i < a.length; i++){
        right.innerHTML += 
            `<div class="lt" onclick="input('${a[i]}', this)">${a[i]}</div>`;
    }

    restart();
})

function input(x, l) {
    if(l.classList.contains("dsb")){
        return;
    }
    l.classList.add("dsb");
    if(currword.toUpperCase().includes(x)){
        l.classList.add("green");
        console.log("dobrze");
        guessed += x.toLowerCase();
        update(x);
        restartTimer();

        //Check if whole word is guessed - sorted and removed duplicate letters
        if([...new Set(guessed.split("").sort())].join("") == [...new Set(currword.split("").sort())].join("")){
            clearInterval(t);
            score++;
            points.innerHTML = score;
            hidden.classList.add("green");
            time.classList.add("green");
            points.classList.add("green");
            setTimeout(() => {
                hidden.style = "transition: color 0ms;";
                time.style = "transition: color 0ms;";
                points.style = "transition: color 0ms;";
                setTimeout(() => {
                    hidden.classList.remove("green");
                    time.classList.remove("green");
                    points.classList.remove("green");
                    restart();
                }, 100);  
            }, 2300);
        }

        return;
    }
    penalty++;
    // left.innerHTML = "<p>" + penalty + "</p>";
    hm.setAttribute("src", `img/${penalty + 1}.png`);
    l.classList.add("red");
    console.log("zle");
    if(penalty == 9){
        lose();
    }
}

function update(x) {
    hidden.innerHTML = "";
    for(let i = 0; i < currword.length; i++){
        if(guessed.includes(currword[i])){
            hidden.innerHTML += currword[i] + "&nbsp;";
            continue;
        }
        hidden.innerHTML += "_&nbsp;";
    }
    hidden.innerHTML = hidden.innerHTML.substring(0, hidden.innerHTML.length - 6);
}

let restart = () => {
    setTimeout(() => { 
        hidden.style = ""; 
        time.style = "";
        points.style = "";
    }, 50);
    hidden.innerHTML = "";
    guessed = "";
    penalty = 0;
    hm.setAttribute("src", "img/1.png");
    // left.innerHTML = `<p>${penalty}</p>`

    //Select a word
    currword = words[Math.floor(Math.random() * words.length)];

    for(let i = 0; i < currword.length; i++){
        hidden.innerHTML += "_&nbsp;";
    }
    hidden.innerHTML = hidden.innerHTML.substring(0, hidden.innerHTML.length - 6);

    document.querySelectorAll(".lt").forEach((x) => { 
        x.classList.remove("dsb");
        x.classList.remove("green");
        x.classList.remove("red");
    });

    restartTimer();
}

let lose = () => {
    clearInterval(t);

    hidden.innerHTML = currword;
    hidden.classList.add("red");
    time.classList.add("red");
    points.classList.add("red");

    setTimeout(() => {
        hidden.style = "transition: color 0ms;";
        time.style = "transition: color 0ms;";
        points.style = "transition: color 0ms;";
        setTimeout(() => {
            hidden.classList.remove("red");
            time.classList.remove("red");
            points.classList.remove("red");
            score = 0;
            points.innerHTML = score;
            restart();
        }, 100);  
    }, 2300);
}

const restartTimer = () => {
    tleft = 10;
    clearInterval(t);
    t = setInterval(() => {
        tleft -= 0.1;
        tleft = Math.round(tleft * 10) / 10;
        time.innerHTML = `${tleft % 1 != 0 ? tleft : tleft + ".0"}s`;
        if(tleft === 0){
            lose();
            clearInterval(t);
        }
    }, 100);
}
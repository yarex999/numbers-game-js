let startButton = document.querySelector('.start_button');
let newGameButton = document.querySelector('.new_game');

let startDiv = document.querySelector('.start');
let gameDiv = document.querySelector('.game');
let endDiv = document.querySelector('.end');

let field = document.querySelector('#field');
let timer = document.querySelector('.timer_number');
let currentResult = document.querySelector('.end_result_number');
let bestResult = document.querySelector('.end_result_best_number');

let i;
let level = 0;
let levels = [];
let id;

// menu

const burger = document.getElementById('burger');
const ul = document.querySelector('nav ul');

burger.addEventListener('click', () => {
    burger.classList.toggle('show-x');
    ul.classList.toggle('show');
});


// start the game
function startGame() {
    startDiv.classList.remove('display_flex');
    startDiv.classList.add('display_none');

    gameDiv.classList.remove('display_none');
    gameDiv.classList.add('display_flex');

    start(2);


}

// end game
function newGame() {
    endDiv.classList.remove('display_flex');
    endDiv.classList.add('display_none');

    startDiv.classList.remove('display_none');
    startDiv.classList.add('display_flex');

    clearInterval(id);
    let tds = document.querySelectorAll('td');
    for (let td of tds) {
        td.remove();
    }

    level = 0;

}



// the game



function start(size) {
    activate(build(field, prepare(size)),
        size);
}

function activate(cells, size) {
    let counter = 1;
    let last = size * size;
    sizingCells(cells, size);
    i = Math.floor(last * 1.2);
    id = setInterval(function() {
        i--;
        console.log(i);
        if (i == 0) {
            clearInterval(id);

            gameDiv.classList.remove('display_flex');
            gameDiv.classList.add('display_none');

            levels.push(level);
            currentResult.innerHTML = level;
            let best = levels.sort((a, b) => a - b);
            bestResult.innerHTML = best[best.length - 1];

            endDiv.classList.remove('display_none');
            endDiv.classList.add('display_flex');

        } else {
            timer.innerHTML = i;
        }
    }, 1000);

    for (let cell of cells) {
        cell.addEventListener('click', function() {
            if (cell.innerHTML == counter) {
                counter++;
                this.classList.add('active');
            }
            let check = Array.from(cells).every(elem => elem.classList.contains('active'));
            if (cell.innerHTML == last && check == true) {
                level += 1;

                clearInterval(id);

                levels.push(level);
                currentResult.innerHTML = level;
                let best = levels.sort((a, b) => a - b);
                bestResult.innerHTML = best[best.length - 1];
                let win = size + 1;

                if (win < 10) {
                    start(size + 1);
                } else {
                    gameDiv.classList.remove('display_flex');
                    gameDiv.classList.add('display_none');
                    currentResult = "YOU WIN THE GAME";
                    bestResult = "YOU WIN THE GAME";
                    endDiv.classList.remove('display_none');
                    endDiv.classList.add('display_flex');
                }


            }

        });
    }
}


function build(field, arr) {
    field.innerHTML = '';
    for (let i = 0; i < arr.length; i++) {
        let newTr = document.createElement('tr');
        for (let j = 0; j < arr[i].length; j++) {
            let newTd = document.createElement('td');
            newTd.classList.add('td_style');
            newTd.innerHTML = arr[i][j];
            newTr.appendChild(newTd);
        }
        field.appendChild(newTr);
    }
    let tds = document.querySelectorAll('td');
    return tds;
}

function prepare(size) {
    let arr = [];

    arr = range(size * size);
    arr = shuffle(arr);
    arr = chunk(arr, size);

    return arr;
}



function range(count) {
    let arr = [];
    for (let i = 1; i <= count; i++) {
        arr.push(i);
    }
    return arr;
}



function shuffle(arr) {
    let result = [];
    while (arr.length != 0) {
        let random = getRandomInt(0, arr.length - 1);
        let elem = arr.splice(random, 1);
        result.push(Number(elem.join('')));
    }
    return result;
}


function chunk(arr, n) {
    let result = [];
    for (let i = 1; i <= n; i++) {
        let ar = [];
        for (let j = 0; j < n; j++) {
            let num = arr.splice(0, 1).join('');
            ar.push(Number(num))
        }
        result.push(ar);
    }
    return result;
}


function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min +
        1)) + min;
}


function sizingCells(cells, size) {
    switch (size) {
        case 2:
        case 3:
            cells.forEach(cell => cell.style.padding = '10vw');
            break;
        case 4:
            cells.forEach(cell => cell.style.padding = '7vw');
            break;
        case 5:
            cells.forEach(cell => cell.style.padding = '5vw');
            break;
        case 6:
            cells.forEach(cell => cell.style.padding = '4vw');
            break;
        case 7:
            cells.forEach(cell => cell.style.padding = '3vw');
            break;
        case 8:
            cells.forEach(cell => cell.style.padding = '2vw');
            break;
        case 9:
            cells.forEach(cell => cell.style.padding = '1vw');
            break;
        case 10:
            cells.forEach(cell => cell.style.padding = '0.5vw');
            break;

    }

    let screenWidth = window.screen.width;
    if (screenWidth > 700) {
        cells.forEach(cell => cell.style.padding = '15px')
    }
}
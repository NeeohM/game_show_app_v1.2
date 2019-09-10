document.addEventListener('DOMContentLoaded', () => {
    let missed = 0;
    let single_letter = '';
    const ol = document.querySelector('ol');
    const hearts = ol.innerHTML;
    const overlay = document.getElementById('overlay');
    const qwerty = document.getElementById('qwerty');
    const phrase = document.getElementById('phrase');
    const phrase_ul = document.querySelector('#phrase ul');
    const phrases = ['down to the wire',
        'pie in the sky', 'make your mouth water', 'bells and whistles', 'name of the game'
    ];

    const startbtn = document.querySelector('.btn__reset');

    function getRandomPhraseAsArray(arr) {

        let arr_length = arr.length;
        let rand_arr_index = Math.floor(Math.random() * Math.floor(arr_length));
        let rand_phrase = arr[rand_arr_index];
        return rand_phrase.split("");
    }

    function addPhraseToDisplay(arr) {

        for (let i = 0; i < arr.length; i++) {
            let element = document.createElement('LI');
            element.textContent = arr[i];
            if (element.textContent !== " ") {
                element.className = 'letter';
            } else if (element.textContent === " ") {
                element.className = 'space';
            }
            phrase_ul.appendChild(element);

        }
    }

    function checkLetter(btn) {
        var match;
        let letters = document.querySelectorAll('.letter');

        for (let i = 0; i < letters.length; i++) {
            if (letters[i].textContent === btn.textContent) {
                letters[i].classList.add('show');
                 match = btn.textContent;
            }
        }

        if (match) {
            return match;
        } else {
            return null;
        }

    }

    function checkWin() {

        let total_letters = document.querySelectorAll('.letter');
        let total_shown = document.querySelectorAll('.show');

        if (total_letters.length === total_shown.length) {
            overlay.className = 'win';
            overlay.style.display = 'flex';
            resetGame();
        } else if (missed >= 5) {
            overlay.className = 'lose';
            overlay.style.display = 'flex';
            resetGame();
            startbtn.textContent = "Try Again";

        }
    }

    let phraseArray = getRandomPhraseAsArray(phrases);
    addPhraseToDisplay(phraseArray);

    startbtn.addEventListener('click', () => {
        document.getElementById('overlay').style.display = 'none';
    });

    qwerty.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            e.target.className = 'chosen'; //PROBLEM
            e.target.setAttribute("disabled", "disabled");
            let letterFound = checkLetter(e.target);
            if (!letterFound) {

                ol.removeChild(ol.firstChild.nextElementSibling);
                missed += 1;
            }
            checkWin();
        }
    });

    //extra credit
    
    function resetGame() {
        //reset keyboard disabled buttons
        const keyboard = document.querySelectorAll('button');
        for (let i = 0; i < keyboard.length; i++) {
            keyboard[i].removeAttribute("disabled");
            keyboard[i].classList.remove("chosen");
        }

        //reset scoreboard hearts
        ol.innerHTML = hearts;

        //reset letters section
        phrase.firstElementChild.innerHTML = "";

        //reset misses
        missed = 0;

        //generate new phrase
        phraseArray = getRandomPhraseAsArray(phrases);
        addPhraseToDisplay(phraseArray);

    }
    

});
const levelElement = document.getElementById('level-title')
const buttonColors = ['green', 'red', 'blue', 'yellow']
let computerPattern = []
let userPattern = []
let level = 0
let started = false;


function getNextPattern() {
    //generate computer pattern
    const randomNumber = Math.floor(Math.random() * buttonColors.length)
    const randomColor = buttonColors[randomNumber]
    computerPattern.push(randomColor)
    console.log("computer Pattern:", computerPattern)

    //play the computer pattern for the user
    //1.loop through the computer pattern

    computerPattern.forEach((color, index) => {
        //2.play for the user =>sound and animation
        setTimeout(() => {
            playPatternSound(color)
            animateButton(color)
        }, 1000 * index);
    })

    level += 1
    levelElement.textContent = `level: ${level}`;
    //reset user pattern
    userPattern = [];
}



function playPatternSound(color) {
    const colorAudio = new Audio(`assets/sounds/${color}.mp3`);
    colorAudio.play();
}

function animateButton(color) {
    const buttonELement = document.getElementById(`${color}`)
 
    buttonELement.classList.add('pressed')

    setTimeout(() => {
        buttonELement.classList.remove('pressed')
    }, 100);
}


// Start Game 
document.addEventListener('keydown', () => {
    if (!started) {
        getNextPattern();
        started = true;
    }
})

//Get user user pattern
const buttonELements = document.querySelectorAll('.btn')
buttonELements.forEach((button) => {
    button.addEventListener('click', (event) => {
        const userclickedColor = event.target.id

        userPattern.push(userclickedColor)

        playPatternSound(userclickedColor)
        animateButton(userclickedColor);

        validatePattern(userPattern.length - 1)
        console.log("user Pattern:", userPattern)
    })
})

function validatePattern(lastUserSelection) {
    if (computerPattern[lastUserSelection] === userPattern[lastUserSelection]) {
        if (computerPattern.length === userPattern.length) {
            setTimeout(() => {
                getNextPattern();  
            }, 1000);

        }

    } else {
        console.log('wrong Selection')

        const wrongAudio = new Audio('assets/sounds/wrong.mp3');
        wrongAudio.play();

        levelElement.textContent = 'Gave over ! press Any Key To Restart.' 

        document.querySelector('body').classList.add('game-over');
        setTimeout(() => {
            document.querySelector('body').classList.remove('game-over')
        }, 200);
        restartGame()
    }
}

function restartGame() {
    level = 0
    computerPattern = []
    started = false;
}
const MOTS = ["panda", "souris", "perroquet", "leopard", "poisson", "gorille", "crocodile", "loutre"];
const NB_CHANCE = 7;
const BOUTON = document.pendu.bouton; 
const TEXT_FIELD = document.pendu.proposition;
const IMAGES = document.getElementsByTagName('img')[0];
const SOLUTION = document.getElementsByClassName('mot_a_trouver')[0];
const ERREUR = document.getElementsByClassName('erreurs')[0];
const INFORMATION = document.getElementsByClassName('info')[0];
const LETTRESAUTORISEES = ["a","b","c","d","e","f","g","h","i","j","k","l","m",
"n","o","p","q","r","s","t","u","v","w","x","y","z"];


let lettresProposees = [];
let wordMapping = [];
let choicesMapping = [];
let scoreCount = 0;
let bonneLettre =[];

word = pickWord();
console.log(word);

wordMapping = getWordMapping(word);




//remplacer les lettres par des tirets
function displayWord(wordMapping) {
    const wordHtml = wordMapping.map((letterMapping)=> {
        if (letterMapping.isVisible === true) {
            return `${letterMapping.letter}`;
        } else {
            return `_`;
        }
    });
    SOLUTION.innerHTML = wordHtml.join('');
}
displayWord(wordMapping);



//générer mot au hasard
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//choisis le mot dans la liste
function pickWord() {
    const randomIndex = getRandomInt(0, MOTS.length - 1);
    return MOTS[randomIndex];
}



//placer les lettres du mot dans un array
function getWordMapping(word) {
    const wordArr = word.split('');
    const wordMapping = wordArr.map((letter) => {
        return {
            letter, isVisible: false
        };
    });
    return wordMapping;
}




//ajout de l'évênement au bouton
BOUTON.addEventListener('click', function(){
    
        let prop = TEXT_FIELD.value.toLowerCase();
        let test = LETTRESAUTORISEES.includes(prop);
        if (test === true) {verificationLettre()}
        else {verificationMot()}

        vie();
        remplacerImg();
        winCheck();
});


//vérifie chaques lettres
function verificationLettre(){
    let prop = TEXT_FIELD.value.toLowerCase();

    var LettreDouble = 0;
    for (var i = 0; i < lettresProposees.length; i++) {

        if (prop === lettresProposees[i]){
        LettreDouble = 1;
    }
}

    if (LettreDouble == 1){
    INFORMATION.innerHTML = 'Lettre déjà proposée!';
}
    else {
    lettresProposees += prop;
    checkLetter();


//vérifie si les lettres sont bonnes
function checkLetter(){
    let isLetterInWord = false;
    wordMapping.forEach((letterMapping) => {
        if (letterMapping.letter === prop) {
            letterMapping.isVisible = true;
            isLetterInWord = true;
            INFORMATION.innerHTML = 'La lettre est bonne.';
            bonneLettre.push(prop);             
        }         
    });
    
    choicesMapping.forEach((letterMapping) => {
    if (letterMapping.letter === prop) {
        letterMapping.isChosen = true;
    }
    });

    if (isLetterInWord === true) {
    displayWord(wordMapping);
    } else {
        ERREUR.innerHTML += prop.toUpperCase() + ",";
        INFORMATION.innerHTML = "La lettre n'est pas bonne.";
    scoreCount++;
    // console.log(scoreCount);
    return scoreCount;
    };
}
}
}


//vérifie le mot proposé
function verificationMot(){
    let prop = TEXT_FIELD.value.toLowerCase();
    let longueurMot = word.length
    let longueurProp = prop.length
if (longueurProp == longueurMot){
    if( prop == word){
        wordMapping.forEach(w => w.isVisible = true);
        displayWord(wordMapping);
        INFORMATION.innerHTML = 'GG, tu as gagné!!';
    }
    else {
        scoreCount++;
        INFORMATION.innerHTML = "Ce n'est pas le bon mot!";
    // console.log(scoreCount);
    return scoreCount;
}
    }
else {
    INFORMATION.innerHTML = 'Rentrez une proposition valable!';
    }
}


//compteur du nombre de chance
function vie(){
    if (scoreCount === NB_CHANCE){
        INFORMATION.innerHTML = 'PERDU!!!';   
        wordMapping.forEach(w => w.isVisible = true);
        displayWord(wordMapping);
        IMAGES.src = "images/pendu_0.png";
    }
}


//vérifie si toutes les lettres proposées forment le mot
function winCheck(){
    let longueurBonneLettre = bonneLettre.length;
    let longueurWordMapping = wordMapping.length;

    if (longueurBonneLettre === longueurWordMapping){
        INFORMATION.innerHTML = 'GG, tu as gagné!!';
    }
}


//change les images suivant le nombre de vies
function remplacerImg(){
    if (scoreCount === 1){
        IMAGES.src = "images/pendu_6.png";
    }
    if (scoreCount === 2){
        IMAGES.src = "images/pendu_5.png";
    }
    if (scoreCount === 3){
        IMAGES.src = "images/pendu_4.png";
    }
    if (scoreCount === 4){
        IMAGES.src = "images/pendu_3.png";
    }
    if (scoreCount === 5){
        IMAGES.src = "images/pendu_2.png";
    }
    if (scoreCount === 6){
        IMAGES.src = "images/pendu_1.png";
    }
}


const closeBtn = document.getElementById('close-btn');
const tutorialPopUp = document.getElementById('tutorial');

const btn2Players = document.querySelector('.type1');
const TwoPlayersContent = document.getElementById('two-players');

const btnMultiplayer = document.querySelector('.type2');
const multiplayerContent = document.getElementById('multiplayer');

closeBtn.addEventListener('click', ()=>{
    tutorialPopUp.classList.add('hidden');
});

btnMultiplayer.addEventListener('click', ()=>{
    multiplayerContent.classList.remove('hidden');
    TwoPlayersContent.classList.add('hidden');
});
btn2Players.addEventListener('click', ()=>{
    TwoPlayersContent.classList.remove('hidden');
    multiplayerContent.classList.add('hidden');
});
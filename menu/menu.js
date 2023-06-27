const closeBtn = document.getElementById('close-btn');
const tutorialPopUp = document.getElementById('tutorial');

closeBtn.addEventListener('click', ()=>{
    tutorialPopUp.classList.add('hidden');
});
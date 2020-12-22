function hintPopup(text, inprocess = true) {
    const closed = document.querySelector('.close__success-svg');
    const resSuccess = document.querySelector('.result__success');
    const successText = document.querySelector('.success-text');
   
    let addClass;
    
    if (inprocess){
     
        addClass = 'result__success--active';

        if ($('.result__success__false--active')){
            resSuccess.classList.remove('.result__success__false--active');
        }
    }else {
        
        addClass = 'result__success__false--active';
        if ($('.result__success--active')) {
            resSuccess.classList.remove('.result__success--active');
        }
    }
    resSuccess.classList.add(addClass);
    successText.innerHTML = text;
    
    if (addClass) {
        setTimeout(() => {
            resSuccess.classList.remove(addClass);
        }, 2500);
    }
    closed.addEventListener('click', () => {
        resSuccess.classList.remove(addClass);
    });
}
module.exports = hintPopup;
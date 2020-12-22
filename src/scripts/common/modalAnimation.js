let getCurrentZone = require('./getCurrentZone');
function modalAnimation(){
    
    $('.button__programm__link').click(e => {
        e.preventDefault();
        if($('.popup-reg-active').length){
            $('.popup-form').children('.popup-reg-active').removeClass('popup-reg-active');
        }
        
        $('.popup-form').toggleClass('popup-form-active');
        $('.button__programm__link').toggleClass('button__programm__link-active');
        $('.popup-reg__content-info').toggleClass('popup-reg-active');
        
        if($('.form__error').length){
            $('.form__error').remove();
        }
        if($('.label-confirm-error').length){
            $('.label-confirm').removeClass('label-confirm-error');
        }
       
      })
    
      $('.dbd20-cta__close-btn').on('click', e=> {
        e.preventDefault();
        if($('.popup-reg-active').length){
            $('.popup-form').children('.popup-reg-active').removeClass('popup-reg-active');
        }
        if($('.form__error').length){
            $('.form__error').remove();
        }
        if($('.label-confirm-error').length){
            $('.label-confirm').removeClass('label-confirm-error');
        }
        $('.popup-form').toggleClass('popup-form-active');
        $('.button__programm__link').toggleClass('button__programm__link-active');
      })

    $('.form-next').on('click', e => {
        e.preventDefault();
        $('.popup-form').children('.popup-reg-active').removeClass('popup-reg-active');
        const target = getCurrentZone(e.target, 'form-next');
        const attr = $(target).attr('data-next');
        $(attr).addClass('popup-reg-active');
    })

}

function init (){
    if (document.querySelector('.popup-form')) {
        return modalAnimation();
    }
}
module.exports = init;
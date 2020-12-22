function firstScreen(){
  function logoAnim() {
    var logo = document.querySelector('.first__logo');

    if (!logo) {
        return false;
    }

    function show() {
        setTimeout(function(){
            logo.classList.add('first__logo_hide');
        }, 5000);
        setTimeout(function(){
            logo.classList.remove('first__logo_hide');
            show();
        }, 15000);
    }
    show();
}
logoAnim();

}
function init (){
    if (document.querySelector('.first__logo')) {
      return firstScreen();
    }
  }
  module.exports = init;


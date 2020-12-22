function cta() {
    setTimeout(function() {
        $('.dbd20-cta').addClass('dbd20-cta_active');
    }, 1500);

    $('.dbd20-cta__close').on('click', function(event) {
        event.preventDefault();
        $('.dbd20-cta').removeClass('dbd20-cta_active');
    });
}

function init (){
    if (document.querySelector('.dbd20-cta')) {
      return cta();
    }
  }
module.exports = init;

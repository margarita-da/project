function ticketBuy() {
    $('.dbd20-right-panel__btn_register').on('click', function(event) {
        event.preventDefault();
        if($('.dbd20-cta').hasClass('dbd20-cta_active')) {
          $('.dbd20-cta').removeClass('dbd20-cta_active');
        }
        $('.left-panel').toggleClass('left-panel_active');
        
    });
}

function init (){
    if (document.querySelector('.left-panel')) {
      return ticketBuy();
    }
  }
module.exports = init;
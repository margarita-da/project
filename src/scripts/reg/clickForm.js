let serialize = require('./serialize');
let ajaxForm = require('./ajaxForm');

function clickForm(){
    let form ="",
     data = '';
     $('.popup-reg-info__btn').on('click', function(event) {
        event.preventDefault();
        const target = event.target,
            attr = $(target).attr('data-btn')
        
        if(attr === 'reg') {
            form = document.querySelector('.form-reg');
            
        }
        if(attr === 'auth') {
            form = document.querySelector('.form-auth');
            
        }
        if(attr === 'forgot') {
            form = document.querySelector('.form-forgot');

        }

        function fn(form){
            let res = serialize(form)
            return new Promise ((resolve) =>{

                if(res) {
                    resolve(res);
                }
                
            })
            
        }
       
       
        fn(form)
            .then((arr)=>{
                ajaxForm (arr);
            })
            .then((success) => {
                console.log('true');
            })
    });

    
   
}


function init (){
    if (document.querySelector('.form')) {
      return clickForm();
    }
  }
module.exports = init;

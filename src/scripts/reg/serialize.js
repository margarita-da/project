function serialize (form) {
    
    if (!form || form.nodeName !== "FORM") {
            return false;
    }
    
    let i, j, q = [], inProcess = [];
    let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

    if($('.form__error').length){
        $('.form__error').remove();
   }
   if($('.label-confirm-error').length){
    $('.label-confirm').removeClass('label-confirm-error');
}
    for (i = form.elements.length - 1; i >= 0; i = i - 1) {
        if (form.elements[i].name === "") {
            continue;
        }
        
        switch (form.elements[i].nodeName) {
            case 'INPUT':
               
                switch (form.elements[i].type) {
                    case 'text':
                        let text = form.elements[i].value.trim();
                    
                        if (text == "") {
                            $('input[name="'+form.elements[i].name+'"]').after('<div class="form__error">Поле должно быть заполнено</div>');
                            inProcess.push("false");
                        } else if (text.length > 30 || text.length <= 1) {
                            $('input[name="'+form.elements[i].name+'"]').after('<div class="form__error">От 2 до 30 символо</div>');
                            inProcess.push("false");
                        }else {
                            inProcess.push("true");
                            q.push(form.elements[i].name + "=" + encodeURIComponent(text));
                        }     
                        
                        break;
                       
                    case 'tel':
                        
                        if (form.elements[i].value == "") {
                            $('input[name="'+form.elements[i].name+'"]').after('<div class="form__error">Введите номер телефона</div>');
                            inProcess.push("false");
                        }else if (form.elements[i].value.length < 17) {
                            $('input[name="'+form.elements[i].name+'"]').after('<div class="form__error">Введите корректно номер телефона</div>');
                            inProcess.push("false");
                        }else {
                            let tel = form.elements[i].value.replace(/[^-0-9]/gim,'');
                            q.push(form.elements[i].name + "=" + encodeURIComponent(tel));
                            inProcess.push("true");
                        }
                        break;

                    case 'email':
                        let email = form.elements[i].value.trim();

                        if (email == "") {
                            $('input[name="'+form.elements[i].name+'"]').after('<div class="form__error">Введите Ваш Email</div>');
                            inProcess.push("false");
                        }else if (reg.test(email) == false) {
                            $('input[name="'+form.elements[i].name+'"]').after('<div class="form__error">Введите корректно Ваш Email</div>');
                            inProcess.push("false");
                        }else {
                            q.push(form.elements[i].name + "=" + encodeURIComponent(email));
                            inProcess.push("true");
                        }
                        break;
                    case 'password':
                        let password = form.elements[i].value.replace(/\s+/g,'').trim();
                        if (password == "") {
                            $('input[name="'+form.elements[i].name+'"]').after('<div class="form__error">Поле должно быть заполнено</div>');
                            inProcess.push("false");
                        } else if (password.length > 30 || password.length <= 7) {
                            $('input[name="'+form.elements[i].name+'"]').after('<div class="form__error">От 7 до 30 символо</div>');
                            inProcess.push("false");
                        }else {
 
                            q.push(form.elements[i].name + "=" + encodeURIComponent(password));
                            inProcess.push("true");
                        }     
                        
                        break;
                    case 'checkbox':
                        if($('input[name="'+form.elements[i].name+'"').prop(('checked'))) {
                            q.push(form.elements[i].name + "= true");
                            inProcess.push("true");
                        } else {
                            $('.label-confirm').addClass('label-confirm-error');
                            inProcess.push("false");
                        }
                        break;

                }
                break;
                 
            }
        }
       
    for(let i = 0; i < inProcess.length; i++) {
        if(inProcess[i] == 'false') {
            return false
        }
    }
    return q.join("&")
}
module.exports = serialize;
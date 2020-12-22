let hintPopup = require('../common/hintPopup');
function ajaxForm (arr){
    hintPopup('В процессе')
    return true;
    // $.ajax({
    //     url: url,
    //     data: data,
    //     type: "POST",
    //     dataType: "html",
    //     cache: false,
    //     success: function (data) {
    //         return true;
    //     }

    // });
}

module.exports = ajaxForm;
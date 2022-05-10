window.onload = function(){

    $('#plan-date').datepicker({
        showButtonPanel: true
        ,currentText: "今日"
        ,closeText: "閉じる"
        ,onClose: function(evt, ui){
            $(this).trigger('blur');
        }
    });

    // avoid overlap label
    $('#plan-date').bind('blur',(event) => {
        let field = event.target;
        if (field.value.length > 0) {
          field.classList.add('active');
        } else {
          field.classList.remove('active');
        }
        formHelperValidation('#plan-date_helper', '#plan-date_invalid-feedback')
    });

    $(".readonly").on('keydown', function(e){
        if(e.keyCode != 9) // ignore tab
            e.preventDefault();
    });

    let hour = document.getElementById("hour-select");
    let hour_options_html = "";
    for(let h=0; h<24; h++){
        const h_normalization = h.toString().padStart(2,'0')
        hour_options_html += "<option value=" + h_normalization + ">" + h_normalization + "</option>"
    }
    hour.innerHTML = hour_options_html;

    let min = document.getElementById("min-select");
    let min_options_html="";
    for(let m=0; m<60; m++){
        const m_normalization = m.toString().padStart(2,'0')
        min_options_html += "<option value=" + m_normalization + ">" + m_normalization + "</option>"
    }
    min.innerHTML = min_options_html;


    let btn = document.getElementById('send-btn');
    btn.addEventListener('click', function(){
        check();
    });

    // Add
    let plan_title = document.getElementById('plan-title');
    plan_title.addEventListener('keyup', (event) => {
        formHelperValidation('#plan-title_helper', '#plan-title_invalid-feedback')
    })
    // Loop over them and prevent submission
}

function planTitleFeedbackStatusReload(){
    return document.defaultView.getComputedStyle(document.getElementById('plan-title_invalid-feedback'), null).display
}

function formHelperValidation(helper_id, invalid_feedback_id){
    if($(invalid_feedback_id).css('display') == 'none' ){
        $(helper_id).show('slow');
    }else{
        // $(helper_id).hide();
        $(helper_id).hide('slow');
    }
}


function check(){
    let forms = document.querySelectorAll('.needs-validation');
    Array.prototype.slice.call(forms)
    .forEach(function (form) {
        form.addEventListener('click', function(event){
            if (!form.checkValidity()) {
                event.preventDefault()
                event.stopPropagation()
            }
            form.classList.add('was-validated')
            formHelperValidation('#plan-title_helper', '#plan-title_invalid-feedback');
            formHelperValidation('#plan-date_helper', '#plan-date_invalid-feedback')
        })
    })
}
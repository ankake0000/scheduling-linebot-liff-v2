window.onload = function(){

    
    $('#plan-date').datepicker({
        showButtonPanel: true
        ,currentText: "今日"
        ,closeText: "閉じる"
        ,onClose: function(evt, ui){
            $(this).trigger('blur');
        }
    });

    // avoid overlaping label
    $('#plan-date').bind('blur',(element) => {
        let field = element.target;
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

    let hour_options_html = "";
    for(let h=0; h<24; h++){
        const h_normalization = h.toString().padStart(2,'0')
        hour_options_html += "<option value=" + h_normalization + ">" + h_normalization + "</option>"
    }
    $('#hour-select').html(hour_options_html);
    // let hour = document.getElementById("hour-select");
    // hour.innerHTML = hour_options_html;

    let min_options_html="";
    for(let m=0; m<60; m++){
        const m_normalization = m.toString().padStart(2,'0')
        min_options_html += "<option value=" + m_normalization + ">" + m_normalization + "</option>"
    }
    $('#min-select').html(min_options_html);
    // let min = document.getElementById("min-select");
    // min.innerHTML = min_options_html;


    $('#send-btn').on('click', ()=>{
        check();
    });
    // let send_btn = document.getElementById('send-btn');
    // send_btn.addEventListener('click', function(){
    //     check();
    // });

    $('#plan-title').on('keyup',()=>{
        formHelperValidation('#plan-title_helper', '#plan-title_invalid-feedback')
    })
    // let plan_title = document.getElementById('plan-title');
    // plan_title.addEventListener('keyup', () => {
    //     formHelperValidation('#plan-title_helper', '#plan-title_invalid-feedback')
    // })

    // Loop over them and prevent submission

    let location_field = location.href.split("?");

    if(location_field.length > 1){
        $('#form-title').text("予定の編集")
        let decode_uri = decodeURIComponent(location_field[1]);
        // URL Persent Decode Required
        let input_data_field = decode_uri.split("&")
        let plan_id = input_data_field[0].split("=")[1]
        let input_plan_title = input_data_field[1].split("=")[1]
        let input_plan_date = input_data_field[2].split("=")[1]
        let input_plan_hour = input_data_field[3].split("=")[1]
        let input_plan_min = input_data_field[4].split("=")[1]
        let input_plan_desc = input_data_field[5].split("=")[1]

        // $('#plan-description').text(decode_uri);
        $('#plan-id').val(plan_id);
        $('#plan-title').val(input_plan_title);
        $('#plan-title').addClass('active');
        $('#plan-date').val(input_plan_date);
        $('#plan-date').addClass('active');
        $('#hour-select').val(input_plan_hour);
        $('#min-select').val(input_plan_min);
        $('#plan-description').text(input_plan_desc);
        $('#plan-description').addClass('active');
    }
}

// function planTitleFeedbackStatusReload(){
//     return document.defaultView.getComputedStyle(document.getElementById('plan-title_invalid-feedback'), null).display
// }


function formHelperValidation(helper_id, invalid_feedback_id){
    if($(invalid_feedback_id).css('display') == 'none' ){
        $(helper_id).show('slow');
    }else{
        $(helper_id).hide('slow');
    }
}


function check(){
    let forms = document.querySelectorAll('.needs-validation');
    Array.prototype.slice.call(forms)
    .forEach(function (form) {
        form.addEventListener('click', function(event){
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }
            form.classList.add('was-validated');
            formHelperValidation('#plan-title_helper', '#plan-title_invalid-feedback');
            formHelperValidation('#plan-date_helper', '#plan-date_invalid-feedback');
        })
    })
}
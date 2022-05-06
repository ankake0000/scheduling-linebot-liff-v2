window.onload = function(){
    let hour = document.getElementById("hour-select");
    let hour_options_html = "";
    for(let h=0; h<24; h++){
        const h_normalization = h.toString().padStart(2,'0')
        hour_options_html += "<option value=" + h_normalization + ">" + h_normalization + "</option>"
    }
    hour.innerHTML = hour_options_html;
    // const sec = document.createElement('section');
    // sec.innerHTML = hour_options_html;
    // document.querySelector('#hour-select').appendChild(sec);

    let min = document.getElementById("min-select");
    let min_options_html="";
    for(let m=0; m<60; m++){
        const m_normalization = m.toString().padStart(2,'0')
        min_options_html += "<option value=" + m_normalization + ">" + m_normalization + "</option>"
    }
    min.innerHTML = min_options_html;

    /**
    let input_calendar = document.getElementById("input-calendar");

    const today = new Date();
    const year = today.getFullYear()
    const month_base = today.getMonth() + 1
    const month = month_base.toString().padStart(2,'0')
    const day = today.getDate()

    const today_date_str = year + '-' + month + '-' + day
    input_calendar.setAttribute('min',today_date_str)
    */

    $('#plan-date').datepicker();

    let title = document.getElementById('plan-title');
    let title_helper = document.getElementById('plan-title_helper');
    let date_helper = document.getElementById('plan-date_helper');

    // let target = document.getElementById('title-form');
    let target = document.getElementById('plan-title');
    let observer = new MutationObserver(function(){
        if(title.value === ""){
            title_helper.style.display = 'none';
        }else{
            title_helper.style.display = 'block';
        }
    });
    observer.observe(target, {
        childList : true,
        attributes : true,
        subtree : true,
    });

    let btn = document.getElementById('send-btn');
    btn.addEventListener('click', function(){
        check();
    });
    // Loop over them and prevent submission
}

function planTitleFeedbackStatusReload(){
    return document.defaultView.getComputedStyle(document.getElementById('plan-title_invalid-feedback'), null).display
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
        })
    })
}
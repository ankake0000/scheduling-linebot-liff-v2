window.onload = function(){
    let hour = document.getElementById("hour-select");
    let hour_options_html = "";
    for(let h=0; h<24; h++){
        hour_options_html += "<option value=" + h + ">" + h + "</option>"
    }
    hour.innerHTML = hour_options_html;
    // const sec = document.createElement('section');
    // sec.innerHTML = hour_options_html;
    // document.querySelector('#hour-select').appendChild(sec);

    let min = document.getElementById("min-select");
    let min_options_html="";
    for(let m=0; m<60; m++){
        min_options_html += "<option value=" + m + ">" + m + "</option>"
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
}
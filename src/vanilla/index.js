import './index.css';
import './design.js';
import liff from '@line/liff'

document.addEventListener("DOMContentLoaded", function() {
  liff
    .init({ liffId: process.env.LIFF_ID })
    .then(() => {
        console.log("Success! you can do something with LIFF API here.")
        document.getElementById('send-btn').addEventListener('click', ()=> {
            // getProfile();
            let message_data = makeMessage();
            sendMessages(message_data);
        });
    })
    .catch((error) => {
        console.log(error)
    })
});

function getProfile(){
    liff.getProfile().then(function (profile) {
        document.getElementById('log').value =  profile.displayName + '\n';
        document.getElementById('log').value += profile.userId;
    });
}

function makeMessage(){
    let data = {title: "", date: "", time:"", desc:""};
    data.title = document.getElementById('plan-title').value;
    data.date = document.getElementById('plan-date').value;
    data.time = document.getElementById('hour-select').value;
    data.time += document.getElementById('min-select').value;
    data.desc = document.getElementById('plan-description').value;
    return data;
}

function sendMessages(message_data){
    if (!liff.isInClient()) {
        document.getElementById('log').value += 'sendMessagesText ng\n';
      } else {
        // document.getElementById
        let message = "";
        Object.keys(message_data).forEach(function(value){
          message += this[value] + '\n';
        }, message_data);

        liff
        .sendMessages([{
          'type': 'text',
          // 'text': document.getElementById('message').value
          'text': message
        }]).then(function() {
          liff.closeWindow();
          // document.getElementById('log').value += 'sendMessagesText completed\n';
        }).catch(function(error) {
          document.getElementById('log').value += 'sendMessagesText()='+message + '\n' + error;
        });
      }
}
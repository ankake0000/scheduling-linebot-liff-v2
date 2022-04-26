import './index.css';
import './design.js';
import liff from '@line/liff'

let message_data = {title: "", date: "", hour:"", min:"", desc:""};

document.addEventListener("DOMContentLoaded", function() {
  liff
    .init({ liffId: process.env.LIFF_ID })
    .then(() => {
        console.log("Success! you can do something with LIFF API here.")
        document.getElementById('send-btn').addEventListener('click', ()=> {
            // getProfile();
            makeMessage();

            sendMessages();
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
    message_data.title = document.getElementById('plan-title').value;
    message_data.date = document.getElementById('plan-date').value;
    message_data.hour = document.getElementById('hour-select').value;
    message_data.min = document.getElementById('min-select').value;
    message_data.desc = document.getElementById('plan-description').value;
}

function sendMessages(){
    if (!liff.isInClient()) {
        document.getElementById('log').value += 'sendMessagesText ng\n';
      } else {
        // document.getElementById
        let message;
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
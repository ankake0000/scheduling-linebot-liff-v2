import './index.css';
import './design.js';
import liff from '@line/liff'

document.addEventListener("DOMContentLoaded", function() {
  liff
    .init({ liffId: process.env.LIFF_ID })
    .then(() => {
        console.log("Success! you can do something with LIFF API here.")
        document.getElementById('send-btn').addEventListener('click', ()=> {
            getProfile();
            // sendMessages();
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

function sendMessages(){
    if (!liff.isInClient()) {
        document.getElementById('log').value += 'sendMessagesText ng\n';
      } else {
        // document.getElementById
        title = document.getElementById('plan-title').value;
        date = document.getElementById('plan-date').value;
        hour = document.getElementById('hour-select').value;
        min = document.getElementById('min-select').value;
        desc = document.getElementById('plan-description').value;
        message = title + '\n' + date + '\n' + hour + ':' + min + '\n' + desc;

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
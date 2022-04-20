import './index.css';
import liff from '@line/liff'

document.addEventListener("DOMContentLoaded", function() {
  liff
    .init({ liffId: process.env.LIFF_ID })
    .then(() => {
        console.log("Success! you can do something with LIFF API here.")
        document.getElementById('send').addEventListener('click', ()=> {
            if (!liff.isInClient()) {
              document.getElementById('log').value += 'sendMessagesText ng\n';
            } else {
              liff.sendMessages([{
                'type': 'text',
                'text': document.getElementById('message').value
              }]).then(function() {
                document.getElementById('log').value += 'sendMessagesText completed\n';
              }).catch(function(error) {
                document.getElementById('log').value += 'sendMessagesText()=' + error + '\n';
              });
            }
          });
    })
    .catch((error) => {
        console.log(error)
    })
});

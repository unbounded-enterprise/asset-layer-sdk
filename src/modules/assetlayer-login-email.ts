import { assetlayerLogoDataUrl } from '../assets/assetlayer-logo';

const assetlayerLoginEmail = 
`
<!DOCTYPE html>
<html lang="en-us">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Asset Layer Login</title>
  </head>
  <body style="position: absolute; left: 0px; top: 0px; margin: 0px; padding: 0px; background-color: rgba(255,255,255,0.5)">
    <div id="login-email-container" style="position: absolute; left: 0px; top: 0px; display: flex; justify-content: center; align-items: center; width: 100vw; height: 100vh;">
      <div style="position: absolute; display: flex; flex-direction: column; justify-content: center; align-items: center; width: 360px; height: 380px; 
          background-color: white; border: 1px solid black; border-radius: 24px; box-shadow: 5px 5px 5px rgba(0,0,0,0.25);">
        <button id="assetlayer-close-email-popup" 
          onmouseover="this.style.backgroundColor='darkgray';" 
          onmouseout="this.style.backgroundColor='';" 
          style="position: absolute; top: 24px; right: 24px; width: 38px; height: 38px; cursor: pointer; 
            border: 1px solid black; border-radius: 12px;"
        >
          X
        </button>
        <img src="${assetlayerLogoDataUrl}" alt="" crossorigin="anonymous" style="width: 45px; height: 45px;"/>
        <input id="assetlayer-enter-email-input" type="text" placeholder="Email" style="margin: 80px 0px; padding: 0px 16px; width: 280px; height: 50px; 
          border: 1px solid darkgray; border-radius: 12px"/>
        <button id="assetlayer-submit-email-button" 
          onmouseover="this.style.backgroundColor='darkgray';" 
          onmouseout="this.style.backgroundColor='';" 
          style="padding: 16px 24px; cursor: pointer; border: 1px solid black; border-radius: 12px;"
        >
          Login with Email
        </button>
      </div>
    </div>
    <script>
        const closePopupBtn = document.getElementById('assetlayer-close-email-popup');
        const submitEmailBtn = document.getElementById('assetlayer-submit-email-button');

        closePopupBtn.addEventListener('click', function() {
          // Send the close command to the parent window
          window.parent.postMessage({ source: 'assetlayer-login-popup', type: 'close' }, 
            (window.location.href.slice(0,7) === 'file://') ? '*' : window.location.origin);
        });
        submitEmailBtn.addEventListener('click', function() {
            const email = document.getElementById('assetlayer-enter-email-input').value;
            // Send the email to the parent window
            window.parent.postMessage({ source: 'assetlayer-login-popup', type: 'submit', email }, 
                (window.location.href.slice(0,7) === 'file://') ? '*' : window.location.origin);
        });
    </script>
  </body>
</html>
`;

export default assetlayerLoginEmail;
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
  <body style="position: absolute; margin: 0; padding: 0; background-color: rgba(255,255,255,0.5)">
    <div id="login-email-container" style="position: absolute; display: flex; justify-content: center; align-items: center; width: 100vw; height: 100vh;">
      <div style="position: absolute; display: flex; flex-direction: column; justify-content: center; align-items: center; width: 360px; height: 380px; 
          background-color: white; border: 1px solid black; border-radius: 24px; box-shadow: 5px 5px 5px rgba(0,0,0,0.25);">
        <img src="${assetlayerLogoDataUrl}" alt="" crossorigin="anonymous" style="width: 45px; height: 45px;"/>
        <input id="enter-email-input" type="text" placeholder="Email" style="margin: 80px 0px; padding: 0px 16px; width: 280px; height: 50px; 
          border: 1px solid darkgray; border-radius: 12px"/>
        <button id="submit-email-button" 
          onmouseover="this.style.backgroundColor='darkgray';" 
          onmouseout="this.style.backgroundColor='';" 
          style="padding: 16px 24px; cursor: pointer; background-color: lightgray; border: 1px solid black; border-radius: 12px;"
        >
          Login with Email
        </button>
      </div>
    </div>
    <script>
        const btn = document.getElementById('submit-email-button');
        btn.addEventListener('click', function() {
            const email = document.getElementById('enter-email-input').value;
            // Send the email to the parent window
            window.parent.postMessage({ source: 'assetlayer-login-email-submission', email }, window.location.origin);
        });
    </script>
  </body>
</html>
`;

export default assetlayerLoginEmail;
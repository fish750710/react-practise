const GAPI_ID = 'gapi-id';
const GOOGLE_CLIENT_ID = '411525327701-bi083i37cuha648m7mg77pb9am5fohh1.apps.googleusercontent.com';


// export function installGapiSDK(): Promise<void> {
//   return new Promise((resolve, reject) => {
//     if (document.getElementById(GAPI_ID)) {
//       initClient();
//       return;
//     }
//     const newScript = document.createElement('script');
//     newScript.id = GAPI_ID;
//     newScript.src = 'https://accounts.google.com/gsi/client';
//     newScript.onload = () => {
//       initClient();
//     }
//     newScript.onerror = (err) => {
//       console.log(err)
//     }
//     document.head.appendChild(newScript);

//     async function initClient() {
//       try {
//         window.google?.accounts.id.initialize({
//           client_id: GOOGLE_CLIENT_ID as string,
//           auto_select: false,
//           ux_mode: 'popup',
//           callback(res) {
//             console.log('google-token': res.credential)
//             // googleIdToken.value = res.credential as string;
//           }
//         });
//         resolve();
//       } catch(err: any) {
//         console.log(err);
//         reject(err);
//       }
//     }
//   })
// }

export function installGapiSDK() {
  console.log('installGapiSDK....')
  return new Promise((resolve, reject) => {
    if (document.getElementById(GAPI_ID)) {
      initClient();
      return;
    }
    const newScript = document.createElement('script');
    newScript.id = GAPI_ID;
    newScript.src = 'https://accounts.google.com/gsi/client';
    newScript.onload = () => {
      initClient();
    }
    newScript.onerror = (err) => {
      console.log('initSDK', err)
    }
    document.head.appendChild(newScript);

    async function initClient() {
      try {
        window.google?.accounts.id.initialize({
          client_id: GOOGLE_CLIENT_ID,
          auto_select: false,
          ux_mode: 'popup',
          callback(res) {
            console.log('google-token', res.credential)
            // googleIdToken.value = res.credential as string;
          }
        });
        resolve();
      } catch(err) {
        console.log(err);
        reject(err);
      }
    }
  })
}
import * as firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAtaxChdsXsafnwlDz8L5qbyKopnKMCrno',
  authDomain: 'memlang.firebaseapp.com',
  databaseURL: 'https://memlang.firebaseio.com',
  projectId: 'memlang',
  storageBucket: '',
  messagingSenderId: '1041692358779',
  appId: '1:1041692358779:web:1e84cc9b3cf01527',
};

firebase.initializeApp(firebaseConfig);

const provider = new firebase.auth.GoogleAuthProvider();

export const login = () => {
  return firebase
    .auth()
    .signInWithPopup(provider)
    .then((result) => {
      if (result.credential) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = (result.credential as any).accessToken as string;
        // The signed-in user info.
        var user = result.user;
        // ...
        console.log(token, user);
        if (user) {
          return user.displayName;
        }
      }
    })
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
      console.log(errorCode, errorMessage, email, credential);
    });
};

import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import { Dispatch, LoginAction, LogoutAction } from './type';

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
        console.log('signInWithPopup', token, user);
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

export const logout = () => {
  return firebase
    .auth()
    .signOut()
    .then(() => {
      console.log('Successful sign out');
    })
    .catch((error) => {
      console.log(error);
    });
};

export const subscribeStateChange = (dispatch: Dispatch) => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      const { displayName, photoURL, uid } = user;
      user.getIdToken().then((token) => {
        const action: LoginAction = {
          type: 'login',
          user: {
            name: displayName || 'anon',
            photo: photoURL || '',
            token,
            uid,
          },
        };
        dispatch(action);
      });
    } else {
      const action: LogoutAction = { type: 'logout' };
      dispatch(action);
    }
  });
};

const db = firebase.firestore();

export const addWord = (en: string, ru: string, user: string) => {
  db.collection('dictionary').add({
    en,
    ru,
    user,
  });
};

export const getWords = (user: string) => {
  return db
    .collection('dictionary')
    .where('user', '==', user)
    .get()
    .then((response) => {
      const result: any[] = [];
      response.forEach((doc) => result.push(doc.data()));
      return result;
    });
};

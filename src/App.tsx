import React, { useReducer, useEffect } from 'react';
import './App.css';
import { Auth } from './components/Auth';
import { State } from './type';
import { reducer } from './reducers';
import { subscribeStateChange } from './firebase';
import { Translator } from './components/Translator';
import { WordList } from './components/WordList';

const initialState: State = {
  user: {
    signIn: false,
    name: '',
    photo: '',
    token: '',
    uid: '',
  },
};

export const App: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    subscribeStateChange(dispatch);
  }, []);

  return (
    <div className='App'>
      <Auth dispatch={dispatch} user={state.user} />
      {state.user.signIn && <Translator authToken={state.user.token} userId={state.user.uid} />}
      {state.user.signIn && <WordList userId={state.user.uid} />}
    </div>
  );
};

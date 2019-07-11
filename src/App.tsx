import React, { useReducer, useEffect } from 'react';
import './App.css';
import { Auth } from './components/Auth';
import { State } from './type';
import { reducer } from './reducers';
import { subscribeStateChange } from './firebase';
import { Translator } from './components/Translator';

const initialState: State = {
  user: {
    signIn: false,
    name: '',
    photo: '',
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
      <Translator />
    </div>
  );
};

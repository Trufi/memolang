import React from 'react';
import { login, logout } from '../firebase';
import { UserState, Action } from '../type';

export interface Props {
  user: UserState;
  dispatch: React.Dispatch<Action>;
}

const SignInStatus = ({ user: { name, photo } }: Props) => {
  return (
    <div>
      <img
        src={photo}
        alt={name}
        style={{
          width: '30px',
          height: '30px',
          borderRadius: '15px',
        }}
      />
      {name}
      <button onClick={() => logout()}>logOut</button>
    </div>
  );
};

export const Auth = ({ user, dispatch }: Props) => {
  return (
    <div>
      {!user.signIn ? (
        <button onClick={() => login()}>Login</button>
      ) : (
        <SignInStatus user={user} dispatch={dispatch} />
      )}
    </div>
  );
};

import React, { useState } from 'react';
import { login } from '../firebase';

interface AuthState {
  name: string;
}

export const Auth: React.FC = () => {
  const [user, setUser] = useState<AuthState | undefined>(undefined);

  const signIn = () => {
    login().then((user) => {
      console.log(user);
      if (user) {
        setUser({ name: user });
      }
    });
  };

  const logOut = () => {
    console.log('log out will');
  };

  return (
    <div>
      Name: {user ? user.name : 'anon'}
      {!user ? <button onClick={signIn}>Login</button> : <button onClick={logOut}>logOut</button>}
    </div>
  );
};

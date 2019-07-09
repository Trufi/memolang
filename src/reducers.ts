import { State, Action, LoginAction } from './type';

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'login':
      return login(state, action);
    case 'logout':
      return {
        ...state,
        user: {
          signIn: false,
          name: '',
          photo: '',
        },
      };
    default:
      return state;
  }
}

function login(state: State, { user: { name, photo } }: LoginAction): State {
  return {
    ...state,
    user: {
      signIn: true,
      name,
      photo,
    },
  };
}
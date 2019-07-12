export interface UserState {
  signIn: boolean;
  name: string;
  photo: string;
  token: string;
}

export interface State {
  user: UserState;
}

export interface LoginAction {
  type: 'login';
  user: {
    name: string;
    photo: string;
    token: string;
  };
}

export interface LogoutAction {
  type: 'logout';
}

export type Action = LoginAction | LogoutAction;

export type Dispatch = React.Dispatch<Action>;

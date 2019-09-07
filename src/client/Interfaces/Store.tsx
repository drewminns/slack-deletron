export interface IState {
  LOGGED_IN: boolean;
  USER_TOKEN: string;
  USER: {
    LOADING: boolean;
    PROFILE: {};
    ERROR: boolean;
  };
}

export interface IAction {
  type: string;
  payload: any;
}

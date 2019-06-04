export interface IState {
    auth: IAuthState;
}

export interface IAction {
    type: string;
    // tslint:disable-next-line: no-any
    payload?: any;
}

export interface IAuthState {
    token?: string;
    user?: IUser;
    errorMsg?: string;
}

import { IUser } from 'app/actions';

export const updateLocalUser = (user: IUser) => {
    const userInfo = JSON.parse(localStorage.getItem('ehToken')!);
    localStorage.setItem(
        'ehToken',
        JSON.stringify({ ...userInfo, user: user })
    );
};

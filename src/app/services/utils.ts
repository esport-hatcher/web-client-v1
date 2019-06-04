export const isEmail = (input: string) => {
    if (input.match(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/)) {
        return true;
    }
    return false;
};

// tslint:disable-next-line: promise-function-async
export const sleep = (milliseconds: number) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
};

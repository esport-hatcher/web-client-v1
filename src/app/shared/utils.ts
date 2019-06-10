export const isEmail = (input: string) => {
    if (input.match(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/)) {
        return true;
    }
    return false;
};

// Returns a function setting min and max for check function
export const getMinMaxFunction = (min: number, max: number) => {
    const minMax = (input: string) => {
        if (input.length < min || input.length > max) {
            return false;
        }
        return true;
    };
    return minMax;
};

// tslint:disable-next-line: promise-function-async
export const sleep = (milliseconds: number) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
};

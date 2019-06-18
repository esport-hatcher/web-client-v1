export const isEmail = (input: string) => {
    if (input.match(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/)) {
        return true;
    }
    return false;
};

// Returns a function setting min and max for check function
export const getMinMaxFunction = (min: number, max: number) => {
    return (input: string) => {
        if (input.length < min || input.length > max) {
            return false;
        }
        return true;
    };
};

// tslint:disable-next-line: promise-function-async
export const sleep = (milliseconds: number) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
};

export const getCompareStringFunction = (stringToCompare: string) => {
    return (input: string) => {
        return input === stringToCompare;
    };
};

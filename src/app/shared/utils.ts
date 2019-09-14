export const isEmail = (stringToCompare: string): boolean => {
    if (
        stringToCompare.match(
            /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
        )
    ) {
        return true;
    }
    return false;
};

// Returns a function setting min and max for check function
export const getMinMaxFunction = (min: number, max: number) => {
    return (stringToCompare: string): boolean => {
        if (stringToCompare.length < min || stringToCompare.length > max) {
            return false;
        }
        return true;
    };
};

// tslint:disable-next-line: promise-function-async
export const sleep = (milliseconds: number): Promise<unknown> => {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
};

export const getCompareStringFunction = (stringToCompare: string) => {
    return (input: string): boolean => {
        return input === stringToCompare;
    };
};

export const isNotEmpty = (stringToCompare: string): boolean => {
    if (stringToCompare.length === 0) {
        return false;
    }
    return true;
};

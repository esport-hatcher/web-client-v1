// tslint:disable-next-line: promise-function-async

export const sleep = async (ms: number) =>
    new Promise(resolve => setTimeout(resolve, ms));

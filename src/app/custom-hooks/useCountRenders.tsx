import { useRef } from 'react';

export const useCountRenders = (msg?: string) => {
    const renders = useRef(0);

    // tslint:disable-next-line: no-console
    console.log(`${msg} renders: `, renders.current++);
};

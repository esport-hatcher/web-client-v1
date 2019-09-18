import { useRef } from 'react';

export const useCountRenders = () => {
    const renders = useRef(0);

    // tslint:disable-next-line: no-console
    console.log('renders: ', renders.current++);
};

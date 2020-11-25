/// <reference types="react-scripts" />

declare module 'react-router-transition' {
    import { RouteProps } from 'react-router';

    interface AnimatedSwitchProps {
        atEnter: React.CSSProperties;
        atLeave: React.CSSProperties;
        atActive: React.CSSProperties;
        didLeave?: (style: React.CSSProperties) => void;
        className?: string;
        wrapperComponent?: keyof HTMLElementTagNameMap;
        mapStyles?: (styles: React.CSSProperties) => React.CSSProperties;
        runOnMount?: boolean;
        children: React.ReactNode;
    }

    interface AnimatedRouteProps extends RouteProps {
        atEnter: React.CSSProperties;
        atLeave: React.CSSProperties;
        atActive: React.CSSProperties;
        mapStyles?: (styles: React.CSSProperties) => React.CSSProperties;
        className?: string;
        wrapperComponent?: boolean;
    }

    export const AnimatedSwitch: React.ComponentClass<AnimatedSwitchProps>;
    export const AnimatedRoute: React.ComponentClass<AnimatedRouteProps>;
    export const RouteTransition: React.ComponentClass<AnimatedSwitchProps>;
}

type Modify<T, R> = Omit<T, keyof R> & R;

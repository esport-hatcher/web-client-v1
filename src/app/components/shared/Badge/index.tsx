import React from 'react';

interface IProps {
    className?: string;
    style?: React.CSSProperties;
    color?: string;
}

export const Badge: React.FC<IProps> = React.memo(
    ({ children, className, style, color }) => {
        return (
            <span
                style={{ backgroundColor: color, ...style }}
                className={`badge important-info important-info--sm ${className}`}
            >
                {children}
            </span>
        );
    }
);

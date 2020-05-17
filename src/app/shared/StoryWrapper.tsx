import React from 'react';

interface IProps {
    // tslint:disable-next-line: no-any
    children: any;
}

export const StoryWrapper: React.FC<IProps> = ({ children }) => {
    return (
        <div
            style={{
                width: '100vw',
                height: '100vh',
                backgroundColor: '#fff',
                position: 'relative',
            }}
        >
            <div
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                }}
            >
                {children}
            </div>
        </div>
    );
};

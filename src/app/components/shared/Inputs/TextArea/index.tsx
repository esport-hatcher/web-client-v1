import React from 'react';

interface IProps extends React.HTMLProps<HTMLTextAreaElement> {}

export const TextArea = React.forwardRef<HTMLTextAreaElement, IProps>(
    ({ ...textAreaProps }, ref) => {
        return (
            <textarea
                {...textAreaProps}
                className={textAreaProps['className'] + ' textarea'}
                ref={ref}
            ></textarea>
        );
    }
);

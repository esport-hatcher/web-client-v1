import React from 'react';
import { IconType } from 'react-icons/lib';
import cx from 'classnames';
import { Spinner } from '../../Spinner';

interface IProps {
    Icon: IconType;
    className?: string;
    type?: 'submit' | 'button';
    loading?: boolean;
    disabled?: boolean;
    onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export const IconButton: React.FC<IProps> = React.memo(
    ({
        children,
        Icon,
        className,
        type = 'button',
        loading = false,
        disabled = false,
        onClick,
    }) => {
        return (
            <button
                type={type}
                onClick={onClick}
                className={cx('btn', 'btn--icon', className, {
                    'btn--disabled': loading,
                    'btn--icon--no-padding': !children,
                })}
                disabled={loading || disabled}
            >
                {children && <p className='btn--icon__text'>{children}</p>}
                {loading ? (
                    <Spinner className='btn--icon__icon' />
                ) : (
                    <Icon
                        className={cx({
                            'btn--icon__icon': children,
                        })}
                    />
                )}
            </button>
        );
    }
);

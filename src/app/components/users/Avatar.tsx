import React, { useState, useEffect } from 'react';
import cx from 'classnames';

interface IProps {
    avatarUrl: string;
    changable?: boolean;
    className?: string;
    onChange?: Function;
}

export const UserAvatar: React.FC<IProps> = React.memo(
    ({ avatarUrl, changable = false, className, onChange }) => {
        const [file, setFile] = useState(null);

        // tslint:disable-next-line: no-any
        const handleImage = (e: any) => {
            setFile(e.target.files[0]);
        };

        useEffect(() => {
            if (onChange && file) {
                onChange(file);
            }
        }, [file, onChange]);

        return (
            <figure
                className={cx(`user-avatar ${className}`, {
                    'user-avatar--changable': changable,
                })}
            >
                <img
                    src={file ? URL.createObjectURL(file) : avatarUrl}
                    className='user-avatar__img'
                    alt={avatarUrl}
                />
                {changable && (
                    <figcaption className='user-avatar__button'>
                        <input
                            hidden
                            id='image_file'
                            type='file'
                            name='image_file'
                            accept='image/*'
                            onChange={handleImage}
                        />
                        <label
                            htmlFor='image_file'
                            className='user-avatar__button__label important-info important-info--sm'
                        >
                            Change
                        </label>
                    </figcaption>
                )}
            </figure>
        );
    }
);

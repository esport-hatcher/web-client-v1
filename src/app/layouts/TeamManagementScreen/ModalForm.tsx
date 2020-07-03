import React from 'react';

export const ModalForm = ({
    handleClose,
    show,
    children,
}: {
    // tslint:disable: no-any
    handleClose: any;
    show: boolean;
    children: any;
}) => {
    const showHideClassName = show
        ? 'modal display-block'
        : 'modal display-none';

    return (
        <div className={showHideClassName}>
            <section className='modal-main'>{children}</section>
        </div>
    );
};

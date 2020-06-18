import React from 'react';
// ts-ignore
//import ReactModal from 'react-modal';

interface IProps {
    handleCloseModal: () => void;
}

class Modal extends React.Component<IProps> {
    constructor(props: IProps) {
        super(props);
    }

    render() {
        return (
            <div className='modal-container'>
                <div className='create modal-box'>
                    <div className='action-container'>
                        <h1 className='create-title'>Create</h1>
                        <img
                            src={process.env.PUBLIC_URL + '/create.png'}
                            alt='create'
                            className='modal-image'
                        />
                        <div className='button-wrapper'>
                            <button
                                onClick={this.props.handleCloseModal}
                                className='create-button'
                            >
                                Create a team
                            </button>
                        </div>
                    </div>
                </div>
                <div className='join modal-box'>
                    <div className='action-container'>
                        <h1 className='join-title'>Join</h1>
                        <img
                            src={process.env.PUBLIC_URL + '/join.png'}
                            alt='join'
                            className='modal-image'
                        />
                        <div className='button-wrapper'>
                            <button
                                onClick={this.props.handleCloseModal}
                                className='join-button'
                            >
                                Join a team
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Modal;

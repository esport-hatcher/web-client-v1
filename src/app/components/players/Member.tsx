import React from 'react';

class Member extends React.Component<{ name: String; status: boolean }> {
    state = {
        status: true,
        color: 'red',
    };

    componentDidMount() {
        if (this.props.status) {
            this.setState(state => {
                return {
                    status: this.props.status,
                    color: '#00FF30',
                };
            });
        }
    }

    render() {
        return (
            <div className='member_parent'>
                <div className='membername'>
                    <h1 className='name'>{this.props.name}</h1>
                </div>
                <div className='status'>
                    <span
                        className='spot'
                        style={{ backgroundColor: this.state.color }}
                    ></span>
                </div>
            </div>
        );
    }
}

export default Member;

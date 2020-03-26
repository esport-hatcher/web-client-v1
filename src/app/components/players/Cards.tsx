import React from 'react';
import Member from './Member';

class Cards extends React.Component {
    state = {
        users: [
            {
                name: 'Jhon Doe',
                status: true,
            },
            {
                name: 'Ragnar Lothbrok',
                status: false,
            },
        ],
    };

    createUser = () => {
        const member = [];

        for (let idx = 0; idx < this.state.users.length; idx++) {
            const nickname = this.state.users[idx].name;
            const online = this.state.users[idx].status;

            member.push(<Member name={nickname} status={online} />);
        }
        return member;
    };

    render() {
        return <div className='card-radius'>{this.createUser()}</div>;
    }
}

export default Cards;

import React from 'react';
import { IUser } from '@/actions';
import { useDispatch } from 'react-redux';

interface IProps {
    item: IUser;
    change: Function;
}

export const TeamUserCard: React.FC<IProps> = ({ item, change }) => {
    const dispatch = useDispatch();
    //change(true);

    const erase = async (item: IUser) => {
        change(false);
    };
    return (
        <div className='member_parent'>
            <div className='membername'>
                <h1 className='name'>{item.username}</h1>
            </div>
            <div className='status'>
                <span
                    className='spot'
                    style={{ backgroundColor: 'red' }}
                ></span>
            </div>
        </div>
    );
};

/*<div className="team-user-card__box">
{item.username} { '/('}
 {item.firstName} {' '} {item.lastName} {')'}
<button onClick={()=>erase(item)}> X</button>
</div>*/

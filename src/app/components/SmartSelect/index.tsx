import React, { Component } from 'react';
import api from 'app/api';
// tslint:disable-next-line: match-default-export-name
import AsyncSelect from 'react-select/async';

interface IRecipeProps {
    setPlayerSelected: Function;
}

interface IRecipeState {
    playerSelected?: string[];
}

const filterColors = async (inputValue: string) => {
    const selectdata = [];
    const info = localStorage.getItem('ehToken');
    if (info === null) {
        return null;
    }
    const obj = JSON.parse(info);
    try {
        const { data } = await api.get(`/users/?username=${inputValue}`, {
            headers: {
                Authorization: `Bearer ${obj.token}`,
            },
        });
        for (const i of data) {
            selectdata.push({
                value: i.id,
                label: (
                    <div className='smart-select-input'>
                        <img
                            src={i.avatarUrl}
                            alt='new'
                            className='smart-select-input__logo'
                        />{' '}
                        {i.username}
                    </div>
                ),
            });
        }
        return selectdata;
    } catch {
        return null;
    }
};

const promiseOptions = async (inputValue: string) =>
    new Promise(resolve => {
        setTimeout(() => {
            resolve(filterColors(inputValue));
        }, 1000);
    });

export class SmartSelect extends Component<IRecipeProps, IRecipeState> {
    // tslint:disable-next-line:no-any
    handleChange = (value: any) => {
        this.props.setPlayerSelected(value);
    };
    public render() {
        return (
            <AsyncSelect
                className='smart-select'
                isMulti
                loadOptions={promiseOptions}
                defaultOptions
                onChange={this.handleChange}
            />
        );
    }
}

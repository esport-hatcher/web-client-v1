import React, { Component } from 'react';
import { Icon, IconName } from '@/components';
import { sleep } from '@/shared/utils';
import api from '@/api';

interface ISmartInputProps {
    placeholder: string;
    name: string;
    type: 'email' | 'text' | 'password';
    pattern?: string;
    required?: boolean;
    icon?: IconName;
    register?: boolean;
    value?: string;
    /**
     * Function who is executed to see if an input is valid or not
     */
    customValidation?: (value: string) => boolean;
    /**
     * CallBack function to keep trace of every input value in the form component
     */
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    /**
     * Callback function who have to be called every time the input is detected  valid or invalid. Allow to say if it's okay to submit the form or not
     */
    onChangeStatus?: (field: string, value: boolean) => void;
}

interface ISmartInputState {
    loading: boolean;
    valid: boolean;
    error: boolean;
    input: string;
}

export class SmartInput extends Component<ISmartInputProps, ISmartInputState> {
    icon: IconName;

    constructor(props: ISmartInputProps) {
        super(props);
        this.icon = this.props.icon || this.defaultIcon();
        this.state = {
            loading: false,
            valid: false,
            error: false,
            input: '',
        };
    }
    /**
     * Check if the input is unique in the database
     * TODO: Pass this function to props so that the component stays independent
     */
    checkIfNotTaken = async () => {
        const { onChangeStatus, name, value } = this.props;
        const { input } = this.state;

        await sleep(1000);
        if (onChangeStatus) {
            try {
                await api.post('/users/email', {
                    email: value || input,
                });
                this.setState({
                    loading: false,
                    valid: true,
                    error: false,
                });
                onChangeStatus(name, true);
            } catch {
                this.setState({
                    loading: false,
                    valid: false,
                    error: true,
                });
                onChangeStatus(name, false);
            }
        }
    };

    /**
     * Execute the validationCheck passed to props to see if it's passing the set his state to success || error
     */
    validationCheck = async () => {
        const {
            customValidation,
            type,
            register,
            onChangeStatus,
            name,
            value,
        } = this.props;
        const { input } = this.state;

        if (customValidation && onChangeStatus) {
            /**
             * Validation check execution
             */
            if (customValidation(value || input)) {
                if (register && type === 'email') {
                    /**
                     * If the input is an email and the input is in mode "register" then we check it's unique in the database
                     */
                    this.setState({ loading: true });
                    await this.checkIfNotTaken();
                } else {
                    /**
                     * If validation is ok then set the state to valid
                     */
                    this.setState({
                        loading: false,
                        valid: true,
                        error: false,
                    });
                    onChangeStatus(name, true);
                }
            } else {
                /**
                 * If their is an error then set the state accordingly
                 */
                this.setState({
                    loading: false,
                    error: true,
                    valid: false,
                });
                onChangeStatus(name, false);
            }
        } else {
            /**
             * If not validation rule is passed to the component than his state is always valid
             */
            if (onChangeStatus) {
                onChangeStatus(name, true);
            }
            this.setState({
                loading: false,
                valid: true,
                error: false,
            });
        }
    };

    /**
     * Set the input's value in the component's state
     */
    onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { onChange } = this.props;

        onChange(event);
        this.setState({
            input: event.target.value,
            valid: false,
            loading: false,
            error: false,
        });
    };

    /**
     * Set a default icon by default for each type
     */
    defaultIcon = (): IconName => {
        const { type } = this.props;

        switch (type) {
            case 'password':
                return 'lock';
            case 'email':
                return 'mail';
            default:
                return 'pen';
        }
    };

    /**
     * Return an icon depending on the state (default, error or valid)
     */
    iconName = (): IconName => {
        const { error, loading, valid } = this.state;
        const { onChangeStatus } = this.props;

        if (error && onChangeStatus) {
            return 'error';
        }
        if (loading && onChangeStatus) {
            return 'sync';
        }
        if (valid && onChangeStatus) {
            return 'check';
        }
        return this.icon;
    };

    /**
     * Return a class depending on the state (default, error or valid)
     */
    inputStatus = (): string => {
        const { error, loading, valid } = this.state;
        const { onChangeStatus } = this.props;

        if (error && onChangeStatus) {
            return 'error';
        }
        if (loading && onChangeStatus) {
            return 'loading';
        }
        if (valid && onChangeStatus) {
            return 'success';
        }
        return '';
    };

    render() {
        const {
            placeholder,
            name,
            pattern,
            type,
            required,
            value,
        } = this.props;
        const { input } = this.state;

        return (
            <div className='smart-input'>
                <input
                    className={`smart-input__input smart-input__input--${this.inputStatus()}`}
                    type={type}
                    placeholder={placeholder}
                    name={name}
                    pattern={pattern}
                    onBlur={this.validationCheck}
                    required={required}
                    value={value || input}
                    onChange={this.onInputChange}
                />
                <Icon className='smart-input__icon' name={this.iconName()} />
            </div>
        );
    }
}

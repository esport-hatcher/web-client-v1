import React, { Component } from 'react';
import { sleep } from '@/shared/utils';
import api from '@/api';

interface ISmartInputP {
    placeholder: string;
    name: string;
    type: 'email' | 'text' | 'password';
    pattern?: string;
    required?: boolean;
    icon?: string;
    register?: boolean;
    value?: string;
    /**
     * Function who is executed to see if an input is valid or not
     */
    customValidation?: (value: string) => boolean;
    // tslint:disable-next-line: no-any
    /**
     * CallBack function to keep trace of every input value in the form component
     */
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    /**
     * Callback function who have to be called every time the input is detected  valid or invalid. Allow to say if it's okay to submit the form or not
     */
    onChangeStatus?: (field: string, value: boolean) => void;
}

export class SmartInput extends Component<ISmartInputP> {
    state = { loading: false, validated: false, error: false, input: '' };

    /**
     * Check if the input is unique in the database
     * TODO: Pass this function to props so that the component stays independent
     */
    checkIfNotTaken = async () => {
        const { onChangeStatus, name, value } = this.props;

        await sleep(1000);
        if (onChangeStatus) {
            try {
                await api.post('/users/email', {
                    email: value || this.state.input,
                });
                this.setState({
                    loading: false,
                    validated: true,
                    error: false,
                });
                onChangeStatus(name, true);
            } catch {
                this.setState({
                    loading: false,
                    validated: false,
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
        } = this.props;
        const { input } = this.state;

        if (customValidation && onChangeStatus) {
            /**
             * Validation check execution
             */
            if (customValidation(input)) {
                if (register && type === 'email') {
                    /**
                     * If the input is an email and the input is in mode "register" then we check it's unique in the database
                     */
                    this.setState({ loading: true });
                    await this.checkIfNotTaken();
                } else {
                    /**
                     * If validation is ok then set the state to validated
                     */
                    this.setState({
                        loading: false,
                        validated: true,
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
                    validated: false,
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
                validated: true,
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
            validated: false,
            loading: false,
            error: false,
        });
    };

    /**
     * Set a default icon by default for each type
     */
    defaultIcon = () => {
        const { type } = this.props;

        switch (type) {
            case 'password':
                return 'fas fa-lock';
            case 'email':
                return 'fas fa-envelope';
            default:
                return 'fas fa-pen';
        }
    };

    /**
     * Return an icon depending on the state (default, error or validated)
     */
    iconType = () => {
        const { error, loading, validated } = this.state;
        const { onChangeStatus } = this.props;
        let iconClass: string = '';
        const defaultIcon = this.defaultIcon();
        if (error && onChangeStatus) {
            iconClass = 'fas fa-times';
        }
        if (loading && onChangeStatus) {
            iconClass = 'fas fa-spinner';
        }
        if (validated && onChangeStatus) {
            iconClass = 'fas fa-check';
        }
        if ((!validated && !error && !loading) || !onChangeStatus) {
            /**
             * Use the icon passed in props in priority otherwise use the default icon related to the type (see defaultIcon above)
             */
            iconClass = this.props.icon || defaultIcon;
        }
        return iconClass;
    };

    /**
     * Return a class depending on the state (default, error or validated)
     */
    inputType = () => {
        const { error, loading, validated } = this.state;
        const { onChangeStatus } = this.props;
        let inputClass: string = '';
        if (error && onChangeStatus) {
            inputClass = 'error';
        }
        if (loading && onChangeStatus) {
            inputClass = 'loading';
        }
        if (validated && onChangeStatus) {
            inputClass = 'success';
        }
        if ((!validated && !error && !loading) || !onChangeStatus) {
            inputClass = '';
        }
        return `smart-input__input--${inputClass}`;
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
        const iconClass = this.iconType();
        const inputClass = this.inputType();
        return (
            <div className='smart-input'>
                <input
                    className={`smart-input__input ${inputClass}`}
                    type={type}
                    placeholder={placeholder}
                    name={name}
                    pattern={pattern}
                    onBlur={this.validationCheck}
                    required={required}
                    value={value || this.state.input}
                    onChange={this.onInputChange}
                />
                <i className={iconClass} />
            </div>
        );
    }
}

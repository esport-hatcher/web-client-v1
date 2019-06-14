import React, { Component } from 'react';
import { sleep } from '@/shared/utils';
import api from '@/api';

interface ISmartInputP {
    placeholder: string;
    name: string;
    type: 'email' | 'text' | 'password';
    // tslint:disable-next-line: no-any
    onChange: (event: any) => void;
    pattern?: string;
    required?: boolean;
    icon?: string;
    customValidation?: (value: string) => boolean;
    register?: boolean;
}

export class SmartInput extends Component<ISmartInputP> {
    state = { loading: false, validated: false, error: false, input: '' };

    /**
     * Check if the input is unique in the database
     * TODO: Pass this function to props so that the component stays independent
     */
    checkIfNotTaken = async () => {
        await sleep(1000);
        try {
            await api.post('/users/email', {
                email: this.state.input,
            });
            this.setState({ loading: false, validated: true, error: false });
        } catch {
            this.setState({ loading: false, validated: false, error: true });
        }
    };

    /**
     * Execute the validationCheck passed to props to see if it's passing the set his state to success || error
     */
    validationCheck = async () => {
        const { customValidation, type, register } = this.props;

        if (customValidation) {
            /**
             * Validation check execution
             */
            if (customValidation(this.state.input)) {
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
            }
        } else {
            /**
             * If not validation rule is passed to the component than his state is always valid
             */
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
        this.props.onChange(event);
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
        let iconClass: string = '';
        const defaultIcon = this.defaultIcon();
        if (error) {
            iconClass = 'fas fa-times';
        }
        if (loading) {
            iconClass = 'fas fa-spinner';
        }
        if (validated) {
            iconClass = 'fas fa-check';
        }
        if (!validated && !error && !loading) {
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
        let inputClass: string = '';
        if (error) {
            inputClass = 'error';
        }
        if (loading) {
            inputClass = 'loading';
        }
        if (validated) {
            inputClass = 'success';
        }
        if (!validated && !error && !loading) {
            inputClass = '';
        }
        return `smart-input__input--${inputClass}`;
    };

    render() {
        const { placeholder, name, pattern, type, required } = this.props;
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
                    value={this.state.input}
                    onChange={this.onInputChange}
                />
                <i className={iconClass} />
            </div>
        );
    }
}

export default SmartInput;

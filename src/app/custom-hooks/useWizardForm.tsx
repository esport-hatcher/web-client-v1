import { useCallback } from 'react';
import { shallowEqual } from 'react-redux';
import { getUpdateForm, getResetForm } from 'app/actions';
import { useSelector } from './useSelector';

export const useWizardForm = (formName: string) => {
    const formValues = useSelector(
        state => state.forms[formName],
        shallowEqual
    );
    const updateForm = useCallback(getUpdateForm(formName), [formName]);
    const resetForm = useCallback(getResetForm(formName), [formName]);

    return { formValues, updateForm, resetForm };
};

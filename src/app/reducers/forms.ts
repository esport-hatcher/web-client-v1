import { IFormValues, Action, ActionTypes } from 'app/actions';
import omit from 'lodash/omit';

interface IFormReducer {
    [key: string]: IFormValues;
}

const formReducer = (state: IFormReducer = {}, action: Action) => {
    switch (action.type) {
        case ActionTypes.updateForm:
            const { formName, formValues } = action.payload;
            return {
                ...state,
                [formName]: { ...state[formName], ...formValues },
            };
        case ActionTypes.resetForm:
            return omit(state, action.formName);
        case ActionTypes.logout:
            return {};
        default:
            return state;
    }
};

export default formReducer;

import React, { useState } from 'react';
import Autosuggest from 'react-autosuggest';

// tslint:disable: no-any

interface IItem {
    label: string;
    value: number;
}

interface IProps {
    items: IItem[];
    onSelect: (value: number | undefined) => void;
}

export const AutoComplete: React.FC<IProps> = React.memo(
    ({ items, onSelect }) => {
        const [value, setValue] = useState<string | undefined>(undefined);
        const [renderedOptions, setRenderedOptions] = useState<IItem[]>(items);

        const filterItems = (value: string) => {
            const inputValue = value.trim().toLowerCase();
            const inputLength = inputValue.length;

            return inputLength === 0
                ? items
                : items.filter(
                      it =>
                          it.label.toLowerCase().slice(0, inputLength) ===
                          inputValue
                  );
        };

        const populateInput = (it: IItem) => it.label;

        const onChange = (e: any, { newValue }: { newValue: string }) => {
            if (!items.find(it => it.label === newValue)) {
                onSelect(undefined);
            }
            setValue(newValue);
        };

        const fetchOptions = ({ value }: { value: string }) => {
            setRenderedOptions(filterItems(value));
        };

        const clearOptions = () => {
            setRenderedOptions([]);
        };

        const shouldRenderSuggestion = () => true;

        const onSuggestionSelected = (
            e: any,
            { suggestion }: { suggestion: IItem }
        ) => onSelect(suggestion.value);

        const renderOption = (it: IItem) => (
            <div key={it.value}>{it.label}</div>
        );

        const inputProps = {
            placeholder: 'Add a member',
            value: value ? value : '',
            onChange,
        };

        return (
            <Autosuggest
                suggestions={renderedOptions}
                onSuggestionsFetchRequested={fetchOptions}
                onSuggestionsClearRequested={clearOptions}
                getSuggestionValue={populateInput}
                renderSuggestion={renderOption}
                inputProps={inputProps}
                onSuggestionSelected={onSuggestionSelected}
                shouldRenderSuggestions={shouldRenderSuggestion}
            />
        );
    }
);

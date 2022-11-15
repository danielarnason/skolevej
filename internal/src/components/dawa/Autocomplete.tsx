// https://dawadocs.dataforsyningen.dk/dok/guide/autocomplete

import React, { FC, useState, useEffect } from 'react';

interface AutocompleteProps {
    onAdresSelected: (coord: string, address: string) => void;
    maxSuggestions: number;
    onClearInput: () => void;
}

interface Suggestion {
    tekst: string;
    adgangsadresse: {
        id: string;
        x: number;
        y: number;
    };
}

const search = async (q: string, max: number) => {
    const url = `https://api.dataforsyningen.dk/adgangsadresser/autocomplete?kommunekode=0360&srid=25832&per_side=${max}&q=${q}`;
    const req = await fetch(url);
    const result = await req.json();
    return result;
};

const Autocomplete: FC = (props: AutocompleteProps) => {
    const [searchText, setSearchText] = useState<string>('');
    const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
    const onSearchTextChanged = async (e) => {
        setSearchText(e.target.value);
        const searchResult = await search(e.target.value, props.maxSuggestions);
        setSuggestions(searchResult);
    };

    const dropdownClassname =
        suggestions.length > 0 ? 'dropdown is-active' : 'dropdown';
    const onSelectSuggestion = (suggestion) => {
        setSearchText(suggestion.tekst);
        props.onAdresSelected(
            suggestion.adgangsadresse.x.toString() +
                ',' +
                suggestion.adgangsadresse.y.toString(),
            suggestion.tekst
        );
        setSuggestions([]);
    };
    const suggestionContent: Element[] = [];
    for (const suggestion of suggestions) {
        suggestionContent.push(
            <a
                href="#"
                className="dropdown-item"
                key={suggestion.adgangsadresse.id}
                onClick={() => onSelectSuggestion(suggestion)}
            >
                {suggestion.tekst}
            </a>
        );
    }
    const clearInput = ()=> {
        setSearchText('');
        setSuggestions([]);
        props.onClearInput()
    };
    return (
        <>
            <div className="field">
                <label className="label">Elev adresse</label>
                <div className="control has-icons-right">
                    <input
                        value={searchText}
                        className="input"
                        onChange={onSearchTextChanged}
                    ></input>
                    <span className="icon is-small is-right">
                        <button
                            type="button"
                            id="al"
                            aria-label="ClearInputField"
                            className="delete is-small"
                            onClick={clearInput}
                        ></button>
                    </span>

                    <div className={dropdownClassname}>
                        <div
                            className="dropdown-menu"
                            id="dropdown-menu"
                            role="menu"
                        >
                            <div className="dropdown-content">
                                {suggestionContent}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Autocomplete;

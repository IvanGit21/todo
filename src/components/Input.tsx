import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
interface IInputProps {
    onEnterHandler: (text: string) => void
}

function Input(props: IInputProps) {
    const [text, setText] = useState<string>('');
    const placeholder="What needs to be done?";
    const inputTextChanged = (event: ChangeEvent<HTMLInputElement>) => {
        setText(event.target.value);
    }
    const inputKeyDownHandler = (event: KeyboardEvent<HTMLInputElement> ) => {
        if (event.key === 'Enter') {
            props.onEnterHandler(text);
            setText('');
        }
    }
    return (
        <input value={text}
               type="text"
               onChange={inputTextChanged}
               onKeyDown={inputKeyDownHandler}
               className="Input__container"
               placeholder={placeholder}/>
    );
}

export default Input;

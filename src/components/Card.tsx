import React, {useState, ChangeEvent, KeyboardEvent} from 'react';
import icon from '../img/cross.png';
import {IItem} from './List';
interface ICardProps {
    item: IItem;
    onDeleteClick: (id: number) => void;
    onCheckedItem: (id: number) => void;
    onEditCompletedHandler: (id: number, newCaption: string) => void;
}

function Card(props: ICardProps) {
    const [editMode, setEditMode] = useState<boolean>(false);
    const [editCaption, setEditCaption] = useState<string>(props.item.captions);
    const getClasses = (isCompleted: boolean): string => {
        let result = 'Card__container';
        if (isCompleted) {
            result += ' Card__container_completed';
        }
        return result
    }
    const keyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            setEditMode(prev => !prev);
            props.onEditCompletedHandler(props.item.id, editCaption);
        }
    }

    const changeEditHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setEditCaption(event.target.value);
    }

    const toggleEditMode = () => {
        setEditMode(prev => !prev);
    }

    return (
        <div className={getClasses(props.item.completed)}>
            <input type="checkbox"
                   checked={props.item.completed}
                   onChange={() => props.onCheckedItem(props.item.id)}/>
            {
                editMode ?
                    <input type="text"
                           className="Card__container_editInput"
                           onChange={changeEditHandler}
                           onKeyDown={keyDownHandler}
                           value={editCaption}/>
                    :
                    <span className="Card__title"
                          onClick={toggleEditMode}>
                        {
                            props.item.captions || ''
                        }
                    </span>
            }
            <div className="Card__iconDelete">
                <img onClick={() => props.onDeleteClick(props.item.id)}
                     className="Card__iconDelete_sizes"
                     alt="delete"
                     src={icon}/>
            </div>
        </div>
    );
}

export default Card;

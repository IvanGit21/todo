import React from 'react';
import Card from './Card';

export interface IListProps {
    data: IItem[];
    onRemoveItem: (id: number) => void;
    onToggleItem: (id: number) => void;
    onEditCompletedHandler: (id: number, newCaption: string) => void;
}

export interface IItem {
    id: number;
    captions: string;
    completed: boolean;
}

function List(props: IListProps) {
    return (
        <div className="List__container">
            {
                props.data.map((item) => {
                    return (
                        <Card onDeleteClick={props.onRemoveItem}
                              onCheckedItem={props.onToggleItem}
                              onEditCompletedHandler={props.onEditCompletedHandler}
                              item={item}
                              key={item.id}/>
                    )
                })
            }
        </div>
    );
}

export default List;

import React from 'react';
interface IFilterProps {
    selectedKey: string;
    onSelectedKeyChanged: (order: string) => void;
    removeCompletedItems: () => void;
    residueCount: number;
    completedCount: number;
}

function FilterBar(props: IFilterProps) {
    const baseButtonCaption = ['All', 'Active', 'Completed'];
    function getClass(order: string): string|undefined {
        let result = 'FilterBar__Item';
        if (order === props.selectedKey) {
            result += ' FilterBar__Item_selected';
        }
        return result;
    }

    function itemClickHandler(order: string): void {
        if (props.selectedKey !== order) {
            props.onSelectedKeyChanged(order);
        }
    }
    return (
        <div className="Content__FilterBar_container">
            <div className="Content__FilterBar_balance Content__FilterBar_itemWidth">
                {props.residueCount} items left
            </div>
            <div className="Content__FilterBar_menu Content__FilterBar_itemWidth">
                {
                    baseButtonCaption.map((item: string, index: number) => {
                        return (
                            <div key={index}
                                 onClick={() => itemClickHandler(index + 1 + '')}
                                 className={getClass(index + 1 + '')}>
                                {item}
                            </div>
                        )
                    })
                }
            </div>
            <div className="Content__FilterBar_clear Content__FilterBar_itemWidth">
                {
                    props.completedCount > 0 ?
                        <div className="Content__FilterBar_clear-button"
                             onClick={() => props.removeCompletedItems()}>
                            Clear all completed
                        </div>
                        : ''
                }
            </div>
        </div>
    );
}

export default FilterBar;

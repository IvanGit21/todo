import React, {useState, useEffect} from 'react';
import Input from './components/Input';
import List, {IItem} from './components/List';
import FilterBar from './components/FilterBar';
import './App.css';

function App() {
    const [data, setData] = useState<IItem[]>([]);
    const [viewData, setViewData] = useState<IItem[]>([]);
    const [residue, setResidueItems] = useState<IItem[]>([]);
    const [completed, setCompletedItems] = useState<IItem[]>([]);
    const [selectedKey, setSelectedKey] = useState<string>('1');

    useEffect(() => {
        const savedData = JSON.parse(localStorage.getItem('list') || '[]');
        setData(savedData);
        setViewData(savedData);
    }, [])

    useEffect(() => {
        const residueItems = data.filter((item) => !item.completed);
        const completedItems = data.filter((item) => item.completed);
        setResidueItems(residueItems);
        setCompletedItems(completedItems);
        switch (selectedKey) {
            case '1':
                setViewData(data);
                break
            case '2':
                setViewData(residueItems);
                break;
            case '3':
                setViewData(completedItems);
                break;
        }
    }, [data, selectedKey])

    const handleEnterEvent = (text: string) => {
        const newItem = {
            id: Date.now(),
            captions: text,
            completed: false
        }
        const newArray = [newItem, ...data];
        setData(newArray);
        localStorage.setItem('list', JSON.stringify(newArray));
    }

    const removeItemHandler = (id: number) => {
        const newArray = data.filter((item) => item.id !== id)
        setData(newArray);
        localStorage.setItem('list', JSON.stringify(newArray));
    }

    const toggleHandler = (id: number) => {
        const newArray = data.map((item) => {
            if (item.id === id) {
                item.completed = !item.completed
            }
            return item;
        })
        setData(newArray);
        localStorage.setItem('list', JSON.stringify(newArray));
    }

    const removeCompletedItems = () => {
        const result = data.filter((item) => {
            return !completed.includes(item);
        })
        setData(result);
        localStorage.setItem('list', JSON.stringify(result));
    }

    const checkingAllHandler = () => {
        const result = data.map((item) => {
            if (!item.completed) {
                item.completed = true;
            }
            return item;
        })
        setData(result);
        localStorage.setItem('list', JSON.stringify(result));
    }

    const editCompletedHandler = (id: number, newCaption: string) => {
        const newData = data.map((item) => {
            if (item.id === id) {
                item.captions = newCaption;
            }
            return item;
        })
        setData(newData);
        localStorage.setItem('list', JSON.stringify(newData));
    }

  return (
    <div className="App variables">
      <div className="App__container">
          <div className="Header">todo</div>
          <div className="Content">
              <div className="Content__Input">
                  <div className="Content__Input__checkingAll" onClick={checkingAllHandler}>
                      &gt;
                  </div>
                  <Input onEnterHandler={handleEnterEvent}/>
              </div>
              {
                  data.length > 0 ?
                      <div className="Content__FilterBar">
                          <FilterBar onSelectedKeyChanged={setSelectedKey}
                                     selectedKey={selectedKey}
                                     removeCompletedItems={removeCompletedItems}
                                     residueCount={residue.length}
                                     completedCount={completed.length}/>
                      </div> : ''
              }
              <div className="Content__List">
                  <List data={viewData}
                        onEditCompletedHandler={editCompletedHandler}
                        onRemoveItem={removeItemHandler}
                        onToggleItem={toggleHandler}/>
              </div>
          </div>
      </div>
    </div>
  );
}

export default App;

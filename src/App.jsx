import { useState } from 'react';
import './App.css';

let interval = null;

const App = () => {
  const [inputValue, setInputValue] = useState('');
  const [arrValue, setArrValue] = useState([]);
  const [isSort, setIsSort] = useState(false);
  const [j, setJ] = useState(0);
  const [i, setI] = useState(0);
  const [done, setDone] = useState([]);

  const onTakeInputValue = () => {
    let newArrValue = [...inputValue.split(' ')];
    setJ(0);
    setI(0);
    setIsSort(false);
    setDone([]);

    for (let i = 0; i < newArrValue.length; i++) {
      newArrValue[i] = Number(newArrValue[i]);
    }

    setArrValue([...newArrValue]);
    setInputValue('');
  };

  if (j > arrValue.length - i) {
    setJ(0);
    setI(i + 1);
    const newDone = [...done];
    newDone.push(arrValue.length - i - 1);
    if (arrValue.length - i === 2) {
      newDone.push(0);
    }
    setDone([...newDone]);
  }

  const bubbleSort = () => {
    const newArr = [...arrValue];
    let temp;

    if (newArr[j] > newArr[j + 1]) {
      temp = newArr[j];
      newArr[j] = newArr[j + 1];
      newArr[j + 1] = temp;
    }

    setJ(j + 1);
    setArrValue([...newArr]);
  };

  const sort = () => {
    setIsSort(true);
  };

  if (isSort) {
    clearInterval(interval);
    interval = setInterval(bubbleSort, 50);

    if (i === arrValue.length - 1) {
      clearInterval(interval);
    }
  }

  return (
    <div className='App'>
      <div className='main-content'>
        <input
          type='text'
          className='input'
          value={inputValue}
          placeholder='Enter numbers to sort...'
          onChange={(e) => setInputValue(e.target.value)}
        />
        <div className='buttons'>
          <button onClick={onTakeInputValue}>Input</button>
          <button onClick={sort}>Start Sorting</button>
        </div>

        <div className='main-graph'>
          <ul>
            {arrValue.map((el, i) => (
              <li key={i}>
                <div style={{ textAlign: 'center', color: '#0A2463' }}>
                  {Number(el)}
                </div>
                <div
                  style={{
                    height: el <= 0 ? `0.5%` : `${el}%`,
                    background: `${
                      done.find((e) => e === i) === i ? 'green' : 'red'
                    }`,
                    width: '30px',
                    textAlign: 'center',
                    color: 'white',
                  }}
                >
                  %
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default App;

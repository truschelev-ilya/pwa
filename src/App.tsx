import {ColorConverter} from './components';
import {useState} from "react";

function App() {
    const [firstValue, setFirstValue] = useState("0")
    const [secondValue, setSecondValue] = useState("0")
    const first = document?.querySelector('#number1') as HTMLInputElement;
    const second = document?.querySelector('#number2') as HTMLInputElement;

    const result = document?.querySelector('.result') as HTMLInputElement;

    if (window.Worker) {
        const myWorker = new Worker("./worker.js");

        [first, second].forEach(input => {
            if (input) {
                input.onchange = function() {
                    myWorker.postMessage([first?.value, second?.value]);
                    console.log('Message posted to worker');
                }
            }
        })

        myWorker.onmessage = function(e) {
            result.textContent = e.data;
            console.log('Message received from worker');
        }
    } else {
        console.log('Your browser doesn\'t support web workers.');
    }
  return (
      <>
          <h1>Convert colors and find HSL difference</h1>
          <img alt="Vite Logo" src="/assets/viteLogo.svg"/>
          <ColorConverter/>
          <h2>WebWorker example</h2>
          <div className="controls" >
              <form>
                  <div>
                      <label htmlFor="number1">Multiply number 1: </label>
                      <input type="text" id="number1" value={firstValue} onChange={e => setFirstValue(e.target.value)}/>
                  </div>
                  <div>
                      <label htmlFor="number2">Multiply number 2: </label>
                      <input type="text" id="number2" value={secondValue} onChange={e => setSecondValue(e.target.value)}/>
                  </div>
              </form>

              <p className="result">Result: 0</p>
          </div>
      </>
  )
}

export default App

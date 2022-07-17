import { useState } from 'react'

const App = () => {
  const [counter, setCounter] = useState(0)
  const [values, setValues] = useState([])

  const handleClick = () => {
    setCounter(counter + 1)
    setValues(values.concat(counter))
  }

  return (
    <div className="container">
      <h1>Hello Caching</h1>
      <div>
        <strong>{counter}</strong>
      </div>
      <button onClick={handleClick}>+</button>
      <div>Values of counter {values.join(',')}</div>
    </div>
  )
}

export default App

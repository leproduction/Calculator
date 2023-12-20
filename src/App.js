import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';


export default function App() {
  const [getInput, setGetInput] = useState('');
  const [signs, setSigns] = useState('');
  const numbers = [
    { name: 'one', value: 1 },
    { name: 'two', value: 2 },
    { name: 'three', value: 3 },
    { name: 'four', value: 4 },
    { name: 'five', value: 5 },
    { name: 'six', value: 6 },
    { name: 'seven', value: 7 },
    { name: 'eight', value: 8 },
    { name: 'nine', value: 9 },
    { name: 'zero', value: 0 },
  ];

  const defineNumber = (e) => {
    e.preventDefault();

    // Check for consecutive operators and replace with the last one
    let updatedInput = getInput + e.target.value;
    const newestInput = updatedInput.replace(/0([1-9])/g, '$1')
    const handleZero = newestInput.replace(/0([\+\-\*\/]+)/g, '0')

    setGetInput(handleZero);
    setSigns(e.target.value);
  };

  const handleEqual = () => {
    try {
      const sanitizedInput = getInput.replace(/([\+\-\*\.\=/])+/g, '$1'); // Keep only the last operator
      const calculatedResult = eval(sanitizedInput);
      setSigns(calculatedResult)
      if (!isNaN(calculatedResult)) {
        setGetInput("=" + calculatedResult.toFixed(1) );
      } else {
        setGetInput('Error');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const handleDoubleClick= () => {
    try {
      const sanitizedInput = getInput.replace(/([\+\-\*\.\/])+/g, '$1'); // Keep only the last operator
      const calculatedResult = eval(sanitizedInput);
      setSigns(calculatedResult)
      if (!isNaN(calculatedResult)) {
        setGetInput(calculatedResult.toFixed(1) );
      } else {
        setGetInput('Error');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };


  const removeNumber = () => {
 setGetInput((preState) =>
  preState
  .split("")
  .slice(0, preState.length-1)
  .join("")
  )
  setSigns('0')
  };

  const removeAll = () => {
    setGetInput(0);
    setSigns('');
  };

  return (
    <Container className='bg-light text-dark mx-auto border border-dark my-5'>
      <Row sm={1} md={1}>
        Calculator
      </Row>
      <Row align='center' className='bg-dark'>
        <p className='mx-0 text-light' id='display'>
          {getInput === '+' ? '' : getInput} <br></br>     {signs}
        </p>



      </Row>
      <Row className='bg-warning text-dark gap-1'>
        <Col className='border border-dark text-center'>
          <input
            type='submit'
            value='AC'
            id='clear'
            onClick={removeNumber}
            onDoubleClick={removeAll}
          />
        </Col>
        <Col className='border border-dark'>
          <input
            type='submit'
            value='+'
            id='add'
            onClick={(e) => {
              setGetInput(getInput + e.target.value);
              setSigns(e.target.value);
            }}
          />
        </Col>
        <Col className='border border-dark'>
          <input
            type='submit'
            value='-'
            id='subtract'
            onClick={(e) => {
              setGetInput(getInput + e.target.value);
              setSigns(e.target.value);
            }}
          />
        </Col>
        <Col className='border border-dark'>
          <input
            type='submit'
            value='*'
            id='multiply'
            onClick={(e) => {
              setGetInput(getInput + e.target.value);
              setSigns(e.target.value);
            }}
          />
        </Col>
        <Col className='border border-dark'>
          <input type='submit' id='equals' value='=' onDoubleClick={handleDoubleClick} onClick={handleEqual} />
        </Col>
        <Col className='border border-dark'>
          <input
            type='submit'
            value='/'
            id='divide'
            onClick={(e) => {
              setGetInput(getInput + e.target.value);
            }}
          />
        </Col>
        <Col className='border border-dark'>
          <input
            type='submit'
            value='.'
            id='decimal'
            onClick={(e) => {
              setGetInput(getInput + e.target.value);
            }}
          />
        </Col>
      </Row>
      <Row>
        {numbers.map((num) => (
          <Col key={num.value} id={num.name}>
            <input onClick={defineNumber} type='submit' value={num.value} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

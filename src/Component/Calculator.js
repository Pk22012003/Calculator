import React, { Component } from 'react';
import './Calculator.css';

class Calculator extends Component {
  constructor() {
    super();
    this.state = {
      displayValue: '0',
      operator: null,
      firstValue: '',
      waitingForSecondValue: false,
    };
  }

  inputDigit = (digit) => {
    const { displayValue, waitingForSecondValue } = this.state;

    if (waitingForSecondValue) {
      this.setState({
        displayValue: String(digit),
        waitingForSecondValue: false,
      });
    } else {
      this.setState({
        displayValue:
          displayValue === '0' ? String(digit) : displayValue + digit,
      });
    }
  };

  inputDecimal = () => {
    const { displayValue, waitingForSecondValue } = this.state;

    if (waitingForSecondValue) {
      this.setState({
        displayValue: '0.',
        waitingForSecondValue: false,
      });
    } else {
      if (displayValue.indexOf('.') === -1) {
        this.setState({
          displayValue: displayValue + '.',
        });
      }
    }
  };

  clearDisplay = () => {
    this.setState({
      displayValue: '0',
    });
  };

  performOperation = (nextOperator) => {
    const { displayValue, operator, firstValue } = this.state;
    const nextValue = parseFloat(displayValue);

    if (firstValue === '') {
      this.setState({
        firstValue: nextValue,
      });
    } else if (operator) {
      const result = this.calculate(firstValue, nextValue, operator);
      this.setState({
        displayValue: String(result),
        firstValue: result,
      });
    }

    this.setState({
      waitingForSecondValue: true,
      operator: nextOperator,
    });
  };

  calculate = (firstValue, secondValue, operator) => {
    if (operator === '+') {
      return firstValue + secondValue;
    } else if (operator === '-') {
      return firstValue - secondValue;
    } else if (operator === 'x') {
      return firstValue * secondValue;
    } else if (operator === '÷') {
      return firstValue / secondValue;
    }
    return secondValue;
  };

  render() {
    const { displayValue } = this.state;

    return (
      <div className="calculator">
        <div className="display">{displayValue}</div>
        <div className="buttons">
          <button onClick={() => this.clearDisplay()}>AC</button>
          <button onClick={() => this.inputDigit(7)}>7</button>
          <button onClick={() => this.inputDigit(8)}>8</button>
          <button onClick={() => this.inputDigit(9)}>9</button>
          <button onClick={() => this.performOperation('÷')}>÷</button>
          <button onClick={() => this.inputDigit(4)}>4</button>
          <button onClick={() => this.inputDigit(5)}>5</button>
          <button onClick={() => this.inputDigit(6)}>6</button>
          <button onClick={() => this.performOperation('x')}>x</button>
          <button onClick={() => this.inputDigit(1)}>1</button>
          <button onClick={() => this.inputDigit(2)}>2</button>
          <button onClick={() => this.inputDigit(3)}>3</button>
          <button onClick={() => this.performOperation('-')}>-</button>
          <button onClick={() => this.inputDigit(0)}>0</button>
          <button onClick={() => this.inputDecimal()}>.</button>
          <button onClick={() => this.performOperation('+')}>+</button>
          <button onClick={() => this.performOperation('=')}>=</button>
        </div>
      </div>
    );
  }
}

export default Calculator;

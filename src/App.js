import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import CurrencyInput from './components/Currencyinput';

// const API_KEY = "d564064065f016f800ac6cfe98e42b150";
const CURRENCY_API = `http://localhost:3001/currencies`;

function App() {
  const [amountOne, setAmountOne] = useState(0);
  const [amountTwo, setAmountTwo] = useState(0);
  const [currencyOne, setCurrencyOne] = useState("INR");
  const [currencyTwo, setCurrencyTwo] = useState("NPR");
  
  const [currencyRates, setCurrencyRates] = useState([]);

  useEffect(() => {
    axios.get(CURRENCY_API)
      .then((response) => {
        console.log(response.data[0].rates)
        setCurrencyRates(response.data[0].rates);
        // console.log(JSON.parse(response.data.rates));
      })
      .catch((err) => {
        console.log(err);
        setCurrencyRates(null);
      });
  }, []);

  const handleAmountOneChange = (amountOne) => {
    setAmountOne(amountOne);
    setAmountTwo((amountOne * currencyRates[currencyTwo]) / currencyRates[currencyOne]);
  };

  const handleAmountTwoChange = (amountTwo) => {
    setAmountTwo(amountTwo);
    setAmountOne((amountTwo * currencyRates[currencyOne]) / currencyRates[currencyTwo]);
  };

  const handleCurrencyOneChange = (currency) => {
    setCurrencyOne(currency);
    setAmountTwo((amountOne * currencyRates[currencyTwo]) / currencyRates[currency]);
  };

  const handleCurrencyTwoChange = (currency) => {
    setCurrencyTwo(currency);
    setAmountOne((amountTwo * currencyRates[currencyOne]) / currencyRates[currency]);
  };

  return (
    <div id = 'div1'>
      <h1>Currency Converter</h1>
      <CurrencyInput
        amount={amountOne}
        currency={currencyOne}
        currencies={Object.keys(currencyRates)}
        onAmountChange={handleAmountOneChange}
        onCurrencyChange={handleCurrencyOneChange}
      />
      <br />
      <CurrencyInput
        amount={amountTwo}
        currency={currencyTwo}
        currencies={Object.keys(currencyRates)}
        onAmountChange={handleAmountTwoChange}
        onCurrencyChange={handleCurrencyTwoChange}
      />
    </div>
  );
}

export default App;

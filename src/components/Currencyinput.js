import React from 'react';

const CurrencyInput = ({
  amount,
  currency,
  currencies,
  onAmountChange,
  onCurrencyChange
}) => {
  return (
    <div>
      <input
        value={amount}
        onChange={(e) => onAmountChange(e.target.value)}
      />

      <select 
        value={currency}
        onChange={(e) => onCurrencyChange(e.target.value)}
      >
        {currencies.map((currency, i) => (
          <option key = {i} value={currency}>{currency}</option>
        ))}
      </select>
    </div>
  );
};

export default CurrencyInput;

const handlePrice = (inicialAmount, currency) => {
  const hasDecimals = inicialAmount.toString().includes('.');
  let decimals = '';
  let amount = inicialAmount;
  if (hasDecimals) {
    decimals = (inicialAmount % 1).toFixed(4).substring(2, 4);
    amount = Math.floor(inicialAmount);
  }

  amount = amount.toLocaleString('de-DE');

  return {
    currency,
    amount,
    decimals,
  };
};

module.exports = { handlePrice };

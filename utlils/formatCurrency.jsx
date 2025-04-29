export const formatCurrency = (amount) => {
    const formattedAmount = new Intl.NumberFormat('en-NG', {
      minimumFractionDigits: 0,
    }).format(amount);
  
    return `NGN ${formattedAmount}`;
  };
  

  // utils/formatCurrency.ts
  export const formatCurrencies = (amount) =>
      new Intl.NumberFormat('en-NG', {
        style: 'currency',
        currency: 'NGN',
        minimumFractionDigits: 0, // remove decimal if not needed
      }).format(amount);
    
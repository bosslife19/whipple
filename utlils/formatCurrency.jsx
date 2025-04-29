// utils/formatCurrency.js
export const formatCurrency = (amount) => {
    const formattedAmount = new Intl.NumberFormat('en-NG', {
      minimumFractionDigits: 0,
    }).format(amount);
  
    return `NGN ${formattedAmount}`;
  };
  
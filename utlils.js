export const formatCurrency = (value) => {
    if (!value) return '';
    return parseInt(value, 10).toLocaleString('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    });
  };
  
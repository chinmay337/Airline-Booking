// Currency exchange rates relative to USD (Demonstration rates)
export const CURRENCIES = {
  USD: { symbol: '$', rate: 1, label: 'USD ($)', name: 'US Dollar' },
  EUR: { symbol: '€', rate: 0.92, label: 'EUR (€)', name: 'Euro' },
  GBP: { symbol: '£', rate: 0.79, label: 'GBP (£)', name: 'British Pound' },
  AED: { symbol: 'AED ', rate: 3.67, label: 'AED (د.إ)', name: 'UAE Dirham' },
  INR: { symbol: '₹', rate: 86.5, label: 'INR (₹)', name: 'Indian Rupee' },
};

export const formatPrice = (amountInUSD, currencyCode = 'USD') => {
  const currency = CURRENCIES[currencyCode] || CURRENCIES.USD;
  const converted = Math.round(amountInUSD * currency.rate);

  if (currencyCode === 'INR') {
    return `${currency.symbol}${converted.toLocaleString('en-IN')}`;
  }
  return `${currency.symbol}${converted.toLocaleString('en-US')}`;
};

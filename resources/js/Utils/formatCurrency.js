/**
 * Format a number as a USD currency string
 * @param {number} amount
 * @param {string} currency - ISO 4217 currency code, default 'USD'
 * @param {string} locale - BCP 47 locale string, default 'en-US'
 * @returns {string}
 */
export function formatCurrency(amount, currency = 'USD', locale = 'en-US') {
    if (amount === null || amount === undefined || isNaN(amount)) return '—';
    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount);
}

/**
 * Format a number as compact currency (e.g. $1.2K, $4.5M)
 * @param {number} amount
 * @returns {string}
 */
export function formatCurrencyCompact(amount) {
    if (amount === null || amount === undefined || isNaN(amount)) return '—';
    if (amount >= 1_000_000) return `$${(amount / 1_000_000).toFixed(1)}M`;
    if (amount >= 1_000)     return `$${(amount / 1_000).toFixed(1)}K`;
    return formatCurrency(amount);
}

/**
 * Parse a currency string back to a number
 * @param {string} str
 * @returns {number}
 */
export function parseCurrency(str) {
    if (!str) return 0;
    return parseFloat(String(str).replace(/[^0-9.-]/g, '')) || 0;
}

export default formatCurrency;
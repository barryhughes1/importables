// mortgage.js
const getTermOptions = () => {
    return [
        { label: '20 years', value: 20 },
        { label: '25 years', value: 25 },
    ];
};

const calculateMonthlyPayment = (principal, years, rate) => {
    // Logic
    return principal + years + rate;
};

export { getTermOptions, calculateMonthlyPayment };
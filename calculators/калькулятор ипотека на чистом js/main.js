// значения из текстовых инпутов
const totalCost = document.getElementById('total-cost'),
      anInitialFee = document.getElementById('an-initial-fee'),
      creditTerm = document.getElementById('credit-term');

// значения из range инпутов
const totalCostRange = document.getElementById('total-cost-range'),
      anInitialFeeRange = document.getElementById('an-initial-fee-range'),
      creditTermRange = document.getElementById('credit-term-range');

// итоговые значения
const totalAmountOfCredit = document.getElementById('amount-of-credit'),
      totalMonthlyPayment = document.getElementById('monthly-payment'),
      totalRecommendedIncome = document.getElementById('recommended-income');

// все range
const inputsRange = document.querySelectorAll('.input-range')

// все кнопки с процентной ставкой
const bankBtns = document.querySelectorAll('.bank')

const assignValue = () => {
    totalCost.value = totalCostRange.value;
    anInitialFee.value = anInitialFeeRange.value;
    creditTerm.value = creditTermRange.value;
}
assignValue();

const banks = [
    {
        name: 'alfa',
        precents: 8.7
    },
    {
        name: 'sber',
        precents: 8.4
    },
    {
        name: 'pochta',
        precents: 7.9
    },
    {
        name: 'tinkoff',
        precents: 9.2
    }
]

let currentPrecent = banks[0].precents;

for (let bank of bankBtns) {
    bank.addEventListener('click', () => {
        for (const item of bankBtns) {
            item.classList.remove('active')
        }
        bank.classList.add('active');
        takeActiveBank(bank);
    })
}

const takeActiveBank = currentActive => {
    const dataAttrValue = currentActive.dataset.name;
    const currentBank = banks.find(bank => bank.name === dataAttrValue);
    currentPrecent = currentBank.precents;
    calculation(totalCost.value, anInitialFee.value, creditTerm.value);
}

for (let input of inputsRange) {
    input.addEventListener('input', () => {
        assignValue();
        calculation(totalCost.value, anInitialFee.value, creditTerm.value);
    })
}

const calculation = (totalCost = 0, anInitialFee = 100000, creditTerm = 1) => {
    let monthlyPayment; //ежемесячный платеж
    let lounAmount = totalCost - anInitialFee; //размер кредита
    let interestRate = currentPrecent; //процентная ставка
    let numberOfYears = creditTerm; //количество лет
    let numberOfMonths = 12 * numberOfYears; //количество месяцев

    monthlyPayment = (lounAmount + (((lounAmount / 100) * interestRate) / 12) * numberOfMonths) / numberOfMonths;
    const monthlyPaymentArounded = Math.round(monthlyPayment);
    if (monthlyPaymentArounded < 0) {
        return false;
    } else {
        totalAmountOfCredit.innerHTML = `${lounAmount} ₽`;
        totalMonthlyPayment.innerHTML = `${monthlyPaymentArounded} ₽`;
        totalRecommendedIncome.innerHTML = `${monthlyPaymentArounded + ((monthlyPaymentArounded / 100) * 35)} ₽`;
    }
}
// Getting elements from DOM.
const Select = document.querySelectorAll('select');
const ConvertBtn = document.getElementById('convert-btn');
const Input = document.getElementById('inputAmount');
const Output = document.querySelector('.currency-output');

let convertFrom = 'USD';
let convertTo = 'INR';

/*
    This function converts the currency and shows it on the screen.
*/
const Convert = async () => {

    const InputAmount = Number(Input.value);

    // If the input amount is not a number then do nothing.
    if (isNaN(InputAmount)) {
        return;
    }

    try {
        // Fetching data from exchange rate API.
        let response = await fetch(`https://v6.exchangerate-api.com/v6/10a8a64ffe163141e7e5dd06/latest/${convertFrom}`);

        const Result = await response.json();

        const ExchangeRate = Result.conversion_rates[convertTo];

        const ConversionResult = ExchangeRate * InputAmount;

        // Displaying the conversion result.
        Output.innerText = `${ConversionResult} ${convertTo}`;
    } catch(err) {

        // Displaying error.
        console.log(err);
        Output.innerText = `Something went wrong`;
    }

}


/*
    This function updates the flag image according to the passed element's value.
*/
const UpdateFlag = (element) => {

    element.previousElementSibling.querySelector('.flag-image').src = `https://flagsapi.com/${element.value}/flat/64.png`;
}

// Adding all the values for dropdown inside the select element.
Select.forEach(select => {

    for (currencyCode in countryList) {

        // Creating new option element for select dropdown.
        const NewOption = document.createElement('option');
        NewOption.innerText = currencyCode;
        NewOption.value = countryList[currencyCode];

        if (select.getAttribute('id') === 'from' && NewOption.innerText === 'USD') {

            NewOption.selected = true;

            // Setting default image for `from` currency.
            document.getElementById('from-image').src = `https://flagsapi.com/US/flat/64.png`;

        } else if (select.getAttribute('id') === 'to' && NewOption.innerText === 'INR') {

            NewOption.selected = true;

            // Setting default image for `to` currency.
            document.getElementById('to-image').src = `https://flagsapi.com/IN/flat/64.png`;
        }

        // Appending the new option in select dropdown.
        select.append(NewOption);

    }

    // Adding event listener to each select element so that when it changes then the flag also changes.
    select.addEventListener('change', (e) => {
        const TargetedElement = e.target;

        if (select.getAttribute('id') === 'from') {

            /*
                convertFrom = document.querySelector(select option[value="countryCode"]);

                Example: document.querySelector(select option[value="US"]);
            */
            convertFrom = document.querySelector(`select option[value="${TargetedElement.value}"]`).innerText;
        } else {
            convertTo = document.querySelector(`select option[value="${TargetedElement.value}"]`).innerText;
        }

        // Update the flag image;
        UpdateFlag(TargetedElement);
    })

})

// Adding event listener to convert button.
ConvertBtn.addEventListener('click', (e) => {
    e.preventDefault();

    Convert();
})
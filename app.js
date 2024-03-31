// Getting elements from DOM.
const Select = document.querySelectorAll('select');
const ConvertBtn = document.getElementById('convert-btn');
const Input = document.getElementById('inputAmount');
const Output = document.querySelector('currency-output');

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

        // Update the flag image;
        UpdateFlag(TargetedElement);
    })

})


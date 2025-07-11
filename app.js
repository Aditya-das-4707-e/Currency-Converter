// const BASE_URL = "https://api.frankfurter.app/latest";
// const BASE_URL = "https://api.exchangerate.host/latest"
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for (let select of dropdowns) {
    for (currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if (select.name === "from" && currCode === "USD") {
            newOption.selected = "selected"; // I set USD as default selected option for 'from' dropdown
        } else if (select.name === "to" && currCode === "INR") {
            newOption.selected = "selected"; // I set INR as default selected option for 'to' dropdown
        }
        select.append(newOption);
    }
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    })
}

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode]; //countryList is an object that maps currency codes to country codes
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}

btn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    let amount = document.querySelector(".amount input");
    let amountValue = amount.value;
    if (amountValue === "" || isNaN(amountValue)) {
        amount.value = "1";
        alert("Please enter a valid amount");
        return;
    } else if (amountValue <= 0) {
        amount.value = "1";
        alert("Please enter a positive amount");
        return;
    }

    const URL = `https://v6.exchangerate-api.com/v6/9514ace9a0ba2a0a97d92264/latest/${fromCurr.value}`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data.conversion_rates[toCurr.value];
    // console.log(`1 ${fromCurr.value} = ${rate} ${toCurr.value}`);
    let finalAmount = amountValue * rate;
    msg.innerText = `${amountValue} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
});


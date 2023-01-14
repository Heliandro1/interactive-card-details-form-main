const number = document.querySelector("#fieldCardNumber");
const cardNumber = document.querySelector("#cardNumber");
const cardHolder = document.querySelector("#cardHolder");
const date = document.querySelector("#date");
const cardCvc = document.querySelector("#cardCvc");
const fields = document.querySelectorAll("input[type='text']:not(input#fieldCardNumber)");

window.addEventListener("load", () =>{
    fields.forEach(element => {
        element.addEventListener("change", fillCardApresentation);
    });
});

function fillCardApresentation(e) {
    let oldText = date.innerText.split('/');
    switch (e.target.id) {
        case 'cardholderName':
            cardHolder.innerText = e.target.value;
            break;
        case 'fieldCardCvc':
            cardCvc.innerText = e.target.value;
            break;
        case 'month':
            oldText.splice(0, 1, e.target.value);
            date.innerText = oldText.join('/');
            break;
        default:
            oldText.splice(1, 1, e.target.value);
            date.innerText = oldText.join('/');
            break;
    }
}

number.addEventListener("input", () =>{
    let values = number.value.split(' ');
    let str = '';
    values.forEach(element => {
       element.length == 4 ? str += `${element} ` : str += element; 
    });
    cardNumber.innerText = handleInput(number.value.split(''), cardNumber.innerText.split(''));
    number.value = str;
});


function handleInput(inputSource, newInput) {
    newInput.splice(inputSource.length - 1, 1, inputSource[inputSource.length - 1]);
    return newInput.join('');
    
}

function ClientCard() {
    this.name = document.querySelector("#cardholderName");
    this.number = document.querySelector("#fieldCardNumber");
    this.isValidNumber = () =>{
        if(this.number.value.length > 16 || this.number.value.length < 16)
            return false;
        return true;
    }
    this.verifyFields = () =>{
        if (!this.isValidNumber(this.number.value)) {
            this.setError(this.number, 'Card Number must have 16 digits');
        }
    } 
    this.setError = (field, errorName) =>{
        if (field.parentElement.dataset.error == 'true') {
            return;
        }
        const p = document.createElement("p");
        p.classList.add('error');
        p.innerText = errorName;
        field.style.borderColor = 'var(--Red);';
        field.parentElement.dataset.error = 'true';
        field.parentElement.append(p);
    }
}
const btnConfirm = document.querySelector("#btnConfirm");
btnConfirm.addEventListener("click", (e) =>{
    e.preventDefault();
    const client = new ClientCard();
    client.verifyFields();
});

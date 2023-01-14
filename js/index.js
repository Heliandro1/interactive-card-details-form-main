const number = document.querySelector("#fieldCardNumber");
const cardNumber = document.querySelector("#cardNumber");
const cardHolder = document.querySelector("#cardHolder");
const date = document.querySelector("#date");
const cardCvc = document.querySelector("#cardCvc");
const fields = document.querySelectorAll("input[type='text']:not(input#fieldCardNumber)");
const btnConfirm = document.querySelector("#btnConfirm");
window.addEventListener("load", () =>{
    fields.forEach(element => {
        element.addEventListener("change", fillCardApresentation);
    });
});
btnConfirm.addEventListener("click", (e) =>{
    e.preventDefault();
    const client = new ClientCard();
    client.verifyFields();
});
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
function ClientCard() {
    this.name = document.querySelector("#cardholderName");
    this.number = document.querySelector("#fieldCardNumber");
    this.cvc = document.querySelector("#fieldCardCvc");
    this.year = document.querySelector("#year");
    this.month = document.querySelector("#month");
    this.isValidNumber = () =>{
        let regex = /\d{4}[\s]\d{4}[\s]\d{4}[\s]\d{4}[\s]/g;
        if(this.number.value.trim() == ''){
            return {
                state: false,
                message: "Can't be blank"
            };
        }
        else if(this.number.value.length > 20 || this.number.value.length < 20)
            return {
                state: false,
                message: 'Card Number must have 16 digits'
            };
        else if(!regex.test(this.number.value))
            return {
                state: false,
                message: 'Wrong format, numbers only'
            };
        return {state: true};
    }
    this.isValidName = () =>{
        if(this.name.value.trim() == ''){
            return {
                state: false,
                message: "Can't be blank"
            };
        }else if(this.name.value.split(' ').length < 2 || this.name.value.split(' ').length > 2){
            return {
                state: false,
                message: "Put the first and the last name only"
            };
        }
        return { state: true }
    }
    this.isValidCvc = () =>{
        if (this.cvc.value.trim() == '') {
            return {
                state: false,
                message: "Can't be blank"
            };
        }else if(this.cvc.value.length < 3){
            return {
                state: false,
                message: "CVC Number must have 3 digits"
            };
        }
        return { state: true }
    }
    this.isValidMonth = () =>{
        if (this.month.value.trim() == '') {
            return {
                state: false,
                message: "Can't be blank"
            };
        }else if(Number(this.month.value.trim()) > 12 || Number(this.month.value.trim()) < 1){
            return {
                state: false,
                message: "Invalid Month Number"
            };
        }
        return { state: true }
    }
    this.isValidYear = () =>{
        if (this.year.value.trim() == '') {
            return {
                state: false,
                message: "Can't be blank"
            };
        }else if(Number(this.year.value.trim()) > 12 || Number(this.year.value.trim()) < 1){
            return {
                state: false,
                message: "Invalid Year Number"
            };
        }
        return { state: true }
    }
    this.verifyFields = () =>{
        const validNumber = this.isValidNumber();
        const validName = this.isValidName();
        const validCvc = this.isValidCvc();
        const validMonth = this.isValidMonth();
        const validYear = this.isValidYear();
        if (!validNumber.state) {
            this.setError(this.number, validNumber.message);
        }else{
            this.removeError(this.number);
        }
        if (!validName.state) {
            this.setError(this.name, validName.message);
        }else{
            this.removeError(this.name);
        }
        if (!validCvc.state) {
            this.setError(this.cvc, validCvc.message);
        }else{
            this.removeError(this.cvc);
        }
        if (!validMonth.state) {
            this.setError(this.month, validMonth.message);
            return;
        }else{
            this.removeError(this.month);
        }
        if (!validYear.state) {
            this.setError(this.year, validYear.message);
        }else{
            this.removeError(this.year);
        }
    } 
    this.setError = (field, errorName) =>{
        const p = document.createElement("p");
        p.classList.add('error');
        p.innerText = errorName;
        if (!field.parentElement.classList.contains('field')) {
            if (field.parentElement.parentElement.dataset.error == 'true') {
                field.parentElement.parentElement.lastChild.innerText = errorName;
                return;
            }
            field.style.border = '0.1em solid var(--Red);';
            field.parentElement.parentElement.dataset.error = 'true';
            field.parentElement.parentElement.append(p);
        }else{
            if (field.parentElement.dataset.error == 'true') {
                field.parentElement.lastChild.innerText = errorName;
                return;
            }
            field.style.border = '0.1em solid var(--Red);';
            field.parentElement.dataset.error = 'true';
            field.parentElement.append(p);
        }
    }
    this.removeError = (field) =>{
        if (!field.parentElement.classList.contains('field')) {
            if (field.parentElement.parentElement.dataset.error == 'true') {
                field.parentElement.parentElement.dataset.error = 'false';
                field.parentElement.parentElement.removeChild(field.parentElement.parentElement.lastChild);
            }
        }else{
            if (field.parentElement.dataset.error == 'true') {
                field.parentElement.dataset.error = 'false';
                field.parentElement.removeChild(field.parentElement.lastChild);
            }
        }
    }
}

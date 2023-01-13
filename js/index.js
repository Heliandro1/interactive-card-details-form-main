{/* <p class="error">Can't be blank</p> */}
function ClientCard(name, number, date, cvc) {
    this.name = name.value;
    this.number = number.value;
    this.isValidNumber = () =>{
        if(Number(this.number) === NaN && this.number.length > 16 || this.number.length < 16)
            return false;
        return true;
    }
    this.verifyFields = () =>{
        if (!this.isValidNumber(number)) {
            this.setError(number, );
        }
    } 
    this.setError = (field, errorName) =>{
        field.style.borderColor = 'var(--Red);';
        field.parentElement.innerHTML += errorName;
    }
}
const btnConfirm = document.querySelector("#btnConfirm");
btnConfirm.addEventListener("click");

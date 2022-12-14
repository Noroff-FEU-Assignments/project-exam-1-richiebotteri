/* ### Contact page

Create a contact us page, there should be 4 textboxes on this page.

-  Name (Should be more than 5 characters long)
-  Email address (Must be a valid email address)
-  Subject (Should be more than 15 characters long)
-  Message content (Should be more than 25 characters long)

Please use JavaScript for validation, show error messages if the values in the textboxes do not meet the requirements. */

const requiredSymbols = document.querySelectorAll(".required-symbol");
const inputs = document.querySelectorAll("input");
const message = document.querySelector("textarea");
const form = document.querySelector(".form");
const formMsgContainer = document.querySelector(".form-requirements");
const notValidFormMsg = document.querySelector(".notValidFormMessage");
const submitMsg = document.querySelector(".submit-complete");
let passArray = []; /* <-- for checking that form is valid */

// target the right form input

function sendFeedbackIfNotValid(event) {
   event.preventDefault();
   passArray = [];
   const formInputs = event.target;
   for (let i = 0; i < formInputs.length; i++) {
      if (formInputs[i].tagName == "INPUT" || formInputs[i].tagName == "TEXTAREA") {
         console.log(formInputs[i]);
         if (formInputs[i].id == "firstname") {
            validateStringLength(formInputs[i], 5);
         } else if (formInputs[i].id == "lastname") {
            validateStringLength(formInputs[i], 5);
         } else if (formInputs[i].id == "subject") {
            validateStringLength(formInputs[i], 15);
         } else if (formInputs[i].id == "email") {
            validateEmail(formInputs[i]);
         } else if (formInputs[i].id == "message") {
            validateStringLength(formInputs[i], 25);
         }
      }
   }
}

// validate the data typed inside the input

const validateStringLength = function (activeInput, number) {
   if (activeInput.value.trim().length >= number) {
      console.log("namestring = passed");
      removeValidationMessage(activeInput, true);
   } else {
      console.log("namestring = NOT passed");
      showValidationMessage(activeInput, false);
   }
};

const validateEmail = function (activeInput) {
   const regEx = /\S+@\S+\.\S+/;
   const isValidEmail = regEx.test(activeInput.value);
   if (isValidEmail == true) {
      console.log("email == passed");
      removeValidationMessage(activeInput, true);
   } else {
      console.log("email == NOT passed");
      showValidationMessage(activeInput, false);
   }
};

// Send feedback to user when input is not correct

function removeValidationMessage(activeInput, isValid) {
   activeInput.nextSibling.nextElementSibling.classList.add("hide-valid-msg");
   passArray.push(isValid);
}

function showValidationMessage(activeInput, isValid) {
   activeInput.nextSibling.nextElementSibling.classList.remove("hide-valid-msg");
   passArray.push(isValid);
}

function checkAllFormInputs() {
   // Condition: check if array has one or more false values
   console.log(passArray);
   const isFalsy = function (form) {
      return form === false;
   };

   if (passArray.some(isFalsy)) {
      console.log("Form is not valid");
      submitMsg.classList.add("hide-success-msg");
   } else {
      console.log("Form passed validation!");
      submitMsg.classList.remove("hide-success-msg");
      setTimeout(() => {
         form.submit();
      }, 2000);
   }
}

// Listening to submit event on form to activate functions

form.addEventListener("submit", sendFeedbackIfNotValid);
form.addEventListener("submit", checkAllFormInputs);

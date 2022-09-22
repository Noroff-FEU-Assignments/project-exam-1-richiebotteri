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
const submitBtn = document.querySelector(".submit-btn");
const formMsgContainer = document.querySelector(".form-requirements");

// target the right form input

const targetFormInput = function (event) {
   let activeInput = event.target;
   if (activeInput.id == "firstname") {
      validateStringLength(activeInput, 5);
   } else if (activeInput.id == "lastname") {
      validateStringLength(activeInput, 5);
   } else if (activeInput.id == "subject") {
      validateStringLength(activeInput, 15);
   } else if (activeInput.id == "email") {
      validateEmail(activeInput);
   } else if (activeInput.id == "message") {
      validateStringLength(activeInput, 25);
   }
};

// validate the data typed inside the input

const validateStringLength = function (activeInput, number) {
   let stringMsg = "";
   if (activeInput.value.trim().length >= number) {
      console.log("string = passed");
      toggleNotValidFormMsg(true, "form-requirements__name");
   } else {
      console.log("string = NOT passed");
      toggleNotValidFormMsg(false, "form-requirements__name");
   }
};

const validateEmail = function (activeInput) {
   const regEx = /\S+@\S+\.\S+/;
   const isValidEmail = regEx.test(activeInput.value);
   if (isValidEmail == true) {
      console.log("email == passed");
      toggleNotValidFormMsg();
   } else {
      console.log("email == NOt passed");
      toggleNotValidFormMsg();
   }
};

// Send feedback to user when input is not correct

function toggleNotValidFormMsg(isValid, string) {
   formMsgContainer.childNodes.forEach(function (inputMsg) {
      console.log(inputMsg.classList.contains(""));
   });
}

// Listeners

inputs.forEach(function (input) {
   input.addEventListener("keyup", targetFormInput);
});

message.addEventListener("keyup", targetFormInput);

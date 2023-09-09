import throttle from 'lodash.throttle';

const feedbackForm = document.querySelector(".feedback-form");
const LOCALSTORAGE_KEY = "feedback-form-state";
const emailInput = feedbackForm.querySelector('input[name="email"]');
const messageTextarea = feedbackForm.querySelector('textarea[name="message"]');

feedbackForm.addEventListener("input", throttle(handleInput, 500));

window.addEventListener("load", () => {
    const savedState = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY)) || {};
    emailInput.value = savedState.email || "";
    messageTextarea.value = savedState.message || "";
  });
  
feedbackForm.addEventListener("submit", handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const email = emailInput.value;
  const message = messageTextarea.value;
  
  if (email === "" || message === "") {
    return console.log("Please fill in all the fields!");
  }

  const formData = {
    email,
    message,
  };

  localStorage.removeItem(LOCALSTORAGE_KEY); 
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(formData));
  console.log(formData);

  emailInput.value = "";
  messageTextarea.value = "";
}

function handleInput() {
    const email = emailInput.value;
    const message = messageTextarea.value;
    const formData = {
      email,
      message,
    };
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(formData));
  }
  
  handleInput();


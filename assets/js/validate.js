// Form Submission to google sheets and email
const scriptURL = 'https://script.google.com/macros/s/AKfycbxqytQSxiFdaovMbSAvZK8jgNSBieu_4x7XqKPXfqY_C5LOh8Zh-7jtM6kquDAvZHY/exec';
const form = document.getElementById('formContact');
const sentMessage = document.getElementById('sent-message');

const setVisible = (x) => {
  var element = document.getElementById(x);
  element.style.display = 'block'; 
}

const setHide = (x) => {
  var element = document.getElementById(x);
  element.style.display = 'none'; 
}


/**
  * Form Validation Script
  */
const username = document.getElementById('username');
const mobile = document.getElementById('mobile');
const email = document.getElementById('email');
const subject = document.getElementById('subject');
const msg = document.getElementById('msg');

const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success');
}

const setSuccess = element => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = '';
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
};

const isValidEmail = email => {
    //const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const re =/[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}/;
    return re.test(String(email).toLowerCase());
}

function validateInputs() {

    const usernameValue = username.value.trim();
    const mobileValue = mobile.value.trim();
    const emailValue = email.value.trim();
    const subjectValue = subject.value.trim();
    const msgValue = msg.value.trim();

    if(usernameValue === '') {
      setError(username, 'Please enter your name');
      username.focus();
      return false;
    } else {
      setSuccess(username);
    }

    if(mobileValue === '') {
      setError(mobile, 'Please enter mobile number');
      mobile.focus();
      return false;
    } else if (mobileValue.length < 10 ) {
      setError(mobile, 'Mobile number must be at least 10 digits.')
      mobile.focus();
      return false;
    } else {
      setSuccess(mobile);
    }

    if(emailValue === '') {
      setError(email, 'Please enter your email');
      email.focus();
      return false;
    } else if (!isValidEmail(emailValue)) {
      setError(email, 'Provide a valid email address');
      email.focus();
      return false;
    } else {
      setSuccess(email);
    }

    if(subjectValue === '') {
      setError(subject, 'Please enter a subject.')
      subject.focus();
      return false;
    } else {
      setSuccess(subject);
    }

    if(msgValue === '') {
      setError(msg, 'Please enter some message.')
      msg.focus();
      return false;
    } else {
      setSuccess(msg);
    }

    return true;
}

form.addEventListener('submit', e => {
  e.preventDefault()
  if (validateInputs()) {
    setVisible('loading');
    fetch(scriptURL, { method: 'POST', body: new FormData(form) })
      .then(response => {
        setVisible('sent-message');
        setTimeout(function () {
          setHide('sent-message');
        }, 3000)
        setHide('loading');
        form.reset()
      })
      .catch(error => console.error('Error occured while sending..! ', error.message));
      
  }
})

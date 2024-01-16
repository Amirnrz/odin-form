// selectors
const form = document.querySelector('form')
const inputs = document.querySelectorAll('input')

// regex patterns
const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ 
const phonePattern = /^\d{10,12}$/
const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/

// functions
function checkValidation(name,value,event) {
  const errorElement = event.target.parentElement.querySelector('.error')

  if (name === "firstName" || name === "lastName") {
    if (value.length < 2 || value.length > 20) {
      showErr(
        'firstName and lastName should be between 2 and 20 words',
        errorElement,
        event.target
      )
    } else {
      hideError(errorElement,event.target)
    }
  } else if (name === 'email') {
   emailPattern.test(value)
    ? hideError(errorElement,event.target)
    : showErr('please enter a valid email address',errorElement,event.target)
  } else if (name === 'tel') {
    phonePattern.test(value)
    ? hideError(errorElement,event.target)
    : showErr('please enter a valid phone number',errorElement,event.target)
  } else if (name === 'password') {
    passwordPattern.test(value)
    ? hideError(errorElement,event.target)
    : showErr(
      'password should be at least 8 characters combination of letters numbers and symbols',
      errorElement,
      event.target
    )
  } else if (name === 'confirmPassword') {
    const password = event.target.parentElement.previousElementSibling.querySelector('#password').value
    const confirmPassword = value

    password === confirmPassword 
      ? hideError(errorElement,event.target)
      : showErr(
        'passwords should match',
        errorElement,
        event.target
      )
  }
}

function showErr(msg,element,input) {
  input.classList.add('warning')
  element.textContent = msg
  element.classList.add('active')
}

function hideError(element,input) {
  input.classList.remove('warning')
  element.textContent = ''
  element.classList.remove('active')
}

function showAlert(msg,type) {
  const existingAlerts = [...document.querySelectorAll('.alert-container')]
  const isDuplicate = existingAlerts.some(alert =>alert.innerText.trim() === msg.trim())

  if (!isDuplicate) {
    const div = document.createElement('div')
    const alertHtml = `
      <h4 class="alert alert-${type}">
        ${msg}
      </h4>
    `
  
    document.body.appendChild(div)
    div.classList.add('alert-container')
    div.innerHTML = alertHtml
  
    setTimeout(() => {
      document.body.removeChild(div)
    },3000)
  }

}

inputs.forEach(input => {
  input.addEventListener('input',(e) => {
    const inputName = e.target.name
    const inputValue = e.target.value

    checkValidation(inputName, inputValue, e)
  })
})

form.addEventListener('submit',e => {
  e.preventDefault()
  e.stopPropagation()

  let hasErrors;

  const formWrappers = [...document.querySelectorAll('.form-wrapper')]
  formWrappers.map(item => {
    console.log(item);
    if(item.innerHTML.includes('active') || item.querySelector('input').value === '') {
      hasErrors = true
    } else {
      hasErrors = false
    }
  })

  if(hasErrors === false) {
    showAlert(
      'form submitted successfully!',
      'success'
    )
    return true
  } else {
    showAlert(
      'please make sure you did everything right!',
      'fail'
    )
  }

  return false
})
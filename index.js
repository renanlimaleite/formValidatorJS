const form = document.querySelector('[data-js="myForm"]')
const username = document.querySelector('[data-js="username"]')
const email = document.querySelector('[data-js="email"]')
const password = document.querySelector('[data-js="password"]')
const password2 = document.querySelector('[data-js="password2"]')


form.addEventListener('submit', (event) => {
  event.preventDefault()

  // Antes de checar, limpar todas as mensagens de error.
  hideErrorMessages(event.currentTarget)
  checkEmptyFields(username, email, password, password2)
  checkEmail(email)
  checkEqualsPassword(password, password2)
  if (shouldSendForm(event.currentTarget)) {
    console.log('pode enviar para o backend.')
  }
})

function checkEmptyFields(...inputs) {
  inputs.forEach((input) => {
    if (!input.value) {
      showErrorMessage(input, 'Este campo não pode ficar vazio')
    }
  })
}

function checkEmail(input) {
  if ((input.value.length < 3) || (input.value.length > 255)) {
    showErrorMessage(input, 'E-mail deve ser entre 3 a 255 caractéres')
  }
}

function checkEqualsPassword(password, password2) {
  if (password.value !== password2.value) {
    showErrorMessage(password, 'As senhas devem ser iguais.')
    showErrorMessage(password2, 'As senhas devem ser iguais.')
  }
}

function hideErrorMessages(form) {
  form
    .querySelectorAll('.show-error-message')
    .forEach(item => item.classList.remove('show-error-message'))
}

function showErrorMessage(input, msg) {
  const inputParent = input.parentElement
  const errorMessage = inputParent.querySelector('.error-message')
  errorMessage.innerText = msg
  inputParent.classList.add('show-error-message')
}

function shouldSendForm(form) {
  let send = true
  form.querySelectorAll('.show-error-message').forEach(() => (send = false))
  return send
}
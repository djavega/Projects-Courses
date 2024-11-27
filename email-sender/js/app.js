const $emailField = document.querySelector('#email')
const $topicField = document.querySelector('#topic')
const $messageField = document.querySelector('#message')
const $form = document.querySelector('#form')
const resetBtn = document.querySelector('button[type="reset"]')
const submitBtn = document.querySelector('button[type="submit"]')

const ERROR_FIELD_VALUE_EMPTY = 'Field can not be empty!'
const ERROR_FIELD_EMAIL_INCORRECT = 'Email must exist!'
const ERROR_FIELD_TOPIC_EMPTY = 'Topic must have at least 5 characters!'
const ERROR_FIELD_MESSAGE_NOT_LONG_ENOUGH = 'Message must have at least 20 characters!'
console.log(resetBtn)

const errors = [
    {
        type: 'empty',
        message: ERROR_FIELD_VALUE_EMPTY
    },
    {
        type: 'email',
        message: ERROR_FIELD_EMAIL_INCORRECT
    },
    {
        type: 'topic',
        message: ERROR_FIELD_TOPIC_EMPTY
    },
    {
        type: 'message',
        message: ERROR_FIELD_MESSAGE_NOT_LONG_ENOUGH
    }
]
const email = {
    email: '',
    topic: '',
    message: ''
}

loadEventListeners()

function loadEventListeners() {
    $emailField.addEventListener('input', validateField)
    $topicField.addEventListener('input', validateField)
    $messageField.addEventListener('input', validateField)
    resetBtn.addEventListener('click', resetForm)
    // submitBtn.addEventListener('submit', resetForm)
}

function validateField(e) {
    let $parent = e.target.parentElement
    let value = e.target.value
    let $this = e.target.getAttribute('id')
    clearErrors($parent)
    let errorType = ''
    if (value.trim() === '') {
        errorType = 'empty'
    } else {
        if ($this === 'email' && !validateEmail(value)) {
            console.log('after checking email')
            errorType = 'email'
        } else if ($this === 'topic' && !validateTopic(value)) {
            errorType = 'topic'
        } else if ($this === 'message' && !validateMessage(value)) {
            errorType = 'message'
        }
    }

    if (errorType !== '') displayError(errorType, $parent)

    //Assign values to email object
    email[$this] = value
    console.log(email)
    checkEmail()

}
function resetForm() {
    clearErrors($form)
    $form.reset()
    email.email = ''
    email.topic = ''
    email.message = ''
    
    checkEmail()
}
function checkEmail () {
    console.log('Checking form...')
    if (!Object.values(email).includes('') && document.querySelectorAll('.error').length === 0){
        submitBtn.classList.remove('opacity-50')
        submitBtn.disabled = false
    } else {
        submitBtn.classList.add('opacity-50')
        submitBtn.disabled = true
    }
}
function validateEmail(value) {
    const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/
    return regex.test(value)
}

function validateTopic(value) {
    return value.length >= 5
}

function validateMessage(value) {
    return value.length >= 20
}

function clearErrors($parent) {
    if ($parent === $form) {
        document.querySelectorAll('.error').forEach(e => e.remove());
        return
    }

    let errorElement = $parent.querySelector('.error')
    if(errorElement) errorElement.remove()
}

function displayError(errorType, $parent) {
    //If the error already exists, then we remove it from the DOM
    clearErrors($parent)

    //Create the error element and append it to the parent
    const $error = document.createElement('p')
    const errorObj = errors.find(e => e.type === errorType)
    $error.innerHTML = errorObj.message
    $error.classList.add('error', 'bg-red-600', 'text-white', 'p-2', 'text-center')
    $parent.appendChild($error)
}

import useInput from '../hooks/use-input'

const SimpleInput = (props) => {
  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: nameInputHasError,
    valueChangeHandler: nameChangedHandler,
    reset: resetNameInput,
    inputBlurHandler: nameBlurHandler,
  } = useInput((value) => value.trim() !== '')

  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/

  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangeHandler,
    reset: resetEmailInput,
    inputBlurHandler: emailBlurHandler,
  } = useInput((value) => value.match(emailRegex))

  let formIsValid = false

  if (enteredNameIsValid && enteredEmailIsValid) {
    formIsValid = true
  }

  const formSubmissionHandler = (event) => {
    event.preventDefault()

    if (!enteredNameIsValid || !enteredEmailIsValid) {
      return
    }

    console.log(enteredName)

    // nameInputRef.current.value = ''; => Not ideal - manipulating DOM
    resetNameInput()
    resetEmailInput()
  }

  const nameInputClasses = nameInputHasError
    ? 'form-control invalid'
    : 'form-control'

  const emailInputClasses = emailInputHasError
    ? 'form-control invalid'
    : 'form-control'

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className={nameInputClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          onChange={nameChangedHandler}
          onBlur={nameBlurHandler}
          value={enteredName}
        />
        {nameInputHasError && (
          <p className="error-text">Name must not be empty!</p>
        )}
      </div>

      <div className={emailInputClasses}>
        <label htmlFor="email">Your email</label>
        <input
          type="text"
          id="email"
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
          value={enteredEmail}
        />
        {emailInputHasError && (
          <p className="error-text">Email must be valid!</p>
        )}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  )
}

export default SimpleInput

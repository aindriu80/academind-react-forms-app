import useInput from '../hooks/use-input'

const BasicForm = (props) => {
  const {
    value: enteredFirstName,
    isValid: enteredFirstNameIsValid,
    hasError: firstNameHasError,
    valueChangeHandler: firstNameChangeHandler,
    reset: resetFirstNameInput,
    inputBlurHandler: firstNameHandler,
  } = useInput((value) => value.trim() !== '')

  const {
    value: enteredLastName,
    isValid: enteredLastNameIsValid,
    hasError: lastNameHasError,
    valueChangeHandler: lastNameChangeHandler,
    reset: resetLastNameInput,
    inputBlurHandler: lastNameHandler,
  } = useInput((value) => value.trim() !== '')

  //eslint-disable-next-line
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

  if (
    enteredFirstNameIsValid &&
    enteredLastNameIsValid &&
    enteredEmailIsValid
  ) {
    formIsValid = true
  }

  const formSubmissionHandler = (event) => {
    event.preventDefault()

    if (
      !enteredFirstNameIsValid ||
      !enteredLastNameIsValid ||
      !enteredEmailIsValid
    ) {
      return
    }
    resetFirstNameInput()
    resetLastNameInput()
    resetEmailInput()

    console.log(enteredFirstName)
    console.log(enteredLastName)
    console.log(enteredEmail)
  }
  const firstNameInputClasses = firstNameHasError
    ? 'form-control invalid'
    : 'form-control'
  const lastNameInputClasses = lastNameHasError
    ? 'form-control invalid'
    : 'form-control'
  const emailInputClasses = emailInputHasError
    ? 'form-control invalid'
    : 'form-control'
  return (
    <form onSubmit={formSubmissionHandler}>
      <div className={firstNameInputClasses}>
        <div className="form-control">
          <label htmlFor="name">First Name</label>
          <input
            type="text"
            id="name"
            onChange={firstNameChangeHandler}
            onBlur={firstNameHandler}
            value={enteredFirstName}
          />
          {firstNameHasError && (
            <p className="error-text">Name must not be empty!</p>
          )}
        </div>
        <div className={lastNameInputClasses}>
          <label htmlFor="name">Last Name</label>
          <input
            type="text"
            id="name"
            onChange={lastNameChangeHandler}
            onBlur={lastNameHandler}
            value={enteredLastName}
          />
          {lastNameHasError && (
            <p className="error-text">Last Name must not be empty!</p>
          )}
        </div>
      </div>
      <div className={emailInputClasses}>
        <label htmlFor="name">E-Mail Address</label>
        <input
          type="text"
          id="name"
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
          value={enteredEmail}
        />
        {emailInputHasError && (
          <p className="error-text">Email must be valid</p>
        )}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  )
}

export default BasicForm

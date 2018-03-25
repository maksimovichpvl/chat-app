
export default (data) => {
  let errors = {};

  if (data.typedMessage.length === 0) {
    errors.typedMessage = 'Это поле обязательное'
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  }
}

export default (data) => {
  let errors = {};

  if (data.username.length === 0) {
    errors.username = 'Это поле обязательное'
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  }
}
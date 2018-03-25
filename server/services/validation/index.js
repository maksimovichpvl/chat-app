const errorFormatter = (param, msg, value, location) => {
  let obj = {
    field: param,
    message: msg
  };
  return obj;
};

module.exports = {
  errorFormatter
};
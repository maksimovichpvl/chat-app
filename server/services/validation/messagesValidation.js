
module.exports = function (req, res, next) {

  req.check('username', 'This field is required')
    .notEmpty();

  req.check('username', 'This field should contain only letters and numbers')
    .not()
    .matches(/[^A-Za-z0-9]+/g);

  req.check('username', 'This field should be at between 1 and 20 chars long')
    .isLength({min: 1, max: 20});

  req.check('content', 'This field is required')
    .notEmpty();

  req.check('content', 'This field should be at between 1 and 200 chars long')
    .isLength({min: 1, max: 200});

  const errors = req.validationErrors(); 

  if (errors) {
    res.send({
      success: false,
      errors: errors
    });
    return;
  }

  next();
}
import React from 'react';
import PropTypes from 'prop-types';

import './styles.css';

const Button = ({ title, onClick }) => (
  <button 
    type="button"
    onClick={(e) => onClick()}
    className="btn btn-primary"
  >
    {title}
  </button>
);

Button.propTypes = {
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Button;
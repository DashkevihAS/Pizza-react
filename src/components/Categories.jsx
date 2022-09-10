
import React from 'react';
import PropTypes from 'prop-types';

const Caterories = ({ value, setValue }) => {
  const categories = [
    'Все',
    'Мясные',
    'Вегетарианская',
    'Гриль',
    'Острые',
    'Закрытые'
  ];

  return (
    <div className="categories">
      <ul>
        {
          categories.map((item, i) => (
            <li
              key={i}
              onClick={() => setValue(i)}
              className={value === i ? 'active' : ''}
            >
              {item}
            </li>
          ))
        }
      </ul>
    </div>
  );
};

export default Caterories;

Caterories.propTypes = {
  value: PropTypes.number,
  setValue: PropTypes.func,
};

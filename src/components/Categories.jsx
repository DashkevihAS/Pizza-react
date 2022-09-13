
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCategoryId } from '../redux/slices/filterSlice';

const categories = [
  'Все',
  'Мясные',
  'Вегетарианская',
  'Гриль',
  'Острые',
  'Закрытые'
];

const Caterories = () => {
  const categoryId = useSelector(state => state.filter.categoryId);
  const dispatch = useDispatch();

  return (
    <div className="categories">
      <ul>
        {
          categories.map((item, i) => (
            <li
              key={i}
              onClick={() => dispatch(setCategoryId(i))}
              className={categoryId === i ? 'active' : ''}
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

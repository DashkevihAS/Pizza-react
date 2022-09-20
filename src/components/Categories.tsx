import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectFilterCategoryId,
  setCategoryId,
} from '../redux/slices/filterSlice';

const categories = [
  'Все',
  'Мясные',
  'Вегетарианская',
  'Гриль',
  'Острые',
  'Закрытые',
];

const Caterories: React.FC = () => {
  const categoryId: number = useSelector(selectFilterCategoryId);
  const dispatch = useDispatch();

  return (
    <div className='categories'>
      <ul>
        {categories.map((item, i) => (
          <li
            key={i}
            onClick={() => dispatch(setCategoryId(i))}
            className={categoryId === i ? 'active' : ''}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Caterories;

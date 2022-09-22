import React from 'react';
import { useDispatch } from 'react-redux';
import { setCategoryId } from '../redux/filter/slice';

const categories = [
  'Все',
  'Мясные',
  'Вегетарианская',
  'Гриль',
  'Острые',
  'Закрытые',
];

type CategoriesProps = {
  categoryId: number;
};

export const Categories: React.FC<CategoriesProps> = React.memo(
  ({ categoryId }) => {
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
  },
);

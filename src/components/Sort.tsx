import React from 'react';
import { useDispatch } from 'react-redux';
import { setSort } from '../redux/filter/slice';
import { Sort as SortType, SortPropertyEnum } from '../redux/filter/types';

type SortItem = {
  name: string;
  sortProperty: SortPropertyEnum;
};

type PopupClick = MouseEvent & {
  path: Node[];
};

type SortPopupProps = {
  value: SortType;
};

export const sortValues: SortItem[] = [
  {
    name: 'популярности по убыванию',
    sortProperty: SortPropertyEnum.RATING_ASC,
  },
  {
    name: 'популярности по возрастанию',
    sortProperty: SortPropertyEnum.RATING_DESC,
  },
  { name: 'цене по убыванию', sortProperty: SortPropertyEnum.PRICE_ASC },
  { name: 'цене по возрастанию', sortProperty: SortPropertyEnum.PRICE_DESC },
  { name: 'алфавиту (А - Я)', sortProperty: SortPropertyEnum.TITLE_DESC },
  { name: 'алфавиту (Я - А)', sortProperty: SortPropertyEnum.TITLE_ASC },
];

export const Sort: React.FC<SortPopupProps> = React.memo(({ value }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const sortRef = React.useRef<HTMLDivElement>(null);

  const dispatch = useDispatch();

  const onClickSortValue = (value: SortItem) => {
    dispatch(setSort(value));
    setIsOpen(false);
  };

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const _event = event as PopupClick;
      if (sortRef.current && !_event.path.includes(sortRef.current)) {
        setIsOpen(false);
      }
    };

    const handleClickEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.body.addEventListener('click', handleClickOutside);
    document.addEventListener('keydown', handleClickEscape);

    return () => {
      document.body.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keydown', handleClickEscape);
    };
  }, []);

  return (
    <div ref={sortRef} className='sort'>
      <div className='sort__label'>
        <svg
          width='10'
          height='6'
          viewBox='0 0 10 6'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M10 5C10 5.16927 9.93815 5.31576 9.81445
            5.43945C9.69075 5.56315 9.54427 5.625 9.375
            5.625H0.625C0.455729 5.625 0.309245 5.56315
            0.185547 5.43945C0.061849 5.31576 0 5.16927
            0 5C0 4.83073 0.061849 4.68424 0.185547
            4.56055L4.56055 0.185547C4.68424 0.061849 4.83073
            0 5 0C5.16927 0 5.31576 0.061849 5.43945
            0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z'
            fill='#2C2C2C'
          />
        </svg>
        <b>Сортировка по:</b>
        <span onClick={() => setIsOpen(!isOpen)}>{value.name}</span>
      </div>
      {isOpen && (
        <div className='sort__popup'>
          <ul>
            {sortValues.map((obj, i) => (
              <li
                key={i}
                className={value.name === obj.name ? 'active' : ''}
                onClick={() => onClickSortValue(obj)}
              >
                {obj.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
});

import axios from 'axios';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { URI_API } from '../const/const';

const FullPizza: React.FC = () => {
  const navigate = useNavigate();

  const [pizza, setPizza] = React.useState<{
    imageUrl: string;
    title: string;
    price: number;
  }>();
  const { id } = useParams();

  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(`${URI_API}/${id} `);
        setPizza(data);
      } catch (error) {
        alert('Ошибка при получении пиццы!');
        navigate('/');
      }
    }

    fetchPizza();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!pizza) return <>Загрузка...</>;

  return (
    <div className='pizza-block pizza-block_full'>
      <img
        className='pizza-block__image'
        src={pizza.imageUrl}
        alt='Pizza'
        width={260}
        height={260}
      />
      <h4 className='pizza-block__title'>{pizza.title}</h4>
      <div className='pizza-block__price'>от {pizza.price} ₽</div>
    </div>
  );
};

export default FullPizza;

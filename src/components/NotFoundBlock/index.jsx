import React from 'react';

import styles from './NotFoundBlock.module.scss';

const NotFoundBlock = () => (
  <div className={styles.root}>
    <h1 >
      <span>😕</span>
      <br />
      Ничего не найдена
    </h1>
    <p className={styles.description}>
      К сожаления данная страница отсутствует в нашем интернет-магазине
    </p>
  </div>
);

export default NotFoundBlock;

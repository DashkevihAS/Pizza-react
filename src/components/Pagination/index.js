import React from 'react';
import ReactPaginate from 'react-paginate';
import styles from './Pagination.module.scss';
import PropTypes from 'prop-types';

const Pagination = ({ setCurentPage }) => (
  <ReactPaginate
    className={styles.root}
    breakLabel="..."
    nextLabel=">"
    onPageChange={e => setCurentPage(e.selected + 1)}
    pageRangeDisplayed={4}
    pageCount={3}
    previousLabel="<"
    renderOnZeroPageCount={null}
  />
);


export default Pagination;

Pagination.propTypes = {
  setCurentPage: PropTypes.func,
};


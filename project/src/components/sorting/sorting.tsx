import { nanoid } from '@reduxjs/toolkit';
import { MouseEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SortingList } from '../../const';
import { changeSorting } from '../../store/action';
import { getSorting } from '../../store/data-process/selectors';

function Sorting():JSX.Element {
  const activeSort = useSelector(getSorting);
  const dispatch = useDispatch();
  const setSorting = (sorting:string) =>
    dispatch(changeSorting(sorting));

  const [listClassName, setListClassName] = useState('');
  const openSortingTemplate = () => setListClassName('places__options--opened');
  const closeSortingTemplate = () => setListClassName('');
  const sortingList = Object.values(SortingList).map(({name}) => {
    const setSortingTemplate = (evt:MouseEvent) => {
      evt.preventDefault();
      setSorting(name);
      closeSortingTemplate();
    };

    return (
      <li className={`places__option ${activeSort === name && 'places__option--active'}`}
        key = {nanoid()} onClick = {setSortingTemplate}  tabIndex={0}
      > {name}
      </li>);
  });

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by {' '}</span>
      <span className="places__sorting-type" tabIndex={0} onMouseOver = {openSortingTemplate}
        style = {{textTransform: 'capitalize'}}
        data-testid = 'active-sort'
      >
        {activeSort}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={`places__options places__options--custom ${listClassName}`} onMouseLeave = {closeSortingTemplate}>
        {sortingList}
      </ul>
    </form>
  );
}

export default Sorting;

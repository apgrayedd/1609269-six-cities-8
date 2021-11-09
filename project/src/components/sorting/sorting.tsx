import { nanoid } from '@reduxjs/toolkit';
import { Dispatch,MouseEvent, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { SortingList } from '../../const';
import { changeSorting } from '../../store/action';
import { Actions } from '../../types/action';
import { State } from '../../types/state';

type SortingOptions = {
  activeSort:string,
};

const stateToProps = ({sorting}:State) => ({
  activeSort: sorting,
});
const dispacthToProps = (dispacth: Dispatch<Actions>) => ({
  setSorting(sorting:string){
    dispacth(changeSorting(sorting));
  },
});
const connector = connect(stateToProps, dispacthToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = SortingOptions & PropsFromRedux;

function Sorting({activeSort, setSorting}:ConnectedComponentProps):JSX.Element {
  const [listClassName, setListClassName] = useState('');
  const openSortingTemplate = (evt:MouseEvent) => setListClassName('places__options--opened');
  const closeSortingTemplate = (evt:MouseEvent) => setListClassName('');
  const sortingList = Object.values(SortingList).map(({name}) => {
    const setSortingTemplate = (evt:MouseEvent) => {
      evt.preventDefault();
      setSorting(name);
      closeSortingTemplate(evt);
    };

    return (
      <li className={`places__option ${activeSort === name && 'places__option--active'}`}
        key = {nanoid()} onClick = {setSortingTemplate}  tabIndex={0}
      > {name}
      </li>);
  });

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex={0} onMouseOver = {openSortingTemplate} style = {{textTransform: 'capitalize'}}>
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

export {Sorting};
export default connector(Sorting);

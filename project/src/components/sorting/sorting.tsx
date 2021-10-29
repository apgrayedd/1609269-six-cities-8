import { nanoid } from '@reduxjs/toolkit';
import { Dispatch,MouseEvent } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { SortingList } from '../../const';
import { changeSortingAction } from '../../store/action';
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
    dispacth(changeSortingAction(sorting));
  },
});
const connector = connect(stateToProps, dispacthToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = SortingOptions & PropsFromRedux;

function Sorting({activeSort, setSorting}:ConnectedComponentProps):JSX.Element {
  const sortingList = SortingList.map(({name}) => {
    const setSortingTemplate = (evt:MouseEvent) => {
      evt.preventDefault();
      setSorting(name);
    };
    return <li key = {nanoid()} onClick = {setSortingTemplate} className={`places__option ${activeSort === name && 'places__option--active'}`}tabIndex={0}>{name}</li>;
  });
  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex={0}>
        Popular
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className="places__options places__options--custom places__options--opened">
        {sortingList}
      </ul>
    </form>
  );
}

export {Sorting};
export default connector(Sorting);

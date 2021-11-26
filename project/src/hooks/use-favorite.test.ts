import {renderHook, act} from '@testing-library/react-hooks';
import { makeFakeHostel } from '../utils/makeFakeHostel';
import useFavorite from './use-favorite';

const testHostel = makeFakeHostel();

describe('Хук: useFavorite', () => {

  it('возвращает 2 элемента', () => {
    const {result} = renderHook(() =>
      useFavorite(testHostel, jest.fn()),
    );

    const [favoriteStatus, handleFavoriteStatusChange] = result.current;

    expect(result.current).toHaveLength(2);
    expect(typeof favoriteStatus).toBe('boolean');
    expect(handleFavoriteStatusChange).toBeInstanceOf(Function);
  });

  it('правильно меняет статус', () => {
    const testHostelStatus = testHostel.is_favorite;
    const testPostFavoriteStatus = jest.fn();
    const {result} = renderHook(
      () => useFavorite(testHostel, testPostFavoriteStatus),
    );

    const [, handleFavoriteStatusChange] = result.current;
    act(() => handleFavoriteStatusChange());
    expect(testPostFavoriteStatus.mock.calls[0][1]).toBe(!testHostelStatus ? 1 : 0);
  });
});

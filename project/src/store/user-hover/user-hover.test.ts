import {
  changeHoverHostel, changeHoverMarker
} from '../action';
import { UserHover } from './user-hover';

describe('Редьюсер: User-Hover', () => {
  it('изменение hover для отеля', () => {
    const testIdHostel = Math.floor(Math.random() * 100);
    const state = {
      hoverHostel: Math.random() < 0.5
        ? Math.floor(Math.random() * 100)
        : undefined,
      hoverMarker: undefined,
    };
    expect(UserHover(state, changeHoverHostel(testIdHostel))).toEqual({
      hoverHostel: testIdHostel,
      hoverMarker: undefined,
    });
  });

  it('изменение hover для маркера', () => {
    const testIdMarker = Math.floor(Math.random() * 100);
    const state = {
      hoverHostel: undefined,
      hoverMarker: Math.random() < 0.5
      ? Math.floor(Math.random() * 100)
      : undefined,
    };
    expect(UserHover(state, changeHoverMarker(testIdMarker))).toEqual({
      hoverHostel: undefined,
      hoverMarker: testIdMarker,
    });
  });
});

import { createAPI } from './api';
import MockAdapter from 'axios-mock-adapter';
import {configureMockStore} from '@jedmao/redux-mock-store';
import thunk, {ThunkDispatch} from 'redux-thunk';
import { State } from '../../types/state';
import { Action } from '@reduxjs/toolkit';
import { APIRoute, AuthorizationStatus } from '../../const';
import {
  checkAuthAction,
  fetchCommentsInfo,
  fetchFavoritesInfo,
  fetchHostelAction,
  fetchNearByHostelsInfo,
  fetchOfferInfo,
  postCommentAction,
  postFavoritesStatusAction
} from './api-action';
import {
  changeAuthorizationStatus,
  changeCommentsProperty,
  changeFavorites,
  changeHostelProperty,
  changeHostels,
  changeNearbyHostelsProperty
} from '../../store/action';
import { makeFakeHostel, makeFakeHostelComment } from '../../utils/makeFakeHostel';
import { Hostel } from '../../types/hostel';
import { Comment } from '../../types/comment';


const SUCCESSFUL_SENDING_CODE = 200;
const TEST_HOSTELS_AMOUNT = 5;
const ID_MAX_AMOUNT = 100;

describe('Тесты API функций', () => {
  const onFakeUnauthorized = jest.fn();
  const api = createAPI(onFakeUnauthorized());
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
  State,
  Action,
  ThunkDispatch<State, typeof api, Action>
>(middlewares);

  it('Тест проверка авторизации', async () => {
    const store = mockStore();
    mockAPI
      .onGet(APIRoute.Login)
      .reply(SUCCESSFUL_SENDING_CODE, []);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(checkAuthAction());

    expect(store.getActions()).toEqual([
      changeAuthorizationStatus(AuthorizationStatus.Auth),
    ]);
  });

  it('Тест получения данных с сервера', async () => {
    const testHostels:Hostel[] = [...Array(TEST_HOSTELS_AMOUNT)].fill(makeFakeHostel());
    const store = mockStore();
    mockAPI
      .onGet(APIRoute.Hotels)
      .reply(SUCCESSFUL_SENDING_CODE, testHostels);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(fetchHostelAction(false));

    expect(store.getActions()).toEqual([
      changeHostels(testHostels),
    ]);
  });

  it('Тест получения отеля для страницы предложения', async () => {
    const testHostel:Hostel = makeFakeHostel();
    const id = Math.floor(Math.random() * ID_MAX_AMOUNT);
    const store = mockStore();
    mockAPI
      .onGet(APIRoute.OfferInfo.replace('id', `${id}`))
      .reply(SUCCESSFUL_SENDING_CODE, testHostel);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(fetchOfferInfo(id));

    expect(store.getActions()).toEqual([
      changeHostelProperty(testHostel),
    ]);
  });

  it('Тест получения комментариев для страницы предложения', async () => {
    const testComments:Comment[] = [...Array(TEST_HOSTELS_AMOUNT)].fill(makeFakeHostelComment());
    const id = Math.floor(Math.random() * ID_MAX_AMOUNT);
    const store = mockStore();
    mockAPI
      .onGet(APIRoute.Comments.replace('id', `${id}`))
      .reply(SUCCESSFUL_SENDING_CODE, testComments);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(fetchCommentsInfo(id));

    expect(store.getActions()).toEqual([
      changeCommentsProperty(testComments),
    ]);
  });

  it('Тест получения отелей поблизости для страницы предложения', async () => {
    const testHostels:Hostel[] = [...Array(TEST_HOSTELS_AMOUNT)].fill(makeFakeHostel());
    const id = Math.floor(Math.random() * ID_MAX_AMOUNT);
    const store = mockStore();
    mockAPI
      .onGet(APIRoute.NearbyHostels.replace('id', `${id}`))
      .reply(SUCCESSFUL_SENDING_CODE, testHostels);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(fetchNearByHostelsInfo(id));

    expect(store.getActions()).toEqual([
      changeNearbyHostelsProperty(testHostels),
    ]);
  });

  it('Тест получения понравившихся отелей', async () => {
    const testHostels:Hostel[] = [...Array(TEST_HOSTELS_AMOUNT )].fill(makeFakeHostel());
    const store = mockStore();
    mockAPI
      .onGet(APIRoute.Favorites)
      .reply(SUCCESSFUL_SENDING_CODE, testHostels);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(fetchFavoritesInfo(false));

    expect(store.getActions()).toEqual([
      changeFavorites(testHostels),
    ]);
  });

  it('Тест отправления нового комментария', async () => { ////
    const newComment:Comment = makeFakeHostelComment();
    const id = Math.floor(Math.random() * ID_MAX_AMOUNT);
    const store = mockStore();
    mockAPI
      .onPost(APIRoute.Comments.replace('id', `${id}`))
      .reply(SUCCESSFUL_SENDING_CODE);

    expect(store.getActions()).toEqual([]);
    await store.dispatch(postCommentAction(id, newComment));
    expect(store.getActions()).toEqual([]);
  });

  it('Тест отправления статуса избранного для отеля', async () => { ////
    const newStatus:0 | 1 = Math.random() < 0.5 ? 1 : 0;
    const id = Math.floor(Math.random() * ID_MAX_AMOUNT);
    const store = mockStore();
    mockAPI
      .onPost(APIRoute.PostFavorites.replace('id', `${id}`).replace('status', `${newStatus}`))
      .reply(SUCCESSFUL_SENDING_CODE);

    expect(store.getActions()).toEqual([]);
    await store.dispatch(postFavoritesStatusAction(id, newStatus));
    expect(store.getActions()).toEqual([]);
  });
});

import {name, internet, address, lorem, date} from 'faker';
import { Comment } from '../types/comment';
import {Hostel} from '../types/hostel';

export const makeFakeHostel = ():Hostel => ({
  'bedrooms': Math.floor(Math.random() * 10) + 1,
  'city': {
    'location': {
      'latitude':  parseFloat(address.latitude()),
      'longitude': parseFloat(address.longitude()),
      'zoom': Math.floor(Math.random() * 20) + 1,
    },
    'name': name.firstName(),
  },
  'description': lorem.words(150),
  'goods': [...Array(Math.floor(Math.random() * 10) + 1)].fill(lorem.words(10)),
  'host': {
    'avatar_url': internet.avatar(),
    'id': Math.floor(Math.random() * 100) + 1,
    'is_pro': Boolean(Math.random()),
    'name': name.firstName(),
  },
  'id': Math.floor(Math.random() * 100) + 1,
  'images': [...Array(Math.floor(Math.random() * 5) + 1)].fill(internet.url()),
  'is_favorite': Boolean(Math.random()),
  'is_premium': Boolean(Math.random()),
  'location': {
    'latitude': parseFloat(address.latitude()),
    'longitude': parseFloat(address.longitude()),
    'zoom': Math.floor(Math.random() * 20) + 1,
  },
  'max_adults': Math.floor(Math.random() * 10) + 1,
  'preview_image': lorem.words(10),
  'price': Math.floor(Math.random() * 1000) + 1,
  'rating': Math.floor(Math.random() * 5) + 1,
  'title': lorem.words(10),
  'type': lorem.words(10),
});

export const makeFakeHostelComment = ():Comment => ({
  'comment': lorem.words(150),
  'date': date.past().toString(),
  'id': Math.floor(Math.random() * 100) + 1,
  'rating': Math.floor(Math.random() * 5) + 1,
  'user': {
    'avatar_url': internet.url(),
    'id': Math.floor(Math.random() * 100) + 1,
    'is_pro': Boolean(Math.random()),
    'name': lorem.words(10),
  },
});

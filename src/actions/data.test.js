import { expect } from 'chai';
import nock from 'nock';
import { requestData, receiveData, errorData, getData } from './data';
import * as ExchangeNames from '../constants/ExchangeNames';
import { GET_DATA } from '../constants/ActionTypes';
import { PENDING, SUCCESS, ERROR } from '../constants/AsyncStates';

describe('data actions', () => {
  for (let key of Object.keys(ExchangeNames)) {
    const name = ExchangeNames[key];
    it(`should create an action to request data from ${name}`, () => {
      expect(requestData({ exchange: name })).to.deep.equal({
        type: GET_DATA,
        meta: {
          exchange: name,
          status: PENDING,
        },
      });
    });
    
    it(`should create an action to receive data from ${name}`, () => {
      // the value doesn't really matter but i'm just making some realistic data
      const price = 500 + (Math.random() * 100);
      const volume = 1000 + (Math.random() * 1000);
      expect(receiveData({
        exchange: name,
        data: {
          price,
          volume,
        }
      })).to.deep.equal({
        type: GET_DATA,
        payload: {
          price,
          volume,
        },
        meta: {
          exchange: name,
          status: SUCCESS,
        },
      });
    });
    
    it(`should create a thunk to get data from ${name}`, () => {
      // use nock here
      // @todo research thunk testing
    });
  }
});
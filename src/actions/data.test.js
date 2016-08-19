import configureMockStore from 'redux-mock-store';
import { expect } from 'chai';
import nock from 'nock';
import { requestData, receiveData, errorData, getData } from './data';
import * as ExchangeNames from '../constants/ExchangeNames';
import { GET_DATA } from '../constants/ActionTypes';
import { PENDING, SUCCESS, ERROR } from '../constants/AsyncStates';

describe('data actions', () => {
  
});
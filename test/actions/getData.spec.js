import { expect } from 'chai';
import { gdax, bitstamp, kraken } from '../../src/actions/getData';
import {
  GET_DATA_GDAX,
  GET_DATA_BITSTAMP,
  GET_DATA_KRAKEN,
} from '../../src/constants/ActionTypes';
import { PENDING } from '../../src/constants/AsyncStates';

describe('getData actions', () => {
  it('should create an action to get data from GDAX', () => {
    expect(gdax()).to.deep.equal({
      type: GET_DATA_GDAX,
      meta: {
        status: PENDING,
      },
    });
  });
  
  it('should create an action to get data from Bitstamp', () => {
    expect(bitstamp()).to.deep.equal({
      type: GET_DATA_BITSTAMP,
      meta: {
        status: PENDING,
      },
    });
  });
  
  it('should create an action to get data from Kraken', () => {
    expect(kraken()).to.deep.equal({
      type: GET_DATA_KRAKEN,
      meta: {
        status: PENDING,
      },
    });
  });
});
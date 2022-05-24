import { wordpressDriver } from './wordpress-driver';

describe('wordpressDriver', () => {
  it('should work', () => {
    expect(wordpressDriver()).toEqual('wordpress-driver');
  });
});

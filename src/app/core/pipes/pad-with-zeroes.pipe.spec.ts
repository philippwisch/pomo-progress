import { PadWithZeroesPipe } from './pad-with-zeroes.pipe';

describe('PadWithZeroesPipe', () => {
  it('create an instance', () => {
    const pipe = new PadWithZeroesPipe();
    expect(pipe).toBeTruthy();
  });
});

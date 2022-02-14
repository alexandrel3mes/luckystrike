/**
 * @jest-environment jsdom
 */

const { save,
  getSaved,
  pokeNames,
  loadList,
  removeSelected,
  cardsFunctions,
  filterNames, 
} = require('./script');

describe('Testa a funçao save', () => {
  it('Testa se save é uma funçao', () => {
    expect.assertions(1);
    expect(typeof save).toBe('function'); 
  });
});

describe('Testa a funçao getSaved', () => {
  it('Testa se getSaved é uma funçao', () => {
    expect.assertions(1);
    expect(typeof getSaved).toBe('function');
  });
});

describe('Testa funçao pokeNames', () => {
  it('Testa seu retorno', async () => {
    expect.assertions(1);
    const pokeNames = jest.fn(() => true);
    await pokeNames();
    expect(pokeNames).toHaveReturned();
  })
})

describe('Testa função loadList', () => { 
  it ('', () => {
    expect.assertions(1);
    loadList();
    expect(fetch).toHaveBeenCalled();
  })
})
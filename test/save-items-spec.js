const { expect } = require('chai');
const { saveItems } = require('../save-items');
describe("The saveItems function", () => {
  it('adds the new item to the list', () => {
    const items = [
      {title: "Pulp Fiction", category: "Action"},
      {title: "Kill Bill", category: "Action"},
      {title: "Forgetting Sarah Marshall", category: "Rom-Com"}
    ];
    const newItems = { title: "Mulan", category: "Kids"};
    let result = saveItems(items, newItems)

    const expectedResult = [
      {title: "Pulp Fiction", category: "Action"},
      {title: "Kill Bill", category: "Action"},
      {title: "Forgetting Sarah Marshall", category: "Rom-Com"}, { title: "Mulan", category: "Kids"}
    ];
    expect(result).to.eql(expectedResult)


  });

  it('makes sure the result and the original are different', () => {
      const items = [
      {title: "Pulp Fiction", category: "Action"},
      {title: "Kill Bill", category: "Action"},
      {title: "Forgetting Sarah Marshall", category: "Rom-Com"}
    ];
    const newItems = { title: "Mulan", category: "Kids"};
    let result = saveItems(items, newItems)

    expect(result).to.not.equal(items)
  });
});

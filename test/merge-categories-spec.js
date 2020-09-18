const { expect } = require('chai');
const { mergeCategories } = require('../merge-categories');

describe("mergeCategories()", () => {
  context("Using <li> tags", () => {
    const template = `
    <div>
    <ul>
      {{#each categories}}
        <li>{{ this }}</li>
      {{/each}}
    </ul>
  </div>
`;

    it("should return no <li>s for no categories", () => {
      const categories = [];
      let result = mergeCategories(template,categories, 'li');

      expect(result).to.include('<div>');
      expect(result).to.include('</div>');
      expect(result).to.include('<ul>');
      expect(result).to.include('</ul>');
      expect(result).to.not.include('<li>');
      expect(result).to.not.include('</li>');
      expect(result).to.not.include('<!-- Content here -->');
    });

    it("should return a single <li> for one category", () => {
      const categories = ['School']
      let result = mergeCategories(template, categories, 'li');
      expect(result).to.include('<div>');
      expect(result).to.include('</div>');
      expect(result).to.include('<ul>');
      expect(result).to.include('</ul>');
      expect(result).to.include(`<li>${categories[0]}</li>`);
      expect(result).to.not.include('<!-- Content here -->');
    });

    it("should return an <li> for each category", () => {
      const categories = ['1', '2', '3']
      let result = mergeCategories(template, categories, 'li');
      expect(result).to.include('<div>');
      expect(result).to.include('</div>');
      expect(result).to.include('<ul>');
      expect(result).to.include('</ul>');

      categories.forEach( category => {
        expect(result).to.include(`<li>${category}</li>`);
      })

      expect(result).to.not.include('<!-- Content here -->');
    });
  });

  context("using <option> tags", () => {
    const template = `
    <div>
    <select>
      {{#each categories}}
        <option>{{ this }}</option>
      {{/each}}
    </select>
  </div>
`;

    it("should return no <option>s for no categories", () => {
     const categories = [];
     let result = mergeCategories(template, categories, 'option')

     expect(result).to.include('<div>');
    expect(result).to.include('</div>');
    expect(result).to.include('<select>');
    expect(result).to.include('</select>');
    expect(result).to.not.include('<option>');
    expect(result).to.not.include('</option>');
    expect(result).to.not.include('<!-- Content here -->');
    });

    it("should return a single <option> for one category", () => {
      const categories = ['dog'];
      let result = mergeCategories(template,categories,'option')
      expect(result).to.include('<div>');
    expect(result).to.include('</div>');
    expect(result).to.include('<select>');
    expect(result).to.include('</select>');
    expect(result).to.include('<option>dog</option>');

    expect(result).to.not.include('<!-- Content here -->');
    });

    it("should return an <option> for each category", () => {
      const categories = ['1', '2', '3']
      let result = mergeCategories(template, categories, 'option');
      expect(result).to.include('<div>');
      expect(result).to.include('</div>');
      expect(result).to.include('<select>');
      expect(result).to.include('</select>');

      categories.forEach( category => {
        expect(result).to.include(`<option>${category}</option>`);
      })

      expect(result).to.not.include('<!-- Content here -->');
    });
  });
});

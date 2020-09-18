const chai = require('chai');
const expect = chai.expect
const chaiString = require('chai-string')
chai.use(chaiString);
const { mergeItems } = require('../merge-items');
describe("The mergeItems function", () => {
  const template = `
    <table>
      <tbody>
        <!-- Content here -->
      </tbody>
    </table>
  `;
  it("should return no <tr>s and no <td>s for no items", () => {
    const items = [];

    let result = mergeItems(template, items);

    expect(result).to.include('<table>')
    expect(result).to.include('</table>')
    expect(result).to.include('<tbody>')
    expect(result).to.include('</tbody>')

    expect(result).to.not.include('<tr>')
    expect(result).to.not.include('</tr>')
    expect(result).to.not.include('<td>')
    expect(result).to.not.include('</td>')

    expect(result).to.not.include("<!-- Content here -->")


  });

  it("should return a single <tr>, four <td>s, and a <form> for one uncompleted item", () => {
    const items = [
      {title: "Pulp Fiction", category: "Action"}
    ];

    let result = mergeItems(template, items);

    expect(result).to.include('<table>')
    expect(result).to.include('</table>')
    expect(result).to.include('<tbody>')
    expect(result).to.include('</tbody>')

    expect(result).to.include('<tr>')
    expect(result).to.include('</tr>')
    expect(result).to.include('<td>Pulp Fiction</td>')
    expect(result).to.include('<td>Action</td>')
    expect(result).to.include('<form method="POST" action="/items/1"')

    expect(result).to.not.include("<!-- Content here -->")

  });

  it("should return a single <tr>, four <td>s, and no <form> for one completed item", () => {
    const items = [
      {title: "Pulp Fiction", category: "Action", isComplete: true},
    ];

    let result = mergeItems(template, items);

    expect(result).to.include('<table>')
    expect(result).to.include('</table>')
    expect(result).to.include('<tbody>')
    expect(result).to.include('</tbody>')

    expect(result).to.include('<tr>')
    expect(result).to.include('</tr>')
    expect(result).to.include('<td>Pulp Fiction</td>')
    expect(result).to.include('<td>Action</td>')
    expect(result).to.not.include('<form method="POST" action="/items/1"')

    expect(result).to.not.include("<!-- Content here -->")

  });

  it("should return three <tr>s for three items", () => {
    const items = [
      {title: "Pulp Fiction", category: "Action"},
      {title: "Kill Bill", category: "Action"},
      {title: "Forgetting Sarah Marshall", category: "Rom-Com"}
    ];
    const count = items.length
    let result = mergeItems(template, items);

    expect(result).to.include('<table>')
    expect(result).to.include('</table>')
    expect(result).to.include('<tbody>')
    expect(result).to.include('</tbody>')

    expect(result).to.have.entriesCount('<tr>', count)
    expect(result).to.have.entriesCount('</tr>', count)

    expect(result).to.include('<td>Pulp Fiction</td>')
    expect(result).to.include('<td>Action</td>')


    expect(result).to.include('<td>Kill Bill</td>')
    expect(result).to.include('<td>Action</td>')

    expect(result).to.include('<td>Forgetting Sarah Marshall</td>')
    expect(result).to.include('<td>Rom-Com</td>')





    expect(result).to.not.include("<!-- Content here -->")


  });
});

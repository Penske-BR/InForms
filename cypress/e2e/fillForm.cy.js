import FormFiller from "./FormFiller.js"
describe('form test', () => {
  const formFiller = new FormFiller()
  it('passes', () => {
    formFiller.fillForm("avaria")
  })
})
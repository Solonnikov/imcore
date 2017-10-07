import { ImcorePage } from './app.po';

describe('imcore App', () => {
  let page: ImcorePage;

  beforeEach(() => {
    page = new ImcorePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

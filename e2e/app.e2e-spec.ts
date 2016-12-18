import { GeometricFiguresPage } from './app.po';

describe('geometric-figures App', function() {
  let page: GeometricFiguresPage;

  beforeEach(() => {
    page = new GeometricFiguresPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

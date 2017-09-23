import {element, by, browser} from "protractor";

describe('spring-boot-angular', () => {
  beforeEach(() => {
    browser.get("/");
  });

  it('Container should be loaded', () => {
    expect(element(by.className("container-fluid")).isPresent()).toBe(true);
  });
});

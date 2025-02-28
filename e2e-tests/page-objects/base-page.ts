import { Page } from "@playwright/test";

export class BasePage {
  constructor(protected page: Page) {}

  get logo() {
    return this.page.locator("#headerBar").locator(`img[alt="website logo"]`);
  }
}

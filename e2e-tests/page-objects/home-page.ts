import { Page } from "@playwright/test";
import { BasePage } from "./base-page";

export class HomePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  get vMAXProduct() {
    return this.page.locator("#products").locator(`img[alt="VMAX Hardware Spoofer"]`);
  }

  get valorantPrivateProduct() {
    return this.page.locator("#products").locator(`img[alt="Valorant Private"]`);
  }

  async navigate() {
    await this.page.goto("/");
  }
}

import { expect, Page } from "@playwright/test";
import { BasePage } from "./base-page";

export class ProductPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  get addToCartButton() {
    return this.page.locator("#add-to-cart-button");
  }

  get checkoutButton() {
    return this.page.locator("#checkout-button-text");
  }

  async selectWeekVariant() {
    await this.page.locator("#variant_btn[data-variant-name='Week']").getByText("Week").click();
    await expect(this.page.locator("#selected_variant_price")).toHaveText("$24.99");
  }

  async checkout() {
    await this.checkoutButton.click();
  }

  async navigate(product: string) {
    await this.page.goto(`/product/${product}`);
  }
}

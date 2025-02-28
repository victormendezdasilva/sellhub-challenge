import { expect, Page } from "@playwright/test";
import { BasePage } from "./base-page";

export class PaymentPage extends BasePage {
  private orderSummaryInstance = new OrderSummary(this.page);

  constructor(protected page: Page) {
    super(page);
  }

  get orderSummary() {
    return this.orderSummaryInstance;
  }

  get continueAndCloseDiscordModalButton() {
    return this.page
      .locator("[data-sentry-element='DialogContentContainer']")
      .locator("button")
      .getByText("Continue & Close");
  }

  async continueAndCloseDiscordModal() {
    await this.continueAndCloseDiscordModalButton.click();
  }

  async navigate() {
    await this.page.goto(`/payment/`);
  }
}

class OrderSummary {
  constructor(protected page: Page) {}

  get title() {
    return this.page.locator(".font-semibold.text-lg").getByText("Order Summary");
  }

  get cartProductsList() {
    return this.page.locator("#cart-products-list");
  }

  get firstProduct() {
    return this.cartProductsList.locator("cart-bundle-or-item").first();
  }

  get subtotalPrice() {
    return this.page.locator("#subtotal_price");
  }

  get totalPrice() {
    return this.page.locator("#total_price");
  }

  async increaseFirstProductAmount(amountToIncrease: number) {
    for (let i = 0; i < amountToIncrease; i++) {
      await this.firstProduct.locator("custom-button[id^='increment-item']").click();
    }
  }

  async deleteFirstProductFromCart() {
    await this.firstProduct.locator("button").click();
  }

  async assertSubtotalPrice(expectedPrice: string) {
    await expect(this.subtotalPrice).toHaveText(expectedPrice);
  }

  async assertTotalPrice(expectedPrice: string) {
    await expect(this.totalPrice).toHaveText(expectedPrice);
  }
}

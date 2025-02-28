import { test, expect, BrowserContext, Page } from "@playwright/test";
import { ProductPage } from "../page-objects/product-page.ts";
import { PaymentPage } from "../page-objects/payment-page.ts";
import { HomePage } from "../page-objects/home-page.ts";
import { resolveCaptcha } from "../utils.js";

const auth_cookie = [
  {
    name: "token",
    value: process.env?.AUTH_TOKEN || "",
    domain: "impactshop.sellhub.cx",
    path: "/",
    httpOnly: true,
    secure: true,
  },
];

test.describe.serial("Cart - Functionality", () => {
  let context: BrowserContext;
  let page: Page;

  let homePage: HomePage;
  let productPage: ProductPage;
  let paymentPage: PaymentPage;

  test.beforeAll(async ({ browser }) => {
    context = await browser.newContext();
    await context.addCookies(auth_cookie);

    page = await context.newPage();
    await resolveCaptcha(page);
  });

  test("User should be able to add product from Home Page", async () => {
    homePage = new HomePage(page);
    await expect(homePage.logo).toBeVisible();
    await homePage.vMAXProduct.click();

    productPage = new ProductPage(page);
    await expect(page).toHaveURL(
      new RegExp("https://impactshop.sellhub.cx/product/VMAX-Hardware-Spoofer/")
    );

    await expect(productPage.addToCartButton).toBeVisible();
    await expect(productPage.checkoutButton).toBeVisible();
    await productPage.checkout();

    await expect(page).toHaveURL(new RegExp("https://impactshop.sellhub.cx/payment/"));
  });

  test("Displayed Order Summary should be shown as expected", async () => {
    const expectedPrice = "$24.99";

    paymentPage = new PaymentPage(page);
    await paymentPage.continueAndCloseDiscordModal();
    await expect(paymentPage.orderSummary.title).toBeVisible();
    await expect(paymentPage.orderSummary.firstProduct).toBeVisible();
    await paymentPage.orderSummary.assertSubtotalPrice(expectedPrice);
    await paymentPage.orderSummary.assertTotalPrice(expectedPrice);
  });

  test("User should be able to edit quantity and total should be updated", async () => {
    const expectedPrice = "$49.98";
    await paymentPage.orderSummary.increaseFirstProductAmount(1);

    await paymentPage.orderSummary.assertSubtotalPrice(expectedPrice);
    await paymentPage.orderSummary.assertTotalPrice(expectedPrice);
  });

  test("User should be able to navigate, add product and total should be updated", async () => {
    const expectedPrice = "$74.97";

    await homePage.logo.click();
    await homePage.valorantPrivateProduct.click();

    productPage = new ProductPage(page);
    await productPage.selectWeekVariant();
    await productPage.checkout();
    await paymentPage.continueAndCloseDiscordModal();

    await paymentPage.orderSummary.assertSubtotalPrice(expectedPrice);
    await paymentPage.orderSummary.assertTotalPrice(expectedPrice);
  });

  test("User should be able to delete product from Cart", async () => {
    const expectedPrice = "$49.98";
    await paymentPage.orderSummary.deleteFirstProductFromCart();

    await paymentPage.orderSummary.assertSubtotalPrice(expectedPrice);
    await paymentPage.orderSummary.assertTotalPrice(expectedPrice);
  });
});

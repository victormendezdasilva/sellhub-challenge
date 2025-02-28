require("dotenv").config();

const { Solver } = require("@2captcha/captcha-solver");
const solver = new Solver(process.env?.CAPTCHA_TOKEN);

export async function resolveCaptcha(page) {
  await page.addInitScript({ path: "./inject.js" });
  page.on("console", async (msg) => {
    const txt = msg.text();
    if (txt.includes("intercepted-params:")) {
      const params = JSON.parse(txt.replace("intercepted-params:", ""));
      console.log(params);

      try {
        console.log(`Solving the captcha...`);
        const res = await solver.cloudflareTurnstile(params);
        console.log(`Solved the captcha ${res.id}`);
        console.log(res);
        await page.evaluate((token) => {
          cfCallback(token);
        }, res.data);
      } catch (e) {
        console.log(e.err);
        return process.exit();
      }
    } else {
      return;
    }
  });
  await page.goto("/");

  await page.waitForTimeout(5000);
  await page.reload({ waitUntil: "networkidle" });
  console.log("Reloaded");
}

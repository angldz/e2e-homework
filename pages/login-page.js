import { expect } from "@playwright/test";

export class LoginPage {
    constructor(page) {
        this.page = page;
        this.usernameInput = page.locator("#user-name");
        this.passwordInput = page.locator("#password");
        this.loginButton = page.locator("#login-button");
        this.title = "Swag Labs";
    }

    async navigateToInitialPage() {
        await this.page.goto("https://www.saucedemo.com/");
        await expect(this.page).toHaveTitle(this.title);
    }

    async enterCredentials(username, password) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
        await expect(this.page).toHaveTitle(this.title);
    }
}

import { expect } from "@playwright/test";

export class CartPage {

    constructor(page) {
        this.page = page;
        this.removeButton = this.page.getByRole('button', { name: "remove" });
    }

    async checkRemoveButtonExists() {
        await expect(this.removeButton).toBeVisible();
    }
}

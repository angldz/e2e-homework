import { expect } from "@playwright/test";

export class ProductPreviewPage{

    constructor(page) {
        this.page = page;
        this.addToCartButton = page.getByRole('button', { name: "Add to cart" });
        this.removeButton = page.getByRole('button', { name: "Remove" });
    }

    async checkAddToCartButtonExistsInProductPreview() {
        await expect(this.addToCartButton).toBeVisible();
    }

    async checkRemoveButtonIsInProductPreview() {
        await expect(this.removeButton).toBeVisible();
    }
}

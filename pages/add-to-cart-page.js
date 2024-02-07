import { expect } from "@playwright/test";

export class AddToCartPage{

    constructor(page) {
        this.page = page;
        this.addToCartButton = page.getByRole('button', { name: "Add to cart" });
        this.removeButton = page.getByRole('button', { name: "Remove" });
        this.itemName = page.locator(".inventory_item_name")
        this.shoppingCartContainer = page.locator("#shopping_cart_container");
        this.shoppingCartBadge = page.locator(".shopping_cart_badge");
        this.cartContentsContainer = page.locator("#cart_contents_container");
    }

    async checkAddToCartButtonExistsOnEachProduct() {
        const buttonCount = await this.addToCartButton.count();
        const itemCount = await this.itemName.count();
        await expect(itemCount).toBeGreaterThan(0);
        await expect(buttonCount).toEqual(itemCount);
    }

    async clickProduct(name) {
        await this.page.locator(`.inventory_item_name:has-text("${name}")`).click();
    }

    async addProductToCart(name) {
        const item = await this.page.locator('.inventory_item')
            .filter({ has: this.page.locator(`.inventory_item_name:has-text("${name}")`) });
        await item.locator(this.addToCartButton).click();
    }

    async checkCartBadge() {
        await expect(await this.shoppingCartBadge).toHaveCount(1);
    }

    async goToCart() {
        await this.shoppingCartContainer.click();
        await expect(this.cartContentsContainer).toBeVisible();
    }

    async clickEachAddToCartButton() {
        const countAddToCartButtons = await this.addToCartButton.count();
        for (let i = 0; i < countAddToCartButtons; i++) {
            await this.addToCartButton.first().click();
        }
        const countRemoveButtons = await this.removeButton.count();
        expect(countRemoveButtons).toBeGreaterThan(0);
        expect(countRemoveButtons).toEqual(countAddToCartButtons);
    }

    async removeProduct(name) {
        const item = await this.page.locator('.inventory_item')
            .filter({ has: this.page.locator(`.inventory_item_name:has-text("${name}")`) });
        await item.locator(this.removeButton).click();
    }

    async checkCartBadgeIsZero() {
        await expect(await this.shoppingCartBadge).toHaveCount(0);
    }
}
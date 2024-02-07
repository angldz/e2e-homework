import { test } from '@playwright/test';
import { LoginPage } from '../pages/login-page';
import { AddToCartPage } from '../pages/add-to-cart-page';
import { CartPage } from '../pages/cart-page';
import { ProductPreviewPage } from '../pages/product-preview-page';
import { credentials } from '../test_data/credentials';
import { products } from '../test_data/products';

const login = async function(page, username, password) {
    let loginPage = new LoginPage(page);
    await loginPage.navigateToInitialPage();
    await loginPage.enterCredentials(username, password);
};

credentials.forEach(credential => {
    test.describe(`Run tests for ${credential.username}`, async() => {
        test('1 a - Verify "Add to cart" button exists in products list, on each product', async ({page}) => {
            await login(page, credential.username, credential.password);
        
            let addToCart = new AddToCartPage(page);
            await addToCart.checkAddToCartButtonExistsOnEachProduct();
        });

        products.forEach(async product => {
            test(`1 b - Verify "Add to cart" button exists in product preview page (${product})`, async ({page}) => {
                await login(page, credential.username, credential.password);
        
                let addToCart = new AddToCartPage(page);
                await addToCart.clickProduct(product);
            
                let productPreviewPage = new ProductPreviewPage(page);
                await productPreviewPage.checkAddToCartButtonExistsInProductPreview();
            });
        
            test(`2 - Verify one piece of selected item gets added to cart (${product})`, async ({page}) => {
                await login(page, credential.username, credential.password);
            
                let addToCart = new AddToCartPage(page);
                await addToCart.addProductToCart(product);
                await addToCart.checkCartBadge();
            });
        });
        
        test.describe("3 - Verify remove button when product is added", async() => {
        
            test.beforeEach(async ({page}) =>{
                await login(page, credential.username, credential.password);
            })
        
            products.forEach(async product => {
                test(`3 a - Verify remove button is visible for added product in cart (${product})`, async ({page}) => {
                    let addToCart = new AddToCartPage(page);
                    await addToCart.addProductToCart(product);
                    await addToCart.checkCartBadge();
                    await addToCart.goToCart();
        
                    let cartPage = new CartPage(page);
                    await cartPage.checkRemoveButtonExists();
                });
            });
        
            test('3 b - Verify remove button is visible for each added product in list', async ({page}) => {
                let addToCart = new AddToCartPage(page);
        
                await addToCart.clickEachAddToCartButton();
            });
        
            products.forEach(async product => {
                test(`3 c - Verify remove button is visible for added product in preview page (${product})`, async ({page}) => {
                    let addToCart = new AddToCartPage(page);
                    await addToCart.addProductToCart(product);
                    await addToCart.clickProduct(product);
        
                    let productPreviewPage = new ProductPreviewPage(page);
                    await productPreviewPage.checkRemoveButtonIsInProductPreview();
                });
            });
        });
        
        products.forEach(async product => {
            test(`4 - Verify clicking remove button removes product from cart (${product})`, async ({page}) => {
                await login(page, credential.username, credential.password);
        
                let addToCart = new AddToCartPage(page);
                await addToCart.addProductToCart(product);
                await addToCart.removeProduct(product);
                await addToCart.checkCartBadgeIsZero();
            });
        });        
    });
});

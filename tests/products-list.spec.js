import { test } from '@playwright/test';
import { LoginPage } from '../pages/login-page';
import { ProductsListPage } from '../pages/products-list-page';
import { credentials } from '../test_data/credentials';

const login = async function(page, username, password) {
    let loginPage = new LoginPage(page);
    await loginPage.navigateToInitialPage();
    await loginPage.enterCredentials(username, password);
};

credentials.forEach(credential => {
    test.describe(`Run tests for ${credential.username}`, async() => {
                
        test('1 - Verify dropdown element with options exists', async ({page}) => {
            await login(page, credential.username, credential.password);

            let productsListPage = new ProductsListPage(page);
            await productsListPage.checkDropdownExists();
        });

        test('2 - Verify dropdown has needed options', async ({page}) => {
            await login(page, credential.username, credential.password);

            let productsListPage = new ProductsListPage(page);
            await productsListPage.checkDropdownHasNeededOptions();
        });

        test.describe("3 - Verify product sorting", async() => {

            test.beforeEach(async ({page}) =>{
                await login(page, credential.username, credential.password);
            });
            
            test("Check by name ascending", async ({page}) => {
                let productsListPage = new ProductsListPage(page);
                await productsListPage.checkNameAscSort();
            });

            test("Check by name descending", async ({page}) => {
                let productsListPage = new ProductsListPage(page);
                await productsListPage.checkNameDescSort();
            });

            test("Check by price ascending", async({page}) => {
                let productsListPage = new ProductsListPage(page);
                await productsListPage.checkPriceAscSort();
            });

            test("Check by price descending", async({page}) => {
                let productsListPage = new ProductsListPage(page);
                await productsListPage.checkPriceDescSort();
            });
        });

        test('4 - Verify the default select option is by name (A to Z)', async ({page}) => {
            await login(page, credential.username, credential.password);

            let productsListPage = new ProductsListPage(page);
            await productsListPage.checkDropdownExists();
            await productsListPage.checkDefaultSortIsByNameAsc();
        });
    });
});
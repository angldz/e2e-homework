import { expect } from "@playwright/test";

export class ProductsListPage{

  constructor(page) {
    this.page = page;
    this.sortContainerSelect = page.locator("select.product_sort_container");
    this.azSelectOption = page.locator("select.product_sort_container option[value='az']");
    this.zaSelectOption = page.locator("select.product_sort_container option[value='za']");
    this.lohiSelectOption = page.locator("select.product_sort_container option[value='lohi']");
    this.hiloSelectOption = page.locator("select.product_sort_container option[value='hilo']");
    this.itemName = page.locator('div[class="inventory_item_name"]');
    this.itemPriceDiv = page.locator('div[class="inventory_item_price"]');
  }

  async checkDropdownExists() {
    await expect(this.sortContainerSelect).toBeVisible();
  }

  async checkDropdownHasNeededOptions() {
    await expect(this.azSelectOption).toContainText("Name (A to Z)");
    await expect(this.zaSelectOption).toContainText("Name (Z to A)");
    await expect(this.lohiSelectOption).toContainText("Price (low to high)");
    await expect(this.hiloSelectOption).toContainText("Price (high to low)");
  }

  async checkNameAscSort() {
    await this.sortContainerSelect.selectOption('az');
    const listIsSortedByNameAsc = await this.isListSortedByName(true);
    await expect(listIsSortedByNameAsc).toBe(true);
  }

  async checkNameDescSort() {
    await this.sortContainerSelect.selectOption('za');
    const listIsSortedByNameDesc = await this.isListSortedByName(false);
    await expect(listIsSortedByNameDesc).toBe(true);
  }

  async checkPriceAscSort() {
    await this.sortContainerSelect.selectOption('lohi');
    const listIsSortedByPriceAsc = await this.isListSortedByPrice(true);
    await expect(listIsSortedByPriceAsc).toBe(true);
  }

  async checkPriceDescSort() {
    await this.sortContainerSelect.selectOption('hilo');
    const listIsSortedByPriceDesc = await this.isListSortedByPrice(false);
    await expect(listIsSortedByPriceDesc).toBe(true);
  }

  async checkDefaultSortIsByNameAsc() {
    const listIsSortedByNameAsc = await this.isListSortedByName(true);
    await expect(listIsSortedByNameAsc).toBe(true);
  }

  // Below there are functions that can be used to verify if items are sorted as expected
  // It is just an example, any other solution is welcome as well 
  // (you can use what is provided or write your own)

  /**
   * Checks if products are sorted properly by name
   * @param {boolean} asc true if list should be sorted in ascending order, else false
   * @returns {boolean} true if list is sorted in correct order
   */
    async isListSortedByName(asc) {
      let list = await this.itemName.allTextContents();
      
      return await this.isListSorted(list, asc);
    }

  /**
   * Checks if products are sorted properly by price
   * @param {boolean} asc true if list should be sorted in ascending order, else false
   * @returns {boolean} true if list is sorted in correct order
   */
  async isListSortedByPrice(asc) {
    let list = await this.itemPriceDiv.allTextContents();
    list.forEach((element, index) => {
      list[index] = parseFloat(element.slice(1));
    });

    return await this.isListSorted(list, asc);
  }

  /**
   * 
   * @param {Array} list list of elements to check 
   * @param {boolean} asc condition to check. True if should be sorted in ascending order, else false
   * @returns True if list sorted as expected, else false
   */
  async isListSorted(list, asc){
    return list.every(function(num, idx, arr) {
      if(asc === true){
        return (num <= arr[idx + 1]) || (idx === arr.length - 1) ? true : false;
      }
      return (num >= arr[idx + 1]) || (idx === arr.length - 1) ? true : false;
    });
  }
}
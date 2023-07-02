const { assert } = require('chai');


describe('Product ', async function() {
    it('На странице с подробной информацией отображаются: название товара, его описание, цена, цвет, материал и кнопка * * "добавить в корзину"', async function() {
        await this.browser.url('http://localhost:3000/hw/store/catalog/1');
        assert.isTrue(await this.browser.$('.ProductDetails-Name').isExisting()); 
        assert.isTrue(await this.browser.$('.ProductDetails-Description').isExisting()); 
        assert.isTrue(await this.browser.$('.ProductDetails-Price').isExisting()); 
        assert.isTrue(await this.browser.$('.ProductDetails-AddToCart').isExisting()); 
        assert.isTrue(await this.browser.$('.ProductDetails-Color').isExisting()); 
        assert.isTrue(await this.browser.$('.ProductDetails-Material').isExisting());
    })
});
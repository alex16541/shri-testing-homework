const { assert } = require('chai');


describe('добавление продукта в карзину', async function() {
    afterEach(async function () { 
    await this.browser.execute(() => 
        window.localStorage.removeItem("example-store-cart") 
    ); 
    });

    it('если товар уже добавлен в корзину, в каталоге и на странице товара должно отображаться сообщение об этом', async function() {
        await this.browser.url('http://localhost:3000/hw/store/catalog/1');
        await this.browser.$('.ProductDetails-AddToCart').click();
        assert.isTrue(await this.browser.$('.CartBadge').isExisting()); 
    })

    it('если товар уже добавлен в корзину, повторное нажатие кнопки "добавить в корзину" должно увеличивать его количество', async function() {
        await this.browser.url('http://localhost:3000/hw/store/catalog/1');
        await this.browser.$('.ProductDetails-AddToCart').click();
        await this.browser.$('.ProductDetails-AddToCart').click();
        await this.browser.url('http://localhost:3000/hw/store/cart');
        const count = await this.browser.$('.Cart-Count').getText();
        assert.equal(count, '2'); 
    })

    it('содержимое корзины должно сохраняться между перезагрузками страницы', async function() {
        await this.browser.url('http://localhost:3000/hw/store/catalog/1');
        await this.browser.$('.ProductDetails-AddToCart').click();
        await this.browser.url('http://localhost:3000/hw/store/cart');
        await this.browser.refresh();
        const cartNotEmpty = await this.browser.$('.Cart-Table').isExisting();
        assert.isTrue(cartNotEmpty); 
    })
});
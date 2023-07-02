const { assert } = require('chai');


describe('Корзина. ', async function() {
    afterEach(async function () { 
        await this.browser.execute(() => 
            window.localStorage.removeItem("example-store-cart") 
        ); 
    });

    it('в шапке рядом со ссылкой на корзину должно отображаться количество товаров в ней', async function() {
        await this.browser.url('http://localhost:3000/hw/store/catalog/1');
        await this.browser.$('.ProductDetails-AddToCart').click();
        assert.isTrue((await this.browser.$('a.nav-link[href="/hw/store/cart"]').getText()).includes('(1)')); 
    })
    
    it('счётчике товаров в шапке должно отображать коли-во УНИКАЛЬНЫХ товаров', async function() {
        await this.browser.url('http://localhost:3000/hw/store/catalog/1');
        await this.browser.$('.ProductDetails-AddToCart').click();
        await this.browser.$('.ProductDetails-AddToCart').click();
        assert.isTrue((await this.browser.$('a.nav-link[href="/hw/store/cart"]').getText()).includes('(1)')); 
    })

    it('в корзине должна отображаться таблица с добавленными в нее товарами', async function() {
        await this.browser.url('http://localhost:3000/hw/store/catalog/1');
        await this.browser.$('.ProductDetails-AddToCart').click();
        await this.browser.url('http://localhost:3000/hw/store/catalog/2');
        await this.browser.$('.ProductDetails-AddToCart').click();
        await this.browser.url('http://localhost:3000/hw/store/cart');
    
        const cart = await this.browser.$('.Cart-Table');
        const cartNotEmpty = await cart.isExisting();

        const elements = await cart.$('tbody').$$('tr');
        
        assert.isTrue(cartNotEmpty);
        assert.equal(elements.length, 2);
    })

    it('для каждого товара должны отображаться название, цена, количество, стоимость, а также должна отображаться общая сумма заказа', async function() {
        await this.browser.url('http://localhost:3000/hw/store/catalog/1');
        await this.browser.$('.ProductDetails-AddToCart').click();
        await this.browser.url('http://localhost:3000/hw/store/cart');
    
        assert.isTrue(await this.browser.$('.Cart-Name').isExisting());
        assert.isTrue(await this.browser.$('.Cart-Price').isExisting());
        assert.isTrue(await this.browser.$('.Cart-Count').isExisting());
        assert.isTrue(await this.browser.$('.Cart-Total').isExisting());
        assert.isTrue(await this.browser.$('.Cart-OrderPrice').isExisting());
    })

    it('в корзине должна быть кнопка "очистить корзину", по нажатию на которую все товары должны удаляться', async function() {
        await this.browser.url('http://localhost:3000/hw/store/catalog/1');
        await this.browser.$('.ProductDetails-AddToCart').click();
        await this.browser.url('http://localhost:3000/hw/store/cart');
        
        const clearCartButton = await this.browser.$('.Cart-Clear');
        assert.isTrue(await clearCartButton.isExisting());

        const cart = await this.browser.$('.Cart-Table');
        const cartNotEmpty = await cart.isExisting();

        assert.isTrue(cartNotEmpty);

        await clearCartButton.click();

        const cartEmpty = !await cart.isExisting();
        assert.isTrue(cartEmpty);
    })

    it('если корзина пустая, должна отображаться ссылка на каталог товаров', async function() {
        await this.browser.url('http://localhost:3000/hw/store/cart');

        const cart = await this.browser.$('.Cart-Table');
        const cartEmpty = !await cart.isExisting();
        assert.isTrue(cartEmpty);

        const catalogLink = await this.browser.$('.Cart a[href="/hw/store/catalog"]');
        assert.isTrue(await catalogLink.isExisting());
    })
});
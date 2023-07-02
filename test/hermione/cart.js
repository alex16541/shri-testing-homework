const { assert } = require('chai');
const fetch = require("node-fetch");

describe('Корзина. ', async function() {
    afterEach(async function () { 
        await this.browser.execute(() => 
            window.localStorage.removeItem("example-store-cart") 
        ); 
    });

    it('в шапке рядом со ссылкой на корзину должно отображаться количество товаров в ней', async function() {
        await initCart(this.browser);

        assert.isTrue((await this.browser.$('a.nav-link[href="/hw/store/cart"]').getText()).includes('(1)')); 
    })
    
    it('счётчике товаров в шапке должно отображать коли-во УНИКАЛЬНЫХ товаров', async function() {
        await initCart(this.browser, [
            {id: '1', "name":"Test name 1","count":2,"price":100}
        ]);
        
        assert.isTrue((await this.browser.$('a.nav-link[href="/hw/store/cart"]').getText()).includes('(1)')); 
    })

    it('в корзине должна отображаться таблица с добавленными в нее товарами', async function() {

        await initCart(this.browser, [
            {id: '1', "name":"Test name 1","count":2,"price":100},
            {id: '2', "name":"Test name 2","count":2,"price":100}
        ]);

        await this.browser.url('http://localhost:3000/hw/store/cart');
    
        const cart = await this.browser.$('.Cart-Table');
        const cartNotEmpty = await cart.isExisting();

        const elements = await cart.$('tbody').$$('tr');
        
        assert.isTrue(cartNotEmpty);
        assert.equal(elements.length, 2);
    })

    it('для каждого товара должны отображаться название, цена, количество, стоимость, а также должна отображаться общая сумма заказа', async function() {
        await initCart(this.browser);

        await this.browser.url('http://localhost:3000/hw/store/cart');
    
        assert.isTrue(await this.browser.$('.Cart-Name').isExisting());
        assert.isTrue(await this.browser.$('.Cart-Price').isExisting());
        assert.isTrue(await this.browser.$('.Cart-Count').isExisting());
        assert.isTrue(await this.browser.$('.Cart-Total').isExisting());
        assert.isTrue(await this.browser.$('.Cart-OrderPrice').isExisting());
    })

    it('в корзине должна быть кнопка "очистить корзину", по нажатию на которую все товары должны удаляться', async function() {
        await initCart(this.browser);
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
        await initCart(this.browser);
        
        await this.browser.url('http://localhost:3000/hw/store/cart');
        await this.browser.refresh();
        const cartNotEmpty = await this.browser.$('.Cart-Table').isExisting();
        assert.isTrue(cartNotEmpty); 
    })

    it('Заказ создаётся корректно', async function() {
        await initCart(this.browser);

        await this.browser.url('http://localhost:3000/hw/store/cart');
        await this.browser.$('#f-name').setValue('name');
        await this.browser.$('#f-phone').setValue('9998887766');
        await this.browser.$('#f-address').setValue('123');
        await this.browser.$('.Form-Submit').click();
        
        const successMessage = this.browser.$('.Cart-SuccessMessage.alert-success');
        const orders = await fetch('http://localhost:3000/hw/store/api/orders', {method: 'GET'}).then(data => data.json());

        assert.isTrue(await successMessage.isExisting());
        assert.equal(await successMessage.$('.Cart-Number').getText(), orders.length.toString());
    })
});

async function initCart (browser, items) {
    await browser.url('http://localhost:3000/hw/store');
    await browser.execute((items) => 
        window.localStorage.setItem("example-store-cart", JSON.stringify(items ?? [{"id": 10, "name":"Test","count":1,"price":100}])),
        items
    );
    await browser.refresh();
}
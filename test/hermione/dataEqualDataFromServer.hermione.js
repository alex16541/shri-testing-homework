const { assert } = require('chai');
const api = '**/api/products';
const products = [
    {
        "id": 0,
        "name": "name_1",
        "price": 123
    },
    {
        "id": 1,
        "name": "name_2",
        "price": 118
    },
    {
        "id": 2,
        "name": "name_3",
        "price": 538
    },
]

describe('в каталоге должны отображаться товары, список которых приходит с сервера', async function() {
    it('Стандартный сценарий', async function() {
        const scriptMock = await this.browser.mock(api,{method: 'get'});
        scriptMock.respondOnce(products);

        await this.browser.url('http://localhost:3000/hw/store/catalog');
        const cards = await this.browser.$$('.ProductItem.card');

        for(let i = 0; i < products.length; i++){
            const card = cards[i];
            const product = products[i];
            const name = await card.$('.ProductItem-Name.card-title').getText();
            const price = +(await card.$('.ProductItem-Price.card-text').getText()).split('$').join('');
            const link = await card.$('.ProductItem-DetailsLink.card-link').getAttribute('href');
            assert.equal(link, '/hw/store/catalog/'+product.id);
            assert.deepEqual({name, price}, {name: product.name, price: product.price});
        }
    })
});
const { assert } = require('chai');


describe('для каждого товара в каталоге отображается название, цена и ссылка на страницу с подробной информацией о товаре', async function() {
    it('Корректные данные', async function() {
        await this.browser.url('http://localhost:3000/hw/store/catalog');
        const cards = await this.browser.$$('.ProductItem.card');

        for(let i = 0; i < cards.length; i++){
            const card = cards[i];

            const name = await card.$('.ProductItem-Name').getText();
            const price = await card.$('.ProductItem-Price').getText();
            const linkExists = await card.$('.ProductItem-DetailsLink').isExisting();

            console.log('##############', name, price, linkExists);

            assert.isTrue(name.length > 0 && price.length > 1 && linkExists);
        }
    })
});
const { assert } = require('chai');
const links = [
    'catalog',
    'delivery',
    'contacts',
    'cart',
]

describe('в шапке отображаются ссылки на страницы магазина, а также ссылка на корзину', async function() {
    for(const link of links){
        it(`/store/${link}`, async function() {
            await this.browser.url('http://localhost:3000/hw/store');
            const linkElement = await this.browser.$(`#root nav a[href="/hw/store/${link}"]`);
            assert.exists(linkElement);
        });
    }

    it(`Количество ссылок должно быть равным ${links.length}`, async function() {
        await this.browser.url('http://localhost:3000/hw/store');
        const nav = await this.browser.$('nav div.navbar-nav');

        assert.equal(await nav.$$('//*').length, links.length);
    })
});

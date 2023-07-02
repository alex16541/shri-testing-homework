const { assert } = require('chai');

describe('название магазина в шапке должно быть ссылкой на главную страницу', async function() {
    it('Лого существует', async function() {
        await this.browser.url('http://localhost:3000/hw/store');
        const logo = await this.browser.$('a.Application-Brand');

        assert.exists(logo);
    })
    it('Ссылка в лого ведёт на главную страницу', async function() {
        await this.browser.url('http://localhost:3000/hw/store');
        const logo = await this.browser.$('a.Application-Brand');
        const href = await logo.getAttribute('href');
        assert.equal(href, '/hw/store/');
    })
});

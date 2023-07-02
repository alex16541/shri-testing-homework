const { assert } = require('chai');

describe('при выборе элемента из меню "гамбургера", меню должно закрываться', async function() {
    it('Стандартный сценарий', async function() {
        await this.browser.url('http://localhost:3000/hw/store');
        await this.browser.setWindowSize(575, 600);
        await this.browser.$('nav .Application-Toggler.navbar-toggler').click();
        await this.browser.$('.nav-link').click();
        const navbar = await this.browser.$('.Application-Menu.navbar-collapse');
        await expect(navbar).toHaveElementClassContaining(' collapse ')
    })
});

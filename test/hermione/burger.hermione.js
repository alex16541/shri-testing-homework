const { assert } = require('chai');

describe('на ширине меньше 576px навигационное меню должно скрываться за "гамбургер"', async function() {
    it('Бергер появляется при ширене экрана МЕНЬШЕ 576px', async function() {
        await this.browser.url('http://localhost:3000/hw/store');
        await this.browser.setWindowSize(575, 600);
        
        const burger = await this.browser.$('nav .Application-Toggler.navbar-toggler');
        assert.exists(burger);

        const dispaly = await burger.getCSSProperty('display');
        assert.notEqual(dispaly.value, 'none');
    })

    it('Бергер НЕ появляется при ширене экрана БОЛЬШЕ 576px', async function() {
        await this.browser.url('http://localhost:3000/hw/store');
        await this.browser.setWindowSize(577, 600);
        
        const burger = await this.browser.$('nav .Application-Toggler.navbar-toggler');

        const dispaly = await burger.getCSSProperty('display');
        assert.equal(dispaly.value, 'none');
    })
});

const { assert } = require('chai');
const sizes = [
    { width: 320, height: 480 },
    { width: 768, height: 1024 },
    { width: 1440, height: 900 },
    { width: 1920, height: 1080 },
];

const catalog = [
    {
            "id": 1,
            "name": "name",
            "description": "description",
            "price": 100,
            "color": "color",
            "material": "Soft"
    },
    {
            "id": 2,
            "name": "name",
            "description": "description",
            "price": 100,
            "color": "color",
            "material": "Soft"
    },
    {
            "id": 3,
            "name": "name",
            "description": "description",
            "price": 100,
            "color": "color",
            "material": "Soft"
    },
    {
            "id": 4,
            "name": "name",
            "description": "description",
            "price": 100,
            "color": "color",
            "material": "Soft"
    },
    {
            "id": 6,
            "name": "name",
            "description": "description",
            "price": 100,
            "color": "color",
            "material": "Soft"
    },
    {
            "id": 7,
            "name": "name",
            "description": "description",
            "price": 100,
            "color": "color",
            "material": "Soft"
    },
    {
            "id": 8,
            "name": "name",
            "description": "description",
            "price": 100,
            "color": "color",
            "material": "Soft"
    },
    {
            "id": 9,
            "name": "name",
            "description": "description",
            "price": 100,
            "color": "color",
            "material": "Soft"
    },
    {
            "id": 10,
            "name": "name",
            "description": "description",
            "price": 100,
            "color": "color",
            "material": "Soft"
    },
]

describe('вёрстка должна адаптироваться под ширину экрана', async function() {
    afterEach(async function () { 
        await this.browser.execute(() => 
            window.localStorage.removeItem("example-store-cart") 
        ); 
    });
    it('/store/', async function() {
        await this.browser.url('http://localhost:3000/hw/store');
        
        for(let size of sizes){
            await this.browser.setWindowSize(size.width, size.height)
            await this.browser.assertView(`${size.width}x${size.height}`, 'body');
        }
    });
    it('/store/catalog', async function() {
        const scriptMock = await this.browser.mock('http://localhost:3000/hw/store/api/products');
        scriptMock.respond(catalog);
        await this.browser.url('http://localhost:3000/hw/store/catalog');
        for(let size of sizes){
            await this.browser.refresh();
            await this.browser.setWindowSize(size.width, size.height)
            await this.browser.assertView(`${size.width}x${size.height}`, 'body');
        }
        scriptMock.restore();
    });
    it('/store/catalog/1', async function() {
        const scriptMock = await this.browser.mock('http://localhost:3000/hw/store/api/products/4');
        scriptMock.respond({
            "id": 4,
            "name": "Handcrafted Mouse",
            "description": "New range of formal shirts are designed keeping you in mind. With fits and styling that will make you stand apart",
            "price": 985,
            "color": "magenta",
            "material": "Soft"
        });
        await this.browser.url('http://localhost:3000/hw/store/catalog/4');

        
        for(let size of sizes){
            await this.browser.setWindowSize(size.width, size.height)
            await this.browser.assertView(`${size.width}x${size.height}`, 'body');
        }

        scriptMock.restore();
    });
    it('/store/delivery', async function() {
        await this.browser.url('http://localhost:3000/hw/store/delivery');
        for(let size of sizes){
            await this.browser.setWindowSize(size.width, size.height)
            await this.browser.assertView(`${size.width}x${size.height}`, 'body');
        }
    });
    it('/store/contacts', async function() {
        await this.browser.url('http://localhost:3000/hw/store/contacts');
        for(let size of sizes){
            await this.browser.setWindowSize(size.width, size.height)
            await this.browser.assertView(`${size.width}x${size.height}`, 'body');
        }
    });
    it('/store/cart', async function() {
        initCart(this.browser, [catalog[0]]); 

        await this.browser.url('http://localhost:3000/hw/store/cart');
        for(let size of sizes){
            await this.browser.setWindowSize(size.width, size.height)
            await this.browser.assertView(`${size.width}x${size.height}`, 'body');
        }
        scriptMock.restore();
    });
});

async function initCart (browser, items) {
    await browser.url('http://localhost:3000/hw/store');
    await browser.execute((items) => 
        window.localStorage.setItem("example-store-cart", JSON.stringify(items ?? [{"id": 10, "name":"Test","count":1,"price":100}])),
        items
    );
    await browser.refresh();
}
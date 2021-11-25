describe('Check app', function () {
    it('Should login successfully', async function () {
        await browser.url('https://viktor-silakov.github.io/course-sut');
        await $('#login').setValue('walker@jw.com');
        await $('#password').setValue('password');
        await $('button').click();
        await $('#spinner').waitForDisplayed({ reverse: true });
        const title = await browser.getTitle();
        if (title !== 'Report portal') {
            throw new Error('You don`t login into system!!!');
        }
        const userName = await $('//*[@title="walker@jw.com"]').getText();
        if (userName !== 'John Walker') {
            throw new Error('You don`t login as correct user');
        }
    });

    it('Should display error when find red menu item', async function () {
        const menuItems = await $$('#first-nav-block li');
        for (const item of menuItems) {
            await item.moveTo();
            const backgroundColor = await item.getCSSProperty('background-color');
            const itemName = await item.getText();
            if (backgroundColor.value === 'rgba(255,0,0,1)') {
                throw new Error(`The menu Item ${itemName} has wrong color!`);
            }
        }
    });
});
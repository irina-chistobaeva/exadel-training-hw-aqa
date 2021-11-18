describe('Check app', function () {
    it('Click on hide button', async function () {
        await browser.url('https://viktor-silakov.github.io/course-sut');
        await $('#login').setValue('walker@jw.com');
        await $('#password').setValue('password');
        await $('button').click();
        await browser.pause(3000);
        const stickyElem = await $('header');
        await browser.execute((el) => { el.remove() }, stickyElem);
        await browser.pause(3000);
        const button = await $('button.btn-danger');
        await button.click();
        browser.acceptAlert();
        await browser.pause(3000);
    });
});
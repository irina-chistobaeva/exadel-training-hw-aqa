describe('Check app', function () {
    before(async function () {
        await browser.url('https://viktor-silakov.github.io/course-sut');
        await $('#login').setValue('walker@jw.com');
        await $('#password').setValue('password');
        await $('button').click();
        await $('#spinner').waitForDisplayed({ reverse: true });
    })

    it('Click on hide button', async function () {
        const stickyElem = await $('header');
        await browser.execute((el) => { el.remove() }, stickyElem);
        const button = await $('button.btn-danger');
        await button.click();
        browser.acceptAlert();
    });
});
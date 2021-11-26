describe('Check app', function () {
    before(async function () {
        await browser.url('https://viktor-silakov.github.io/course-sut/index.html?quick');
        await $('#login').setValue('walker@jw.com');
        await $('#password').setValue('password');
        await $('button').click();
        await $('#spinner').waitForDisplayed({ reverse: true });
    })

    function waitForText(selector, text, timeout) {
        return browser.waitUntil(
            async () => (await $(selector).isDisplayed() === true) && (await $(selector).getText() === text),
            {
                timeout: timeout,
                timeoutMsg: `Expected text to be different after ${timeout} ms`
            });
    }

    it('Check Status', async function () {
        await $('#status').click();
        await waitForText('#status', 'Active', 5000);
    });
});
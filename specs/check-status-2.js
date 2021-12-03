describe('Check app', function () {
    before(async function () {
        browser.addCommand('waitForText', async function (text, timeout) {
            return await browser.waitUntil(
                async () => (await this.isDisplayed() && await this.getText() === text),
                {
                    timeout: timeout,
                    timeoutMsg: `Expected text to be different after ${timeout} ms`
                })
        }, true);

        await browser.url('https://viktor-silakov.github.io/course-sut/index.html?quick');
        await $('#login').setValue('walker@jw.com');
        await $('#password').setValue('password');
        await $('button').click();
        await $('#spinner').waitForDisplayed({ reverse: true });
    })

    it('Check Status', async function () {
        await $('#status').click();
        await $('#status').waitForText('Active', 5000);
    });
});
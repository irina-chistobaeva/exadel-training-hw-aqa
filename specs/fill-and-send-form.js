describe('Check app', function () {
    before('Login', async function () {
        await browser.url('https://viktor-silakov.github.io/course-sut/index.html?quick');
        await $('#login').setValue('walker@jw.com');
        await $('#password').setValue('password');
        await $('button').click();
        await $('#spinner').waitForDisplayed({ reverse: true });
    })

    function fillFormUsingJson(jsonString) {
        const formObject = JSON.parse(jsonString);
        for (const field in formObject) {
            $('#' + field).setValue(formObject[field]);
        }
    }

    it('Create and check 1st Manager', async function () {
        await $('//*[@href="./formManager.html"]').click();
        await $('#email').setValue('manager1@test.com');
        await $('#password').setValue('password');
        await $('#address1').setValue('1234, Test str');
        await $('#address2').setValue('1-23');
        await $('#state').selectByVisibleText('United States');
        await $('#zip').setValue('66666');
        await $('#description').setValue('Lorem ipsum dolor sit amet, consectetur adipiscing elit');
        await $('#demo-balance').click();
        await $('#wait-supervisor').click();
        await $('#city').setValue('Alabama');
        await $('#autoComplete_result_0').click();
        await $('//button[starts-with(text(), "Create")]').click();

        let userRow = await $('//*[text()="manager1@test.com"]/..');
        let email = await userRow.$('(//div[@class="tabulator-cell"])[1]').getText();
        if (email !== 'manager1@test.com') {
            throw new Error('Email is not correct');
        }
        const role = await userRow.$('(//div[@class="tabulator-cell"])[2]').getText();
        if (role !== 'manager') {
            throw new Error('Role is not correct');
        }
        const address1 = await userRow.$('(//div[@class="tabulator-cell"])[3]').getText();
        if (address1 !== '1234, Test str') {
            throw new Error('Address 1 is not correct');
        }
        const address2 = await userRow.$('(//div[@class="tabulator-cell"])[4]').getText();
        if (address2 !== '1-23') {
            throw new Error('Address 2 is not correct');
        }
        const city = await userRow.$('(//div[@class="tabulator-cell"])[5]').getText();
        if (city !== 'Alabama') {
            throw new Error('City is not correct');
        }
        const state = await userRow.$('(//div[@class="tabulator-cell"])[6]').getText();
        if (state !== 'US') {
            throw new Error('State is not correct');
        }
        const zip = await userRow.$('(//div[@class="tabulator-cell"])[7]').getText();
        if (zip !== '66666') {
            throw new Error('Zip is not correct');
        }
        const description = await userRow.$('(//div[@class="tabulator-cell"])[8]').getText();
        if (description !== 'Lorem ipsum dolor sit amet, consectetur adipiscing elit') {
            throw new Error('Description is not correct');
        }
        const demo = await userRow.$('(//div[@class="tabulator-cell"])[9]').getText();
        if (demo !== 'on') {
            throw new Error('Demo is not correct');
        }
        const waitForSupervisor = await userRow.$('(//div[@class="tabulator-cell"])[10]').getText();
        if (waitForSupervisor !== 'on') {
            throw new Error('Wait for Supervisor is not correct');
        }
        const ManagerType = await userRow.$('(//div[@class="tabulator-cell"])[11]').getText();
        if (ManagerType !== 'country') {
            throw new Error('Manager type is not correct');
        }
    });

    it('Create and check 2st Manager', async function () {
        await $('//a[contains(.,"Create Manager")]').click();
        await $('#email').setValue('manager2@test.com');
        await $('#password').setValue('password2');
        await $('#address1').setValue('1234, Test2 str');
        await $('#address2').setValue('2-23');
        await $('#state').selectByVisibleText('Canada');
        await $('#zip').setValue('66666');
        await $('#description').setValue('Lorem ipsum dolor sit amet, consectetur adipiscing elit');
        await $('#demo-balance').click();
        await $('#wait-supervisor').click();
        await $('#city').setValue('Ottawa');
        await $('#autoComplete_result_0').click();
        await $('//button[starts-with(text(), "Create")]').click();

        let userRow = await $('//*[text()="manager2@test.com"]/..');
        let email = await userRow.$('(.//div[@class="tabulator-cell"])[1]').getText();
        if (email !== 'manager2@test.com') {
            throw new Error('Email is not correct');
        }
        const role = await userRow.$('(.//div[@class="tabulator-cell"])[2]').getText();
        if (role !== 'manager') {
            throw new Error('Role is not correct');
        }
        const address1 = await userRow.$('(.//div[@class="tabulator-cell"])[3]').getText();
        if (address1 !== '1234, Test2 str') {
            throw new Error('Address 1 is not correct');
        }
        const address2 = await userRow.$('(.//div[@class="tabulator-cell"])[4]').getText();
        if (address2 !== '2-23') {
            throw new Error('Address 2 is not correct');
        }
        const city = await userRow.$('(.//div[@class="tabulator-cell"])[5]').getText();
        if (city !== 'Ottawa') {
            throw new Error('City is not correct');
        }
        const state = await userRow.$('(.//div[@class="tabulator-cell"])[6]').getText();
        if (state !== 'CA') {
            throw new Error('State is not correct');
        }
        const zip = await userRow.$('(.//div[@class="tabulator-cell"])[7]').getText();
        if (zip !== '66666') {
            throw new Error('Zip is not correct');
        }
        const description = await userRow.$('(.//div[@class="tabulator-cell"])[8]').getText();
        if (description !== 'Lorem ipsum dolor sit amet, consectetur adipiscing elit') {
            throw new Error('Description is not correct');
        }
        const demo = await userRow.$('(.//div[@class="tabulator-cell"])[9]').getText();
        if (demo !== 'on') {
            throw new Error('Demo is not correct');
        }
        const waitForSupervisor = await userRow.$('(.//div[@class="tabulator-cell"])[10]').getText();
        if (waitForSupervisor !== 'on') {
            throw new Error('Wait for Supervisor is not correct');
        }
        const ManagerType = await userRow.$('(.//div[@class="tabulator-cell"])[11]').getText();
        if (ManagerType !== 'country') {
            throw new Error('Manager type is not correct');
        }
    });

    it('Create User', async function () {
        await $('//a[contains(.,"Create User")]').click();
        let jsonString = '{"email": "test-user@gmail.com", "password": "password3", "address1": "111 Broadway", "address2": "1-13", "city": "NY", "zip": "77777", "description": "test description"}';
        await fillFormUsingJson(jsonString);
        await $('//button[starts-with(text(), "Create")]').click();
    });
});
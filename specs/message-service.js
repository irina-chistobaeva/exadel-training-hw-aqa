const {
    startClientPC,
    startSatelite,
    stopClientPC,
    stopEarthServer,
    stopSatelite,
    stopMarsServer,
    startEarthServer,
    startMarsServer,
    sendMessage,
    assertResponse
} = require('./stubs/messageservice.stubs');

describe('Message Sending', function () {

    beforeEach('Start Client PC', function () {
        startClientPC();
    });

    context('Proper token and Satellite available:', function () {
        beforeEach('Start Satelite', function () {
            startSatelite();
        });

        it('should send message to Earth => "Success"', function () {
            let earthToken = startEarthServer();
            const response = sendMessage('Hello', 'Earth', earthToken);
            assertResponse(response, 'Success');
            stopEarthServer();
        });

        it('should send message to Mars => "Success"', function () {
            const marsToken = startMarsServer();
            const response = sendMessage('Hello', 'Mars', marsToken);
            assertResponse(response, 'Success');
            stopMarsServer();
        });

        afterEach('Stop Satelite', function () {
            stopSatelite();
        });
    })

    context('Invalid token and Satellite available:', function () {
        beforeEach('Start all nodes', function () {
            startSatelite();
            startEarthServer();
            startMarsServer();
        });

        it('should send message to Earth => "Security Error"', function () {
            const earthToken = 'W1234';
            const response = sendMessage('Hello', 'Earth', earthToken);
            assertResponse(response, 'Security Error');
        });

        it('should send message to Mars => "Security Error"', function () {
            const marsToken = 'W1234';
            const response = sendMessage('Hello', 'Mars', marsToken);
            assertResponse(response, 'Security Error');
        });

        afterEach('Stop all nodes', function () {
            stopSatelite();
            stopMarsServer();
            stopEarthServer();
        });
    })

    context('Proper token and Satellite disabled:', function () {
        beforeEach('Start Mars Server', function () {
            startMarsServer();
        });

        it('should send message to Mars => "Service is unavailable"', function () {
            const marsToken = startMarsServer();
            const response = sendMessage('Hello', 'Mars', marsToken);
            assertResponse(response, 'Service is unavailable');
        });

        afterEach('Stop Mars Server', function () {
            stopMarsServer();
        });
    })

    context('Invalid token and Satellite disabled:', function () {
        beforeEach('Start Mars Server', function () {
            startMarsServer();
        });

        it('should send message to Mars => "Service is unavailable"', function () {
            const marsToken = 'W1234';
            const response = sendMessage('Hello', 'Mars', marsToken);
            assertResponse(response, 'Service is unavailable');
        });

        afterEach('Stop Mars Server', function () {
            stopMarsServer();
        });
    })

    afterEach('Stop Client PC', function () {
        stopClientPC();
    });
})

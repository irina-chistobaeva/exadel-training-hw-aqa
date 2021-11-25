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

    before('Start Client PC', function () {
        startClientPC();
    });

    context('All nodes presented:', function () {
        beforeEach('Start Satelite', function () {
            startSatelite();
        });

        it('should send message to Earth without error', function () {
            let earthToken = startEarthServer();
            const response = sendMessage('Hello', 'Earth', earthToken);
            assertResponse(response, 'Success');
        });

        it('should send message to Mars without error', function () {
            const marsToken = startMarsServer();
            const response = sendMessage('Hello', 'Mars', marsToken);
            assertResponse(response, 'Success');
        });

        afterEach('Stop all nodes', function () {
            stopMarsServer();
            stopEarthServer();
            stopSatelite();
        });
    })

    context('Invalid token present:', function () {
        beforeEach('Start all nodes', function () {
            startSatelite();
            startEarthServer();
            startMarsServer();
        });

        it('should not send message to Earth with invalid token', function () {
            const earthToken = 'W1234';
            const response = sendMessage('Hello', 'Earth', earthToken);
            if (response !== 'Success') {
                throw new Error('Token is invalid');
            }
        });

        it('should not send message to Mars with invalid token', function () {
            const marsToken = 'W1234';
            const response = sendMessage('Hello', 'Mars', marsToken);
            if (response !== 'Success') {
                throw new Error('Token is invalid');
            }
        });

        afterEach('Stop all nodes', function () {
            stopSatelite();
            stopMarsServer();
            stopEarthServer();
        });
    })

    context('Satellite disabled:', function () {
        beforeEach('Start Mars Server', function () {
            startMarsServer();
        });

        it('should not send message to Mars with valid token but disabled satellite', function () {
            const marsToken = startMarsServer();
            const response = sendMessage('Hello', 'Mars', marsToken);
            if (response !== 'Success') {
                throw new Error('Satellite is disabled');
            }
        });

        it('should not send message to Mars with invalid token and disabled satellite', function () {
            const marsToken = 'W1234';
            const response = sendMessage('Hello', 'Mars', marsToken);
            if (response !== 'Success') {
                throw new Error('Token is invalid and satellite is disabled');
            }
        });

        afterEach('Stop Mars Server', function () {
            stopMarsServer();
        });
    })
    after('Stop Client PC', function () {
        stopClientPC();
    });
})

'use strict';

var testType = process.env['SPAMTEST'],
	chatty = process.env['SPAMTESTCHATTY'] === 'true',
	signal = require('../../lib/spam').signal,
	http = require('http');


if (chatty) {
	switch (testType) {
	case 'worker':
		console.log('Hi, I\'m a Worker');
		break;
	case 'listener':
		console.log('Hi, I\'m a Listener');
		break;
	case 'broken':
		console.log('Hi, I\'m broken');
		break;
	default:
		throw new Error('Unexpected testType ' + testType);
	}
}

function wait(callback) {
	setTimeout(callback, 40);
}

wait(function () {
	if (chatty) {
		console.log('step 1');
	}

	wait(function () {
		if (chatty) {
			console.log('step 2');
		}

		wait(function () {
			if (chatty) {
				console.log('step 3');
			}

			wait(function () {
				/* jshint maxcomplexity:8 */

				switch (testType) {
				case 'worker':
					if (chatty) {
						console.log('ready');
					}
					signal.ready();
					break;
				case 'listener':
					if (chatty) {
						console.log('about to listen');
					}
					try {
						http.createServer(function () {
							// do nothing
						}).listen();
					} catch (err) {}
					break;
				case 'broken':
					if (chatty) {
						console.log('oops');
					}
					throw new Error('oops');
				}
			});
		});
	});
});

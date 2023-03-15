import winston from 'winston';

// winston.setLevels(winston.config.syslog.levels)

winston.configure({
	transports: [
		new winston.transports.Console(),
		new winston.transports.File({
			filename: 'server-info.log',
			level: 'info',
		}),
		new winston.transports.File({
			filename: 'server-error.log',
			level: 'error',
		}),
	],
});

export default winston;

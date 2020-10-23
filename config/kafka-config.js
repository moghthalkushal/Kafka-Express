module.exports = {
    clientId: process.env.CLIENT_ID,
    kafka_topic: process.env.KAFKA_TOPIC,
    brokers: process.env.BROKERS.split(','),
    connectionTimeout: process.env.connectionTimeout,
    authenticationTimeout: process.env.authenticationTimeout,
    reauthenticationThreshold: process.env.reauthenticationThreshold,
};

/** To Do
 * Config validation
*/
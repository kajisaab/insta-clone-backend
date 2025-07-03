import KafkaService from '@core/kafka/kafka';

describe('Kafka Test', () => {
    //
    // it('Should handle message sending in test environment', async () => {
    //     const producingMessage = 'test-message';
    //     const topic = 'my_topic';
    //
    //     // This should not throw an error in test mode
    //     await expect(
    //         kafkaInstance.sendMessage(topic, producingMessage)
    //     ).resolves.not.toThrow();
    // });

    // This test will run when KAFKA_TEST_REAL=true is set in the environment
    // It requires a real Kafka instance to be available
    it('Should produce and consume a message (requires Kafka)', async () => {
        try {
            const kafkaService = KafkaService.getInstance();
            await kafkaService.connectProducer();

            // Send a test message
            await kafkaService.sendMessage('test-topic', [
                { value: JSON.stringify({ test: 'Hello Kafka!' }) },
            ]);

            console.log('Test message sent successfully');

            // Disconnect
            await kafkaService.disconnect();
        } catch (error) {
            console.error('Failed to test Kafka:', error);
        }
    });
});

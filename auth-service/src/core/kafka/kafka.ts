import { Kafka, Producer, Consumer, EachMessagePayload, logLevel, Partitioners } from 'kafkajs';
import AppLogger from '@core/logger';

class KafkaService {
    private static instance: KafkaService;
    private kafka: Kafka;
    private producer: Producer;
    private consumer: Consumer;
    private logger: AppLogger = new AppLogger();

    private constructor() {
        this.kafka = new Kafka({
            clientId: 'my-kafka-client',
            brokers: ['kafka1:29092', 'kafka2:29092'],
            logLevel: logLevel.INFO,
        });

        this.producer = this.kafka.producer({
            allowAutoTopicCreation: true,
            // Add this to use the default partitioner
            createPartitioner: Partitioners.DefaultPartitioner,
        });
        this.consumer = this.kafka.consumer({ groupId: 'my-group' });
    }

    public static getInstance(): KafkaService {
        if (!KafkaService.instance) {
            KafkaService.instance = new KafkaService();
        }
        return KafkaService.instance;
    }

    public async connectProducer(): Promise<void> {
        try {
            await this.producer.connect();
            this.logger.log('✅ Kafka producer connected');
        } catch (err) {
            this.logger.error(`❌ Kafka producer connection failed: ${err}`);
            throw err; // Re-throw to handle in caller
        }
    }

    public async connectConsumer(topic: string, fromBeginning: boolean, messageHandler: (payload: EachMessagePayload) => Promise<void>): Promise<void> {
        try {
            await this.consumer.connect();
            await this.consumer.subscribe({ topic, fromBeginning });
            await this.consumer.run({
                eachMessage: messageHandler,
            });
            this.logger.log(`✅ Kafka consumer connected and subscribed to ${topic}`);
        } catch (err) {
            this.logger.error(`❌ Kafka consumer connection failed: ${err}`);
            throw err;
        }
    }

    public async sendMessage(topic: string, messages: { key?: string; value: string }[]): Promise<void> {
        try {
            const result = await this.producer.send({
                topic,
                messages: messages.map((m) => ({
                    key: m.key || null,
                    value: m.value,
                })),
            });
            this.logger.log(`📤 Message sent to ${topic}, ${result}`);
        } catch (err) {
            this.logger.error(`❌ Failed to send message: ${err}`);
            throw err; // Re-throw to handle in caller
        }
    }

    public async disconnect(): Promise<void> {
        await this.producer.disconnect();
        await this.consumer.disconnect();
        this.logger.log('🔌 Kafka disconnected');
    }
}

export default KafkaService;

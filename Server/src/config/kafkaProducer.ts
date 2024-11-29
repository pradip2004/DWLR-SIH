import { Kafka } from 'kafkajs';
import { EventEmitter } from 'events';

EventEmitter.defaultMaxListeners = 20;

const topic = process.env.KAFKA_TOPIC || 'DWLR-new';
let isProducerReady = false;
let producerConnecting = false;
let connectionPromise: Promise<void> | null = null;

const kafka = new Kafka({
  clientId: 'my-app',
  brokers: [process.env.KAFKA_BROKER || 'localhost:9092'],
  retry: { initialRetryTime: 100, retries: 8 },
});

const producer = kafka.producer({ allowAutoTopicCreation: true, transactionTimeout: 30000 });

const connectProducer = async () => {
  if (producerConnecting) return connectionPromise;

  producerConnecting = true;
  connectionPromise = (async () => {
    try {
      await producer.connect();
      console.log('Kafka Producer connected successfully');
      isProducerReady = true;
    } catch (error) {
      console.error('Failed to connect Kafka producer:', error);
      isProducerReady = false;
      throw error;
    } finally {
      producerConnecting = false;
    }
  })();

  return connectionPromise;
};

export const sendToKafka = async (message: any) => {
  try {
    if (!isProducerReady) await connectProducer();

    const payload = {
      topic,
      messages: [{ value: JSON.stringify(message), timestamp: Date.now().toString() }],
      partition: 0
    };

    const result = await producer.send(payload);
    console.log('Successfully sent data to Kafka:', result);
    return result;
  } catch (error) {
    console.error('Failed to send data to Kafka:', error);
    throw error;
  }
};

process.on('SIGINT', async () => {
  console.log('Shutting down Kafka producer...');
  await producer.disconnect();
  process.exit(0);
});

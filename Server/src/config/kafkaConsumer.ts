import { Kafka } from 'kafkajs';
import { DWLR } from '../model/dwlr';
import { DailyDWLRData } from '../model/dwlrData';

const kafka = new Kafka({
  clientId: 'my-app',
  brokers: [process.env.KAFKA_BROKER || 'localhost:9092'],
  retry: { initialRetryTime: 100, retries: 8 },
});

const consumer = kafka.consumer({
  groupId: 'dwlr-consumer-group',
  sessionTimeout: 30000,
  heartbeatInterval: 3000,
});

const topic = process.env.KAFKA_TOPIC || 'DWLR-new';

export const runConsumer = async () => {
  try {
    await consumer.connect();
    console.log('Kafka Consumer connected successfully');
    await consumer.subscribe({ topic, fromBeginning: false });

    await consumer.run({
      eachMessage: async ({ message }) => {
        try {
          const dwlrData = JSON.parse(message.value?.toString() || '{}');
          console.log('Received Kafka message:', dwlrData);

          const dwlr = await DWLR.findOne({ id: dwlrData.id }).select('_id');
          if (!dwlr) {
            console.error(`DWLR with id ${dwlrData.id} not found.`);
            return;
          }

          const today = new Date();
          const dateString = new Date(today.getFullYear(), today.getMonth(), today.getDate());

          const dailyData = await DailyDWLRData.findOneAndUpdate(
            { dwlrId: dwlr._id, date: dateString },
            {
              $push: {
                dailyData: {
                  waterLevel: parseFloat(dwlrData.waterLevel),
                  batteryPercentage: parseFloat(dwlrData.batteryPercentage),
                  timestamp: new Date(dwlrData.timestamp),
                  temperature: parseFloat(dwlrData.temperature),
                },
              },
            },
            { upsert: true, new: true }
          );

          console.log('Saved/updated daily data:', dailyData);
        } catch (err) {
          console.error('Error processing Kafka message:', err);
        }
      },
    });
  } catch (error) {
    console.error('Failed to start Kafka consumer:', error);
    process.exit(1);
  }
};

process.on('SIGINT', async () => {
  console.log('Shutting down Kafka consumer...');
  await consumer.disconnect();
  process.exit(0);
});

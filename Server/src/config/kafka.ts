import { KafkaClient } from "kafka-node";

const kafkaBroker =  "localhost:9092";

export const kafkaClient = new KafkaClient({ kafkaHost: kafkaBroker });

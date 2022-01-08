// reqired packages
const config = require('../config')
const Queue = require('bull')
const path = require('path')

const transcodingQueue = new Queue('video transcoding', `redis://${config.redis.host}:${config.redis.port}`)
const cleaningQueue = new Queue('file cleaning', `redis://${config.redis.host}:${config.redis.port}`)

// const transcodingProcessorPath = path.join(__dirname, '../queues/processors/transcoding.processor.js')
const cleaningProcessorPath = path.join(__dirname, '../queues/processors/cleaning.processor.js')
cleaningQueue.process(cleaningProcessorPath)

module.exports = { transcodingQueue, cleaningQueue }

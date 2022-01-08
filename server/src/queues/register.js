const transcodingProcessor = require('./processors/transcoding.processor')
const { transcodingQueue } = require('./queue')

transcodingQueue.process(transcodingProcessor)
console.log('queue processors registerd')

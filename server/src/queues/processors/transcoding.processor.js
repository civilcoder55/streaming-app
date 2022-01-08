const ffmpeg = require('fluent-ffmpeg')
const path = require('path')
const config = require('../../config')
// const fs = require('fs')
const { transcodingQueue, cleaningQueue } = require('../../queues/queue')

module.exports = async function (job, done) {
  const dataPath = path.join(__dirname, '../../../../media/data')
  const outputFilePath = `${dataPath}/${job.data.id}_${job.data.quality}.m3u8`

  // if (!fs.existsSync(outputPath)) {
  //   fs.mkdirSync(outputPath)
  // }

  ffmpeg(job.data.filepath, { timeout: 432000 })
    .addOptions(config.ffmpeg.options[job.data.quality])
    .output(outputFilePath)
    .on('progress', progress => {
      job.progress(progress.percent)
      console.log(job.id, progress.percent)
    })
    .on('error', err => {
      console.log('An error occurred: ' + err.message)
      done(new Error(err.message))
    })
    .on('end', () => {
      job.progress(100)
      if (job.data.quality < 3) {
        const quality = job.data.quality += 1
        transcodingQueue.add({ id: job.data.id, title: job.data.title, filepath: job.data.filepath, quality }, { lifo: true })
      } else {
        cleaningQueue.add({ id: job.data.id, filepath: job.data.filepath })
      }
      done()
    })
    .run()
}

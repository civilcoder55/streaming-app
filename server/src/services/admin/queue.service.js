// required queue
const { transcodingQueue } = require('../../queues/queue')

module.exports = class AdminQueueService {
  async getQueueJobs () {
    return await transcodingQueue.getJobs()
  }

  async deleteJob (id) {
    const job = await transcodingQueue.getJob(id)
    if (job) {
      await job.remove()
    }
  }
}

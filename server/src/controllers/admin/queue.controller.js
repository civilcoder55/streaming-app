// required services
const adminQueueService = new (require('../../services/admin/queue.service'))()

module.exports = class AdminQueueController {
  async index (req, res) {
    const jobs = await adminQueueService.getQueueJobs()
    for (let i = 0; i < jobs.length; i++) {
      jobs[i].state = await jobs[i].getState()
    }
    return res.render('admin/queues', { jobs })
  }

  async delete (req, res) {
    const id = req.params.id
    await adminQueueService.deleteJob(id)
    req.flash('success', 'Job deleted successfully')
    req.session.save(() => {
      return res.redirect('/admin/queue')
    })
  }
}

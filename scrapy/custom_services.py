from scrapyd.webservice import WsResource
from scrapyd.utils import *
import uuid
from copy import copy
import subprocess


class Response(WsResource):
    def render_POST(self, txrequest):
        args = native_stringify_dict(copy(txrequest.args), keys_only=False)
        settings = args.pop('setting', [])
        settings = dict(x.split('=', 1) for x in settings)
        args = dict((k, v[0]) for k, v in args.items())
        project = args.pop('project')
        spider = args.pop('spider')
        version = args.get('_version', '')
        spiders = get_spider_list(project, version=version)
        if not spider in spiders:
            return {"status": "error", "message": "spider '%s' not found" % spider}
        args['settings'] = settings
        jobid = args.pop('jobid', uuid.uuid1().hex)
        args['_job'] = jobid

        result = subprocess.run(["scrapy", "crawl", "movie", "-a", "url="+args['url']],cwd="/usr/src/app" ,stdout=subprocess.PIPE)
        return {"result": result.stdout.decode('utf-8'), "node_name": self.root.nodename, "status": "ok"}

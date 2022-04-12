# -*- coding: utf-8 -*-
import scrapy
from scrapy.exceptions import CloseSpider

class MovieSpider(scrapy.Spider):
    name = 'movie'
    allowed_domains = ['www.imdb.com']

    user_agent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.100 Safari/537.36'

    def __init__(self,url=None, *args, **kwargs):
        super(MovieSpider, self).__init__(*args, **kwargs)
        if url:
            self.url = url
        else :
            raise CloseSpider('No Url Provided')



    def start_requests(self):
        yield scrapy.Request(url=self.url, headers={
            'User-Agent': self.user_agent
        })


    
    def parse(self, response):
        title = response.xpath("//h1[contains(@data-testid,'hero-title-block__original-title')]/text()").get()
        if not title:
            title = response.xpath("//h1[contains(@data-testid,'hero-title-block__title')]/text()").get()
        else:
            title = title.replace("Original title: ","")
        yield {
            'title': title,
            'year': response.xpath("(//li[@class='ipc-inline-list__item']/a/text())[1]").get(),
            'duration': response.xpath("normalize-space(//li[@class='ipc-inline-list__item']/text())").get(),
            'genre': response.xpath("//li[contains(@data-testid,'storyline-genres')]/div/ul/li/a//text()").getall(),
            'rate': response.xpath("//div[contains(@data-testid,'hero-rating-bar__aggregate-rating__score')]/span/text()").get(),
            'description' : response.xpath("//span[contains(@data-testid,'plot-l')]//text()").get(),
            'country' : response.xpath("//li[contains(@data-testid,'title-details-origin')]/div/ul/li/a//text()").get()
        }

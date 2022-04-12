FROM python:3.9-alpine
 
# Set the working directory to /usr/src/app.
WORKDIR /usr/src/app
 
RUN apk add --update --no-cache libxslt-dev bash openssh libxml2-dev 
RUN apk add --update --no-cache --virtual .tmp-build-deps \
    gcc linux-headers musl-dev libffi-dev \
    openssl-dev python3-dev python3  git 

RUN pip3 install --no-cache-dir scrapy==1.6
RUN pip3 install git+https://github.com/scrapy/scrapyd-client
RUN pip3 install scrapyd

RUN apk del .tmp-build-deps


COPY . .
COPY ./custom_services.py /usr/local/lib/python3.9/site-packages/scrapyd
RUN scrapyd & wait & scrapyd-deploy

CMD [ "scrapyd" ]
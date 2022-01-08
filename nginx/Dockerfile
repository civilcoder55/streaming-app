FROM nginx:alpine

RUN wget "http://nginx.org/download/nginx-${NGINX_VERSION}.tar.gz" -O nginx.tar.gz && \
    wget "https://github.com/TeslaGov/ngx-http-auth-jwt-module/archive/refs/heads/master.zip" -O jwt-module.zip





RUN apk add --no-cache --virtual .build-deps \
    gcc \
    libc-dev \
    make \
    openssl-dev \
    pcre-dev \
    zlib-dev \
    linux-headers \
    curl \
    gnupg \
    libxslt-dev \
    gd-dev \
    geoip-dev \
    unzip

RUN apk add --no-cache -X http://dl-cdn.alpinelinux.org/alpine/edge/testing libjwt-dev jansson-dev

# nginx lua required packages
RUN wget "https://github.com/openresty/lua-nginx-module/archive/refs/tags/v0.10.20.zip" -O lua-module.zip && \
    wget "https://github.com/openresty/luajit2/archive/refs/tags/v2.1-20211210.zip" -O luajit2.zip && \
    wget "https://github.com/openresty/lua-resty-core/archive/refs/tags/v0.1.22.zip" -O lua-resty-core.zip && \
    wget "https://github.com/openresty/lua-resty-lrucache/archive/refs/tags/v0.10.zip" -O lua-resty-lrucache.zip


# compile and install all required packages and modules
RUN CONFARGS=$(nginx -V 2>&1 | sed -n -e 's/^.*arguments: //p')\ 
    mkdir -p /usr/src && tar -zxC /usr/src -f nginx.tar.gz && \
    unzip "jwt-module.zip" -d /usr/src && \
    unzip "lua-module.zip" -d /usr/src && \
    unzip "luajit2.zip" -d /usr/src && \
    unzip "lua-resty-core.zip" -d /usr/src && \
    unzip "ua-resty-lrucache.zip" -d /usr/src && \
    export LUAJIT_LIB=/usr/local/luajit/lib && \
    export LUAJIT_INC=/usr/local/luajit/include/luajit-2.1 && \
    cd /usr/src/luajit2-2.1-20211210 && make && make install PREFIX=/usr/local/luajit && \
    cd /usr/src/lua-resty-core-0.1.22 && make install PREFIX=/opt/nginx && \
    cd /usr/src/lua-resty-lrucache-0.10 && make install PREFIX=/opt/nginx && \
    cd /usr/src/nginx-$NGINX_VERSION && \
    ./configure --with-compat $CONFARGS --add-dynamic-module=../ngx-http-auth-jwt-module-master --add-dynamic-module=../lua-nginx-module-0.10.20 && \
    make && make install





RUN cp  /usr/local/nginx/modules/ngx_http_auth_jwt_module.so /etc/nginx/modules/ngx_http_auth_jwt_module.so
RUN cp  /usr/local/nginx/modules/ngx_http_lua_module.so /etc/nginx/modules/ngx_http_lua_module.so
RUN cp /usr/local/luajit/lib/libluajit-5.1.so.2 /usr/local/lib/
COPY nginx.conf /etc/nginx/nginx.conf
COPY default.conf /etc/nginx/conf.d/default.conf


EXPOSE 80
STOPSIGNAL SIGTERM
CMD ["nginx", "-g", "daemon off;"]




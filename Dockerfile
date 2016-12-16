FROM nginx:1.11
MAINTAINER wp_mailbox@163.com

RUN rm -rf /usr/share/nginx/html/index.html
ADD pages.tar /usr/share/nginx/html/


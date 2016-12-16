FROM nginx:1.11
MAINTAINER wp_mailbox@163.com

RUN rm -rf /usr/share/nginx/html/index.html
ADD css/ img/ js/ index.html /usr/share/nginx/html/


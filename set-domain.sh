#!/bin/sh
# Usage: ./set-domain.sh malvo.com   (replaces YOUR-DOMAIN everywhere)
[ -z "$1" ] && echo "usage: $0 yourdomain.com" && exit 1
sed -i.bak "s/YOUR-DOMAIN/$1/g" index.html ar.html robots.txt sitemap.xml && rm -f *.bak && echo done

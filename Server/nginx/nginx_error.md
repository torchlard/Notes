# nginx: [emerg] host not found in upstream "xxx.xxx:8080" in /xx/xx/xx/conf/xx_setting.conf
reason: xxx.xxx hostname not resolved
solution:
其实nginx配置语法上没有错误的,只是系统无法解析这个域名,所以报错.
解决办法就是添加dns到/etc/resolv.conf 或者是/etc/hosts,让其能够解析到IP。具体步骤如下：

vim /etc/hosts
修改hosts文件，在hosts文件里面加上一句
127.0.0.1       localhost.localdomain   yq.object.com














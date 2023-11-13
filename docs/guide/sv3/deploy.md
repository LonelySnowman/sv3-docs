# 项目部署

项目部署推荐使用`nginx`代理进行部署

## 打包项目
首先我们需要将代码进行打包
```bash
pnpm run build
```
然后将生成的dist文件放置到服务器

## nginx配置

```editorconfig
server {
    location / {
        root   html;
        index  index.html index.htm;
        try_files $uri $uri/ /index.html;
    }
    
    # 此处为前端项目中配置的BASEURL
    location /api {
        # proxy_pass编写项目地址
        proxy_pass http://127.0.0.1:3000/;
        proxy_set_header Host $host;
        proxy_set_header Cookie $http_cookie;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_redirect default;
        add_header Access-Control-Allow-Origin *;
        add_header Access-Control-Allow-Headers X-Requested-With;
        add_header Access-Control-Allow-Methods GET,POST,OPTIONS;
    }
}
```

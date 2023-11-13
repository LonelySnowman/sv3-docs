import{_ as s,o as a,c as n,d as e}from"./app.a4c01adc.js";const y=JSON.parse('{"title":"项目部署","description":"","frontmatter":{},"headers":[{"level":2,"title":"打包项目","slug":"打包项目","link":"#打包项目","children":[]},{"level":2,"title":"nginx配置","slug":"nginx配置","link":"#nginx配置","children":[]}],"relativePath":"guide/sv3/deploy.md","lastUpdated":1699846681000}'),l={name:"guide/sv3/deploy.md"},p=e(`<h1 id="项目部署" tabindex="-1">项目部署 <a class="header-anchor" href="#项目部署" aria-hidden="true">#</a></h1><p>项目部署推荐使用<code>nginx</code>代理进行部署</p><h2 id="打包项目" tabindex="-1">打包项目 <a class="header-anchor" href="#打包项目" aria-hidden="true">#</a></h2><p>首先我们需要将代码进行打包</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#FFCB6B;">pnpm</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">run</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">build</span></span>
<span class="line"></span></code></pre></div><p>然后将生成的dist文件放置到服务器</p><h2 id="nginx配置" tabindex="-1">nginx配置 <a class="header-anchor" href="#nginx配置" aria-hidden="true">#</a></h2><div class="language-txt"><button title="Copy Code" class="copy"></button><span class="lang">txt</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#babed8;">server {</span></span>
<span class="line"><span style="color:#babed8;">    location / {</span></span>
<span class="line"><span style="color:#babed8;">        root   html;</span></span>
<span class="line"><span style="color:#babed8;">        index  index.html index.htm;</span></span>
<span class="line"><span style="color:#babed8;">        try_files $uri $uri/ /index.html;</span></span>
<span class="line"><span style="color:#babed8;">    }</span></span>
<span class="line"><span style="color:#babed8;">    </span></span>
<span class="line"><span style="color:#babed8;">    # 此处为前端项目中配置的BASEURL</span></span>
<span class="line"><span style="color:#babed8;">    location /api {</span></span>
<span class="line"><span style="color:#babed8;">        # proxy_pass编写项目地址</span></span>
<span class="line"><span style="color:#babed8;">        proxy_pass http://127.0.0.1:3000/;</span></span>
<span class="line"><span style="color:#babed8;">        proxy_set_header Host $host;</span></span>
<span class="line"><span style="color:#babed8;">        proxy_set_header Cookie $http_cookie;</span></span>
<span class="line"><span style="color:#babed8;">        proxy_set_header X-Real-IP $remote_addr;</span></span>
<span class="line"><span style="color:#babed8;">        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;</span></span>
<span class="line"><span style="color:#babed8;">        proxy_redirect default;</span></span>
<span class="line"><span style="color:#babed8;">        add_header Access-Control-Allow-Origin *;</span></span>
<span class="line"><span style="color:#babed8;">        add_header Access-Control-Allow-Headers X-Requested-With;</span></span>
<span class="line"><span style="color:#babed8;">        add_header Access-Control-Allow-Methods GET,POST,OPTIONS;</span></span>
<span class="line"><span style="color:#babed8;">    }</span></span>
<span class="line"><span style="color:#babed8;">}</span></span>
<span class="line"><span style="color:#babed8;"></span></span></code></pre></div>`,8),o=[p];function t(r,d,c,i,b,h){return a(),n("div",null,o)}const x=s(l,[["render",t]]);export{y as __pageData,x as default};

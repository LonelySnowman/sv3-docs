import{_ as s,o as a,c as n,d as l}from"./app.a4c01adc.js";const u=JSON.parse('{"title":"快速开始","description":"","frontmatter":{},"headers":[{"level":2,"title":"📕克隆项目","slug":"📕克隆项目","link":"#📕克隆项目","children":[]},{"level":2,"title":"🚗安装依赖","slug":"🚗安装依赖","link":"#🚗安装依赖","children":[]},{"level":2,"title":"🚀启动项目","slug":"🚀启动项目","link":"#🚀启动项目","children":[]}],"relativePath":"guide/sv3/quickstart.md","lastUpdated":1699846681000}'),e={name:"guide/sv3/quickstart.md"},p=l(`<h1 id="快速开始" tabindex="-1">快速开始 <a class="header-anchor" href="#快速开始" aria-hidden="true">#</a></h1><h2 id="📕克隆项目" tabindex="-1">📕克隆项目 <a class="header-anchor" href="#📕克隆项目" aria-hidden="true">#</a></h2><ul><li>使用 git 下载项目模板</li></ul><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#676E95;font-style:italic;"># 下载包含简单示例的版本</span></span>
<span class="line"><span style="color:#FFCB6B;">git</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">clone</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">git@github.com:LonelySnowman/sv3-template.git</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 下载除去示例用于快速开始项目的 thin 版本</span></span>
<span class="line"><span style="color:#FFCB6B;">git</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">clone</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">-b</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">thin</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">git@github.com:LonelySnowman/sv3-template.git</span></span>
<span class="line"></span></code></pre></div><ul><li>项目包含命令行cli下载工具</li></ul><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#676E95;font-style:italic;"># 下载工具包</span></span>
<span class="line"><span style="color:#FFCB6B;">npm</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">install</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">arceus-cli</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">-g</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 选择模板创建项目</span></span>
<span class="line"><span style="color:#FFCB6B;">arceus</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">create</span></span>
<span class="line"></span></code></pre></div><h2 id="🚗安装依赖" tabindex="-1">🚗安装依赖 <a class="header-anchor" href="#🚗安装依赖" aria-hidden="true">#</a></h2><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#676E95;font-style:italic;"># 进入项目根目录</span></span>
<span class="line"><span style="color:#82AAFF;">cd</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">sv3-template</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 本项目推荐使用pnpm进行依赖管理</span></span>
<span class="line"><span style="color:#FFCB6B;">pnpm</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">install</span></span>
<span class="line"></span></code></pre></div><h2 id="🚀启动项目" tabindex="-1">🚀启动项目 <a class="header-anchor" href="#🚀启动项目" aria-hidden="true">#</a></h2><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#FFCB6B;">pnpm</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">run</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">dev</span></span>
<span class="line"></span></code></pre></div><br><ul><li>默认在 3000 端口启动，如果端口被占用则向后沿用</li></ul>`,12),t=[p];function o(c,i,r,d,y,h){return a(),n("div",null,t)}const E=s(e,[["render",o]]);export{u as __pageData,E as default};

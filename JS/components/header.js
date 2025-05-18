// 顶部导航栏组件
class Header extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    // 获取当前页面的路径
    const currentPath = window.location.pathname;
    const isInHTMLDir = currentPath.includes('/HTML/');
    
    // 根据页面位置设置基础路径
    const basePath = isInHTMLDir ? '../' : '';
    
    this.innerHTML = `
      <div class="top">
        <ul class="loginbar clearboth container">
          <li><a href="${basePath}index.html">刺绣<span>中国</span></a></li>
          <li>&nbsp;&nbsp;|&nbsp;&nbsp;<a href="${basePath}HTML/rigister.html">注册</a></li>
          <li>&nbsp;|&nbsp;</li>
          <li><a href="${basePath}HTML/login.html">登录</a></li>
        </ul>
      </div>
      <div id="header">
        <ul class="nav clearboth container">
          <li><a href="${basePath}index.html">首页</a></li>
          <li><a href="${basePath}HTML/role_intro.html">流派介绍</a></li>
          <li><a href="${basePath}HTML/atlas.html">图集欣赏</a></li>
          <li><a href="${basePath}HTML/video.html">在线视频</a></li>
          <li><a href="${basePath}HTML/awards.html">获奖记录</a></li>
          <li><a href="${basePath}HTML/contactus.html">联系我们</a></li>
          <li><a href="${basePath}HTML/private.html">个人资料</a></li>
        </ul>
      </div>
    `;
  }
}

customElements.define('site-header', Header); 
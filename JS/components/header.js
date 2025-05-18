// 顶部导航栏组件
class Header extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
      <div class="top">
        <ul class="loginbar clearboth container">
          <li><a href="index.html">刺绣<span>中国</span></a></li>
          <li>&nbsp;&nbsp;|&nbsp;&nbsp;<a href="HTML/rigister.html">注册</a></li>
          <li>&nbsp;|&nbsp;</li>
          <li><a href="HTML/login.html">登录</a></li>
        </ul>
      </div>
      <div id="header">
        <ul class="nav clearboth container">
          <li><a href="index.html">首页</a></li>
          <li><a href="HTML/role_intro.html">流派介绍</a></li>
          <li><a href="HTML/atlas.html">图集欣赏</a></li>
          <li><a href="HTML/video.html">在线视频</a></li>
          <li><a href="HTML/awards.html">获奖记录</a></li>
          <li><a href="HTML/contactus.html">联系我们</a></li>
          <li><a href="HTML/private.html">个人资料</a></li>
        </ul>
      </div>
    `;
  }
}

customElements.define('site-header', Header); 
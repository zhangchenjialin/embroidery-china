// 页脚组件
class Footer extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
      <div class="copyright">
        版权声明©${new Date().getFullYear()}My.All Rights Reserved.
      </div>
    `;
  }
}

customElements.define('site-footer', Footer); 
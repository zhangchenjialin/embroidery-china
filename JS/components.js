// 组件加载器
document.addEventListener('DOMContentLoaded', () => {
  // 加载所有组件
  loadComponents();
  
  // 设置当前页面的导航高亮
  setCurrentNav();
});

// 加载组件
async function loadComponents() {
  // 加载头部组件
  const headerScript = document.createElement('script');
  headerScript.src = 'JS/components/header.js';
  document.head.appendChild(headerScript);
  
  // 加载页脚组件
  const footerScript = document.createElement('script');
  footerScript.src = 'JS/components/footer.js';
  document.head.appendChild(footerScript);
}

// 设置当前页面的导航高亮
function setCurrentNav() {
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.nav a');
  
  navLinks.forEach(link => {
    const linkPath = link.getAttribute('href');
    // 处理首页
    if (currentPath === '/' || currentPath.endsWith('index.html')) {
      if (linkPath === 'index.html') {
        link.classList.add('current-nav');
      }
    }
    // 处理其他页面
    else if (currentPath.endsWith(linkPath)) {
      link.classList.add('current-nav');
    }
  });
} 
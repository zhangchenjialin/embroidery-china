// 弹幕管理器
class DanmuManager {
  constructor() {
    this.container = document.getElementById('danmuContainer');
    if (!this.container) {
      console.error('弹幕容器不存在');
      return;
    }
    this.danmuList = [];
    this.isPlaying = true;
    this.maxDanmu = 50; // 限制最大弹幕数量
    this.danmuHeight = 30; // 弹幕行高
    this.maxRows = Math.floor(this.container.clientHeight / this.danmuHeight); // 最大行数
  }

  sendDanmu(text, color = '#fff') {
    if (!this.container) {
      console.error('弹幕容器不存在');
      return;
    }

    // 创建弹幕元素
    const danmu = document.createElement('div');
    danmu.className = 'danmu-item';
    danmu.textContent = text;
    danmu.style.color = color;
    
    // 随机选择行
    const row = Math.floor(Math.random() * this.maxRows);
    danmu.style.top = `${row * this.danmuHeight}px`;
    
    // 设置动画时间
    const duration = 8 + Math.random() * 4; // 8-12秒
    danmu.style.animation = `danmuMove ${duration}s linear`;
    
    // 添加到容器
    this.container.appendChild(danmu);
    
    // 动画结束后移除弹幕
    danmu.addEventListener('animationend', () => {
      danmu.remove();
    });

    // 限制弹幕数量
    if (this.container.children.length > this.maxDanmu) {
      this.container.removeChild(this.container.children[0]);
    }
  }

  clear() {
    if (this.container) {
      this.container.innerHTML = '';
    }
  }
}

// 创建弹幕管理器实例
const danmuManager = new DanmuManager();

// 发送弹幕
window.sendDanmu = function() {
  const input = document.getElementById('danmuInput');
  if (!input || !input.value.trim()) return;
  
  const colors = ['#fff', '#ff0', '#0ff', '#f0f', '#0f0'];
  const color = colors[Math.floor(Math.random() * colors.length)];
  
  danmuManager.sendDanmu(input.value.trim(), color);
  input.value = '';
};

// 发送评论
window.sendComment = function() {
  const input = document.getElementById('commentInput');
  if (!input || !input.value.trim()) return;
  
  // 发送弹幕
  danmuManager.sendDanmu(input.value.trim());
  
  // 添加评论到列表
  const commentList = document.getElementById('commentList');
  if (commentList) {
    const comment = document.createElement('div');
    comment.className = 'comment-item';
    comment.innerHTML = `
      <img src="../images/刺绣图片/role-xiangxiu.jpg" alt="用户头像" style="width: 40px; height: 40px; border-radius: 50%; object-fit: cover;">
      <div class="comment-content">
        <span>用户</span>
        <p>${input.value.trim()}</p>
        <font>${new Date().toLocaleString()}</font>
      </div>
    `;
    commentList.appendChild(comment);
  }
  
  input.value = '';
};

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
  // 确保弹幕容器存在
  const container = document.getElementById('danmuContainer');
  if (!container) {
    console.error('弹幕容器不存在');
    return;
  }
  
  // 初始化弹幕管理器
  danmuManager.maxRows = Math.floor(container.clientHeight / danmuManager.danmuHeight);
});

// 刺绣中国片段合集轮播功能
const videos = [
  {src: '../video/宣传.mp4', title: '中国刺绣1'},
  {src: '../video/宣传.mp4', title: '中国刺绣2'},
  {src: '../video/宣传.mp4', title: '中国刺绣3'},
  {src: '../video/宣传.mp4', title: '中国刺绣4'},
  {src: '../video/宣传.mp4', title: '中国刺绣5'}
];
let startIdx = 0;

function renderCarousel() {
  const carousel = document.getElementById('videoCarousel');
  if (!carousel) return;
  carousel.innerHTML = '';
  for(let i=0; i<3; i++) {
    const idx = (startIdx + i) % videos.length;
    const v = videos[idx];
    const item = document.createElement('div');
    item.className = 'carousel-item';
    item.innerHTML = `<video src="${v.src}" controls width="100%" height="135"></video><p>${v.title}</p>`;
    carousel.appendChild(item);
  }
}

window.prevVideo = function() {
  startIdx = (startIdx - 1 + videos.length) % videos.length;
  renderCarousel();
}
window.nextVideo = function() {
  startIdx = (startIdx + 1) % videos.length;
  renderCarousel();
}

document.addEventListener('DOMContentLoaded', renderCarousel);
// 弹幕管理器
class DanmuManager {
  constructor() {
    this.danmus = [];
    this.laneCount = 8; // 弹道数
    this.laneUsage = Array(this.laneCount).fill(0);
    this.loadDanmus(); // 加载本地存储的弹幕
  }

  // 从localStorage加载弹幕
  loadDanmus() {
    const savedDanmus = localStorage.getItem('danmus');
    if (savedDanmus) {
      this.danmus = JSON.parse(savedDanmus);
      // 显示最近的弹幕
      this.danmus.slice(-20).forEach(danmu => {
        this.displayDanmu(danmu);
      });
    }
  }

  // 保存弹幕到localStorage
  saveDanmus() {
    localStorage.setItem('danmus', JSON.stringify(this.danmus));
  }

  // 智能分配弹道，避免重叠
  getFreeLane() {
    let min = Math.min(...this.laneUsage);
    let idx = this.laneUsage.indexOf(min);
    this.laneUsage[idx]++;
    setTimeout(() => this.laneUsage[idx]--, 8000);
    return idx;
  }

  // 优先级算法
  calculatePriority(text) {
    let priority = 1;
    if (text.length > 20) priority += 0.5;
    if (/[!！?？]/.test(text)) priority += 0.3;
    return priority;
  }

  // 显示弹幕
  displayDanmu({text, color, size}) {
    const container = document.getElementById('danmuContainer');
    const danmuElem = document.createElement('div');
    danmuElem.className = 'danmu-item';
    danmuElem.textContent = text;
    danmuElem.style.color = color || '#fff';
    danmuElem.style.fontSize = (size || 20) + 'px';

    const lane = this.getFreeLane();
    danmuElem.style.top = (lane * 12 + 5) + '%';

    container.appendChild(danmuElem);
    danmuElem.addEventListener('animationend', () => danmuElem.remove());
  }

  // 添加弹幕
  addDanmu(text, color = '#fff', size = 20) {
    const danmu = {
      text,
      color,
      size,
      priority: this.calculatePriority(text),
      timestamp: Date.now()
    };
    
    this.danmus.push(danmu);
    // 只保留最近100条弹幕
    if (this.danmus.length > 100) {
      this.danmus = this.danmus.slice(-100);
    }
    
    this.danmus.sort((a, b) => b.priority - a.priority);
    this.displayDanmu(danmu);
    this.saveDanmus(); // 保存到localStorage
  }
}

const danmuManager = new DanmuManager();

// 发送弹幕
window.sendDanmu = function() {
  const input = document.getElementById('danmuInput');
  const text = input.value.trim();
  if (!text) return;
  
  const color = getRandomColor();
  danmuManager.addDanmu(text, color, 20);
  input.value = '';
};

// 随机颜色
function getRandomColor() {
  const colors = ['#ffb61e', '#d9b611', '#ffa400', '#ffee34', '#fff143', '#1890ff', '#52c41a'];
  return colors[Math.floor(Math.random() * colors.length)];
}

// 发送评论
window.sendComment = function() {
  const input = document.getElementById('commentInput');
  const text = input.value.trim();
  if (!text) return;

  const username = getCurrentUser();
  const avatar = document.getElementById('userAvatar').src;
  const dateStr = new Date().toLocaleDateString();

  // 1. 显示到评论区
  const commentList = document.getElementById('commentList');
  const commentItem = document.createElement('div');
  commentItem.className = 'comment-item';
  commentItem.innerHTML = `
    <img src="${avatar}" style="width: 40px;height: 40px; border-radius: 15px;">
    <div class="comment-content">
      <span>${username}</span>&nbsp;&nbsp;&nbsp;&nbsp;<font>${dateStr}</font>
      <p>${text}</p>
      <p style="color: #0000007d; font-size: 12px;">来自：本网站用户</p>
    </div>
    <hr style="margin: 10px 0; border: 1px solid #e5e5e5; width: 100%;">
  `;
  commentList.prepend(commentItem);

  // 2. 作为弹幕发送
  const color = getRandomColor();
  danmuManager.addDanmu(text, color, 20);

  // 3. 清空输入框
  input.value = '';
};

// 获取当前登录用户
function getCurrentUser() {
  return localStorage.getItem('currentUser') || '游客';
}

// 页面加载时初始化
document.addEventListener('DOMContentLoaded', function() {
  const username = getCurrentUser();
  // 可以在这里设置用户头像
  // document.getElementById('userAvatar').src = ...;
});

// 刺绣中国片段合集轮播功能
const videos = [
  {src: '../video/宣传1.mp4', title: '中国刺绣1'},
  {src: '../video/宣传2.mp4', title: '中国刺绣2'},
  {src: '../video/宣传3.mp4', title: '中国刺绣3'},
  {src: '../video/宣传4.mp4', title: '中国刺绣4'},
  {src: '../video/宣传5.mp4', title: '中国刺绣5'}
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
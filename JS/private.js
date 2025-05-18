// 头像上传功能
document.querySelector('.avatar-container').addEventListener('click', function() {
  document.getElementById('avatarInput').click();
});

document.getElementById('avatarInput').addEventListener('change', function(e) {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      document.getElementById('userAvatar').src = e.target.result;
    }
    reader.readAsDataURL(file);
  }
});

// 保存个人资料
function saveProfile() {
  const profile = {
    nickname: document.getElementById('nickname').value,
    bio: document.getElementById('bio').value,
    email: document.getElementById('email').value,
    phone: document.getElementById('phone').value,
    address: document.getElementById('address').value
  };
  
  // 这里可以添加保存到服务器的逻辑
  alert('个人资料保存成功！');
}

// 标签页切换
document.querySelectorAll('.container-title').forEach((title, index) => {
  title.addEventListener('click', () => {
    // 移除所有active类
    document.querySelectorAll('.container-title').forEach(t => t.classList.remove('active'));
    // 添加当前active类
    title.classList.add('active');
    // 显示对应内容
    document.querySelectorAll('.container-content').forEach((content, i) => {
      content.style.display = i === index ? 'block' : 'none';
    });
  });
});

// 发布动态
function publishPost() {
  const content = document.getElementById('postContent').value;
  if (!content.trim()) {
    alert('请输入动态内容！');
    return;
  }

  // 这里可以添加发布到服务器的逻辑
  alert('发布成功！');
  document.getElementById('postContent').value = '';
}

// 点赞功能
document.querySelectorAll('.like-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    this.classList.toggle('liked');
    const likeCount = this.textContent.match(/\d+/)[0];
    const newCount = this.classList.contains('liked') ? 
      parseInt(likeCount) + 1 : 
      parseInt(likeCount) - 1;
    this.innerHTML = `<i class="fas fa-heart"></i> 点赞 (${newCount})`;
  });
});

// 评论功能
document.querySelectorAll('.comment-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    const postItem = this.closest('.post-item');
    const comments = postItem.querySelector('.post-comments');
    comments.style.display = comments.style.display === 'none' ? 'block' : 'none';
  });
});

// 提交留言
function submitMessage() {
  const content = document.getElementById('messageContent').value;
  if (!content.trim()) {
    alert('请输入留言内容！');
    return;
  }

  // 这里可以添加提交到服务器的逻辑
  alert('留言发送成功！');
  document.getElementById('messageContent').value = '';
}

// 显示回复表单
function showReplyForm(btn) {
  const messageItem = btn.closest('.message-item');
  const replyForm = messageItem.querySelector('.reply-form');
  replyForm.style.display = replyForm.style.display === 'none' ? 'block' : 'none';
}

// 提交回复
function submitReply(btn) {
  const messageItem = btn.closest('.message-item');
  const replyTextarea = messageItem.querySelector('.reply-textarea');
  const content = replyTextarea.value;

  if (!content.trim()) {
    alert('请输入回复内容！');
    return;
  }

  // 这里可以添加提交到服务器的逻辑
  alert('回复发送成功！');
  replyTextarea.value = '';
  messageItem.querySelector('.reply-form').style.display = 'none';
}

// 留言点赞功能
document.querySelectorAll('.message-item .like-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    this.classList.toggle('liked');
    const likeCount = this.textContent.match(/\d+/)[0];
    const newCount = this.classList.contains('liked') ? 
      parseInt(likeCount) + 1 : 
      parseInt(likeCount) - 1;
    this.innerHTML = `<i class="fas fa-heart"></i> 点赞 (${newCount})`;
  });
});

// 图片预览功能
document.querySelectorAll('.message-media img').forEach(img => {
  img.addEventListener('click', function() {
    const modal = document.querySelector('.image-preview-modal');
    const modalImg = modal.querySelector('img');
    modalImg.src = this.src;
    modal.classList.add('active');
  });
});

// 关闭图片预览
function closeImagePreview() {
  const modal = document.querySelector('.image-preview-modal');
  modal.classList.remove('active');
}

// 按ESC键关闭预览
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    closeImagePreview();
  }
});

// 作品筛选功能
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    // 移除所有按钮的active类
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    // 添加当前按钮的active类
    this.classList.add('active');
    
    const filter = this.dataset.filter;
    document.querySelectorAll('.work-item').forEach(item => {
      if (filter === 'all' || item.dataset.category === filter) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
  });
});

// 显示作品详情
function showWorkDetail(btn) {
  const workItem = btn.closest('.work-item');
  const modal = document.querySelector('.work-detail-modal');
  const modalImg = modal.querySelector('.work-detail-image img');
  const modalTitle = modal.querySelector('.work-title');
  const modalCategory = modal.querySelector('.work-category');
  const modalDate = modal.querySelector('.work-date');
  const modalDescription = modal.querySelector('.work-description');
  const modalTechniques = modal.querySelector('.techniques-list');

  // 设置模态框内容
  modalImg.src = workItem.querySelector('.work-image img').src;
  modalTitle.textContent = workItem.querySelector('.work-info h3').textContent;
  modalCategory.textContent = workItem.querySelector('.work-info p').textContent.split(' | ')[0];
  modalDate.textContent = workItem.querySelector('.work-info p').textContent.split(' | ')[1];
  
  // 这里可以添加更多作品详情
  modalDescription.textContent = '这是一幅精美的刺绣作品，展现了传统工艺与现代审美的完美结合。作品采用传统针法，结合现代设计理念，呈现出独特的艺术效果。';
  
  // 添加技法列表
  modalTechniques.innerHTML = `
    <li>平针绣</li>
    <li>套针绣</li>
    <li>打籽绣</li>
    <li>盘金绣</li>
  `;

  // 显示模态框
  modal.classList.add('active');
}

// 关闭作品详情
function closeWorkDetail() {
  document.querySelector('.work-detail-modal').classList.remove('active');
}

// 按ESC键关闭作品详情
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    closeWorkDetail();
  }
});

// 课程进度更新
function updateCourseProgress(courseId, progress) {
  const course = document.querySelector(`[data-course-id="${courseId}"]`);
  if (course) {
    const progressBar = course.querySelector('.progress');
    const progressText = course.querySelector('.course-progress span');
    progressBar.style.width = `${progress}%`;
    progressText.textContent = `${progress}%`;
  }
}

// 继续学习按钮点击事件
document.querySelectorAll('.continue-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    const courseItem = this.closest('.course-item');
    const courseName = courseItem.querySelector('h3').textContent;
    alert(`即将继续学习：${courseName}`);
  });
});

// 复习课程按钮点击事件
document.querySelectorAll('.review-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    const courseItem = this.closest('.course-item');
    const courseName = courseItem.querySelector('h3').textContent;
    alert(`即将复习：${courseName}`);
  });
});

// 成就解锁动画
function unlockAchievement(achievementId) {
  const achievement = document.querySelector(`[data-achievement-id="${achievementId}"]`);
  if (achievement) {
    achievement.classList.add('unlocked');
    achievement.classList.add('animate');
    setTimeout(() => {
      achievement.classList.remove('animate');
    }, 1000);
  }
} 
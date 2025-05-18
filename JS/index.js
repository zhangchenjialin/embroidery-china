function login() {
  let username = document.getElementById("login-username").value;
  // console.log(username);
  let password = document.getElementById("login-password").value;
  // console.log(password);
  let userMapData = localStorage.getItem("user");
  if(userMapData){
    let userDataObj = JSON.parse(userMapData);
    let userArray = Object.entries(userDataObj);
    let user =new Map(userArray);
      if (user.has(username) && user.get(username) === password) {
        alert("登录成功！");
        window.location.href = "../index.html"
        // windows.event.returnValue = false;
      } else {
        alert("用户名或密码错误！");
      }
  } else {
      alert("页面中缺少输入框元素或用户尚未注册，请检查！");
  } 
}

function register() {
  let username = document.getElementById("register-username").value;
  let password = document.getElementById("register-password").value;
  let userObj ={
    [username]:password
  };
  let useMapData = JSON.stringify(userObj);
  localStorage.setItem("user", useMapData)
  alert("注册成功！");

  document.getElementById("register-username").value="";
  document.getElementById("register-password").value="";
  document.getElementById("register-confirm-password").value="";

  window.location.href = "./login.html";
}

document.addEventListener('DOMContentLoaded', function () {
  var item = document.getElementsByClassName("container-title-all");//获取所有标题元素
  var content = document.getElementsByClassName("container-content-all");//获取所有内容元素
  var it = item[0].getElementsByClassName("container-title");//获取第一个标题元素
  var con = content[0].getElementsByClassName("container-content");//获取第一个内容元素

  // 提前对item和it元素进行初始化相关操作（设置index属性等），只执行一次
  for (let i = 0; i < item.length; i++) {
      if (item[i]) {
          item[i].index = i;
      }
  }
  for (let i = 0; i < it.length; i++) {
      if (it[i]) {
          it[i].index = i;
      }
  }

  // 为标题元素绑定点击事件
  for (let i = 0; i < it.length; i++) {
      it[i].onclick = function () {
          // 移除所有标题的active类名，保留其他可能的基础样式类
          for (let j = 0; j < it.length; j++) {
              it[j].classList.remove('active');
          }
          // 隐藏所有内容区域
          for (let k = 0; k < con.length; k++) {
              con[k].style.display = "none";
          }
          // 给当前点击的标题添加active类名
          this.classList.add('active');
          // 显示当前点击标题对应的内容区域
          let currentIndex = Array.from(it).indexOf(this);
          con[currentIndex].style.display = "block";
      }
  }
});

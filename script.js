// Logout đơn giản (nếu có)
document.querySelectorAll('.logout').forEach(el=>{
  el.addEventListener('click', () => {
    localStorage.clear();
    window.location.href = 'login.html';
  });
});

// Điều hướng từ Trang quản lý cửa hàng sang quản lý tài khoản
function goToManager() {
  window.location.href = 'manager-management.html';
}
// Điều hướng ngược lại
function goToStore() {
  window.location.href = 'store-management.html';
}

// Trang đăng nhập xử lý
if(document.getElementById('loginForm')){
  document.getElementById('loginForm').addEventListener('submit', e=>{
    e.preventDefault();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    // giả định tài khoản:
    if(email === 'admin@example.com' && password === 'admin123'){
      localStorage.setItem('token','admintoken');
      window.location.href = 'store-management.html';
    } else if(email === 'user@example.com' && password === 'user123'){
      localStorage.setItem('token','usertoken');
      window.location.href = 'view-profile.html';
    } else {
      document.getElementById('loginError').innerText = 'Sai email hoặc mật khẩu';
    }
  });
}

// Trang đăng ký xử lý
if(document.getElementById('registerForm')){
  document.getElementById('registerForm').addEventListener('submit', e=>{
    e.preventDefault();
    const pass = document.getElementById('regPassword').value;
    const confirm = document.getElementById('regConfirmPassword').value;

    if(pass !== confirm){
      document.getElementById('registerError').innerText = 'Mật khẩu xác nhận không đúng.';
      return;
    }
    alert('Đăng ký thành công! Vui lòng đăng nhập.');
    window.location.href = 'login.html';
  });
}

// Xem profile
if(document.getElementById('viewName')){
  const user = JSON.parse(localStorage.getItem('userData')) || {
    name: 'Nguyễn Văn A',
    email: 'user@example.com',
    phone: '0123456789',
    address: '123 Đường ABC, TP.HCM'
  };
  document.getElementById('viewName').innerText = user.name;
  document.getElementById('viewEmail').innerText = user.email;
  document.getElementById('viewPhone').innerText = user.phone;
  document.getElementById('viewAddress').innerText = user.address;
}

// Cập nhật profile
if(document.getElementById('profileForm')){
  const user = JSON.parse(localStorage.getItem('userData')) || {
    name: '', email:'', phone:'', address:''
  };
  document.getElementById('name').value = user.name;
  document.getElementById('email').value = user.email;
  document.getElementById('phone').value = user.phone;
  document.getElementById('address').value = user.address;

  document.getElementById('profileForm').addEventListener('submit', e=>{
    e.preventDefault();
    const newUser = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      phone: document.getElementById('phone').value,
      address: document.getElementById('address').value
    };
    localStorage.setItem('userData', JSON.stringify(newUser));
    alert('Cập nhật thông tin cá nhân thành công!');
    window.location.href = 'view-profile.html';
  });
}

// Quản lý cửa hàng
if(document.getElementById('storeTable')){
  let stores = JSON.parse(localStorage.getItem('stores')) || [
    {id: 'S001', name: 'Cửa hàng A', address: 'Hà Nội'},
    {id: 'S002', name: 'Cửa hàng B', address: 'TP HCM'}
  ];
  const tbody = document.querySelector('#storeTable tbody') || document.getElementById('storeTable');

  function renderStores(){
    tbody.innerHTML = '';
    stores.forEach(store=>{
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${store.id}</td>
        <td>${store.name}</td>
        <td>${store.address}</td>
        <td>
          <button class="action-btn edit-btn" onclick="editStore('${store.id}')">Sửa</button>
          <button class="action-btn delete-btn" onclick="deleteStore('${store.id}')">Xóa</button>
        </td>`;
      tbody.appendChild(tr);
    });
  }
  window.editStore = function(id){
    const store = stores.find(s=> s.id ===id);
    if(!store)return alert('Không tìm thấy cửa hàng.');
    const name = prompt('Nhập tên mới', store.name);
    const address = prompt('Nhập địa chỉ mới', store.address);
    if(name && address){
      store.name = name.trim();
      store.address = address.trim();
      localStorage.setItem('stores', JSON.stringify(stores));
      renderStores();
    }
  }
  window.deleteStore = function(id){
    if(!confirm('Bạn chắc chắn muốn xóa?'))return;
    stores = stores.filter(s=> s.id!==id);
    localStorage.setItem('stores', JSON.stringify(stores));
    renderStores();
  }
  window.addStore = function(){
    const id = prompt('Nhập ID cửa hàng');
    if(!id || stores.find(s=> s.id ===id))return alert('ID không hợp lệ hoặc đã tồn tại');
    const name = prompt('Nhập tên cửa hàng');
    const address = prompt('Nhập địa chỉ');
    if(!name || !address)return alert('Tên và địa chỉ không được để trống');
    stores.push({id:id.trim(), name:name.trim(), address:address.trim()});
    localStorage.setItem('stores', JSON.stringify(stores));
    renderStores();
  }
  renderStores();
}

// Quản lý các tài khoản quản lý
if(document.getElementById('managerTable')){
  let managers = JSON.parse(localStorage.getItem('managers')) || [
    {id: 'U001', name: 'Trần Văn C', email: 'c.tran@store.com', role: 'Quản lý'}
  ];
  const tbody = document.querySelector('#managerTable tbody') || document.getElementById('managerTable');

  function renderManagers(){
    tbody.innerHTML = '';
    managers.forEach(manager=>{
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${manager.id}</td>
        <td>${manager.name}</td>
        <td>${manager.email}</td>
        <td>${manager.role}</td>
        <td>
          <button class="action-btn edit-btn" onclick="editManager('${manager.id}')">Sửa</button>
          <button class="action-btn delete-btn" onclick="deleteManager('${manager.id}')">Xóa</button>
        </td>
      `;
      tbody.appendChild(tr);
    });
  }

  window.editManager = function(id){
    const manager = managers.find(m=> m.id===id);
    if(!manager)return alert('Không tìm thấy tài khoản.');
    const name = prompt('Nhập tên mới', manager.name);
    const email = prompt('Nhập email mới', manager.email);
    const role = prompt('Nhập vai trò mới', manager.role);
    if(name && email && role){
      manager.name=name.trim();
      manager.email=email.trim();
      manager.role=role.trim();
      localStorage.setItem('managers', JSON.stringify(managers));
      renderManagers();
    }
  }
  window.deleteManager = function(id){
    if(!confirm('Bạn chắc chắn muốn xóa?'))return;
    managers = managers.filter(m=> m.id!==id);
    localStorage.setItem('managers', JSON.stringify(managers));
    renderManagers();
  }
  window.addManager = function(){
    const id = prompt('Nhập mã tài khoản quản lý');
    if(!id || managers.find(m=> m.id===id))return alert('ID không hợp lệ hoặc đã tồn tại');
    const name = prompt('Nhập họ tên');
    const email = prompt('Nhập email');
    const role = prompt('Nhập vai trò');
    if(!name || !email || !role)return alert('Vui lòng nhập đầy đủ thông tin');
    managers.push({id:id.trim(), name:name.trim(), email:email.trim(), role:role.trim()});
    localStorage.setItem('managers', JSON.stringify(managers));
    renderManagers();
  }
  renderManagers();
}

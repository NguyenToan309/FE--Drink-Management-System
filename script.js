document.addEventListener('DOMContentLoaded', () => {
    // 1. Logic Đăng nhập
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const errorElement = document.getElementById('login-error');

            // Giả lập xác thực
            if (username === 'manager' && password === '123') {
                // Giả lập lưu vai trò và chuyển hướng
                localStorage.setItem('userRole', 'Manager');
                window.location.href = 'manager_dashboard.html';
            } else if (username === 'staff' && password === '123') {
                localStorage.setItem('userRole', 'Staff');
                window.location.href = 'staff_dashboard.html';
            } else {
                errorElement.textContent = 'Tên đăng nhập hoặc mật khẩu không đúng.';
            }
        });
    }

    // 2. Logic Quản lý Đơn hàng (Dùng chung cho Staff và Manager Dashboard)
    const orderTable = document.getElementById('order-table');
    if (orderTable) {
        orderTable.addEventListener('click', (e) => {
            const row = e.target.closest('tr');
            if (!row) return;

            const orderId = row.dataset.orderId;
            let currentStatus = row.dataset.status;
            
            if (e.target.classList.contains('btn-confirm')) {
                // Chuyển từ Chờ xác nhận sang Đã xác nhận
                if (currentStatus === 'pending') {
                    row.dataset.status = 'confirmed';
                    row.querySelector('.status').className = 'status status-confirmed';
                    row.querySelector('.status').textContent = 'Đã Xác nhận';
                    e.target.style.display = 'none'; // Ẩn nút Xác nhận
                    row.querySelector('.btn-complete').style.display = 'inline-block'; // Hiện nút Hoàn thành
                    console.log(`Đơn hàng ${orderId} đã được Xác nhận.`);
                }
            } else if (e.target.classList.contains('btn-complete')) {
                // Chuyển từ Đã xác nhận sang Hoàn thành
                if (currentStatus === 'confirmed') {
                    row.dataset.status = 'completed';
                    row.querySelector('.status').className = 'status status-completed';
                    row.querySelector('.status').textContent = 'Hoàn thành';
                    e.target.style.display = 'none';
                    console.log(`Đơn hàng ${orderId} đã Hoàn thành.`);
                }
            }
            // Thao tác gọi API cập nhật trạng thái sẽ được thêm vào đây
        });
    }


    // 3. Logic ẩn/hiện Form Thêm/Sửa (Quản lý Sản phẩm & Nhân viên)
    const toggleForm = (addButtonId, formContainerId, formCancelButtonClass) => {
        const addButton = document.getElementById(addButtonId);
        const formContainer = document.getElementById(formContainerId);
        if (addButton && formContainer) {
            addButton.addEventListener('click', () => {
                formContainer.style.display = 'block';
                addButton.style.display = 'none';
            });

            formContainer.querySelector(formCancelButtonClass).addEventListener('click', () => {
                formContainer.style.display = 'none';
                addButton.style.display = 'block';
                // Reset form khi hủy
                formContainer.querySelector('form').reset();
            });
        }
    };
    
    // Áp dụng cho trang Quản lý Sản phẩm
    toggleForm('add-product-btn', 'product-form-container', '.btn-cancel');
    
    // Áp dụng cho trang Quản lý Nhân viên
    toggleForm('add-user-btn', 'user-form-container', '.btn-cancel');


    // 4. Logic Xử lý Form (Ví dụ cho Quản lý Sản phẩm)
    const productForm = document.getElementById('product-form');
    if (productForm) {
        productForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('product-name').value;
            const price = document.getElementById('product-price').value;
            
            // Logic Thêm/Sửa sản phẩm
            console.log(`Đã gửi Form Sản phẩm: ${name}, ${price}`);
            
            // Giả lập đóng form sau khi lưu
            document.getElementById('product-form-container').style.display = 'none';
            document.getElementById('add-product-btn').style.display = 'block';
            productForm.reset();
        });
    }

    // *Lưu ý: Logic cho Quản lý Nhân viên sẽ tương tự*
});

document.addEventListener('DOMContentLoaded', () => {
    // 1. Logic Đăng nhập (CẬP NHẬT)
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const errorElement = document.getElementById('login-error');

            // Giả lập xác thực
            if (username === 'admin' && password === '123') {
                localStorage.setItem('userRole', 'Admin');
                window.location.href = 'admin_users.html'; // Chuyển hướng đến trang Admin mới
            } else if (username === 'manager' && password === '123') {
                localStorage.setItem('userRole', 'Manager');
                window.location.href = 'manager_dashboard.html';
            } else if (username === 'staff' && password === '123') {
                localStorage.setItem('userRole', 'Staff');
                window.location.href = 'staff_dashboard.html';
            } else {
                errorElement.textContent = 'Tên đăng nhập hoặc mật khẩu không đúng.';
            }
        });
    }

    // 2. Logic Quản lý Đơn hàng (Dùng chung) - (GIỮ NGUYÊN)
    // ... (Phần code này giữ nguyên như trước) ...
    const orderTable = document.getElementById('order-table');
    if (orderTable) {
        orderTable.addEventListener('click', (e) => {
            const row = e.target.closest('tr');
            if (!row) return;

            const orderId = row.dataset.orderId;
            let currentStatus = row.dataset.status;
            
            if (e.target.classList.contains('btn-confirm')) {
                if (currentStatus === 'pending') {
                    row.dataset.status = 'confirmed';
                    row.querySelector('.status').className = 'status status-confirmed';
                    row.querySelector('.status').textContent = 'Đã Xác nhận';
                    e.target.style.display = 'none'; 
                    row.querySelector('.btn-complete').style.display = 'inline-block';
                    console.log(`Đơn hàng ${orderId} đã được Xác nhận.`);
                }
            } else if (e.target.classList.contains('btn-complete')) {
                if (currentStatus === 'confirmed') {
                    row.dataset.status = 'completed';
                    row.querySelector('.status').className = 'status status-completed';
                    row.querySelector('.status').textContent = 'Hoàn thành';
                    e.target.style.display = 'none';
                    console.log(`Đơn hàng ${orderId} đã Hoàn thành.`);
                }
            }
        });
    }


    // 3. Logic ẩn/hiện Form Thêm/Sửa (Quản lý Sản phẩm & Nhân viên) - (GIỮ NGUYÊN)
    const toggleForm = (addButtonId, formContainerId, formCancelButtonClass) => {
        const addButton = document.getElementById(addButtonId);
        const formContainer = document.getElementById(formContainerId);
        if (addButton && formContainer) {
            addButton.addEventListener('click', () => {
                formContainer.style.display = 'block';
                addButton.style.display = 'none';
            });

            formContainer.querySelector(formCancelButtonClass).addEventListener('click', () => {
                formContainer.style.display = 'none';
                addButton.style.display = 'block';
                formContainer.querySelector('form').reset();
            });
        }
    };
    
    // Áp dụng cho trang Quản lý Sản phẩm (Manager)
    toggleForm('add-product-btn', 'product-form-container', '.btn-cancel');
    
    // Áp dụng cho trang Quản lý Nhân viên (Manager)
    toggleForm('add-user-btn', 'user-form-container', '.btn-cancel');

    // Áp dụng cho trang Quản lý Tài khoản (Admin) (MỚI)
    toggleForm('add-user-btn-admin', 'admin-user-form-container', '.btn-cancel');
    
    
    // 4. Logic Xử lý Form Tạo Tài khoản (Admin) (MỚI)
    const adminUserForm = document.getElementById('admin-user-form');
    if (adminUserForm) {
        adminUserForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const fullName = document.getElementById('admin-full-name').value;
            const username = document.getElementById('admin-username').value;
            const role = document.getElementById('admin-role').value;
            
            // Logic gọi API để tạo tài khoản mới với vai trò đã chọn (Staff/Manager)
            console.log(`Admin đã tạo tài khoản mới: Tên: ${fullName}, Username: ${username}, Vai trò: ${role}`);
            
            // Giả lập đóng form sau khi tạo
            document.getElementById('admin-user-form-container').style.display = 'none';
            document.getElementById('add-user-btn-admin').style.display = 'block';
            adminUserForm.reset();
            alert(`Tài khoản ${username} (${role}) đã được tạo thành công!`);
        });
    }

    // 5. Logic Xử lý Form Sản phẩm (GIỮ NGUYÊN)
    // ... (Phần code này giữ nguyên như trước) ...
    const productForm = document.getElementById('product-form');
    if (productForm) {
        productForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('product-name').value;
            const price = document.getElementById('product-price').value;
            
            console.log(`Đã gửi Form Sản phẩm: ${name}, ${price}`);
            
            document.getElementById('product-form-container').style.display = 'none';
            document.getElementById('add-product-btn').style.display = 'block';
            productForm.reset();
        });
    }
});
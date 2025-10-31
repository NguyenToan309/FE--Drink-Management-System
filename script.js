// ===== DANH SÁCH SẢN PHẨM =====
const products = [
  { id: 1, name: "Hồng Trà kem cheese", price: 30000, category: "Thuần Trà", image: "https://chefjob.vn/wp-content/uploads/2020/02/hong-tra-sui-bot.jpg" },
  { id: 2, name: "Sữa Tươi Trân Châu Đường Đen", price: 35000, category: "Trà Sữa", image: "https://file.hstatic.net/200000721249/file/sua_tuoi_tran_chau_duong_den_6e622e3e514c4e5b9d1d46a80b210853.jpg" },
  { id: 3, name: "Matcha Latte", price: 40000, category: "Trà Latte", image: "https://cdn.tgdd.vn/2021/04/CookProduct/Trasuamatcha-1200x676.jpg" },
  { id: 4, name: "Trà Đào Cam Sả", price: 45000, category: "Trà Trái Cây", image: "https://lypham.vn/wp-content/uploads/2024/09/cach-lam-tra-dao-cam-sa.jpg" },
  { id: 5, name: "Trà Olong Bí Đao", price: 38000, category: "Hot", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGGKMnyeipm_d9-Vbx7hkswnX1pzQqctTH5Q&s" },
  { id: 6, name: "Trà Sữa Kem Trứng Nướng Dừa", price: 42000, category: "Mới", image: "https://lypham.vn/wp-content/uploads/2025/01/cach-lam-tra-sua-kem-dua-nuong.jpg" },
  { id: 7, name: "Trà Chanh Tươi", price: 25000, category: "Thuần Trà", image: "https://phache.com.vn/upload/images/tra-chanh-kim-quat.jpg" },
  { id: 8, name: "Trà Sữa Trân Châu Đen", price: 35000, category: "Trà Sữa", image: "https://images.gofnb.vn/prodimages/28102024100444.webp" },
  { id: 9, name: "Trà Sữa chocolate", price: 38000, category: "Trà Sữa", image: "https://vuaxedaybanhang.vn/wp-content/uploads/2022/01/tra-sua-socola.jpg" },
  { id: 10, name: "Trà Sữa Dâu", price: 37000, category: "Trà Sữa", image: "https://img.lazcdn.com/g/p/78be1032d6ea3ee29a33d32f5d66e365.jpg_720x720q80.jpg" },
  { id: 11, name: "Trà Xoài Nhiệt Đới", price: 42000, category: "Trà Trái Cây", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXhDVZpwQPXN1PBVRkePp8gkhyXchgcunHOw&s" },
  { id: 12, name: "Trà Vải Hoa Hồng", price: 45000, category: "Trà Trái Cây", image: "https://reskihotpot.kas.asia/images/media/66a06a9c177b7543d069f49e.png" },
  { id: 13, name: "Trà Sen Vàng", price: 30000, category: "Hot", image: "https://dayphache.edu.vn/wp-content/uploads/2019/09/cach-nau-tra-sen-vang-long-nhan.jpg" },
  { id: 14, name: "Trà Sữa Matcha Kem Cheese", price: 45000, category: "Mới", image: "https://kemducphat.com/wp-content/uploads/2023/09/tra%CC%80-su%CC%9B%CC%83a-matcha-kem.jpeg" },
  { id: 15, name: "Trà Sữa Khoai Môn", price: 40000, category: "Trà Sữa", image: "https://file.hstatic.net/200000538679/article/628cbb1fd96d2_6ec25b1b0b924d89a50f5c0e44d59ce3.jpg" },
  { id: 16, name: "Trà Olong Kem Cheese", price: 39000, category: "Hot", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQylwsCcBZ_Dp7Lvv6edPYJVFpEwSL6u74PWg&s" }
];


let cart = JSON.parse(localStorage.getItem("cart") || "[]");
let orders = JSON.parse(localStorage.getItem("orders") || "[]");

// ===== CHUYỂN TAB =====
document.querySelectorAll(".tab").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach(b => b.classList.remove("active"));
    document.querySelectorAll(".content").forEach(c => c.classList.remove("active"));
    btn.classList.add("active");
    document.getElementById(btn.dataset.target).classList.add("active");
    renderAll();
  });
});

// ===== RENDER SẢN PHẨM =====
function renderProducts(listData = products) {
  const list = document.getElementById("productList");
  list.innerHTML = `
    <div class="grid">
      ${listData.map(p => `
        <div class="card">
          <img src="${p.image}" alt="${p.name}">
          <h4>${p.name}</h4>
          <p>${p.price.toLocaleString()}₫</p>

          <button onclick="showOptions(${p.id})">Mua ngay</button>
        </div>
      `).join("")}
    </div>
  `;
}
function showOptions(id) {
  const p = products.find(x => x.id === id);
  const container = document.getElementById("productList");
  container.innerHTML = `
    <div class="optionBox">
      <h3>${p.name}</h3>
      <img src="${p.image}" alt="${p.name}" style="max-width:200px">
      <p>Giá gốc: ${p.price.toLocaleString()}₫</p>
      <label>Size:</label>
      <select id="size-${id}">
        <option value="M">M</option>
        <option value="L">L (+5k)</option>
      </select>
      <label>Đường:</label>
      <select id="sugar-${id}">
        <option value="100%">100%</option>
        <option value="70%">70%</option>
        <option value="50%">50%</option>
        <option value="30%">30%</option>
      </select>
      <label>Đá:</label>
      <select id="ice-${id}">
        <option value="100%">100%</option>
        <option value="70%">70%</option>
        <option value="30%">30%</option>
        <option value="0%">Không đá</option>
      </select>
      <label>Topping:</label>
      <select id="topping-${id}">
        <option value="Không">Không</option>
        <option value="Trân châu đen">Trân châu đen (+5k)</option>
        <option value="Thạch phô mai">Thạch phô mai (+7k)</option>
      </select>
      <br><br>
      <button onclick="addToCart(${id})">Thêm vào giỏ</button>
      <button onclick="renderProducts()">Quay lại</button>
    </div>
  `;
}
// ===== LỌC DANH MỤC =====
function filterCategory(cat) {
  if (cat === 'all') renderProducts(products);
  else renderProducts(products.filter(p => p.category === cat));
}

// ===== TÌM KIẾM =====
function searchProducts() {
  const keyword = document.getElementById("searchBox").value.toLowerCase();
  renderProducts(products.filter(p => p.name.toLowerCase().includes(keyword)));
}

// ===== THÊM VÀO GIỎ =====
function addToCart(id) {
  const p = products.find(x => x.id === id);
  let price = p.price;

  const size = document.getElementById(`size-${id}`).value;
  const sugar = document.getElementById(`sugar-${id}`).value;
  const ice = document.getElementById(`ice-${id}`).value;
  const topping = document.getElementById(`topping-${id}`).value;

  if (size === "L") price += 5000;
  if (topping === "Trân châu đen") price += 5000;
  if (topping === "Thạch phô mai") price += 7000;

  const key = `${id}-${size}-${sugar}-${ice}-${topping}`;
  const exist = cart.find(i => i.key === key);
  if (exist) exist.qty++;
  else cart.push({ key, name: p.name, size, sugar, ice, topping, price, qty: 1 });

  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

// ===== RENDER GIỎ HÀNG =====
function renderCart() {
  const wrap = document.getElementById("cartTableWrap");
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  document.getElementById("checkoutTotal").textContent = total.toLocaleString() + "₫";

  if (!cart.length) {
    wrap.innerHTML = "<p>Giỏ hàng trống</p>";
    return;
  }

  wrap.innerHTML = `
    <table>
      <tr>
        <th>Sản phẩm</th>
        <th>Chi tiết</th>
        <th>Đơn giá</th>
        <th>Số lượng</th>
        <th>Thành tiền</th>
        <th>Hành động</th>
      </tr>
      ${cart.map(i => `
        <tr>
          <td>${i.name}</td>
          <td>Size: ${i.size}, Đường: ${i.sugar}, Đá: ${i.ice}, Topping: ${i.topping}</td>
          <td>${i.price.toLocaleString()}₫</td>
          <td>
            <button onclick="updateQty('${i.key}', -1)">-</button>
            ${i.qty}
            <button onclick="updateQty('${i.key}', 1)">+</button>
          </td>
          <td>${(i.price * i.qty).toLocaleString()}₫</td>
          <td><button onclick="removeItem('${i.key}')">Xóa</button></td>
        </tr>
      `).join("")}
    </table>
  `;
}

// ===== CẬP NHẬT SỐ LƯỢNG =====
function updateQty(key, diff) {
  const item = cart.find(i => i.key === key);
  if (!item) return;
  item.qty += diff;
  if (item.qty <= 0) cart = cart.filter(i => i.key !== key);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

// ===== XÓA SẢN PHẨM =====
function removeItem(key) {
  cart = cart.filter(i => i.key !== key);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

// ===== CHUYỂN SANG TAB THANH TOÁN =====
document.getElementById("goCheckoutBtn").addEventListener("click", () => {
  document.querySelectorAll(".tab").forEach(b => b.classList.remove("active"));
  document.querySelectorAll(".content").forEach(c => c.classList.remove("active"));
  document.querySelector('[data-target="checkout"]').classList.add("active");
  document.getElementById("checkout").classList.add("active");
  renderAll();
});

// ===== XỬ LÝ ĐẶT HÀNG =====
document.getElementById("checkoutForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(this).entries());
  localStorage.setItem("currentPhone", data.phone); // lưu số điện thoại hiện tại
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);

  orders.push({
  id: "KH" + Date.now(), // mã khách hàng
  info: data,
  items: [...cart],
  total,
  time: new Date().toLocaleString()
});

  localStorage.setItem("orders", JSON.stringify(orders));
  cart = [];
  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Đặt hàng thành công!");
  renderOrders();
  renderAll();
});

// ===== HIỂN THỊ LỊCH SỬ ĐƠN HÀNG =====
function renderOrders() {
  const list = document.getElementById("orderList");
  const currentPhone = localStorage.getItem("currentPhone");

  const myOrders = orders.filter(o => o.info?.phone === currentPhone);

  if (!myOrders.length) {
    list.innerHTML = "<p>Chưa có đơn hàng nào của bạn.</p>";
    return;
  }

  list.innerHTML = myOrders.map(o => {
    const info = o.info || {};
    return `
      <div class="order">
        <p><strong>Thời gian:</strong> ${o.time}</p>
        <p><strong>Mã khách hàng:</strong> ${o.id}</p>
        <p><strong>Khách hàng:</strong> ${info.name} - ${info.phone}</p>
        <p><strong>Địa chỉ:</strong> ${info.address}</p>
        <p><strong>Thanh toán:</strong> ${info.payment}</p>
        <ul>
          ${o.items.map(i => `
            <li>${i.qty} x ${i.name} (${i.size}, ${i.sugar} đường, ${i.ice} đá, topping: ${i.topping}) - ${i.price.toLocaleString()}₫</li>
          `).join("")}
        </ul>
        <p><strong>Tổng tiền:</strong> ${o.total.toLocaleString()}₫</p>
        <hr>
      </div>
    `;
  }).join("");
}

// ===== RENDER TOÀN BỘ =====
function renderAll() {
  renderProducts();
  renderCart();
  renderOrders();
  
}

// ===== KHỞI ĐỘNG =====
renderAll();

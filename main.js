const products = [
    { id: 1, name: "Chuột Gaming Không Dây", price: 890000, icon: "🎮" },
    { id: 2, name: "Bàn Phím Cơ RGB", price: 1450000, icon: "⌨️️" },
    { id: 3, name: "Tai Nghe Âm Thanh Vòm 7.1", price: 1190000, icon: "🎧" }
];

let cart = []; // Mảng lưu các món hàng người dùng đã chọn

// Các phần tử DOM
const productContainer = document.getElementById("product-container");
const cartCountElement = document.getElementById("cart-count");
const cartModal = document.getElementById("cart-modal");
const closeModalBtn = document.getElementById("close-modal");
const cartItemsList = document.getElementById("cart-items-list");
const cartTotalPrice = document.getElementById("cart-total-price");
const cartBox = document.querySelector(".cart-box");

// 1. Hiển thị danh sách sản phẩm ra ngoài web
function renderProducts() {
    productContainer.innerHTML = "";
    products.forEach((product) => {
        const formattedPrice = product.price.toLocaleString("vi-VN");
        const productCard = `
            <div class="product-card">
                <div class="product-image">${product.icon}</div>
                <h4>${product.name}</h4>
                <p class="price">${formattedPrice} đ</p>
                <button class="buy-btn" data-id="${product.id}">Thêm vào giỏ</button>
            </div>
        `;
        productContainer.innerHTML += productCard;
    });

    attachBuyEvents();
}

// 2. Gán sự kiện cho các nút Thêm vào giỏ
function attachBuyEvents() {
    const buyButtons = document.querySelectorAll(".buy-btn");
    buyButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const productId = parseInt(button.getAttribute("data-id"));
            const selectedProduct = products.find(p => p.id === productId);
            
            // Đưa sản phẩm vào giỏ hàng
            cart.push(selectedProduct);
            updateCartUI();

            // Hiệu ứng nút bấm
            const originalText = button.textContent;
            button.textContent = "✓ Đã thêm";
            button.style.backgroundColor = "#22c55e";
            setTimeout(() => {
                button.textContent = originalText;
                button.style.backgroundColor = "#ff4655";
            }, 1000);
        });
    });
}

// 3. Cập nhật giao diện giỏ hàng (Số đếm, Danh sách item, Tổng tiền)
function updateCartUI() {
    // Cập nhật số đếm trên thanh menu
    cartCountElement.textContent = cart.length;

    // Cập nhật danh sách món hàng trong popup
    cartItemsList.innerHTML = "";
    let total = 0;

    if (cart.length === 0) {
        cartItemsList.innerHTML = "<p style='color: #71717a; text-align: center;'>Giỏ hàng đang trống.</p>";
    } else {
        cart.forEach((item, index) => {
            total += item.price;
            const li = document.createElement("li");
            li.className = "cart-item";
            li.innerHTML = `
                <span class="cart-item-name">${item.icon} ${item.name}</span>
                <div>
                    <span class="cart-item-price">${item.price.toLocaleString("vi-VN")} đ</span>
                    <button class="remove-btn" onclick="removeFromCart(${index})">Xóa</button>
                </div>
            `;
            cartItemsList.appendChild(li);
        });
    }

    // Cập nhật tổng tiền
    cartTotalPrice.textContent = total.toLocaleString("vi-VN") + " đ";
}

// 4. Xóa món hàng khỏi giỏ
window.removeFromCart = function(index) {
    cart.splice(index, 1);
    updateCartUI();
};

// 5. Mở và đóng Popup Modal
cartBox.addEventListener("click", () => {
    cartModal.style.display = "flex";
});

closeModalBtn.addEventListener("click", () => {
    cartModal.style.display = "none";
});

// Bấm ra ngoài khoảng đen để đóng modal
window.addEventListener("click", (e) => {
    if (e.target === cartModal) {
        cartModal.style.display = "none";
    }
});

// Khởi chạy ban đầu
renderProducts();
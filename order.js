// variabel untuk menampung data makanan dari local storage
let daftar_makanan;

// variabel untuk menampung box data keranjang
const kotak_keranjang = document.querySelector(".cart-items");

// ======================================================================
// ============ Merender Makanan yang masuk dalam keranjang =============
// ======================================================================

function renderDatakeranjang(data) {
	data.forEach((makanan) => {
		if (makanan.jumlahPembelian) {
			let item = document.createElement("div");
			item.classList.add("cart-item");
			// todo membuat element card
			item.innerHTML = `<div class="cart-item">
								<div class="d-flex justify-content-between align-items-center">
								<div class="item-info">
									<h3>${makanan.nama}</h3>
									<p>Harga: $${makanan.harga}</p>
									<p>Jumlah: ${makanan.jumlahPembelian}</p>
									<p>Total Harga: ${makanan.hargaTotal()}</p>
								</div>
								<button type="button" class="btn btn-danger">Hapus</button>
							</div>`;

			kotak_keranjang.appendChild(item);
		}
	});
}

// cek apakah ada data makanan di local storage
if (localStorage["daftar_makanan"]) {
	daftar_makanan = JSON.parse(localStorage.getItem("daftar_makanan"));
	daftar_makanan.forEach(makanan => {
		makanan.hargaTotal = function () {
			return this.jumlahPembelian * this.harga;
		}
	})
	renderDatakeranjang(daftar_makanan);
} else {
	console.log("tidak ada data");
}

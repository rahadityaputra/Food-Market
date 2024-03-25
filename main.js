// ===================================
// ========= Function untuk sync Local Storage ===========
// ===================================

function syncLocalStorage(aktivitas, index, daftar_makanan) {
	console.log(daftar_makanan);
	// const storage_daftar_makanan = daftar_makanan;
	switch (aktivitas) {
		case "beli":
			daftar_makanan[index].masuk_keranjang();
			break;
		default:
			break;
	}
	// mengembalikan dengan memperbarui local storage dengan key data_makanan dengan value daftar_makanan dalam bentuk string
	return localStorage.setItem("daftar_makanan", JSON.stringify(daftar_makanan));
}
// ====================================
// ====================================

// =============================================================
//  ===== function constructor untuk membuat objek makanan =====
// =============================================================
function Makanan(nama, harga, stok, gambar, jumlahPembelian) {
	this.nama = nama;
	this.harga = harga;
	this.stok = stok;
	this.jumlahPembelian = jumlahPembelian;
	this.gambar = gambar;
	this.masuk_keranjang = function () {
		this.stok--;
		this.jumlahPembelian++;
	};
}
//  =====================================================

// function untuk memecah properti dalam objek makanan
function renderMakanan(box, { gambar, nama, harga, stok }, index) {
	let kartu_makanan = document.createElement("div");
	kartu_makanan.classList.add("col-lg-4", "col-md-6", "col-sm-6", "col-12", "kartu-makanan");
	kartu_makanan.innerHTML = ` <div class="card p-2 mb-2 shadow rounded-4" style="width: 18rem; height: 23rem">
										<img src="image/${gambar}.jpeg" class="card-img-top"/>
										<div class="card-body">
											<h5 class="card-title">${nama}</h5>
											<h6>Rp ${harga}</h6>
											<h6>Stok : ${stok}</h6>
											<button type="button" class="checkout-btn btn btn-primary masuk-keranjang" data-bs-toggle="modal" data-bs-target="#tambah-keranjang" data-makanan="${index}" >Beli</button>
										</div>
									</div>`;
	box.appendChild(kartu_makanan);
}

// =============================================================
// ====== function untuk merender tampilan daftar makanan ======
// =============================================================

function renderLayoutDataMakanan(daftar_makanan) {
	daftar_makanan.forEach((makanan, index) => {
		renderMakanan(box_daftar_makanan, makanan, index);
	});

	const btn_masuk_keranjang = document.querySelectorAll(".masuk-keranjang");
	btn_masuk_keranjang.forEach((btn) => {
		btn.addEventListener("click", function () {
			const index = parseInt(this.dataset.makanan);
			if (daftar_makanan[index].stok !== 0) {
				// update di syncLocalStorage
				syncLocalStorage("beli", index, daftar_makanan);
			} else {
				return;
			}
		});
	});
}

// =====================================================================
// ==================== akhir dari function ============================
// =====================================================================

const box_daftar_makanan = document.querySelector(".box-daftar-makanan");

// cek apakah ada data makanan di local storage
let daftar_makanan;
if (localStorage["daftar_makanan"]) {
	daftar_makanan = JSON.parse(localStorage.getItem("daftar_makanan"));
	// console.log(daftar_makanan);
	daftar_makanan.forEach((makanan) => {
		makanan.masuk_keranjang = function () {
			this.stok--;
			this.jumlahPembelian++;
		};
	});
	renderLayoutDataMakanan(daftar_makanan);
} else {
	daftar_makanan = [];

	// ======================================================
	// ============= intansiasi varibal objek ===============
	// ======================================================
	daftar_makanan[0] = new Makanan("Rendang", 20000, 2, "rendang", 0);
	daftar_makanan[1] = new Makanan("Soto", 10000, 20, "soto", 0);
	daftar_makanan[2] = new Makanan("Ayam Bakar", 10000, 20, "ayam", 0);
	daftar_makanan[3] = new Makanan("Sate", 15000, 100, "sate", 0);
	daftar_makanan[4] = new Makanan("Nasi Goreng", 8000, 20, "nasi", 0);
	daftar_makanan[5] = new Makanan("Bubur", 12000, 20, "bubur", 0);
	// =======================================================
	// =======================================================
	// =======================================================

	// memanggil function renderDataMakanan setiap halaman dimuat
	renderLayoutDataMakanan(daftar_makanan);
}

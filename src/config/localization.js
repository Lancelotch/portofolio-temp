import LocalizedStrings from "react-localization";

const strings = new LocalizedStrings({
  id: {
    //general
    monggoPesen: "MonggoPesen",
    add_to_cart : "Tambah Ke Keranjang",
    action_delete : "Hapus",
    checkout : "Checkout",
    total_price_product : "Total Harga Barang",
    failed : "Gagal",
    pay : "Bayar",
    total : "Jumlah",
    note : "Catatan",
    sub_total : "Sub Total",
    price_courier : "Ongkos Kirim",
    pcs : "pcs",
    delivery_courier : "Delivery Courier",
    address : "Alamat",
    //Checkout 
    checkout_shopping_summary : "Ringkasan Belanja",
    checkout_alert_fill_courier : "isi dulu semua courier pada setiap product",
    //Social Media
    google: "Google",
    facebook: "Facebook",
    //Login
    login_enter: "Masuk",
    login_option: "atau masuk dengan",
    login_remember_me: "Ingat saya",
    login_forgot_password: "Lupa Password",
    login_quote: "Belum punya Akun MonggoPesen ? {0} Sekarang",
    login_register: "Daftar",
    //Button
    button_empty_cart : "Ayo Mulai Belanja",
     //Warning
     warning_empty_cart : "Belum ada barang di keranjang belanja kamu",
     warning_unavailable_product : "Oppss..! Maaf, sepertinya product yang anda cari tidak ditemukan",
    //Register
    register_now: "Daftar Sekarang",
    register_quote: "Sudah punya akun MonggoPesen ? {0} ",
    register_option: "atau daftar dengan",
    register_enter: "Masuk",
    register_agree: "Saya setuju dengan syarat dan ketentuan",
    register_name: "Nama lengkap harus diisi",
    register_email: "Pastikan e-mail kamu valid",
    register_email_quote: "Patikan e-mail kamu diisi",
    register_password: "Password harus diisi",
    register_password_quote: "Password harus 6 digit kombinasi angka dan huruf",
    register_password_placeholder: "Password Monggopesen",
    register_sucsess: "Pendaftaran Berhasil Silahkan Cek Email Untuk Aktivasi",
    register_pattern_quote: "Nama hanya boleh berupa huruf, titik (.), underscore (_), dan spasi",
    //product detail
    product_detail_description: "Deskripsi Produk",
  }
})

export default strings;
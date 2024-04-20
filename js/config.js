$(".resume").hide();
$(document).ready(function () {
  $(".filter-item").click(function () {
    const value = $(this).attr("data-filter");
    if (value == "all") {
      $(".card-content").slideDown(300);
    } else {
      $(".card-content")
        .not("." + value)
        .slideUp(300);
      $(".card-content")
        .filter("." + value)
        .slideDown(300);
    }
  });
  //button active
  $(".filter-item").click(function () {
    $(this).addClass("active-link").siblings().removeClass("active-link");
  });
});

let qty_value = document.getElementById("qty-count");
let btn_plus = document.getElementById("btn-Plus");
let btn_Minus = document.getElementById("btn-Minus");
let listItem = [];

$(document).ready(function () {
  // fitur tombol menambah pembelian
  $(".plus").click(function () {
    let max = parseInt(
      $(this).closest(".card-content").find(".max-value").text()
    );
    let num = 0;
    let qty = $(this).siblings(".qty");
    num = parseInt(qty.text());
    if (num < max) {
      qty.text(num + 1);
    }
  });
  // fitur mengurangi
  $(".minus").click(function () {
    let qty = $(this).siblings(".qty");
    let num = 0;
    num = parseInt(qty.text());
    if (num > 0) {
      qty.text(num - 1);
    }
  });
  // Tombol fitur masukin ke keranjang
  let j = 0;
  let totalHarga = 0;
  $(".button-add").click(function () {
    let totalPrice = 0;
    qty = $(this).siblings(".qty");
    let harga;
    let productTitle = $(this)
      .closest(".card-content")
      .find(".card-title")
      .text();
    num = parseFloat(qty.text());
    harga = $(this).closest(".card-content").find(".price").text();
    harga = parseFloat(harga.replace(".", ""));
    totalPrice = harga * num;
    let totalDisplay = $(this).closest(".menu-section").find(".total-result");

    if (qty.text() == 0) {
      alert("masukan pesanan");
    } else {
      let resumeMenu =
        "<li><span>" +
        productTitle +
        "</span><span>" +
        num +
        "</span ><span class='harga'>" +
        totalPrice +
        "</span></li>";
      $(".list").append(resumeMenu);
      listItem.push([productTitle + " " + num]);
      console.log(listItem);
      var notifSound = document.getElementById("notif-sound");
      if (notifSound) {
        notifSound.play(); // Memainkan suara notifikasi
      }
      $(".notif").show();
    }
    totalHarga += totalPrice;
    totalDisplay.val(totalHarga);
    qty.text("0");
  });
  // tombol batal pesan
  $(".batal").click(function () {
    totalDisplay = $(this).closest(".menu-section").find(".total-result");
    totalDisplay.val("");
    totalHarga = 0;
    $(".list").empty();
    listItem = [];
    $(".notif").hide();
  });
  // tombol pesan
  $(".pesan").click(function () {
    var phoneNumber = "62895377082151";
    var message = "\n Halo, saya mau pesan \n"; // Pesan yang akan dikirim
    for (let i = 0; i < listItem.length; i++) {
      message += i + 1 + ". " + listItem[i] + "\n";
    }
    var url =
      "https://wa.me/" + phoneNumber + "? text=" + encodeURIComponent(message);
    if (listItem == "") {
      alert("masukan pesanan");
    } else {
      window.open(url, "_blank");
    }
  });
  $(".pesan-logo").click(function () {
    $(".resume").toggle(400);
  });
});

// // whatsapp link
// function openWhatsApp() {
//   // Ganti nomor telepon dan pesan sesuai kebutuhan
//   var phoneNumber = "62895377082151"; // Ganti dengan nomor telepon penerima
//   var message = "Halo, saya mau pesan " + listItem; // Pesan yang akan dikirim

//   // Membuat URL dengan nomor telepon dan pesan
//   var url =
//     "https://wa.me/" + phoneNumber + "? text=" + encodeURIComponent(message);

//   // Buka URL di tab/window baru
//   window.open(url, "_blank");
// }

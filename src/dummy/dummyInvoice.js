const dummyInvoice = {
  "endDatePayment": 1557375180,
  "payment": {
    "transactionTime": "2019-05-13T02:50:45.000+0000",
    "transactionStatus": "pending",
    "transactionId": "7f7c3165-d6f5-4b5c-9cb1-6136ff79640c",
    "statusMessage": "midtrans payment notification",
    "paymentType": "bank_transfer",
    "orderId": "30f0c5ce-066a-44ba-a472-6382e9229a61",
    "grossAmount": 12060000,
    "currency": "IDR",
    "virtualAccount": "443220825378008",
    "bankName": "BCA"
  },
  "bank": {
    "code": "bca",
    "name": "BCA",
    "imageUrl": "https://s3.ap-southeast-1.amazonaws.com/bucket-monggopesen/2019-05-02T04:38:24.398Z_548bda77-87ca-4bdd-915f-858c865451a8"
  },
  "paymentInstruction": {
    "bank": {
      "code": "bca",
      "name": "BCA"
    },
    "instructions": [
      " Pilih pembayaran melalui Mandiri Bill Payment.",
      " Catat kode pembayaran yang Anda dapat.",
      " Gunakan ATM mandiri untuk menyelesaikan pembayaran.",
      " Masukkan PIN Anda.",
      " Pilih ‘Bayar/Beli’, lalu pilih ‘Lainnya’.",
      " Pilih ‘Multi Payment’.",
      " Masukkan ‘70012’ sebagai kode perusahaan Midtrans.",
      " Masukkan kode pembayaran yang Anda dapat sebelumnya, lalu pilih ‘Benar’.",
      " Pastikan detail pembayaran Anda benar & masukkan item pembayaran yang akan dibayar, lalu pilih ‘Ya’.",
      " Pembayaran Anda dengan Mandiri Bill Payment selesai."
    ]
  }
}

export default dummyInvoice;
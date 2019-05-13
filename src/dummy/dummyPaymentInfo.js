const DummyPaymentinfo = {
    "code": "200",
    "message": "OK",
    "data": {
      "totalAmount": 2660000,
      "isDeleted": false,
      "status": "PEND",
      "orderAddress": {
        "labelName": "Rumah",
        "receiverName": "Moh Ashari Muklis",
        "phoneNumber": "085695492320",
        "city": "Cikarang",
        "province": "Jawa Barat",
        "provinceId": "3",
        "cityId": "4",
        "zipcode": "17530",
        "fullAddress": "Perum Sukaraya Indah Blok c 14 no 2A rt -5 rw 07 kelurahan Sukaraya Kecamatan Karang Bahagia Bekasi"
      },
      "customer": {
        "name": "customer monggopesen",
        "status": "ACTV",
        "phoneNumber": "0000000000"
      },
      "indexes": [
        {
          "productId": "5c736c8ec0267d16d00014f8",
          "productName": "Sepatu Nike Snekkers173000000",
          "productQuantity": "5",
          "note": "",
          "price": 520000,
          "totalAmount": 2660000,
          "dimension": {
            "height": 20,
            "length": 20,
            "width": 20
          },
          "variants": [
            {
              "name": "warna",
              "value": "biru",
              "description": "warna biru",
              "imageUrl": "https://s3.ap-southeast-1.amazonaws.com/bucket-monggopesen/2019-02-14T03:11:15.430Z_dc5958cc-0336-402f-bbaa-00628b4fdd20"
            },
            {
              "name": "ukuran",
              "value": "25",
              "description": "ukuran 25",
              "imageUrl": ""
            }
          ]
        }
      ],
      "payment": {
        "transactionTime": "2019-04-08T08:10:29.000+0000",
        "transactionStatus": "pending",
        "transactionId": "79002b82-3f29-48e0-9402-82ffbe592f31",
        "statusMessage": "midtrans payment notification",
        "paymentType": "bank_transfer",
        "orderId": "30e2e734-100d-4830-8c3c-762ac7991c18",
        "grossAmount": 2660000,
        "virtualAccount": "443220825744067",
        "bankName": "BCA Virtual Account"
      },
      "bank": {
        "code": "bca",
        "name": "BANK BCA",
        "imageUrl": "https://s3.ap-southeast-1.amazonaws.com/bucket-monggopesen/2019-02-14T03:12:28.265Z_dc5958cc-0336-402f-bbaa-00628b4fdd20"
      }
    },
    "responseTime": 24
  }
 
export default DummyPaymentinfo;
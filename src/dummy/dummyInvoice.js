const dummyInvoice = {
  "code": "200",
  "message": "OK",
  "data": [
      {
          "orderId": "30e2e734-100d-4830-8c3c-762ac7991c18",
          "indexes": [
              {
                  "productId": "5c736c8ec0267d16d00014f8",
                  "productName": "Sepatu Nike Snekkers173000000",
                  "productQuantity": "5",
                  "note": "",
                  "price": 520000, 
                  "totalAmount": 2660000,
                  "dimension": 
                   {
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
              "transactionStatus": "expire",
              "transactionId": "79002b82-3f29-48e0-9402-82ffbe592f31",
              "statusMessage": "midtrans payment notification",
              "paymentType": "bank_transfer",
              "orderId": "30e2e734-100d-4830-8c3c-762ac7991c18",
              "grossAmount": 2660000,
              "virtualAccount": "443220825744067",
              "bankName": "BCA"
          },
          "bank": {
              "code": "bca",
              "name": "BANK BCA",
              "imageUrl": "https://s3.ap-southeast-1.amazonaws.com/bucket-monggopesen/2019-02-14T03:12:28.265Z_dc5958cc-0336-402f-bbaa-00628b4fdd20"
          },
          "endDatePay": 1554956861068,
          "description": "PENDING"
      },
       {
          "orderId": "30e2e734-100d-4830-8c3c-762ac7991c18",
          "indexes": [
              {
                  "productId": "5c736c8ec0267d16d00014f8",
                  "productName": "Sepatu Nike Snekkers173000000",
                  "productQuantity": "5",
                  "note": "",
                  "price": 520000,
                  "totalAmount": 2660000,
                  "dimension": 
                   {
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
              "transactionStatus": "expire",
              "transactionId": "79002b82-3f29-48e0-9402-82ffbe592f31",
              "statusMessage": "midtrans payment notification",
              "paymentType": "bank_transfer",
              "orderId": "30e2e734-100d-4830-8c3c-762ac7991c18",
              "grossAmount": 2660000,
              "virtualAccount": "443220825744067",
              "bankName": "BCA"
          },
          "bank": {
              "code": "bca",
              "name": "BANK BCA",
              "imageUrl": "https://s3.ap-southeast-1.amazonaws.com/bucket-monggopesen/2019-02-14T03:12:28.265Z_dc5958cc-0336-402f-bbaa-00628b4fdd20"
          },
          "endDatePay": 1554956861068,
          "description": "PENDING"
      }
      
  ],
  "responseTime": 105
}

export default dummyInvoice;
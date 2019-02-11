const loginSuccess = {
    "access_token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZWN1cmVJZCI6IjBjODgxZjM4LTdkYmUtNGE3Mi1iOWJhLWZiODMyMzY3NGU5OCIsImF1ZCI6WyJtdy9tb25nZ29wZXNlbkFwcCIsIm1zL3N1cGVyYWRtaW4iLCJtcy91c2VyIl0sInVzZXJfbmFtZSI6ImhzZXRpYXdhbkBtYWlsaW5hdG9yLmNvbSIsInNjb3BlIjpbIndyaXRlIiwicmVhZCIsInRydXN0Il0sImV4cCI6MTU5MjYzNTgyNSwiYXV0aG9yaXRpZXMiOlsiQ1VTIl0sImp0aSI6ImRlZDdjNzg4LWI4NWQtNGNkYi1hY2I0LTVhYWQ4ZTE2ZTVlNyIsImVtYWlsIjoiaHNldGlhd2FuQG1haWxpbmF0b3IuY29tIiwiY2xpZW50X2lkIjoibW9uZ2dvcGVzZW5BcHAifQ.e7LNF8XEDDWVxuFkrF66OHYkMqnBDUZK8qc6ZW9MJ6LinPnLiqICIYTKohTk1JSx2LkU64Km0CjOKkOCD34resyWt0IHHtboeCe5PiSDOji5T35zBbKAyy1ZYWlqRyau-cjU-1KxPEAv8W66VX4YaQlwElzg1ezxW9q22h_rfx6mcWHHLYROdCj8HikmxVk24bjb69EvkEiYya7SF9k5flndxmd6vw2x4pA7_VrjWwHX3eHfKtCTF7kpm14kQpENgVc4Nq8p18nkfZRMVt2haXIucnuWTANxPYINHAUYVOIut_6WsBmDsy86YimRo9jB1KW7Cfmo1jm-xGQBxseurw",
    "token_type": "bearer",
    "refresh_token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZWN1cmVJZCI6IjBjODgxZjM4LTdkYmUtNGE3Mi1iOWJhLWZiODMyMzY3NGU5OCIsImF1ZCI6WyJtdy9tb25nZ29wZXNlbkFwcCIsIm1zL3N1cGVyYWRtaW4iLCJtcy91c2VyIl0sInVzZXJfbmFtZSI6ImhzZXRpYXdhbkBtYWlsaW5hdG9yLmNvbSIsInNjb3BlIjpbIndyaXRlIiwicmVhZCIsInRydXN0Il0sImF0aSI6ImRlZDdjNzg4LWI4NWQtNGNkYi1hY2I0LTVhYWQ4ZTE2ZTVlNyIsImV4cCI6MTU5MjYzNTgyNSwiYXV0aG9yaXRpZXMiOlsiQ1VTIl0sImp0aSI6ImJhMThlNzkyLWRmNTgtNDUyYy1iMTE0LTE2OThlOWU3ZWViYyIsImVtYWlsIjoiaHNldGlhd2FuQG1haWxpbmF0b3IuY29tIiwiY2xpZW50X2lkIjoibW9uZ2dvcGVzZW5BcHAifQ.Uc9YoFWvgbdgtBAmO8pW9NzzObkaf1MaL77KdC7gAsHuIGm9r-9rSPUOoAedCfmmMasMqVAPnHQjld278q3drGb3D8soWrtKgjVoOfNf_mrdpz5gE_loyae9V2rEAN2HR4i3v3Qh3YNd1x4lfoAZYNeAQqYKa9KpcYj3Ccs1Vm8_JFC8c-PVWYR0Pq-RCaLb522W3Xa4-gvZZjUZAJKrKwLZ5i15FRphydWRqq77VC-lmqlqDzxRSRJP16ZCKlqUfNVUMggd8CTAuJYZbjYvLuRZO4AjOJ-o1yMeDknsQjSVwt3_YyQVQ2WAKXGug-WUGgroGGaAt5vxgGf6HvtB2Q",
    "expires_in": 43199999,
    "scope": "write read trust",
    "email": "hsetiawan@mailinator.com",
    "secureId": "0c881f38-7dbe-4a72-b9ba-fb8323674e98",
    "jti": "ded7c788-b85d-4cdb-acb4-5aad8e16e5e7"
};

const loginFailed = {
    "error": "unauthorized",
    "error_description": "Bad credentials"
}

const responseLogin = {
    loginSuccess : loginSuccess,
    loginFailed : loginFailed
}

export default responseLogin;
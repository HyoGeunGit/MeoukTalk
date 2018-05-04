# Web,APP Chat Backend


## API Document

* POST /signup : User Signup (유저 회원가입)

> Params

    ex)
    {
      id : "akat32",
      passwd : "passwd",
      name : "NaJaeM",
      email : "email@akat32.com",
      phone : "01012312300"
    }

> Response

    HTTP 200 : user json (회원 정보)

    HTTP 409 : {message : "already exist"},

    HTTP 400 : {message : e.message} (에러 메시지가 string 으로 반환)

* POST /auth/solo : Make New solo

> Params

    ex)
    {
      id : "akat32",
      passwd : "passwd"
    }
> Response

    ex)
    {
      "user": {
        "token": "u9mj99NzjPD9JXN",
        "id": "akat321111",
        "passwd": "akat32!",
        "name": "akaaaa111",
        "email": "aaaa@aaaa.com",
        "phone" : "01000000000"
      }
    }

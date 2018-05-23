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

* POST /signin : User Signin (유저 로그인)

> Params

    ex)
    {
      id : "akat32",
      passwd : "passwd"
    }
> Response

    HTTP 200 : {message : "Signin Success!"}

    HTTP 404 : {message : "User Not Fiound!"}

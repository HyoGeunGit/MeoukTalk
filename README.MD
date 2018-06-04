# Web,APP Chat Backend


## API Document

* POST /signup : User Signup (유저 회원가입)

> Params

    ex)
    {
      email : "akat32@naver.com",
      passwd : "passwd",
      name : "NaJaeM",
      phone : "01012312300",
      img : "image" // 프로필 이미지
    }

> Response

    HTTP 200 : user json (회원 정보)

    HTTP 409 : {message : "already exist"},

    HTTP 400 : {message : e.message} (에러 메시지가 string 으로 반환)

* POST /signin : User Signin (유저 로그인)

> Params

    ex)
    {
      email : "akat32@naver.com",
      passwd : "passwd"
    }
> Response

    HTTP 200 : {token : User token} (유저 토큰)

    HTTP 404 : {message : "User Not Found!"}

* GET /auto/:token : User auto Signin (자동 로그인)

> params

    ex) localhost:3000/auto/A78v8rnXyIySK9a

> Response

    HTTP 200 : {message : "Signin Success!"}

    HTTP 404 : {message : "User Not Found!"}

* POST /add : User add friend (친구 추가)

> params

    token : User token (유저 토큰)

    email : Friend email (친구 이메일)

> Response

    HTTP 200 : {message : "add success!"}

    HTTP 404 : {message : "User Not Found!"}

    HTTP 401 : {message ; "ERR!"}

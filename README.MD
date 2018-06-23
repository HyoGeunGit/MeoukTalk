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
      profileImg : "image" // 프로필 이미지
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

    HTTP 200 : {user :  User's Json} (유저 정보)

    HTTP 404 : {message : "User Not Found!"}

* POST /add : User add friend (친구 추가)

> params

    token : User token (유저 토큰)

    email : Friend email (친구 이메일)

> Response

    HTTP 200 : {message : "add success!"}

    HTTP 404 : {message : "User Not Found!"}

    HTTP 409 : {message : "already exist"}

    HTTP 500 : {message ; "ERR!"}

* POST /del : User del friend (친구 삭제)

> params

    token : User token (유저 토큰)

    email : Friend email (친구 이메일)

> Response

    HTTP 200 : {message : "del success!"}

    HTTP 404 : {message : "User Not Found!"}

    HTTP 500 : {message : "ERR!"}

* POST /chk : User friend List (친구 리스트)

> params

    token : User's token (유저 토큰)

> Response

    HTTP 200 : (example)
    {
      "list" : [
        {
          "name" : "민재나",
          "email" : "asdsad@nabe.cpm",
          "phone" : "010-2222-3333",
          "profileImg" : "http://asdsasadasdsadas.png"
        },
        {
          "name" : "민나재",
          "email" : "qqwwead@nabe.cpm",
          "phone" : "010-1111-2222",
          "profileImg" : "http://ddasdsasadasdsadas.png"
        }
      ]
    }

    HTTP 404 : {message : "Users Not Found!"}

* POST /search : friend search (친구 찾기)

> params

    email : friend's email

> Response

    HTTP 200 : (example)
    {
        "name" : "민재나",
        "email" : "sadsad@navewr.com",
        "phone" : "010-1234-1234",
        "profileImg" : "http://sadsadaasda.png"
    }

    HTTP 404 : {message : "User Not Found!"}

* POST /room : chat with friend (친구와 1대1 채팅 시작)

> params

    email : friend's email

    token : User's token

    myemail : User's email
> Response

    HTTP 200 : {"roomID" : roodID} //room의 ID 값을 반환 (String)

    HTTP 404 : {message : "User Not Found!"}

    HTTP 409 : {message : "already exist"}

* POST /invite : friend invite (채팅방에 친구 초대)

> params

    email : friend's email

    roomID : room's ID

> Response

    HTTP 200 : {message : "success!"}

    HTTP 500 : {message : "ERR!"}

* POST /accept : invite accept (초대 수락)

> params

    token : User's token

    roomID : room's ID

> Response

    HTTP 200 : {"roomID" : room's ID}

    HTTP 500 : {message : "ERR!"}

* POST /roomchk : check room invite (초대 확인)

> params

    token : User's token

> Response

    HTTP 200 : (example)
    {
      "list" : [
        {
          roomID : "asdasdasdasdasdasd"
        },
        {
          roomID  : "asd121123aasdasdas"
        }
      ]
    }

    HTTP 404 : {message : "User Not Found!"}

* POST /roomList : User's room list (유저 채팅방 목록)

> params

    token : User's token

> Response

    HTTP 200 : (example)
    [
      {
        "roomID": "hzmE66OHYF7Uapk3BCrxdGUM4tnpgaFJOFjbAcQkx5mf3k2cca"
      },
      {
        "roomID": "slkdjlk2jlkdjwlkdj1209dj09wdj0921rf39ewfhf98sadhsd"
      }
    ]


    HTTP 404 : {message : "User Not Found!"}

* POST /ischat : Chat Check (그 친구와 채팅한 경험이 있는가?)

> params

    token : User's token

    email : friend's email

> Response

    HTTP 200 : true 또는 false

    HTTP 404 : {message : "User Not Found!"}

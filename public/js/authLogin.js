async function Signin_btn(){
  axios({
    method : 'post',
    url : "http://iwin247.info:3000/signinWeb",
    data:{email : $('.loginName').val(), passwd : $('.loginPasswd').val()}
  })
  .then((result)=>{
    location.replace(result.request.responseURL)
  })
  .catch((response)=>{
    location.replace('/login')
  })
}

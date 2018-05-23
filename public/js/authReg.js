async function Signup_btn(){
  var result = await axios({
    method : 'post',
    url : "http://iwin247.info:3000/signupWeb",
    data:{id : $('.regId').val(),
          passwd : $('.regPasswd').val(),
          name : $('.regName').val(),
          phone : $('.regPN').val()}
  })
  location.replace(result.request.responseURL)
}

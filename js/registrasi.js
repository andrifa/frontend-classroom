function daftar(){
    var username = $('input#username').val();
    var password = $('input#password').val();
    var fullname = $('input#fullname').val();
    var email = $('input#email').val();
    $.ajax({
        url:'http://127.0.0.1:5000/daftar',
        method:'POST',

        contentType:'application/json',
        data:JSON.stringify({
            username : username,
            password : password,
            fullname : fullname,
            email : email
        }),
        success:function(response){
            alert(response.message)
            window.location.href='../index.html'
        },
        error:function(response){
            alert(response.responseJSON.message)
        }
    });
}
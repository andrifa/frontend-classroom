function getUserId(){
    var id = getCookie("userid");
    $.ajax({
        url: "http://127.0.0.1:5000/getUser/"+id,
        method: "GET",
        success: function(response){
            var classHead=`${response.data.fullname}`
                $('.head').empty()
                $('.head').append(classHead);
            
            $('.class').empty()
            for (var i=0;i<response.data.class.length;i++){
                
                var classClass=`
                    <div class="kotak">
                        <a href="kelas.html?id=${response.data.class[i].kelasid}">${response.data.class[i].status} in ${response.data.class[i].classid} Class</a> 
                    </div>
                `
                $('.class').append(classClass);
            }
            
            for (var i=0;i<response.data.classwork.length;i++){
                var classClasswork=`
                <div class="classwork">
                    <div>
                        <p>Classwork id : ${response.data.classwork[i].classworkid}</p>
                        <p>Question : ${response.data.classwork[i].question}</p>
                        <p>Status : ${response.data.classwork[i].status}</p>
                        <p>Answer : ${response.data.classwork[i].answers}</p>
                    </div>
                    <div>
                        <textarea class="answer" id="${response.data.classwork[i].classworkid}"></textarea><br>
                        <button onclick="assign(${response.data.classwork[i].classworkid})">Submit</button>
                    </div>
                </div>
                `
                $('.content').append(classClasswork);
            }
            },
        error:function(errornya){
            alert("Error");
            console.log(errornya.responseText)
        }
    })
}
getUserId();

function home(){
    window.location.href='../Templates/kelasroom.html';
}

function myProfile(){
    window.location.href='../Templates/user.html';
}

function logout(){
    window.location.href='../index.html';
}

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function assign(workclassid){
    var answers = $('textarea#'+workclassid).val();
    console.log(answers)
    var id = getCookie("userid")
    $.ajax({
        url:'http://127.0.0.1:5000/classwork/'+workclassid,
        method:'POST',

        contentType:'application/json',
        data:JSON.stringify({
            'user id': parseInt(id),
	        'answer': answers
        }),
        success:function(response){
            alert(response.message)
            window.location.href='../Templates/user.html';
        },
        error:function(){
            alert("Error")
        }
    });
}

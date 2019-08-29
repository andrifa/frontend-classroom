function getClassId(id){
    $.ajax({
        url: "http://127.0.0.1:5000/getClass/"+id,
        method: "GET",
        success: function(response){
            var classHead=`${response.data.classname}`
                $('.head').append(classHead);
            for (var i=0;i<response.data.student.length;i++){
                var classStudent=`${response.data.student[i]}, `
                $('.student').append(classStudent);
            }
            for (var i=0;i<response.data.teachers.length;i++){
                var classTeacher=`${response.data.teachers[i]}`
                var username = getCookie("username");
                $('.teacher').append(classTeacher);
            }
            
            for (var i=0;i<response.data.classwork.length;i++){
                var classClasswork=`
                <div class="classwork">
                    <p class="classworkid">Classwork id : ${response.data.classwork[i].classworkid}</p>
                    <p class="questions">Question : ${response.data.classwork[i].question}</p>
                    <p class="key${response.data.classwork[i].classworkid}"></p>
                    <button style="display : none" class="tampil3" onclick="delclasswork(${response.data.classwork[i].classworkid})">Delete Classwork</button>
                    <button style="display : none" class="tampil3" onclick="updateclasswork(${response.data.classwork[i].classworkid})">Update Classwork</button>
                </div>
                `
                if (username==response.data.teachers[0]){
                    answer(response.data.classwork[i].classworkid)         
                }
                
                $('.content').append(classClasswork);
            }

            if (username==response.data.teachers[0]){
                jawaban_open()     
            }

            },
        error:function(errornya){
            alert("Error");
            console.log(errornya.responseText)
        }
    })
}
var classId=(window.location.search).slice(4,(window.location.search).length);
getClassId(classId);

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

function jawaban_open() {
    document.getElementById("tampil").style.display = "block";
    document.getElementById("tampil2").style.display = "block";
    $(".tampil3").slideToggle();
}

function addclasswork(){
    var answers = $('textarea#question').val();
    $.ajax({
        url:'http://127.0.0.1:5000/class/'+classId,
        method:'POST',

        contentType:'application/json',
        data:JSON.stringify({
            "question":answers
        }),
        success:function(response){
            alert(response.message)
            window.location.href=window.location.href
        },
        error:function(){
            alert("Error")
        }
    });
}

function joinClass(){
    var userid = getCookie("userid")
    $.ajax({
        url:'http://127.0.0.1:5000/joinClass',
        method:'POST',

        contentType:'application/json',
        data:JSON.stringify({
            "user id": parseInt(userid),
            "classid": parseInt(classId)
        }),
        success:function(response){
            alert(response.message)
            window.location.href=window.location.href
        },
        error:function(){
            alert("Error")
        }
    });
}

function answer(workclassid){
    $.ajax({
        url: "http://127.0.0.1:5000/getClassWork/"+workclassid,
        method: "GET",
        success: function(response){
            for (var i=0;i<response.data.answers.length;i++){
                var classAnswer=`
                <div class="answerDesain">
                    <p class="answerId">Answer : ${response.data.answers[i].answer}</p>
                    <p class="answerUserId">Nama : ${response.data.answers[i]["user id"]}</p>
                </div>
                `
                $('.key'+workclassid).append(classAnswer);
            }    
        },
        error:function(errornya){
            alert("Error");
            console.log(errornya.responseText)
        }
    })
}

function delClass(){
    $.ajax({
        url:'http://127.0.0.1:5000/class/'+classId,
        method:'DELETE',
        success:function(response){
            alert(response.message)
            window.location.href='../Templates/kelasroom.html'
        },
        error:function(){
            alert("Error")
        }
    });
}

function delclasswork(idclasswork){
    $.ajax({
        url:'http://127.0.0.1:5000/classwork/'+idclasswork,
        method:'DELETE',
        success:function(response){
            alert(response.message)
            window.location.href=window.location.href
        },
        error:function(){
            alert("Error")
        }
    });
}

function updateclasswork(idclasswork){
    var question = prompt("Please enter your new question:","how much salt in the sea?");
    if (question == "" || question == null){
        alert("question should not empty")
    } else {
        $.ajax({
            url:'http://127.0.0.1:5000/classwork/'+idclasswork,
            method:'PUT',
    
            contentType:'application/json',
            data:JSON.stringify({
                "question":question,
            }),
            success:function(response){
                alert(response.message);
                window.location.href=window.location.href;
            },
            error:function(){
                alert("update classworks failed")
            }
        });
    }
}

function outClass(){
    var userid = getCookie("userid")
    $.ajax({
        url:'http://127.0.0.1:5000/outclass',
        method:'DELETE',

        contentType:'application/json',
        data:JSON.stringify({
            "user id": parseInt(userid),
            "classid": parseInt(classId)
        }),
        success:function(response){
            alert(response.message)
            window.location.href=window.location.href
        },
        error:function(){
            alert("Error")
        }
    });
}
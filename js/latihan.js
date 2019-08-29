// // console.log('hello world')

// var greet="selamat datang";
// var name="andri";

// var greeting=greet+' '+name;
// console.log(greeting);

// var angka=13;
// if (angka==12){
//     alert("angka sekarang: "+angka);
// } else if (angka < 12){
//     alert("angka sekarang kurang dari 12. "+angka);
// } else{
//     alert(angka);
// }

// var kendaraan=["mobil","motor"];
// kendaraan.push("becak");
// console.log(kendaraan);

// for (var i=0; i<kendaraan.length; i++){
//     console.log(kendaraan[i]);
// }

// var dict = {
//     number:2,
//     nomor:3
// }

// console.log(dict.number)
// console.log(dict["nomor"])

// dict["alamat"]="jl. mustang"

// console.log(dict)

// var biodata ={
//     kantor:[
//         {
//             nama:"asep",
//             alamat:"bandung",
//             telepon:[08522323,081134343],
//             game:{
//                 mobile:"pubg",
//                 pc:"dota2",
//                 console:["we11","COD12"]
//             }   
//         },
//         {
//             nama:"amdro",
//             alamat:"sabeb"
//         }
//     ],
//     rumah:[
//         {
//             nama: "robby",
//             alamat: "bandung",
//             telepon: [092832,089323]
//         },
//         {
//             nama: "hirzi",
//             alamat: "aceh",
//             telepon: [02123,01234]
//         }
//     ]
// }

// console.log(biodata["kantor"][0]["game"]["console"])
// console.log(biodata.kantor[0].game.console[1])

// var xhr = new XMLHttpRequest();
// function getClasses(){
//     xhr.open("GET","http://127.0.0.1:5000/getClass/1");
//     xhr.send();
//     xhr.onreadystatechange = function(){
//         if (this.readyState==4 && this.status<400){
//             respon=JSON.parse(this.response);
//             console.log(respon);
//         }else if (this.readyState==4){
//             respon=JSON.parse(this.response);
//             console.log(respon);
//         }
//     }
// }

// getClasses()

// function getClassWork(){
//     xhr.open("GET","http://127.0.0.1:5000/getClassWork/1");
//     xhr.send();
//     xhr.onreadystatechange = function(){
//         if (this.readyState==4 && this.status<400){
//             respon=JSON.parse(this.response);
//             console.log(respon);
//         }else if (this.readyState==4){
//             respon=JSON.parse(this.response);
//             console.log(respon);
//         }
//     }
// }

// getClassWork()

// function login(){
//     xhr.open("POST","http://127.0.0.1:5000/validasi");
//     xhr.setRequestHeader("Content-Type","application/json");
//     xhr.send(JSON.stringify({
//         "username":"adziima",
//         "password":"ccc"
//     }));
//     xhr.onreadystatechange=function(){
//         if (this.readyState==4 && this.status<400){
//             respon=JSON.parse(this.response);
//             alert(respon.message);
//             console.log(respon);
//         }else if (this.readyState==4){
//             respon=JSON.parse(this.response);
//             alert(respon.message);
//         }
//     }
// }

// login()

// function createClass(){
//     xhr.open("POST","http://127.0.0.1:5000/class");
//     xhr.setRequestHeader("Content-Type","application/json");
//     xhr.send(JSON.stringify({
//         "classname":"Backend",
//         "classid":1,
//         "teachers":[1]
//     }));
//     xhr.onreadystatechange=function(){
//         if (this.readyState==4 && this.status<400){
//             respon=JSON.parse(this.response);
//             alert(respon.message);
//             console.log(respon);
//         }else if (this.readyState==4){
//             respon=JSON.parse(this.response);
//             alert(respon.message);
//         }
//     }
// }

// createClass()

function getClassAll(){
    $.ajax({
        url: "http://127.0.0.1:5000/getClass/all",
        method: "GET",
        success: function(response){
            $('.content').empty();
            for (var i=0; i<response.length; i++){
                var allClass=`
                <div>
                    <div>
                        <a href="#">${response[i].classname}</a>
                        <img src="../asset/makers.png" alt="" width="100px">
                        <a href="#"><i class="fa fa-trash" aria-hidden="true"></i></a>
                    </div>
                    <div></div>
                    <div><a href="#"><b><i class="fa fa-user-o" aria-hidden="true" style="color:gray"></i></b></a></div>
                </div>
                `
                $('.content').append(allClass);
            }
        },
        error:function(errornya){
            alert("Error");
            console.log(errornya.responseText)
        }
    })
}

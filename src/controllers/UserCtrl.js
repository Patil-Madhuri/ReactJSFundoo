var firebase = require('../controllers/firebase.js');
var userCtrl = require('../controllers/UserCtrl.js')
module.exports = {
    login: function () {
        var self = this;
        var database = firebase.firebase.database();
        var usersRef = database.ref('users');
        var username = document.getElementById('username');
        var password = document.getElementById('password');
        usersRef.orderByChild('Email').equalTo(username.value).once('value', function (snap) {
            snap.forEach(function (snap) {
                var value = snap.val();
                console.log(value);
                debugger;
                if (value.Password === password.value) {
                    localStorage.setItem('userKey',snap.key);
                    userCtrl.setUserData();
                    self.props.history.push('/home/notes');
                }
            })
            // var emailExp = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
            // if (username.value !== "" && password.value !== "") {
            //     if (username.value.match(emailExp)) {
            //         this.props.history.push('/home');
            //     }
            // }
            // else {
            //     this.props.history.push('/login');
            //     document.getElementById("error").innerHTML = "* Please provide proper email";
            // }
        })
    },
    register: function () {
        var database = firebase.firebase.database();
        var emailExp = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
        var name = document.getElementById('name');
        var username = document.getElementById('username');
        var password = document.getElementById('password');
        var cpassword = document.getElementById('cpassword');

        if (username.value !== "" && password.value !== "" && cpassword.value !== "" && name.value !== "") {
            if (username.value.match(emailExp)) {
                var usersRef = database.ref('users');
                usersRef.push({
                    Name: name.value,
                    Email: username.value,
                    Password: password.value
                })
                this.props.history.push('/login');
            }
        }
        else {
            this.props.history.push('/register');
        }
    }
  
}
 exports.setUserData = () =>{
    var database = firebase.firebase.database();
    var usersRef = database.ref('users');
    var userKey = localStorage.getItem('userKey');
    usersRef.child(userKey).once('value',function(snap){
        var userData = snap.val();
        localStorage.setItem('email', userData.Email);
        localStorage.setItem('name', userData.Name);
    }) 
}
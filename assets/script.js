firebase.initializeApp({
  apiKey: "AIzaSyDHRaUdSia9yqgmctcCLVlJT0Uvm64lTQo",
  authDomain: "ceveorg.firebaseapp.com",
  databaseURL: "https://ceveorg.firebaseio.com",
  projectId: "ceveorg",
  storageBucket: "ceveorg.appspot.com",
  messagingSenderId: "801640377446"
});

var database = firebase.database(),
  uname, email, photoUrl, emailVerified, uid,
  window.onload = init();

var month = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];

document.addEventListener('DOMContentLoaded', function () {
  var elems = document.querySelectorAll('.timepicker');
  var instances = M.Timepicker.init(elems, options);
});

var provider = new firebase.auth.OAuthProvider('google.com');

function getCurrentUserDetails() {
  var user = firebase.auth().currentUser;
  // getting details using current authenticated user
  user.providerData.forEach(function (profile) {
    uname = profile.displayName;
    email = profile.email;
    photoUrl = user.photoURL;
    emailVerified = profile.emailVerified;
    uid = user.uid;
  });
}

function Si() {
  firebase.auth().signInWithPopup(provider).then(function (result) {
    token = result.credential.accessToken;
    var user1 = result.user;
    //document.location.reload(true);
    //window.location.reload("https://itspushtack.firebaseapp.com");
    var btn = document.getElementById("sign");
    btn.innerHTML = "YOUR PROFILE";
    btn.setAttribute("onclick", "StuProfile();");

  }).catch(function (error) {
    console.log(error.message);
  });
}

function So() {
  firebase.auth().signOut().then(function () {
    document.location.reload(true);
    //window.location.reload("https://itspushtack.firebaseapp.com");
  })
}

function getDate() {
  var today = new Date();
  var dd = today.getDate();
  var mm = month[today.getMonth()]; //January is 0!
  var yyyy = today.getFullYear();
  if (dd < 10)
    dd = '0' + dd;
  if (mm < 10)
    mm = '0' + mm;
  today = dd + ' ' + mm + ' ' + yyyy;
  return today;
}

function init() {

  var write = document.getElementById('eventsview');
  database.ref('colleges/').on('value', eventlist);

  function eventlist(data) {
    var full = data.val();
    var keys = Object.keys(full);
    for (var i = 0; i < keys.length; i++) {
      var det = full[keys[i]]["cdetails"];
      var clg = full[keys[i]]["events"];
      var eve = Object.keys(clg);
      for (var j = 0; j < eve.length; j++) {
        //console.log(clg[eve[j]]["eventdetails"], clg[eve[j]]["eventdetails"].ename, det.cuid, det.ccity, det.cname);
        var card = document.createElement('div');
        card.classList.add("card-wrap");
        //card.id = det.cuid;
        var eventname = document.createElement('div');
        eventname.id = "eventname" + (i + 1);
        eventname.innerHTML = clg[eve[j]]["eventdetails"].ename + "<br>" + det.cname + "<br>" + det.ccity + "<br>";

        var viewmore = document.createElement('button');
        viewmore.classList.add("btn-lblue");
        viewmore.innerHTML = "Breif Event";
        viewmore.id = "btn" + i;
        viewmore.setAttribute("onclick", "breif(" + '\'' + (det.cuid) + '\', ' + '\'' + (clg[eve[j]]["eventdetails"].ename) + '\'' + ")");

        card.appendChild(eventname);
        card.appendChild(viewmore);
        write.appendChild(card);
      }
    }
  }
}

function clogin() {
  var name = document.getElementById("cuser").value;
  var pass = document.getElementById("pass").value;
  console.log(name, pass);
}

function breif(clg, eve) {
  console.log(clg, eve);
  var get = document.getElementById('eventsview');
  get.innerHTML = "";
  database.ref('colleges/').on('value', gotdata);

  function gotdata(data) {
    var full = data.val();
    console.log(full[clg]["events"][eve]["eventdetails"].ename);
    get.innerHTML += full[clg]["events"][eve]["eventdetails"].ename + '<br>' + full[clg]["events"][eve]["eventdetails"].date + '<br>' + full[clg]["cdetails"].cname + '<br>' + full[clg]["cdetails"].ccity + '<br>' + full[clg]["events"][eve].edesc + '<br>';
  }
}

function expand() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

function StuProfile() {

}
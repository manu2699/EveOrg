firebase.initializeApp({
  apiKey: "AIzaSyDHRaUdSia9yqgmctcCLVlJT0Uvm64lTQo",
  authDomain: "ceveorg.firebaseapp.com",
  databaseURL: "https://ceveorg.firebaseio.com",
  projectId: "ceveorg",
  storageBucket: "ceveorg.appspot.com",
  messagingSenderId: "801640377446"
});

var database = firebase.database(),
  uname, email, photoUrl, emailVerified, uid, sname, sclg;
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
    getCurrentUserDetails();
    database.ref('students/').on('value', gotdata);

    function gotdata(data) {
      var full = data.val();
      var check = full[uid];
      if (check == undefined) {
        console.log("check");
        initialStudentSetup();
        getCurrentUserDetails();
      }
    }
    var btn = document.getElementById("sign");
    btn.innerHTML = "YOUR PROFILE";
    btn.setAttribute("onclick", "StuProfile()");

    var btn2 = document.createElement("a");
    btn2.innerHTML = "SIGN OUT";
    btn2.setAttribute("onclick", "So()");

    document.getElementById("myTopnav").appendChild(btn2);
    StuProfile();

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
  var mm = today.getMonth() + 1; //January is 0!
  var yyyy = today.getFullYear();
  if (dd < 10)
    dd = '0' + dd;
  if (mm < 10)
    mm = '0' + mm;
  today = yyyy + '-' + mm + '-' + dd;
  return today;
}

function init() {

  var write = document.getElementById('eventsview');
  write.innerHTML = "";
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

        var eventname = document.createElement('div');
        eventname.id = "eventname" + (i + 1);
        eventname.innerHTML = clg[eve[j]]["eventdetails"].ename + "<br>" + det.cname + "<br>" + det.ccity + "<br>" + clg[eve[j]]["eventdetails"].date;

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
  console.log(clg, eve, uid, uname);
  var get = document.getElementById('eventsview');
  get.innerHTML = "";

  database.ref('colleges/').on('value', gotdata);

  function gotdata(data) {
    var full = data.val();
    console.log(full[clg]["events"][eve]["eventdetails"].ename);
    get.innerHTML += full[clg]["events"][eve]["eventdetails"].ename + '<br>' + full[clg]["events"][eve]["eventdetails"].date + '<br>' + full[clg]["cdetails"].cname + '<br>' + full[clg]["cdetails"].ccity + '<br>' + full[clg]["events"][eve].edesc + '<br>';
    var subeventkeys = Object.keys(full[clg]["events"][eve]);
    console.log(subeventkeys);
    var date = full[clg]["events"][eve]["eventdetails"]
    subeventkeys.forEach(element => {
      if (element != "eventdetails") {
        var btn = document.createElement("button");
        get.innerHTML += element + "  ->   ";
        btn.className = "btn-lblue";
        btn.id = element;
        btn.innerHTML = "REGISTER";
        btn.setAttribute("onclick", "register(" + '\'' + clg + '\',' + '\'' + eve + '\',' + '\'' + element + '\',' + '\'' + date + '\'' + ")");
        get.appendChild(btn);
        get.innerHTML += "<br>";
      }
    });
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

function initialStudentSetup() {
  document.getElementById("eventsview").style.display = "none";
  var main = document.getElementById("stuprofile");
  main.style.display = "block";
  var masterdiv = document.createElement("div");

  var sname = document.createElement("input");
  sname.id = "sname";
  sname.setAttribute("type", "text");

  var scity = document.createElement("input");
  scity.id = "scity";
  scity.setAttribute("type", "text");

  var sclg = document.createElement("input");
  sclg.id = "sclg";
  sclg.setAttribute("type", "text");

  var sadd = document.createElement("input");
  sadd.id = "sadd";
  sadd.setAttribute("type", "text");

  var sport = document.createElement("input");
  sport.id = "sport";
  sport.setAttribute("type", "text");

  var sph = document.createElement("input");
  sph.id = "sph";
  sph.setAttribute("type", "text");

  masterdiv.innerHTML += "<br> ENTER YOUR NAME : ";
  masterdiv.appendChild(sname);

  masterdiv.innerHTML += "<br> ENTER YOUR CITY : ";
  masterdiv.appendChild(scity);

  masterdiv.innerHTML += "<br> ENTER YOUR COLLEGE : ";
  masterdiv.appendChild(sclg);

  masterdiv.innerHTML += "<br> ENTER YOUR ADDRESS : ";
  masterdiv.appendChild(sadd);

  masterdiv.innerHTML += "<br> ENTER YOUR PORTFOLIO SITE : ";
  masterdiv.appendChild(sport);

  masterdiv.innerHTML += "<br> ENTER YOUR PHONE NUMBER : ";
  masterdiv.appendChild(sph);

  masterdiv.innerHTML += "<br> Please do Re-Login After this ! As this is your initial Sign In" + "<br>";

  var button = document.createElement("button");
  button.classList.add("btn-lblue");
  button.innerHTML = "CONFIRM";
  button.setAttribute("onclick", "initialWrite()");

  masterdiv.appendChild(button);
  main.appendChild(masterdiv);
}

function initialWrite() {
  var sname = document.getElementById("sname").value.toUpperCase();
  var scity = document.getElementById("scity").value.toUpperCase();
  var sclg = document.getElementById("sclg").value.toUpperCase();
  var sadd = document.getElementById("sadd").value.toUpperCase();
  var sport = document.getElementById("sport").value;
  var sph = document.getElementById("sph").value
  firebase.database().ref('students/' + uid + "/sdetails").set({
    suid: uid,
    semail: email,
    sname: sname,
    scity: scity,
    sclg: sclg,
    sadd: sadd,
    sport: sport,
    sph: sph
  });
  //StuProfile();
  document.location.reload(true);
}

function StuProfile() {
  document.getElementById("homeview").style.display = "none";
  document.getElementById("stuview").style.display = "block";
  var main = document.getElementById("stuprofile");
  main.style.display = "block"
  main.innerHTML = "";

  var card = document.createElement("div");
  card.className = "card-wrap";
  card.innerHTML = "Details : <br>";

  var collegeref = database.ref('students');
  collegeref.on('value', gotdata);

  function gotdata(data) {
    var values = data.val();
    var keys = Object.keys(values);
    console.log(keys, values[uid].sname);
    card.innerHTML = values[uid]["sdetails"].sname + "<br>_________________<br>" + values[uid]["sdetails"].scity + "<br>_________________<br>" + values[uid]["sdetails"].sadd + "<br>_________________<br>";
    sname = values[uid]["sdetails"].sname;
    sclg = values[uid]["sdetails"].sclg;
  }
  main.appendChild(card);
  judgement();
}

function homeview() {
  init();
  document.getElementById("homeview").style.display = "block";
  document.getElementById("stuview").style.display = "none";
}

function register(clg, eve, subeve) {
  firebase.database().ref('colleges/' + clg + '/events/' + eve + '/' + subeve + '/registration/' + uid + '/').set({
    uid: uid,
    uname: uname,
    sclg: sclg
  });
  var up = {};
  up['students/' + uid + '/registered/' + clg + '/' + subeve] = eve;
  var u = database.ref().update(up);
  breif(clg, eve);
}

function judgement() {
  firebase.database().ref("students/" + uid + "/registered").on("value", gotdata, error);

  function error(err) {
    document.getElementById("msg").innerHTML = "OOPS! Something went wrong or Check if you have made Registrations for any events";
  }

  function gotdata(data) {
    var full = data.val();
    var keys = Object.keys(full);
    console.log(keys);
    keys.forEach(element => {
      var cuid = full[element].cuid;
      var eve = full[element].ename;
      var date = full[element].edate;
      var seve = full[element].subeve;
      console.log(cuid, eve, date, seve, getDate());
      if (date == getDate()) {
        var toappend = document.createElement("div");
        toappend.className = "card-wrap";
        toappend.innerHTML = seve + "<br>" + date + "<br>";
        var ip = document.createElement("input");
        ip.id = seve + "rating";
        ip.setAttribute("type", "text");
        ip.setAttribute("placeholder", "Give Your rating based on scale 5");

        var pin = document.createElement("input");
        pin.id = "pin";
        pin.setAttribute("type", "text");
        pin.setAttribute("placeholder", "Enter College JPIN");

        var btn = document.createElement("button");
        btn.className = "btn-lblue";
        btn.innerHTML = "VERIFY";
        btn.setAttribute("onclick", "verify(" + '\'' + cuid + '\',' + '\'' + eve + '\',' + '\'' + seve + '\',' + '\'' + uid + '\')');

        toappend.appendChild(ip);
        toappend.appendChild(pin);
        toappend.appendChild(btn);
        console.log(toappend);
        document.getElementById("judgement").innerHTML = "";
        document.getElementById("judgement").appendChild(toappend);
      }
    });
  }
}

function verify(cuid, eve, subeve, suid) {
  var ip = document.getElementById(subeve + "rating").value;
  var pin = document.getElementById("pin").value;
  firebase.database().ref("colleges/" + cuid + "/cdetails").on("value", gotdata);

  function gotdata(data) {
    var full = data.val();
    var keys = Object.keys(full);
    var jpin = full.jpin;
    console.log(pin, ip);
    if (pin == jpin)
      further(cuid, eve, subeve, suid, ip);
    else
      document.getElementById("msg").innerHTML = "OOPS! Something went wrong, Check your JPIN!";
  }
}

function further(cuid, eve, subeve, suid, ip) {
  console.log(ip);
  firebase.database().ref("colleges/" + cuid + "/events/" + eve + "/" + subeve + "/registration/" + suid).set({
    uid: suid,
    rat: ip
  });
  var up = {};
  up['colleges/' + cuid + '/events/' + eve + '/' + subeve + '/judge/' + suid] = ip;
  var u = database.ref().update(up);
  console.log(u, up);
}

function Search() {
  document.getElementById("results").style.display = "block";
  var s = document.getElementById("search").value;
  firebase.database().ref("colleges/").on("value", gotdata, goterror);

  function gotdata(data) {
    var full = data.val();
    var keys = Object.keys(full);
    for (var i = 0; i < keys.length; i++) {
      var det = full[keys[i]]["cdetails"];
      var clg = full[keys[i]]["events"];
      var eve = Object.keys(clg);
      for (var j = 0; j < eve.length; j++) {
        var evename = clg[eve[j]]["eventdetails"].ename;
        var clgname = det.cname;
        evename.toUpperCase;
        s.toUpperCase;
        clgname.toUpperCase;
        var substr1 = evename.startsWith(s);
        var substr2 = clgname.startsWith(s);
        if(s == evename || s == clgname || substr1 || substr2){
          document.getElementById("results").innerHTML = "";
          var card = document.createElement('div');
          card.classList.add("card-wrap");

          var eventname = document.createElement('div');
          eventname.id = "result" + (i + 1);
          eventname.innerHTML = clg[eve[j]]["eventdetails"].ename + "<br>" + det.cname + "<br>" + det.ccity + "<br>" + clg[eve[j]]["eventdetails"].date;

          var viewmore = document.createElement('button');
          viewmore.classList.add("btn-lblue");
          viewmore.innerHTML = "Breif Event";
          viewmore.id = "btn" + i;
          viewmore.setAttribute("onclick", "breif(" + '\'' + (det.cuid) + '\', ' + '\'' + (clg[eve[j]]["eventdetails"].ename) + '\'' + ")");

          card.appendChild(eventname);
          card.appendChild(viewmore);
          document.getElementById("results").appendChild(card);
        }
      }
    }
  }
  function goterror(err){
    document.getElementById("msg").innerHTML = "No Such Event or College Found !";
  }
}

function Find(){
  document.getElementById("results").style.display = "block";
  var sdate = document.getElementById("date").value;
  var scity = document.getElementById("city").value;
  var sdept = document.getElementById("dept").value;
  console.log(date, city, dept);
  firebase.database().ref("colleges/").on("value", gotdata, goterror);
  function gotdata(data) {
    var full = data.val();
    var keys = Object.keys(full);
    for (var i = 0; i < keys.length; i++) {
      var det = full[keys[i]]["cdetails"];
      var clg = full[keys[i]]["events"];
      var eve = Object.keys(clg);
      for (var j = 0; j < eve.length; j++) {
        var ccity = det.ccity;
        var cdate = clg[eve[j]]["eventdetails"].date;
        var cdept = clg[eve[j]]["eventdetails"].edept;
        //console.log(ccity, cdate, cdept);
        if(cdate == sdate || ccity == scity || sdept == cdept){
          document.getElementById("results").innerHTML = "";
          var card = document.createElement('div');
          card.classList.add("card-wrap");

          var eventname = document.createElement('div');
          eventname.id = "result" + (i + 1);
          eventname.innerHTML = clg[eve[j]]["eventdetails"].ename + "<br>" + det.cname + "<br>" + det.ccity + "<br>" + clg[eve[j]]["eventdetails"].date;

          var viewmore = document.createElement('button');
          viewmore.classList.add("btn-lblue");
          viewmore.innerHTML = "Breif Event";
          viewmore.id = "btn" + i;
          viewmore.setAttribute("onclick", "breif(" + '\'' + (det.cuid) + '\', ' + '\'' + (clg[eve[j]]["eventdetails"].ename) + '\'' + ")");

          card.appendChild(eventname);
          card.appendChild(viewmore);
          document.getElementById("results").appendChild(card);
        }
      }
    }
  }
  function goterror(err){
    document.getElementById("msg").innerHTML = "No Such Event details Found with us !";
  }
}
var config = {
  apiKey: "AIzaSyDHRaUdSia9yqgmctcCLVlJT0Uvm64lTQo",
  authDomain: "ceveorg.firebaseapp.com",
  databaseURL: "https://ceveorg.firebaseio.com",
  projectId: "ceveorg",
  storageBucket: "ceveorg.appspot.com",
  messagingSenderId: "801640377446"
};
firebase.initializeApp(config);

var database = firebase.database();
window.onload = init();

var month = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];

var provider = new firebase.auth.OAuthProvider('google.com');
provider.addScope('profile');
provider.addScope('email');

function Si() {
  firebase.auth().signInWithPopup(provider).then(function (result) {
    token = result.credential.accessToken;
    var user1 = result.user;
    //document.location.reload(true);
    //window.location.reload("https://itspushtack.firebaseapp.com");
    var btn = document.getElementById("sign");
    btn.innerHTML = "Sign Out";
    btn.setAttribute("onclick", "So();");
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
  today = dd + ' ' + mm+ ' ' + yyyy;
  return today;
}

function init() {
  var events = database.ref('events');
  events.on('value', gotdata);

  function gotdata(data) {
    var nowdate = getDate();
    console.log(nowdate);
    var eventref = data.val();
    var keys = Object.keys(eventref);
    for (var i = 0; i < keys.length; i++) {
      var k = keys[i];
      if (eventref[k].date < "18 MAR 19")
        continue;
      var name = eventref[k].name;
      var dept = eventref[k].dept;
      console.log(eventref[k].date);
      var write = document.getElementById('eventsview');

      var card = document.createElement('div');
      card.classList.add("card-wrap");
      card.id = "card" + (i + 1);

      var eventname = document.createElement('div');
      eventname.id = "eventname" + (i + 1);
      eventname.innerHTML = name;

      var deptofevent = document.createElement('div');
      deptofevent.id = "depteve" + (i + 1);
      deptofevent.innerHTML = dept;

      card.appendChild(eventname);
      card.appendChild(deptofevent);

      var viewmore = document.createElement('button');
      viewmore.classList.add("btn-lblue");
      viewmore.innerHTML = "Breif Event";
      viewmore.id = "btn" + i;
      viewmore.setAttribute("onclick", "breif(" + (i + 1) + ");")

      card.appendChild(viewmore);

      write.appendChild(card);
    }
  }
}

function breif(val) {

  var name = document.getElementById('eventname' + val).innerHTML;
  var dept = document.getElementById('depteve' + val).innerHTML;
  var get = document.getElementById('eventsview');
  get.innerHTML = "";
  var events = database.ref('events');
  events.on('value', gotdata);
  function gotdata(data) {
    var eventref = data.val();
    var keys = Object.keys(eventref);
    console.log(eventref, keys);
    var k = "e" + val;
    get.innerHTML += eventref[k].name + '<br>' + eventref[k].dept;
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

(function() {
  $('#datepicker').datepicker({
    firstDay: 1,
    showOtherMonths: false,
    changeMonth: true,
    changeYear: true,
    dateFormat: 'dd.mm.yy',
    showButtonPanel: true,
    closeText: 'Cancel'
  });

  $('#datepicker').click(function() {
    return $('.ui-datepicker').addClass('active');
  });

}).call(this);

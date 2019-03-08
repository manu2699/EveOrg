firebase.initializeApp({
    apiKey: "AIzaSyDHRaUdSia9yqgmctcCLVlJT0Uvm64lTQo",
    authDomain: "ceveorg.firebaseapp.com",
    databaseURL: "https://ceveorg.firebaseio.com",
    projectId: "ceveorg",
    storageBucket: "ceveorg.appspot.com",
    messagingSenderId: "801640377446"
});

var database = firebase.database(),
    uname, email, photoUrl, emailVerified, uid, subeventcount = 2;

function clogin() {

    var email = document.getElementById("cuser").value,
        pass = document.getElementById("pass").value;

    firebase.auth().signInWithEmailAndPassword(email, pass).
    then(function (data) {
        document.getElementById("login").innerHTML = "";
        document.getElementById("msg").innerHTML = "<br> Welcome " + email + "<br>";
        getCurrentUserDetails();
        addSignOut();
        afterLogin();
    }).
    catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        document.getElementById("msg").innerHTML = "<br> Error : " + errorMessage + "<br>";
    });
}

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

function addSignOut() {
    var outerdiv = document.getElementById("adding");
    var button = document.createElement("button");
    button.classList.add("btnl");
    button.innerHTML = "SIGN OUT";
    button.setAttribute("onclick", "So()");
    outerdiv.appendChild(button);
}

function csignup() {

    var main = document.getElementById("login");
    main.innerHTML = "";

    var name = document.createElement("input");
    name.id = "cname";
    name.setAttribute("type", "text");
    name.setAttribute("placeholder", "admin@college.org | admin@college.com");

    var pass = document.createElement("input");
    pass.id = "pass";
    pass.setAttribute("type", "password");
    pass.setAttribute("placeholder", "Enter Password");

    var cpass = document.createElement("input");
    cpass.id = "cpass";
    cpass.setAttribute("type", "password");
    cpass.setAttribute("placeholder", "Re Enter Password");

    var button = document.createElement("button");
    button.classList.add("btn-lblue");
    button.innerHTML = "CREATE ACCOUNT";
    button.setAttribute("onclick", "createacc()");

    main.innerHTML += "<br> COLLEGE ID : ";
    main.appendChild(name);

    main.innerHTML += "<br> PASSWORD : ";
    main.appendChild(pass);

    main.innerHTML += "<br> RE ENTER PASSWORD : ";
    main.appendChild(cpass);

    main.innerHTML += "<br>";
    main.appendChild(button);

}

function createacc() {

    var email = document.getElementById("cname").value;
    var pass = document.getElementById("pass").value;

    firebase.auth().createUserWithEmailAndPassword(email, pass).
    then(function (data) {
        document.getElementById("login").innerHTML = "";
        document.getElementById("msg").innerHTML = "<br> Welcome " + email + "<br>";
        getCurrentUserDetails();
        addSignOut();
        initialDetailSetup();
    }).
    catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, errorMessage);
        document.getElementById("msg").innerHTML = "Error : " + errorMessage + "<br>";
    });
}

function initialDetailSetup() {
    var main = document.getElementById("det");
    var masterdiv = document.createElement("div");

    var cname = document.createElement("input");
    cname.id = "cname";
    cname.setAttribute("type", "text");

    var ccity = document.createElement("input");
    ccity.id = "ccity";
    ccity.setAttribute("type", "text");

    var cadd = document.createElement("input");
    cadd.id = "cadd";
    cadd.setAttribute("type", "text");

    var cweb = document.createElement("input");
    cweb.id = "cweb";
    cweb.setAttribute("type", "text");

    var cph = document.createElement("input");
    cph.id = "cph";
    cph.setAttribute("type", "text");

    masterdiv.innerHTML += "<br> ENTER COLLEGE NAME : ";
    masterdiv.appendChild(cname);

    masterdiv.innerHTML += "<br> ENTER COLLEGE CITY : ";
    masterdiv.appendChild(ccity);

    masterdiv.innerHTML += "<br> ENTER COLLEGE ADDRESS : ";
    masterdiv.appendChild(cadd);

    masterdiv.innerHTML += "<br> ENTER COLLEGE WEBSITE : ";
    masterdiv.appendChild(cweb);

    masterdiv.innerHTML += "<br> ENTER COLLEGE PHONE NUMBER : ";
    masterdiv.appendChild(cph);

    masterdiv.innerHTML += "<br>";

    var button = document.createElement("button");
    button.classList.add("btn-lblue");
    button.innerHTML = "ADD DETAILS";
    button.setAttribute("onclick", "initialWrite()");

    masterdiv.appendChild(button);
    main.appendChild(masterdiv);

}

function initialWrite() {
    var cname = document.getElementById("cname").value.toUpperCase();
    var ccity = document.getElementById("ccity").value.toUpperCase();
    var cadd = document.getElementById("cadd").value.toUpperCase();
    var cweb = document.getElementById("cweb").value;
    var cph = document.getElementById("cph").value
    //console.log(cname, ccity, cadd, cweb, cph);
    firebase.database().ref('colleges/' + uid + "/cdetails").set({
        cuid: uid,
        cemail: email,
        cname: cname,
        ccity: ccity,
        cadd: cadd,
        cweb: cweb,
        cph: cph
    });
    afterLogin();
}

function afterLogin() {
    var mainref = document.getElementById("det");

    var card = document.createElement('div');
    card.classList.add("card-wrap");
    card.innerHTML = "Details : <br>";

    var collegeref = database.ref('colleges');
    collegeref.on('value', gotdata);

    function gotdata(data) {
        var values = data.val();
        var keys = Object.keys(values);
        console.log(keys, values[uid].cname);
        card.innerHTML += values[uid]["cdetails"].cname + "<br>_________________<br>" + values[uid]["cdetails"].ccity + "<br>_________________<br>" + values[uid]["cdetails"].cadd + "<br>_________________<br>";

    }
    mainref.appendChild(card);

    var button = document.createElement("button");
    button.classList.add("btn-lblue");
    button.innerHTML = "HOST AN EVENT";
    button.setAttribute("onclick", "host()");
    mainref.appendChild(button);
}

function host() {
    document.getElementById('hostdet').style.display = "block";
    document.getElementById('hostbuttons').style.display = "block";
}

function addSubEvents() {
    var main = document.getElementById('hostdet');

    var one = document.createElement("div");
    one.className = "col m6";
    one.innerHTML = "<br>SUBEVENT " + subeventcount + " NAME : "

    var input = document.createElement("input");
    input.setAttribute("type", "text");
    input.id = "subevent" + subeventcount;

    one.appendChild(input);

    var two = document.createElement("div");
    two.className = "col m6";
    two.innerHTML = "<br>NEEDED FACILITIES FOR SUBEVENT " + subeventcount + " : ";

    var selector = document.createElement("select");
    selector.id = "subevef" + subeventcount;
    selector.className = "browser-default";

    var optdef = document.createElement("option");
    optdef.value = "";
    optdef.innerHTML = "please choose";

    var optboth = document.createElement("option");
    optboth.value = "BOTH";
    optboth.innerHTML = "BOTH REGISTRATIONS AND JUDGEMENT";

    var optreg = document.createElement("option");
    optreg.value = "REG"
    optreg.innerHTML = "REGISTRATIONS"

    var optjud = document.createElement("option");
    optjud.value = "JUD";
    optjud.innerHTML = "JUDGEMENT";

    var optnone = document.createElement("option");
    optnone.value = "none";
    optnone.innerHTML = "NONE";

    selector.appendChild(optdef);
    selector.appendChild(optboth);
    selector.appendChild(optreg);
    selector.appendChild(optjud);
    selector.appendChild(optnone);

    var three = document.createElement("div");
    three.className = "clearfix";

    two.appendChild(selector);
    main.appendChild(one);
    main.appendChild(two);
    main.appendChild(three);
    subeventcount++;

}

function So() {
    firebase.auth().signOut().then(function () {
        document.location.reload(true);
        //window.location.reload("https://itspushtack.firebaseapp.com");
    });
}

function finalize() {
    console.log(uid);
    var ename = document.getElementById("eventname").value;
    var etype = document.getElementById("eventtype").value;
    var date = document.getElementById("edate").value;
    var edesc = document.getElementById("desc").value;
    firebase.database().ref("colleges/" + uid + "/events/" + ename + "/eventdetails").set({
        ename: ename,
        etype: etype,
        date: date,
        edesc: edesc
    });
    for (var i = 1; i <= subeventcount; i++) {
        var subeventname = document.getElementById("subevent" + i).value;
        var subeventfac = document.getElementById("subevef" + i).value;
        console.log(subeventname, subeventfac);
        firebase.database().ref("colleges/" + uid + "/events/" + ename + "/" + subeventname).set({
            subeventname: subeventname,
            mainevent: ename
        });
    }
}
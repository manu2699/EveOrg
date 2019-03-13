firebase.initializeApp({
    apiKey: "AIzaSyDHRaUdSia9yqgmctcCLVlJT0Uvm64lTQo",
    authDomain: "ceveorg.firebaseapp.com",
    databaseURL: "https://ceveorg.firebaseio.com",
    projectId: "ceveorg",
    storageBucket: "ceveorg.appspot.com",
    messagingSenderId: "801640377446"
});

var database = firebase.database(),
    uname, email, photoUrl, emailVerified, uid, subeventcount = 1;

function clogin() {

    var email = document.getElementById("cuser").value,
        pass = document.getElementById("pass").value;

    firebase.auth().signInWithEmailAndPassword(email, pass).
    then(function (data) {
        document.getElementById("login").innerHTML = "";
        document.getElementById("msg").innerHTML = "<br> Welcome " + email + "<br>";
        getCurrentUserDetails();
        //addSignOut();
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

    var jpin = document.createElement("input");
    jpin.id = "jpin";
    jpin.setAttribute("type", "text");

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

    masterdiv.innerHTML += "<br> SET YOUR COLLEGE JPIN FOR JUDGEMENT/REVIEWS : ";
    masterdiv.appendChild(jpin);


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
    var cph = document.getElementById("cph").value;
    var jpin = document.getElementById("jpin").value;
    //console.log(cname, ccity, cadd, cweb, cph);
    firebase.database().ref('colleges/' + uid + "/cdetails").set({
        cuid: uid,
        cemail: email,
        cname: cname,
        ccity: ccity,
        cadd: cadd,
        cweb: cweb,
        cph: cph,
        jpin: jpin
    });
    afterLogin();
}

function afterLogin() {
    var mainref = document.getElementById("det");
    document.getElementById("hostdet").style.display = "none";
    document.getElementById('hostbuttons').style.display = "none";
    var card = document.createElement('div');
    card.classList.add("card-wrap");
    card.innerHTML = "Details : <br>";

    var collegeref = database.ref('colleges');
    collegeref.on('value', gotdata);

    function gotdata(data) {
        var values = data.val();
        var keys = Object.keys(values);
        console.log(keys, values[uid].cname);
        card.innerHTML = values[uid]["cdetails"].cname + "<br>_________________<br>" + values[uid]["cdetails"].ccity + "<br>_________________<br>" + values[uid]["cdetails"].cadd + "<br>_________________<br>";
    }
    mainref.appendChild(card);

    var three = document.createElement("div");
    three.className = "clearfix";
    mainref.appendChild(three);

    var button = document.createElement("button");
    button.classList.add("btn-lblue");
    button.innerHTML = "HOST AN EVENT &#x1F4C5;";
    button.setAttribute("onclick", "host()");
    mainref.appendChild(button);

    var logout = document.createElement("a");
    logout.innerHTML = "LOG OUT";
    logout.setAttribute("onclick", "So()");

    document.getElementById("myTopnav").appendChild(logout);

    previousEvents();
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
    var ename = document.getElementById("eventname").value.toUpperCase;
    var etype = document.getElementById("eventtype").value;
    var date = document.getElementById("edate").value;
    var edesc = document.getElementById("desc").value;
    var edept = document.getElementById("edept").value.toUpperCase;
    firebase.database().ref("colleges/" + uid + "/events/" + ename + "/eventdetails").set({
        ename: ename,
        etype: etype,
        date: date,
        edesc: edesc,
        edept: edept
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
    document.getElementById("todisplay").innerHTML = "";
    document.getElementById("hostdet").style.display = "none";
    document.getElementById('hostbuttons').style.display = "none";
    //document.location.reload(true);
    previousEvents();
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

function previousEvents() {
    var e = 1;
    firebase.database().ref("colleges/" + uid + "/events/").on("value", gotdata);

    function gotdata(data) {
        var full = data.val();
        var keys = Object.keys(full);
        keys.forEach(element => {
            writePrev(full[element].eventdetails, e);
            e += 1
        });
    }

    function writePrev(data, e) {
        console.log(data);
        //document.getElementById("todisplay").innerHTML = " Events :> ";
        var toappend = document.createElement("div");
        toappend.className = "card-wrap"
        toappend.innerHTML = data.ename + '<br>' + data.date + "<br>";

        var btn = document.createElement("button");
        btn.className = "btn-lblue";
        btn.innerHTML = "VIEW <i class=\"fa fa-search\" aria-hidden=\"true\"></i>" ;
        btn.setAttribute("onclick", "view(" + '\'' + data.ename + '\'' + ")");
        toappend.appendChild(btn);

        document.getElementById("todisplay").appendChild(toappend);
    }
}

function view(ename) {
    console.log(ename);
    firebase.database().ref("colleges/" + uid + "/events/" + ename + "/").on("value", gotdata);
    document.getElementById("todisplay").innerHTML = "SubEvents :> ";
    document.getElementById("todisplay").style.display = "block";

    function gotdata(data) {
        var full = data.val();
        var keys = Object.keys(full);
        keys.forEach(element => {
            //console.log(full, keys, element);
            if (element != "eventdetails") {

                var toappend = document.createElement("div");
                toappend.className = "card-wrap"
                toappend.innerHTML = "EVENT NAME :> "+ element + "<br>"

                var btn = document.createElement("button");
                btn.className = "btn-lblue";
                btn.innerHTML = "CLICK HERE TO JUDGE & CHECK LIVE RESULTS &#x2696;";
                btn.setAttribute("onclick", "judge(" + '\'' + ename + '\',' + '\'' + element + '\'' + ")");
                toappend.appendChild(btn);
                //console.log(full, keys, element, toappend);
                document.getElementById("bd").appendChild(toappend);
            }
        });
    }
}

function judge(ename, subeve) {
    firebase.database().ref("colleges/" + uid + "/events/" + ename + "/" + subeve + "/registration").on("value", gotdata, err);

    function err(error) {
        document.getElementById("msg").innerHTML = "OOPS! Something went wrong or Check if Registrations are made available for this event and do check its registration count";
    }

    function gotdata(data) {
        var full = data.val();
        var keys = Object.keys(full);
        //console.log(full, keys);
        var date;
        firebase.database().ref("colleges/" + uid + "/events/" + ename + "/eventdetails").on("value", getdate);

        function getdate(data) {
            date = data.val().date;
        }
        console.log(date);

        keys.forEach(element => {
            firebase.database().ref("students/" + element + "/registered/" + subeve).set({
                scale: "null",
                ename: ename,
                subeve: subeve,
                cuid: uid,
                edate: date
            });
        });
        sort(uid, ename, subeve);
        document.getElementById("msg").innerHTML = "Judgement made available to registered students! Ask them to login to give your judgement, & enter judgepin for verifying your identity for judgement"
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

function sort(uid, ename, subeve) {
    var div = document.getElementById("results");
    div.style.display = "block";
    div.innerHTML = " RESULTS  &#x2696; :> " + "<br>";
    firebase.database().ref("colleges/" + uid + "/events/" + ename + "/" + subeve + "/judge/").orderByValue().on("value", gotdata, goterror);
    function gotdata(data) {
        var full = data.val();
        var keys = Object.keys(full);
        for (var i = keys.length - 1; i >= 0; i--) 
            resultInfo(keys[i], full[keys[i]], subeve)
    }

    function goterror(err) {
        document.getElementById("msg").innerHTML = "Error Occured ! Judgement May have not been done";
    }
    var clear = document.createElement("div");
    clear.className = "clearfix";
    document.getElementById("results").appendChild(clear);
}

function resultInfo(suid, pts, subeve) {
    var div = document.createElement("div");
    div.className = "card-wrap";
    firebase.database().ref("students/" + suid + "/sdetails/").on("value", gdata);
    function gdata(data) {
        div.innerHTML += "Name : " + data.val().sname + "<br>" + " College : " + data.val().sclg + "<br>";
        div.innerHTML += "Rating : " + pts + "Points" + "<br>" + "Event : " + subeve;
    }
    //console.log(div);
    document.getElementById("results").appendChild(div);
}
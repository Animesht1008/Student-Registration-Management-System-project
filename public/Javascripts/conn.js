var userinfo = []
var user=""
console.log(userinfo.length)
async function postData(url = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
}
async function fun() {
    postData('/getdata/fetch', {})
        .then(data => {
            console.log(data); // JSON data parsed by `data.json()` call
            userinfo = data.res
            console.log(userinfo)
            userinfo.map(user => {
                //console.log(Math.floor((new Date()-new Date(user.dob))/(365*24*60*60*1000)))
                let div = document.createElement("DIV")
                div.classList.add("colname")
                div.id = user.email
                let email = document.createElement("DIV")
                email.classList.add("email")
                email.id=user.email+"email"
                let name = document.createElement("DIV")
                name.classList.add("name")
                name.id=user.email+"name"
                let college = document.createElement("DIV")
                college.classList.add("college")
                college.id=user.email+"college"
                let city = document.createElement("DIV")
                city.classList.add("city")
                city.id=user.email+"city"
                let dob = document.createElement("DIV")
                dob.classList.add("dob")
                dob.id=user.email+"dob"
                let mob = document.createElement("DIV")
                mob.classList.add("mob")
                mob.id=user.email+"mob"
                email.innerText = user.email || "-"
                name.innerText = user.name || "-"
                college.innerText = user.college || "-"
                city.innerText = user.city || "-"
                dob.innerText = user.dob || "-"
                mob.innerText = user.mob || "-"
                div.appendChild(email)
                div.appendChild(name)
                div.appendChild(college)
                div.appendChild(city)
                div.appendChild(dob)
                div.appendChild(mob)
                div.style.backgroundColor = `rgb(${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)},10)`
                document.getElementById("datarow").appendChild(div)
            })

        });
}
function erase(){
    document.getElementById("cname").value=""
    document.getElementById("college").value=""
    document.getElementById("city").value=""
    document.getElementById("mobnum").value=""
    document.getElementById("dob").value=""
    

}
function logout(){
    user=""
    erase()
    document.getElementById("lout").style.visibility="hidden"
    document.getElementById("updatedata").style.visibility="hidden"
    document.getElementById("delete").style.visibility="hidden"
    document.getElementById("uform").style.visibility="hidden"
    document.getElementById("lpage").style.visibility="visible"
    document.getElementById("rpage").style.visibility="visible"
    document.getElementById("buttons").style.visibility="visible"
}
function deleteaccount(){
    postData('/getdata/delete',{"email":user})
    .then(res=>{
        console.log(res.res)
        if(res.res==="account deleted")
        {
            let div=document.getElementById(user)
            div.parentNode.removeChild(div)
            logout();
        }
    })
    .catch(err=>{
        throw err
    })
}

function showupdateform(email)
{
    document.getElementById("lout").style.visibility="visible"
    document.getElementById("delete").style.visibility="visible"
    document.getElementById("updatedata").style.visibility="visible"
    document.getElementById("uform").style.visibility="visible"
    document.getElementById("lpage").style.visibility="hidden"
    document.getElementById("rpage").style.visibility="hidden"
    document.getElementById("buttons").style.visibility="hidden"
    document.getElementById("warning3").innerText=`hi ${email} update your info`

    
}

async function register() {
    let email = document.getElementById("email").value
    let pass = document.getElementById("pass").value
    let cpass = document.getElementById("cpass").value
    console.log(email,pass,"hello")
    if (email!=="" && pass!=="" && pass===cpass) {
        postData('/getdata/register', { "email": email, "pass": pass }).then(res => {
            if (res.res === "registration successful") {
                document.getElementById("warning1").innerText = res.res

                setTimeout(() => {
                    document.getElementById("warning1").innerText = ""
                document.getElementById("email").value = ""
                document.getElementById("pass").value = ""
                document.getElementById("cpass").value = ""
                }, 2000);
                
            }
            else {
                document.getElementById("warning1").innerText = res.res

                setTimeout(() => {
                    document.getElementById("warning1").innerText = ""

                }, 2000);
            }
        })
            .catch(err => {
                throw err
            })
    }
    else {
        console.log(document.getElementById("warning1"))
        document.getElementById("warning1").innerText = "recheck your data something is wrong"

        setTimeout(() => {
            document.getElementById("warning1").innerText = ""

        }, 2000);
    }
}
async function login() {
    console.log("login")
    let email = document.getElementById("email1").value
    let pass = document.getElementById("pass1").value


    postData('/getdata/login', { "email": email, "pass": pass }).then(res => {
        if (res.res === "login successful") {
            document.getElementById("warning").innerText = res.res
            setTimeout(() => {
                document.getElementById("warning").innerText = ""
                document.getElementById("email1").value = ""
                document.getElementById("pass1").value = ""
            }, 2000);
            user=email
            showupdateform(email)
           
        }
        else {
            document.getElementById("warning").innerText = res.res
            setTimeout(() => {
                document.getElementById("warning").innerText = ""
            }, 2000);
            
        }
    })
        .catch(err => {
            throw err
        })

}
function sendupdate(){
    let name,college,city,dob,mob,email
    email=user
    name=document.getElementById("cname").value
    college=document.getElementById("college").value
    city=document.getElementById("city").value
    mob=document.getElementById("mobnum").value
    dob=document.getElementById("dob").value
    postData("/getdata/update",{"name":name,"college":college,"city":city,"mob":mob,"dob":dob,"email":email})
    .then(res=>{
        document.getElementById("warning3").innerText=`hi ${user} your info is updated`
        if(document.getElementById(email))
        {console.log("yes")
            if(name!=="")
            {
                document.getElementById(email+"name").innerText=name
            }
            if(college!=="")
            {
                document.getElementById(email+"college").innerText=college
            }
            if(dob!=="")
            {
                document.getElementById(email+"dob").innerText=dob
            }
            if(city!=="")
            {
                document.getElementById(email+"city").innerText=city
            }
            if(mob!=="")
            {
                document.getElementById(email+"mob").innerText=mob
            }
        }
        else
        {console.log("no")
            let div = document.createElement("DIV")
                div.classList.add("colname")
                div.id = email
                let email1 = document.createElement("DIV")
                email1.classList.add("email")
                email1.id=email+"email"
                let name1 = document.createElement("DIV")
                name1.classList.add("name")
                name1.id=email+"name"
                let college1 = document.createElement("DIV")
                college1.classList.add("college")
                college1.id=email+"college"
                let city1 = document.createElement("DIV")
                city1.classList.add("city")
                city1.id=email+"city"
                let dob1 = document.createElement("DIV")
                dob1.classList.add("dob")
                dob1.id=email+"dob"
                let mob1 = document.createElement("DIV")
                mob1.classList.add("mob")
                mob1.id=email+"mob"
                email1.innerText = email || "-"
                name1.innerText = name || "-"
                college1.innerText = college || "-"
                city1.innerText = city || "-"
                dob1.innerText = dob || "-"
                mob1.innerText = mob || "-"
                div.appendChild(email1)
                div.appendChild(name1)
                div.appendChild(college1)
                div.appendChild(city1)
                div.appendChild(dob1)
                div.appendChild(mob1)
                div.style.backgroundColor = `rgb(${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)},10)`
                document.getElementById("datarow").appendChild(div)
        }
        setTimeout(() => {
            document.getElementById("warning3").innerText=`hi ${user} update your info`
            erase()

        }, 3000);
        
    })
    .catch(err=>{
        throw err
    })
}
window.onload=fun





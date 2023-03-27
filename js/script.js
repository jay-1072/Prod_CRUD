const idRegex = /^[0-9]{6}$/;
const nameRegex = /^[A-Za-z]+$/;
const emailRegex = /^[a-z_]{3,}@[a-z]{3,}[.]{1}[a-z.]{2,6}$/;

const Products = [];

function createEmployee(Eid, Efname, Emname, Elname, Eemail, Egender) {
    this.Eid = Eid;
    this.Efname = Efname;
    this.Emname = Emname;
    this.Elname = Elname;
    this.Eemail = Eemail;
    this.Egender = Egender;
}

const orig_eid_ip = document.getElementById("empId");
const orig_fname_ip = document.getElementById("empFname");
const orig_mname_ip = document.getElementById("empMname");
const orig_lname_ip = document.getElementById("empLname");
const orig_email_ip = document.getElementById("empEmail");

function addEmployee() {

    let flag = true;

    const eid = document.getElementById("empId").value.trim();
    const fname = document.getElementById("empFname").value.trim();
    const mname = document.getElementById("empMname").value.trim();
    const lname = document.getElementById("empLname").value.trim();
    const email = document.getElementById("empEmail").value.trim();

    // set default content and style 

    document.getElementById("empIdError").innerHTML = "";
    document.getElementById("empId").style = orig_eid_ip;

    document.getElementById("empFnameError").innerHTML = "";
    document.getElementById("empFname").style = orig_fname_ip;

    document.getElementById("empMnameError").innerHTML = "";
    document.getElementById("empMname").style = orig_mname_ip;

    document.getElementById("empLnameError").innerHTML = "";
    document.getElementById("empLname").style = orig_lname_ip;

    document.getElementById("empEmailError").innerHTML = "";
    document.getElementById("empEmail").style = orig_email_ip;

    if(flag) {

        if(eid=='') {
            document.getElementById("empIdError").innerHTML = "Id is required";
            document.getElementById("empId").style.border = "1px solid red";
            flag = false;
        }

        if(fname=='') {
            document.getElementById("empFnameError").innerHTML = "First name is required";
            document.getElementById("empFname").style.border = "1px solid red";
            flag = false;
        }

        if(mname=='') {
            document.getElementById("empMnameError").innerHTML = "Middle name is required";
            document.getElementById("empMname").style.border = "1px solid red";
            flag = false;
        }

        if(lname=='') {
            document.getElementById("empLnameError").innerHTML = "Last name is required";
            document.getElementById("empLname").style.border = "1px solid red";
            flag = false;
        }

        if(email=='') {
            document.getElementById("empEmailError").innerHTML = "Email is required";
            document.getElementById("empEmail").style.border = "1px solid red";
            flag = false;
        }

    }

    if (!idRegex.test(eid) && eid != '') {
        document.getElementById("empIdError").innerHTML = "Id is invalid it must contain 6 digits only";
        document.getElementById("empId").style.border = "1px solid red";
        flag = false;
    }

    if (!nameRegex.test(fname) && fname != '') {
        document.getElementById("empFnameError").innerHTML = "First name is invalid";
        document.getElementById("empFname").style.border = "1px solid red";
        flag = false;
    }

    if (!nameRegex.test(mname) && mname != '') {
        document.getElementById("empMnameError").innerHTML = "middle name is invalid";
        document.getElementById("empMname").style.border = "1px solid red";
        flag = false;
    }

    if (!nameRegex.test(lname) && lname != '') {
        document.getElementById("empLnameError").innerHTML = "last name is invalid";
        document.getElementById("empLname").style.border = "1px solid red";
        flag = false;
    }

    if (!emailRegex.test(email) && email != '') {
        document.getElementById("empEmailError").innerHTML = "email is invalid";
        document.getElementById("empEmail").style.border = "1px solid red";
        flag = false;
    }

    if(flag) {

        Employees.push(new createEmployee(eid, fname, mname, lname, email, gender));
        localStorage.setItem('employees', JSON.stringify(Employees));

        let emps = JSON.parse(localStorage.getItem('employees'));
        console.log(emps[0].Eemail);

        const tblContainer = document.getElementById('tblContainer');

        const tbl = document.getElementById('empTbl');
        const body = document.body;

        const updateBtn = document.getElementById('updateTD');
        const deleteBtn = document.getElementById('deleteTD');

        
        for (let i = 0; i < emps.length; i++) {

            let empData = Object.values(emps[i]);

            const tr = tbl.insertRow();
            
            const td1 = tr.insertCell();
            td1.appendChild(document.createTextNode(empData[0]));
            // td1.style.border = "1px solid black";
            // td1.style.textAlign = "center";

            const td2 = tr.insertCell();
            td2.appendChild(document.createTextNode(empData[1]));
            // td2.style.border = "1px solid black";
            // td2.style.textAlign = "center";

            const td3 = tr.insertCell();
            td3.appendChild(document.createTextNode(empData[2]));
            // td3.style.border = "1px solid black";
            // td3.style.textAlign = "center";

            const td4 = tr.insertCell();
            td4.appendChild(document.createTextNode(empData[3]));
            // td4.style.border = "1px solid black";
            // td4.style.textAlign = "center";

            const td5 = tr.insertCell();
            td5.appendChild(document.createTextNode(empData[4]));
            // td5.style.border = "1px solid black";
            // td5.style.textAlign = "center";

            const td6 = tr.insertCell();
            td6.appendChild(document.createTextNode(empData[5]));
            // td6.style.border = "1px solid black";
            // td6.style.textAlign = "center";

            tr.appendChild(updateBtn);
            tr.appendChild(deleteBtn);
        }

        tblContainer.appendChild(tbl);
        body.appendChild(tblContainer);

        // Toast show
        const toastTrigger = document.getElementById('liveToastBtn');
        const toastLiveExample = document.getElementById('liveToast');
       
        if (toastTrigger) {
            const toast = new bootstrap.Toast(toastLiveExample);
            toast.show();
            reset();
        }
    }
}

function resetModal() {

    document.getElementById("empIdError").innerHTML = "";
    document.getElementById("empId").style = orig_eid_ip;

    document.getElementById("empFnameError").innerHTML = "";
    document.getElementById("empFname").style = orig_fname_ip;

    document.getElementById("empMnameError").innerHTML = "";
    document.getElementById("empMname").style = orig_mname_ip;

    document.getElementById("empLnameError").innerHTML = "";
    document.getElementById("empLname").style = orig_lname_ip;

    document.getElementById("empEmailError").innerHTML = "";
    document.getElementById("empEmail").style = orig_email_ip;

    document.getElementById("empGenderError").innerHTML = "";

    reset();
}

function reset() {
    document.getElementById("empId").value = "";
    document.getElementById("empFname").value = "";
    document.getElementById("empMname").value = "";
    document.getElementById("empLname").value = "";
    document.getElementById("empEmail").value = "";
}
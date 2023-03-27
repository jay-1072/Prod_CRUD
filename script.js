const idRegex = /^[0-9]{6}$/;
const nameRegex = /^[A-Za-z]+$/;

const Products = [];

function createProduct(pId, pName, pImage, pPrice, pDesc) {
    this.pId = pId;
    this.pName = pName;
    this.pImage = pImage;
    this.pPrice = pPrice;
    this.pDesc = pDesc;
}

const orig_pid = document.getElementById("prdId");
const orig_pname = document.getElementById("prdName");
const orig_pimage = document.getElementById("prdImage");
const orig_pprice = document.getElementById("prdPrice");
const orig_pdesc = document.getElementById("prdDesc");

function addProduct() {

    let flag = true;

    const pid = document.getElementById("prdId").value.trim();
    const pname = document.getElementById("prdName").value.trim();
    const pimage = document.getElementById("prdImage").value.trim();
    const pprice = document.getElementById("prdPrice").value.trim();
    const pdesc = document.getElementById("prdDesc").value.trim();

    // set default content and style 

    document.getElementById("prdIdError").innerHTML = "";
    document.getElementById("prdId").style = orig_pid;

    document.getElementById("prdNameError").innerHTML = "";
    document.getElementById("prdName").style = orig_pname;

    document.getElementById("prdImageError").innerHTML = "";
    document.getElementById("prdImage").style = orig_pimage;

    document.getElementById("prdPriceError").innerHTML = "";
    document.getElementById("prdPrice").style = orig_pprice;

    document.getElementById("prdDescError").innerHTML = "";
    document.getElementById("prdDesc").style = orig_pdesc;

    if(flag) {

        if(pid=='') {
            document.getElementById("prdIdError").innerHTML = "Id is required";
            document.getElementById("prdId").style.border = "1px solid red";
            flag = false;
        }

        if(pname=='') {
            document.getElementById("prdNameError").innerHTML = "name is required";
            document.getElementById("prdName").style.border = "1px solid red";
            flag = false;
        }

        if(pimage=='') {
            document.getElementById("prdImageError").innerHTML = "image is required";
            document.getElementById("prdImage").style.border = "1px solid red";
            flag = false;
        }

        if(pprice=='') {
            document.getElementById("prdPriceError").innerHTML = "price is required";
            document.getElementById("prdPrice").style.border = "1px solid red";
            flag = false;
        }

        if(pdesc=='') {
            document.getElementById("prdDescError").innerHTML = "description is required";
            document.getElementById("prdDesc").style.border = "1px solid red";
            flag = false;
        }

    }

    if (!idRegex.test(pid) && pid != '') {
        document.getElementById("prdIdError").innerHTML = "Id is invalid it must contain 6 digits only";
        document.getElementById("prdId").style.border = "1px solid red";
        flag = false;
    }

    if (!nameRegex.test(pname) && pname != '') {
        document.getElementById("prdNameError").innerHTML = "product name is invalid";
        document.getElementById("prdName").style.border = "1px solid red";
        flag = false;
    }

    if(flag) {

        Products.push(new createProduct(pid, pname, pimage, pprice, pdesc));
        localStorage.setItem('products', JSON.stringify(Products));

        let prds = JSON.parse(localStorage.getItem('products'));
        // console.log(prds[0].pid);

        const tblContainer = document.getElementById('tblContainer');

        const tbl = document.getElementById('prdTbl');
        const body = document.body;
        
        for (let i = 0; i < prds.length; i++) {

            let prdData = Object.values(prds[i]);

            const tr = tbl.insertRow();
            
            const td1 = tr.insertCell();
            td1.appendChild(document.createTextNode(prdData[0]));
            // td1.style.border = "1px solid black";
            // td1.style.textAlign = "center";

            const td2 = tr.insertCell();
            td2.appendChild(document.createTextNode(prdData[1]));
            // td2.style.border = "1px solid black";
            // td2.style.textAlign = "center";

            const td3 = tr.insertCell();
            td3.appendChild(document.createTextNode(prdData[2]));
            // td3.style.border = "1px solid black";
            // td3.style.textAlign = "center";

            const td4 = tr.insertCell();
            td4.appendChild(document.createTextNode(prdData[3]));
            // td4.style.border = "1px solid black";
            // td4.style.textAlign = "center";

            const td5 = tr.insertCell();
            td5.appendChild(document.createTextNode(prdData[4]));
            // td5.style.border = "1px solid black";
            // td5.style.textAlign = "center";

            const td6 = tr.insertCell();

            let updateBtn = document.createElement('button');
            updateBtn.setAttribute('class', 'btn btn-light text-center w-75');

            let updateIcon = document.createElement('i');
            updateIcon.setAttribute('class', 'fa-solid fa-pen-to-square');

            updateBtn.appendChild(updateIcon);
            td6.appendChild(updateBtn);

            const td7 = tr.insertCell();

            let deleteBtn = document.createElement('button');
            deleteBtn.setAttribute('class', 'btn btn-light text-center w-75');

            let deleteIcon = document.createElement('i');
            deleteIcon.setAttribute('class', 'fa-solid fa-trash');

            deleteBtn.appendChild(deleteIcon);
            td7.appendChild(deleteBtn);
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

    document.getElementById("prdIdError").innerHTML = "";
    document.getElementById("prdId").style = orig_pid;

    document.getElementById("prdNameError").innerHTML = "";
    document.getElementById("prdName").style = orig_pname;

    document.getElementById("prdImageError").innerHTML = "";
    document.getElementById("prdImage").style = orig_pimage;

    document.getElementById("prdPriceError").innerHTML = "";
    document.getElementById("prdPrice").style = orig_pprice;

    document.getElementById("prdDescError").innerHTML = "";
    document.getElementById("prdDesc").style = orig_pdesc;

    reset();
}

function reset() {
    document.getElementById("prdId").value = "";
    document.getElementById("prdName").value = "";
    document.getElementById("prdImage").value = "";
    document.getElementById("prdPrice").value = "";
    document.getElementById("prdDesc").value = "";
}
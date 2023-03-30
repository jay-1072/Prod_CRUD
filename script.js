viewProducts();

const idRegex = /^[0-9]{5}$/;
// const nameRegex = /^[A-Za-z]+$/;

let base64, tmpImg = '';

let Products = [];

document.getElementById('prdImage').addEventListener('change', function () {
    let reader = new FileReader();
    reader.addEventListener('load', () => {
        base64 = reader.result;
    });
    reader.readAsDataURL(this.files[0]);
});

document.getElementById('uprdImage').addEventListener('change', function () {

    let reader = new FileReader();
    reader.addEventListener('load', () => {
        tmpImg = reader.result;
    });
    reader.readAsDataURL(this.files[0]);
});

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
    const pimage = document.getElementById("prdImage").value;
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

    if (flag) {

        if (pid == '') {
            document.getElementById("prdIdError").innerHTML = "please enter product id";
            document.getElementById("prdId").style.border = "1px solid red";
            flag = false;
        }

        if (pname == '') {
            document.getElementById("prdNameError").innerHTML = "please enter product name";
            document.getElementById("prdName").style.border = "1px solid red";
            flag = false;
        }

        if (pimage == '') {
            document.getElementById("prdImageError").innerHTML = "please add the product image";
            document.getElementById("prdImage").style.border = "1px solid red";
            flag = false;
        }

        if (pprice == '') {
            document.getElementById("prdPriceError").innerHTML = "please enter product price";
            document.getElementById("prdPrice").style.border = "1px solid red";
            flag = false;
        }

        if (pdesc == '') {
            document.getElementById("prdDescError").innerHTML = "please enter product description";
            document.getElementById("prdDesc").style.border = "1px solid red";
            flag = false;
        }
    }

    if (!idRegex.test(pid) && pid != '') {
        document.getElementById("prdIdError").innerHTML = "Id is invalid it must contain 5 digits only";
        document.getElementById("prdId").style.border = "1px solid red";
        flag = false;
    }

    // if (!nameRegex.test(pname) && pname != '') {
    //     document.getElementById("prdNameError").innerHTML = "product name is invalid";
    //     document.getElementById("prdName").style.border = "1px solid red";
    //     flag = false;
    // }

    if (flag) {

        if (localStorage.getItem('products') != null) {
            Products = JSON.parse(localStorage.getItem('products'));
        }

        Products.push(new createProduct(pid, pname, base64, pprice, pdesc));
        localStorage.setItem('products', JSON.stringify(Products));

        viewProducts(pid, true);

        // Toast show
        const toastTrigger = document.getElementById('liveToastBtn');
        const toastLiveExample = document.getElementById('liveToast');

        if (toastTrigger) {
            const toast = new bootstrap.Toast(toastLiveExample);
            toast.show();
        }

        setTimeout(function () { reset() }, 1000);
    }
}


// view product functionality

function viewProducts(pid, flag) {

    let prds = JSON.parse(localStorage.getItem('products'));

    if (prds == null) {
        return;
    }

    const tblContainer = document.getElementById('tblContainer');

    const tbl = document.getElementById('prdTbl');
    const body = document.body;

    for (let i = 0; i < prds.length; i++) {

        let prdData = Object.values(prds[i]);

        if (pid != prdData[0] && flag) {
            continue;
        }

        const tr = tbl.insertRow();

        // td1
        const td1 = tr.insertCell();
        td1.appendChild(document.createTextNode(prdData[0]));
        td1.setAttribute('class', 'align-middle')

        // td2
        const td2 = tr.insertCell();
        td2.appendChild(document.createTextNode(prdData[1]));
        td2.setAttribute('class', 'align-middle')

        // td3
        const td3 = tr.insertCell();

        let prd_img_div = document.createElement('div');
        prd_img_div.setAttribute('style', 'width:100px;');
        prd_img_div.setAttribute('class', 'object-fit-fill');

        let prd_img = document.createElement('img');
        prd_img.setAttribute('style', 'max-width: 100%; heigth:auto;');
        prd_img.setAttribute('src', `${prdData[2]}`);


        prd_img_div.appendChild(prd_img);
        td3.appendChild(prd_img_div);

        // td4
        const td4 = tr.insertCell();
        td4.appendChild(document.createTextNode(prdData[3]));
        td4.setAttribute('class', 'align-middle');

        // td5
        const td5 = tr.insertCell();
        td5.appendChild(document.createTextNode(prdData[4]));
        td5.setAttribute('class', 'align-middle')

        // td6 for update button

        const td6 = tr.insertCell();
        td6.setAttribute('class', 'align-middle');

        let updateBtn = document.createElement('button');
        updateBtn.setAttribute('class', 'btn btn-light text-center w-75');
        updateBtn.setAttribute('data-bs-toggle', 'modal');
        updateBtn.setAttribute('data-bs-target', '#updatePrdModal');

        updateBtn.onclick = function () {
            updateProduct(prds[i]);
        }

        let updateIcon = document.createElement('i');
        updateIcon.setAttribute('class', 'fa-solid fa-pen-to-square');


        updateBtn.appendChild(updateIcon);
        td6.appendChild(updateBtn);

        // td7 for delete button

        const td7 = tr.insertCell();
        td7.setAttribute('class', 'align-middle');

        let deleteBtn = document.createElement('button');
        deleteBtn.setAttribute('class', 'btn btn-light text-center w-75');
        deleteBtn.onclick = function () {
            deleteProduct(prds[i]);
        }

        let deleteIcon = document.createElement('i');
        deleteIcon.setAttribute('class', 'fa-solid fa-trash');

        deleteBtn.appendChild(deleteIcon);
        td7.appendChild(deleteBtn);
    }

    tblContainer.appendChild(tbl);
    body.appendChild(tblContainer);
}

// update product functionality
let targetObj;

function updateProduct(prd) {

    document.getElementById("uprdId").value = prd.pId;
    document.getElementById("uprdName").value = prd.pName;
    document.getElementById("uprdImage").innerHTML = prd.pImage;
    document.getElementById("uprdPrice").value = prd.pPrice;
    document.getElementById("uprdDesc").value = prd.pDesc;

    let prds = JSON.parse(localStorage.getItem('products'));

    prds.forEach(obj => {
        if (obj.pId == prd.pId) {
            targetObj = obj;
            tmpImg = tmpImg == '' ? obj.pImage : tmpImg;
            return;
        }
    });
}

function update() {

    let flag = true;

    let oldId = targetObj.pId;
    targetObj.pId = document.getElementById("uprdId").value;
    targetObj.pName = document.getElementById("uprdName").value;
    targetObj.pImage = tmpImg;
    targetObj.pPrice = document.getElementById("uprdPrice").value;
    targetObj.pDesc = document.getElementById("uprdDesc").value;

    if (flag) {

        if (targetObj.pId == '') {
            document.getElementById("uprdIdError").innerHTML = "Product id can't be empty";
            document.getElementById("uprdId").style.border = "1px solid red";
            flag = false;
        }

        if (targetObj.pName == '') {
            document.getElementById("uprdNameError").innerHTML = "Product name can't be empty";
            document.getElementById("uprdName").style.border = "1px solid red";
            flag = false;
        }

        if (targetObj.pImage == '') {
            document.getElementById("uprdImageError").innerHTML = "Product image can't be empty";
            document.getElementById("uprdImage").style.border = "1px solid red";
            flag = false;
        }

        if (targetObj.pPrice == '') {
            document.getElementById("uprdPriceError").innerHTML = "Product price can't be empty";
            document.getElementById("uprdPrice").style.border = "1px solid red";
            flag = false;
        }

        if (targetObj.pDesc == '') {
            document.getElementById("uprdDescError").innerHTML = "Product description can't be empty";
            document.getElementById("uprdDesc").style.border = "1px solid red";
            flag = false;
        }
    }

    if (!idRegex.test(targetObj.pId) && targetObj.pId != '') {
        document.getElementById("uprdIdError").innerHTML = "Id is invalid it must contain 5 digits only";
        document.getElementById("uprdId").style.border = "1px solid red";
        flag = false;
    }

    if (flag) {
        let prds = JSON.parse(localStorage.getItem('products'));
        for (let i = 0; i < prds.length; i++) {
            if (prds[i].pId == oldId) {
                prds[i] = targetObj;
                break;
            }
        }

        localStorage.setItem('products', JSON.stringify(prds));

        const toastTrigger = document.getElementById('updateBtn');
        const toastLiveExample = document.getElementById('updateToast');

        if (toastTrigger) {
            console.log("update toast");
            const toast = new bootstrap.Toast(toastLiveExample);
            toast.show();
        }

        setTimeout(function () { reset(true) }, 2000);
    }

}

// delete product functionality

function deleteProduct(prd) {
    let prds = JSON.parse(localStorage.getItem('products'));

    prds = prds.filter(obj => {
        return (obj.pId != prd.pId);
    });

    localStorage.setItem('products', JSON.stringify(prds));

    window.location.reload();
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

function reset(flag) {

    if (flag) {
        document.getElementById("uprdId").value = "";
        document.getElementById("uprdName").value = "";
        document.getElementById("uprdImage").value = "";
        document.getElementById("uprdPrice").value = "";
        document.getElementById("uprdDesc").value = "";
        window.location.reload();
    }
    else {
        document.getElementById("prdId").value = "";
        document.getElementById("prdName").value = "";
        document.getElementById("prdImage").value = "";
        document.getElementById("prdPrice").value = "";
        document.getElementById("prdDesc").value = "";
        window.location.reload();
    }
}
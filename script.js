// load products stored in local storage when script will load
viewProducts();

// Regex for product id.
const idRegex = /^[0-9]{5}$/;
const nameRegex = /^([A-Z]*)([a-z]+)([0-9]*)$/;
const priceRegex = /^[0-9]+$/;

let base64, tmpImg = '';

// This array will store products in object form.
let Products = [];

// Convert image into base64 image.
document.getElementById('prdImage').addEventListener('change', function () {
    let reader = new FileReader();
    reader.addEventListener('load', () => {
        base64 = reader.result;
    });
    reader.readAsDataURL(this.files[0]);
});

// When user update product image convert it into base64 image.
document.getElementById('uprdImage').addEventListener('change', function () {
    let reader = new FileReader();
    reader.addEventListener('load', () => {
        tmpImg = reader.result;
    });
    reader.readAsDataURL(this.files[0]);
});

// function constructor for add new product
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

const orig_upid = document.getElementById("uprdId");
const orig_upname = document.getElementById("uprdName");
const orig_upimage = document.getElementById("uprdImage");
const orig_upprice = document.getElementById("uprdPrice");
const orig_updesc = document.getElementById("uprdDesc");

// Add new product function
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

        if (pprice === '') {
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

    if (!nameRegex.test(pname) && pname != '') {
        document.getElementById("prdNameError").innerHTML = "Invalid product name (Valid Ex: Product1) don't include space";
        document.getElementById("prdName").style.border = "1px solid red";
        flag = false;
    }

    if(!priceRegex.test(pprice) && pprice!='') {
        document.getElementById("prdPriceError").innerHTML = "Price must contain digits only";
        document.getElementById("prdPrice").style.border = "1px solid red";
        flag = false;
    }
    else if(pprice != '' && pprice.length>5) {
        document.getElementById("prdPriceError").innerHTML = "Product price limit is 99999.";
        document.getElementById("prdPrice").style.border = "1px solid red";
        flag = false;
    }

    if (flag) {

        // Very first time null will be return here.
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

        setTimeout(function () { reset() }, 600);
    }
}

// update product functionality
let targetObj, oldId;

function updateProduct(prd) {

    oldId = prd.pId;
    document.getElementById("uprdId").value = prd.pId;
    document.getElementById("uprdName").value = prd.pName;
    document.getElementById("uprdImage").innerHTML = prd.pImage;
    document.getElementById("uprdPrice").value = prd.pPrice;
    document.getElementById("uprdDesc").value = prd.pDesc;
}

function update() {

    

    document.getElementById("uprdIdError").innerHTML = "";
    document.getElementById("uprdId").style = orig_upid;

    document.getElementById("uprdNameError").innerHTML = "";
    document.getElementById("uprdName").style = orig_upname;

    document.getElementById("uprdImageError").innerHTML = "";
    document.getElementById("uprdImage").style = orig_upimage;

    document.getElementById("uprdPriceError").innerHTML = "";
    document.getElementById("uprdPrice").style = orig_upprice;

    document.getElementById("uprdDescError").innerHTML = "";
    document.getElementById("uprdDesc").style = orig_updesc;

    

    let prds = JSON.parse(localStorage.getItem('products'));

    prds.forEach(obj => {
        if (obj.pId == oldId) {
            targetObj = obj;
            tmpImg = tmpImg == '' ? obj.pImage : tmpImg;
        }
    });

    let flag = true;

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

    if (!nameRegex.test(targetObj.pName) && targetObj.pName != '') {
        document.getElementById("uprdNameError").innerHTML = "Invalid product name";
        document.getElementById("uprdName").style.border = "1px solid red";
        flag = false;
    }

    if(!priceRegex.test(targetObj.pPrice) && targetObj.pPrice!='') {
        document.getElementById("uprdPriceError").innerHTML = "Price must contain digits only";
        document.getElementById("uprdPrice").style.border = "1px solid red";
        flag = false;
    }
    else if(targetObj.pPrice != '' && (targetObj.pPrice).length>5) {
        document.getElementById("uprdPriceError").innerHTML = "Product price limit is 99999.";
        document.getElementById("uprdPrice").style.border = "1px solid red";
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

        setTimeout(function () { reset(true) }, 490);
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

// view product functionality

function viewProducts(pid, flag) {

    let prds = JSON.parse(localStorage.getItem('products'));

    if (prds == null) {
        return;
    }

    // const tblContainer = document.getElementById('tblContainer');

    const tblBody = document.getElementById('tblBody');
    // const body = document.body;

    for (let i = 0; i < prds.length; i++) {

        let prdData = Object.values(prds[i]);

        if (pid != prdData[0] && flag) {
            continue;
        }

        const tr = tblBody.insertRow();

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

    // tblContainer.appendChild(tbl);
    // body.appendChild(tblContainer);
}

// Search Product functionality

function searchProduct(input) {

    let flag = true;

    let prds = JSON.parse(localStorage.getItem('products'));

    const tblBody = document.getElementById('tblBody');   

    for (let i = 0; i < prds.length; i++) {

        if (prds[i].pId === input) {

            flag = false;
            tblBody.innerHTML = '';

            const tr = tblBody.insertRow();

            // td1
            const td1 = tr.insertCell();
            td1.appendChild(document.createTextNode(prds[i].pId));
            td1.setAttribute('class', 'align-middle')

            // td2
            const td2 = tr.insertCell();
            td2.appendChild(document.createTextNode(prds[i].pName));
            td2.setAttribute('class', 'align-middle')

            // td3
            const td3 = tr.insertCell();

            let prd_img_div = document.createElement('div');
            prd_img_div.setAttribute('style', 'width:100px;');
            prd_img_div.setAttribute('class', 'object-fit-fill');

            let prd_img = document.createElement('img');
            prd_img.setAttribute('style', 'max-width: 100%; heigth:auto;');
            prd_img.setAttribute('src', `${prds[i].pImage}`);


            prd_img_div.appendChild(prd_img);
            td3.appendChild(prd_img_div);

            // td4
            const td4 = tr.insertCell();
            td4.appendChild(document.createTextNode(prds[i].pPrice));
            td4.setAttribute('class', 'align-middle');

            // td5
            const td5 = tr.insertCell();
            td5.appendChild(document.createTextNode(prds[i].pDesc));
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
        
    }

    if(flag && input.length>=5) {
        alert('No product found');
    }

}

// Sort product functionality

// sort by product id

function sortById() {
    let prds = JSON.parse(localStorage.getItem('products'));

    prds.sort((prd1, prd2) => {
        return Number.parseInt(prd1.pId) - Number.parseInt(prd2.pId);
    })

    localStorage.setItem('products', JSON.stringify(prds));

    const tblBody = document.getElementById('tblBody');
    tblBody.innerHTML = '';

    viewProducts(true);
}

// sort by product name

function sortByName() {
    let prds = JSON.parse(localStorage.getItem('products'));

    prds.sort((prd1, prd2) => {

        let name1 = prd1.pName.toLowerCase(), name2 = prd2.pName.toLowerCase();

        if(name1<name2) {
            return -1;
        }

        if(name1>name2) {
            return 1;
        }

        return 0;
    })

    localStorage.setItem('products', JSON.stringify(prds));

    const tblBody = document.getElementById('tblBody');
    tblBody.innerHTML = '';

    viewProducts(true);
}

// sort by product price

function sortByPrice() {
    let prds = JSON.parse(localStorage.getItem('products'));

    prds.sort((prd1, prd2) => {
        return Number.parseInt(prd1.pPrice) - Number.parseInt(prd2.pPrice);
    })

    localStorage.setItem('products', JSON.stringify(prds));

    const tblBody = document.getElementById('tblBody');
    tblBody.innerHTML = '';

    viewProducts(true);
}

// resetting modal

function resetModal(flag) {

    if(flag) {
        document.getElementById("uprdIdError").innerHTML = "";
        document.getElementById("uprdId").style = orig_pid;

        document.getElementById("uprdNameError").innerHTML = "";
        document.getElementById("uprdName").style = orig_pname;

        document.getElementById("uprdImageError").innerHTML = "";
        document.getElementById("uprdImage").style = orig_pimage;

        document.getElementById("uprdPriceError").innerHTML = "";
        document.getElementById("uprdPrice").style = orig_pprice;

        document.getElementById("uprdDescError").innerHTML = "";
        document.getElementById("uprdDesc").style = orig_pdesc;
    }
    else {
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
    
}

// clear modal after add or update

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

// When clicking outside menu button it will close menu

var navitems = document.getElementById('navitems'),
menuBtn = document.getElementById('manuBtn'),
menuContainer = document.getElementById('menuContainer').childNodes;

let menuStatus = false;

function hide_menu(evt) {

    evt = evt || window.event;						  // get window.event if evt is falsy (IE)
    var targetElement = evt.target || evt.srcElement; // get srcElement if target is falsy (IE)

    if((targetElement === menuBtn || targetElement === menuBtn.parentElement) && (menuStatus === true)) {
        navitems.style.display = 'none';
        menuStatus = false;
        return;
    }
    
    if(targetElement === menuBtn || targetElement === menuBtn.parentElement || targetElement === menuContainer[1] || targetElement === menuContainer[3].childNodes[1]) {
        navitems.style.display = 'block'
        menuStatus = true
    } else {
        navitems.style.display = 'none'
        menuStatus = false;
    }
}

document.addEventListener('click', hide_menu, false);


function check(e) {

    const arrowsKeyCodes = [37, 38, 39, 40];
    // 'numpad 0', 'numpad 1',  'numpad 2', 'numpad 3', 'numpad 4', 'numpad 5', 'numpad 6', 'numpad 7', 'numpad 8', 'numpad 9'
    const numPadNumberKeyCodes = [96, 97, 98, 99, 100, 101, 102, 103, 104, 105];

    if ((e.keyCode < 48 && !arrowsKeyCodes.includes(e.keyCode) || e.keyCode > 57 && !numPadNumberKeyCodes.includes(e.keyCode)) && !(e.keyCode === 8)) {
        e.preventDefault()
    }
}

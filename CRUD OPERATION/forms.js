let Name = document.getElementById("employeeName");
let role = document.getElementById("jobRole");
let photos = document.getElementById("photo");
let mobile = document.getElementById("mobileNo");
let company = document.getElementById("companyName");
let submit = document.getElementById("sub");
let preview = document.getElementById("preview");
let photoPreview = document.getElementById("photoPreview");

submit.addEventListener("click", card);

function card(e) {
  e.preventDefault();
  if (Name.value.length == 0) {
    alert("enter your name");
  } else if (role.value==="") {
    alert("enter your role");
   } else if (photos.value.length == 0) {
    alert("enter your photos");
  } else if (mobile.value.length == 0) {
    alert("enter your number");
  } else if (mobile.value.length != 10) {
    alert("enter your valid number");
  } else if (company.value.length == 0) {
    alert("enter your company name");
  } else {
    loadData(
      Name.value,
      role.value,
      photos.files[0]?.name,
      mobile.value,
      company.value
    );
  }
}
function loadData(Name,role,  photos, mobile, company) {
  let arr = JSON.parse(localStorage.getItem("employeedata")) || [];

  let employee = arr.some((emp) => emp.mobile === mobile);
  console.log(employee);

  if (employee) {
    alert("User with this number already exists!");
  } else {
    let obj = {
      Name: Name,
      role: role,
      photos: photos,
      mobile: mobile,
      company: company,
    };
    arr.push(obj);
    console.log(obj);
    localStorage.setItem("employeedata", JSON.stringify(arr));
    alert("Registration sucessful !", "green");
    setTimeout(() => {
      window.location.href = "./card.html";
    }, 1000);
  }
}
function edit(mobileNumber) {
  let data = JSON.parse(localStorage.getItem("employeedata")) || [];
  console.log(data);

  let employeeIndex = data.findIndex((emp) => emp.mobile === mobileNumber);

  if (employeeIndex !== -1) {
    let employee = data[employeeIndex];

    // employee data
    Name.value = employee.Name;
    role.value = employee.role;
    mobile.value = employee.mobile;
    company.value = employee.company;
    preview.style.display = "block";
    photoPreview.src = `./photos/${employee.photos}`;

    // ./photos/${employee.photo}

    submit.removeEventListener("click", card);
    submit.addEventListener("click", function (e) {
      e.preventDefault();
      employee.Name = Name.value;
     employee.role =role.value;
      employee.mobile = mobile.value;
      employee.company = company.value;
      employee.photos = photos.files[0]?.name || employee.photos;
      // employee.photoPreview=`./photos/${employee.photo}`;
      data[employeeIndex] = employee;
      localStorage.setItem("employeedata", JSON.stringify(data));
      alert("Employee details updated successfully!");
      localStorage.removeItem("employeeData");
      setTimeout(() => {
        window.location.href = "card.html";
      }, 1000);
    });
  } else {
    alert("Employee not found!");
  }
}
// let datadetails = JSON.parse(localStorage.getItem("employeeData"));
// console.log(datadetails);



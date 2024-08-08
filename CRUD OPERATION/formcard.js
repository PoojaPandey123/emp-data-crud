let accessdata = JSON.parse(localStorage.getItem("employeedata")) || [];

let employeeDetailContainer = document.querySelector(".employee-detail");

function renderEmployees(data) {
  employeeDetailContainer.innerHTML = "";

  data.forEach((element, index) => {
    let employeeDetail = document.createElement("div");
    employeeDetail.classList.add("mobile");

    employeeDetail.innerHTML = `
      <div class="image">
        <img class="mobile" src="../photos/${element.photos}" alt="${element.Name}">
      </div>
      <h1 class="headline">${element.Name}</h1>
      <p class="Role">Role: ${element.role}</p>
      <p class="Mobile">Mobile No: ${element.mobile}</p>
      <p class="Mobile">Company Name: ${element.company}</p>
      <div class="editing">
        <button class="edit-btn"><i class="fa-solid fa-pen"></i> Edit</button>
        <button class="delete-btn"><i class="fa-solid fa-trash"></i> Delete</button>
      </div>
    `;

    // Attach event listeners for edit and delete buttons
    employeeDetail.querySelector(".edit-btn").addEventListener("click", () => editDetail(element));
    employeeDetail.querySelector(".delete-btn").addEventListener("click", () => del(index));

    // Append the employee details to the container
    employeeDetailContainer.appendChild(employeeDetail);
  });
}

// Function to edit employee details
function editDetail(element) {
  localStorage.setItem("employeeData", JSON.stringify(element));
  window.location.href = "./crudcard.html";
}

// Function to delete an employee
function del(index) {
  accessdata.splice(index, 1);

  localStorage.setItem("employeedata", JSON.stringify(accessdata));
  renderEmployees(accessdata);
}

renderEmployees(accessdata);

let category = document.getElementById("category");

category.addEventListener("change", filter);

function filter() {
  let arr = [...accessdata];
  console.log(arr);
  if (category.value == "Software Developer") {
    arr = arr.filter((employee) => employee.role === category.value);
  } else if (category.value == "web Developer") {
    arr = arr.filter((employee) => employee.role === category.value);
  } else if (category.value == "Software Engineer") {
    arr = arr.filter((employee) => employee.role === category.value);
  } else if (category.value == "Mern Stack Developer") {
    arr = arr.filter((employee) => employee.role === category.value);
  } else if (category.value == "Web Designer") {
    arr = arr.filter((employee) => employee.role === category.value);
  } else if (category.value == "Full Stack Engineer") {
    arr = arr.filter((employee) => employee.role === category.value);
  } else if (category.value == "") {
    arr = [...accessdata];
  }
  console.log(arr);
  renderEmployees(arr);
}

// Function to search employees
function search() {
  const input = document.getElementById("search").value.toLowerCase(); 
  const searchBox = document.querySelector(".bar");


  if (input.length === 0) {
    searchBox.style.display = "none";
    renderEmployees(accessdata); 
  } else {
    searchBox.style.display = "block";
  }


  const filteredData = accessdata.filter((element) =>
    element.Name.toLowerCase().includes(input)|| 
  element.role.toLowerCase().includes(input)||
  element.company.toLowerCase().includes(input)
  );


  renderEmployees(filteredData);
}


document.getElementById("search").addEventListener("input", search);

const eamount = document.querySelector("#eamount");
const ediscrp = document.querySelector("#ediscrp");
const ecategory = document.querySelector("#ecategory");
const submit = document.querySelector(".submit");

var id = -2;

/****************************************************/
// Listen for a click on the "Add Expense" button
/****************************************************/
submit.addEventListener("click", function (e) {
  e.preventDefault();

  const amount = eamount.value;
  const discription = ediscrp.value;
  const category = ecategory.value;

  //data validation
  if (amount === "" || discription === "" || category === "") {
    const msg = document.querySelector(".msg");
    msg.classList.add("error");
    msg.innerHTML = "Please enter values in all the fields!!!";
    // Remove error message after 3 seconds
    setTimeout(() => {
      msg.classList.remove("error");
      msg.innerHTML = "";
    }, 4000);
  }

  const newUserData = {
    amount: amount,
    discription: discription,
    category: category,
  };
  console.log(newUserData);

  //Fetching token from local storage
  const token = localStorage.getItem("token");
  //setting header
  const config = {
    headers: { Authorization: token },
  };

  if (id === -2) {
    // storing new data
    axios
      .post("http://localhost:3000/user/addexpense", newUserData, config)
      .then((res) => {
        // displayData();
        // window.location.href = "./homepage.html";
        // response.redirect("./signup.html");

        location.reload();
      })
      .catch((err) => {
        console.error(err);
      });
  } else if (id !== -2) {
    // Editing existing data
    axios
      .put(`http://localhost:3000/user/editexpense/${id}`, newUserData)
      .then((res) => {
        console.log(res.data);
        id = -2;
        // uname.value = "";
        // email.value = "";
        // mobile.value = "";
        location.reload();
      })
      .catch((err) => {
        console.error(err);
      });
  }
});

/****************************************************/
// Function to display data already available
/****************************************************/
async function displayData() {
  var html = "";
  //Fetching token from local storage
  const token = localStorage.getItem("token");
  //setting header
  const config = {
    headers: { Authorization: token },
  };

  //sending a GET request to the backend with token in the header to fetch particular users data only
  const datarv = await axios.get(
    "http://localhost:3000/user/getexpense",
    config
  );

  const { allExpenses: allData } = datarv.data;

  if (allData === null) return;

  for (let i = 0; i < allData.length; i++) {
    html = `<div class="child ${allData[i].id}">
            <div>Amount: Rs.${allData[i].amount}</div>
            <div>Description: ${allData[i].description}</div> 
            <div>Category: ${allData[i].category}</div>
            <button class="editbtn" id="${allData[i].id}">Edit</button>
            <button class="deletebtn" id="${allData[i].id}">Delete</button> 
        </div>`;

    const display = document.querySelector(".display");
    display.insertAdjacentHTML("afterbegin", html);
  }
}
displayData();

/******************************************************************/
// Listen for a click on the "Delete or Edit Expense" button
/******************************************************************/
const parent = document.querySelector(".display");

parent.addEventListener("click", async function editDelete(e) {
  e.preventDefault();

  //Fetching token from local storage
  const token = localStorage.getItem("token");
  //setting header
  const config = {
    headers: { Authorization: token },
  };

  if (e.target.className === "deletebtn") {
    console.log(e.target.id);
    axios
      .delete(`http://localhost:3000/user/deleteexpense/${e.target.id}`)
      .then((res) => {
        // displayData();
        // window.location.href = "./homepage.html";
        // response.redirect("./signup.html");
        location.reload();
      })
      .catch((err) => {
        console.error(err);
      });
  } else if (e.target.className === "editbtn") {
    //Fetching token from local storage
    const token = localStorage.getItem("token");
    //setting header
    const config = {
      headers: { Authorization: token },
    };

    //sending a GET request to the backend with token in the header to fetch particular users data only
    const datarv = await axios.get(
      "http://localhost:3000/user/getexpense",
      config
    );
    const { allExpenses: allData } = datarv.data;
    if (allData === null) return;

    const idd = e.target.id;

    allData.forEach((object) => {
      if (object.id == idd) {
        // Populate form fields with the selected data
        console.log("inside if object");
        eamount.value = object.amount;
        ediscrp.value = object.description;
        ecategory.value = object.category;

        // Set the current ID for editing
        id = idd;
        return;
      }
    });
  }
});

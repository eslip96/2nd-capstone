/* 
DUE: With the other projects, Wednesday
HTML / SCSS / JS Capstone
style >
 - main.scss
 - main.css
 - main.css.map
 - sidebar-container >
   - page-container.scss
   - page-container.css
   - page-container.map.css
Build My Random Student Generator
HTML Interface
API URL: https://devpipeline-mock-api.onrender.com

 - Layout: Sidebar with users that are fetched from the given api.
   - users, (formatted first and abbreviated last initial, weight Defaulted to 1, plus and minus weight buttons, which should labeled appropriately)
 - larger middle section that has:
   - label (initial message, intermediate(while selecting) message, selected user)
   - button to initiate selection process
 - loading animation (ex: spinner, shuffle the names, etc)
   - css animation
 - hover effects
 - disabled button while selecting a user

JS
 - fetch users from given api
 - creating dom elements and appending them to the dom
 - each user should be weighted, meaning that they would be more or less likely to be randomly selected
 - users should only be selected 1 time (unless weighted) per round (getting through entire list)
 - once everyone has been selected, the list should start over
 - after starting another round(meaning everyone has been selected), the first person selected cannot be the last person that was selected (no back to back selections unless weighted)

Use VS Code
Push to github
Clean projects
Clean Code
Try your best to incorporate a large majority of what you've learned


Endpoint: /api/auth/login
Request Payload: { email, password } as a stringifie JSON object
Response body: {
message: "Logged In",
user: {_id: "", first_name: "", last_name: "", cohort.......},
users: [{}, {}, {}]
}

Be on the lookout for further instructions regarding fetching your cohort peers
-- HAVE FUN --
*/
// const login = { email: "enoka@devpipeline.com", password: "1234" };
fetch("https://fe-students.onrender.com/api/users")
  .then((res) => res.json())
  .then((jsondata) => {
    let data = jsondata["results"];
    console.log(data);

    const table = document.getElementsByClassName("students");

    console.log("TABLE", table);

    if (table.length > 0) {
      const ListOfStudentsDiv = table.item(0);
      let weightedNames = [];
      console.log(weightedNames);

      data.forEach((user) => {
        const name = user.name;
        let weight = 0;
        weightedNames.push({ name, weight });
        console.log(user);

        const studentWrapper = document.createElement("div");
        studentWrapper.classList.add("student-wrapper");

        const nameContainer = document.createTextNode(`${name}:`);
        studentWrapper.appendChild(nameContainer);

        const weightElement = document.createElement("span");
        weightElement.setAttribute("id", `weight${user.id}`);
        weightElement.innerText = weight;
        studentWrapper.appendChild(weightElement);
        console.log(studentWrapper);

        const newLine = document.createElement("br");
        studentWrapper.appendChild(newLine);

        const plusButton = document.createElement("button");
        plusButton.classList.add("plus-button");
        plusButton.innerText = "+";
        studentWrapper.appendChild(plusButton);

        const minusButton = document.createElement("button");
        minusButton.classList.add("minus-button");
        minusButton.innerText = "-";
        studentWrapper.appendChild(minusButton);

        plusButton.addEventListener("click", () =>
          handleClick(plusButton, 1, user.id)
        );
        minusButton.addEventListener("click", () =>
          handleClick(minusButton, -1, user.id)
        );

        ListOfStudentsDiv.appendChild(studentWrapper);
      });
    }

    const pickNameButton = document.getElementById("pick-name-button");
    pickNameButton.addEventListener("click", handleButtonClick);

    function handleClick(button, crement) {
      const weightElement = document.getElementById(`weight${user.id}`);
      console.log(weightElement);
      const currentWeight = Number(weightElement.textContent);
      console.log(currentWeight);
      if (
        (crement === 1 && button.classList.contains("plus-button")) ||
        (crement === -1 && button.classList.contains("minus-button"))
      ) {
        weightElement.innerHTML = currentWeight + crement;
      }
    }

    function handleButtonClick() {
      let totalWeight = 0;
      for (const user of data) {
        const weightElement = document.getElementById(`weight${user.id}`);
        const weight = Number(weightElement.textContent);
        totalWeight += weight;
      }

      const randomWeight = Math.random() * totalWeight;

      let currentWeight = 0;
      for (const user of data) {
        const weightElement = document.getElementById(`weight${user.id}`);
        const weight = Number(weightElement.textContent);
        currentWeight += weight;
        if (randomWeight < currentWeight) {
          const chosenName = user.name;
          const nameContainer = document.querySelector(".name-btn-container p");
          nameContainer.textContent = chosenName;
          break;
        }
      }
    }
  });

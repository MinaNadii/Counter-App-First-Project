let saveEl = document.getElementById("save-el");
let countEl = document.getElementById("count-el");
let count = 0;

function increment() {
  count += 1;
  countEl.textContent = count;
}

function save() {
  let countStr = count + " - ";
  saveEl.textContent += countStr;
  countEl.textContent = 0;
  count = 0;
}

Swal.fire({
  title: "Submit your Github username",
  input: "text",
  inputAttributes: {
    autocapitalize: "off",
  },
  showCancelButton: true,
  confirmButtonText: "Look up",
  showLoaderOnConfirm: true,
  preConfirm: async (login) => {
    try {
      const githubUrl = `https://api.github.com/users/${login}`;
      const response = await fetch(githubUrl);
      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
      }
      const userData = await response.json();
      return userData;
    } catch (error) {
      Swal.showValidationMessage(`Request failed: ${error.message}`);
    }
  },
  allowOutsideClick: () => !Swal.isLoading(),
}).then((result) => {
  if (result.isConfirmed) {
    const yourEmptyDiv = document.getElementById("githubphoto"); // Replace with your actual div ID
    if (!yourEmptyDiv) {
      console.error("Could not find the target div element.");
      return;
    }

    const avatarImage = document.createElement("img");
    avatarImage.src = result.value.avatar_url;
    avatarImage.alt = `${result.value.login}'s avatar`; // Add descriptive alt text for accessibility

    // Clear any existing content within the div (optional)
    yourEmptyDiv.innerHTML = "";

    avatarImage.classList.add("githubImages"); // Add your desired class

    yourEmptyDiv.appendChild(avatarImage);

    // Copy username to the target div with ID 'githubUserName' (unchanged)
    const usernameDiv = document.getElementById("githubUserName"); // Replace with your actual div ID
    if (!usernameDiv) {
      console.error("Could not find the target div element for username.");
      return;
    }
    usernameDiv.textContent =
      "Welcome  " + result.value.login + " to my first Project"; // Set the text content
  }
});

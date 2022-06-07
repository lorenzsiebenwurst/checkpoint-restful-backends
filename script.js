const suggestionsContainer = document.querySelector("#suggestions-container");
const containerDiv = document.querySelector("#containerDiv");
let profiles = [];
let pendingsNumber = 0;

loadProfiles(8);

suggestionsContainer.addEventListener("click", (e) => connectWithProfile(e));
suggestionsContainer.addEventListener("click", (e) => removeProfile(e));

function loadProfiles(numberOfProfiles) {
  fetch(
    "https://dummy-apis.netlify.app/api/contact-suggestions?count=" +
      numberOfProfiles
  )
    .then((res) => res.json())
    .then((profilesFromApi) => {
      profiles = profilesFromApi;
      renderProfiles();
    });
}

function renderProfiles() {
  let profileId = -1;
  suggestionsContainer.innerHTML = "";
  profiles.forEach((profile) => {
    profileId++;
    const containerDiv = document.createElement("div");
    containerDiv.id = profileId;
    containerDiv.classList.add("profile-container");

    const profileBackground = document.createElement("img");
    if (!profile.backgroundImage == "") {
      profileBackground.setAttribute(
        "src",
        " " + profile.backgroundImage + " "
      );
    } else {
      profileBackground.setAttribute("src", "/images/greyBackground.jpg");
    }
    profileBackground.classList.add("profile-background");

    const profileRemoveButton = document.createElement("button");
    profileRemoveButton.classList.add("profile-remove-btn");

    const profilePicture = document.createElement("img");
    profilePicture.setAttribute("src", " " + profile.picture + " ");
    profilePicture.classList.add("profile-picture");

    const profileName = document.createElement("p");
    profileName.innerText = profile.name.first + " " + profile.name.last;
    profileName.classList.add("profile-name");

    const profileTitle = document.createElement("p");
    profileTitle.innerText = profile.title;
    profileTitle.classList.add("profile-title");

    const profileMutualConnections = document.createElement("p");
    profileMutualConnections.innerText =
      "Ꝏ " + profile.mutualConnections + " mutual connections";
    profileMutualConnections.classList.add("profile-mutual-connections");

    const connectBtn = document.createElement("button");
    connectBtn.innerText = "Connect";
    connectBtn.id = "connectBtn";
    connectBtn.classList.add("profile-connect-button");

    containerDiv.appendChild(profileBackground);
    containerDiv.appendChild(profileRemoveButton);
    containerDiv.appendChild(profilePicture);
    containerDiv.appendChild(profileName);
    containerDiv.appendChild(profileTitle);
    containerDiv.appendChild(profileMutualConnections);
    containerDiv.appendChild(connectBtn);

    suggestionsContainer.appendChild(containerDiv);
  });
}

function connectWithProfile(e) {
  const pendingsText = document.querySelector("#pending-invites");

  if (e.target.innerText === "Connect") {
    e.target.innerText = "Pending";
    pendingsNumber++;
  } else if (e.target.innerText === "Pending") {
    e.target.innerText = "Connect";
    pendingsNumber--;
  }
  if (pendingsNumber > 1) {
    pendingsText.innerText = pendingsNumber + " pending invitations";
  } else if (pendingsNumber === 1) {
    pendingsText.innerText = pendingsNumber + " pending invitation";
  } else {
    pendingsText.innerText = "No pending invitations";
  }
}

function removeProfile(e) {
  if (e.target.classList == "profile-remove-btn") {
    profiles = profiles.filter((profile) => profile != profiles[e.path[1].id]);
    fetch("https://dummy-apis.netlify.app/api/contact-suggestions?count=1")
      .then((res) => res.json())
      .then((profileFromApi) => {
        profiles.push(profileFromApi[0]);
      });

    setTimeout(() => {
      renderProfiles();
    }, 1000);
  }
}

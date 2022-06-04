const suggestionsContainer = document.querySelector("#suggestions-container");
let profiles = [];
const connectBtn = document.querySelector("#connectBtn");

function loadProfiles() {
  fetch("https://dummy-apis.netlify.app/api/contact-suggestions?count=8")
    .then((res) => res.json())
    .then((profilesFromApi) => {
      profiles = profilesFromApi;
      renderProfiles();
    });
}

loadProfiles();

function renderProfiles() {
  suggestionsContainer.innerHTML = "";
  profiles.forEach((profile) => {
    const containerDiv = document.createElement("div");
    containerDiv.setAttribute("lastname", profile.name.last);
    containerDiv.classList.add("profile-container");

    const profileBackground = document.createElement("img");
    profileBackground.setAttribute("src", " " + profile.backgroundImage + " ");
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
    connectBtn.setAttribute("id", "connectBtn");
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

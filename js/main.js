async function getUserData(username) {
    const response = await fetch(`https://api.github.com/users/${username}`);
    const data = await response.json();
    console.log(data);
    return data;
}

const searchButton = document.querySelector("#search-button");
searchButton.addEventListener("click", async () => {
    if (search.value === "") {
        alert("Please enter a username.");
        return;
    }
    const username = search.value;
    let userData = await getUserData(username);
    if (userData.message === "Not Found") {
        alert("User not found");
        return;
    }
    search.value = ""; // Clear the input field after search
    renderUserData(userData);
});

function renderUserData(userData) {
    const profilePicture = document.querySelector("#profile-pic");
    profilePicture.src = userData.avatar_url;

    const profileUsername = document.querySelector("#username");
    profileUsername.innerText = userData.login;

    const followers = document.querySelector("#followers");
    followers.innerText = "Followers " + userData.followers;
    const following = document.querySelector("#following");
    following.innerText = "Followers " + userData.following;

    const bio = document.querySelector("#bio");
    bio.innerText = userData.bio || "No bio available.";
}
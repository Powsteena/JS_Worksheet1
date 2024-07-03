document.addEventListener("DOMContentLoaded", () => {
    const moreUsersBtn = document.getElementById("more-users-btn");
    const profilesContainer = document.getElementById("profiles-container");
    const usersTableBody = document.querySelector("#users-table tbody");

    async function fetchUsers() {
        try {
            const response = await fetch("https://randomuser.me/api/?results=5");
            const data = await response.json();
            return data.results;
        } catch (error) {
            console.error("Error fetching user data:", error);
            return [];
        }
    }

    function updateProfiles(profiles) {
        // Clear previous profiles
        profilesContainer.innerHTML = "";
        usersTableBody.innerHTML = "";

        profiles.forEach(profile => {
            const { picture, name, email } = profile;

            // Create profile card
            const profileCard = document.createElement("div");
            profileCard.classList.add("profile-card");

            const img = document.createElement("img");
            img.src = picture.large;
            img.alt = `${name.first} ${name.last}`;

            const nameElem = document.createElement("h4");
            nameElem.textContent = `${name.first} ${name.last}`;

            const emailElem = document.createElement("p");
            emailElem.textContent = email;

            profileCard.appendChild(img);
            profileCard.appendChild(nameElem);
            profileCard.appendChild(emailElem);

            profilesContainer.appendChild(profileCard);

            // Update table
            const row = document.createElement("tr");

            const nameCell = document.createElement("td");
            nameCell.textContent = `${name.first} ${name.last}`;

            const emailCell = document.createElement("td");
            emailCell.textContent = email;

            row.appendChild(nameCell);
            row.appendChild(emailCell);

            usersTableBody.appendChild(row);
        });
    }

    moreUsersBtn.addEventListener("click", async () => {
        const profiles = await fetchUsers();
        updateProfiles(profiles);
    });

    // Fetch initial set of users on page load
    fetchUsers().then(updateProfiles);
});

document.addEventListener("DOMContentLoaded", async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    // Inject content script into the current tab
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ["content.js"]
    }, () => {
        // Send message to content.js to fetch LinkedIn profile data
        chrome.tabs.sendMessage(tab.id, { action: "getProfileData" }, (response) => {
            if (chrome.runtime.lastError) {
                console.error("Error:", chrome.runtime.lastError.message);
                alert("Error: Could not retrieve data. Ensure you're on a LinkedIn profile page.");
            } else if (response) {
                console.log("Received profile data:", response);

                // Display the profile data in the popup form
                document.getElementById("name").value = response.name || "No name found";
                document.getElementById("title").value = response.title || "No title found";
                document.getElementById("company").value = response.company || "No company found";
                //   document.getElementById("notes").value = response.notes || "No notes found"; // Set notes field

                // Show profile picture (if available)
                const profilePicture = response.profilePicture;
                if (profilePicture) {
                    const imgElement = document.createElement('img');
                    imgElement.src = profilePicture;
                    imgElement.alt = "Profile Picture";
                    imgElement.width = 100;
                    document.getElementById("flashcard-form").appendChild(imgElement);
                }
            }
        });
    });
});

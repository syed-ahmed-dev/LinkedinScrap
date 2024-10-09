chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "getProfileData") {
        console.log("Scraping LinkedIn profile...");

        // Scraping LinkedIn profile name
        const nameElement1 = document.querySelector('h1.text-heading-xlarge.inline.t-24.v-align-middle.break-words');
        const nameElement2 = document.querySelector('h1.top-card-layout__title.font-sans.text-lg.papabear\\:text-xl.font-bold.leading-open.text-color-text.mb-0');

        // Get name from the first selector if available, otherwise from the second
        const name = nameElement1 ? nameElement1.innerText.trim() : nameElement2 ? nameElement2.innerText.trim() : "";//   return nameElement ? nameElement.innerText : ''

        // Scraping the profile picture URL
        // const profilePicture = document.querySelector(".presence-entity__image")?.src || "";
        const profilePicture1 = document.querySelector(".presence-entity__image")?.src || "";
        const profileImageElement = document.querySelector('.top-card__profile-image-container img');
        const profilePicture2 = profileImageElement ? profileImageElement.src : "";
        const profilePicture = profilePicture1 || profilePicture2 || "Profile picture not found";

        // Scraping the title (position) under the name
        // const title = document.querySelector(".text-body-medium break-words")?.innerText?.trim();
        // const additionalTextElement = document.querySelector('.text-body-medium.break-words[data-generated-suggestion-target]');
        // const title = additionalTextElement ? additionalTextElement.innerText.trim() : "";
        const titleElement1 = document.querySelector(".text-body-medium.break-words[data-generated-suggestion-target]")?.innerText?.trim();
        const titleElement2 = document.querySelector('.top-card-layout__headline.break-words.font-sans.text-md.leading-open.text-color-text')?.innerText?.trim();
        const title = titleElement1 || titleElement2 || "Title not found";

        // Scraping the company name
        // const company = document.querySelector(".xiQjVlXCUNirkDhOagALvmWatrIYbSXo")?.innerText?.trim();
        const companyElement1 = document.querySelector(".xiQjVlXCUNirkDhOagALvmWatrIYbSXo")?.innerText?.trim();
        const companyElement2 = document.querySelector(".top-card-link__description.line-clamp-2")?.innerText?.trim();
        const company = companyElement1 || companyElement2 || "Company not found";

        console.log("Name: ", name);
        console.log("Profile Picture: ", profilePicture);
        console.log("Title: ", title);
        console.log("Company: ", company);

        // Send the scraped data back to the popup
        sendResponse({
            name: name || "Name not found",
            profilePicture: profilePicture || "Profile picture not found",
            title: title || "Title not found",
            company: company || "Company not found",
        });
    }
});

# AssureIT — Hardware Testing Platform

## 1. Project Overview

AssureIT is a web-based hardware testing platform developed to support User Acceptance Testing (UAT) of company laptops before deployment.

The platform provides an accessible interface for conducting hardware checks and assessing the condition of devices.

## 2. Live Website

AssureIT is currently hosted and published online using Netlify.

**Website:** https://assureit.netlify.app

**Hosting Platform:** Netlify

**Deployment Method:** Manual deployment using Netlify Drop

The website can be accessed through a web browser without installing the application.

## 3. Main Features

AssureIT includes the following hardware testing features:

- **Dead Pixel Test** — Checks the laptop display for dead or defective pixels.
- **Keyboard and Touchpad Test** — Allows users to test keyboard keys and touchpad functionality.
- **Battery and Storage Health** — Provides guidance for checking battery and storage conditions.
- **Camera Test** — Allows users to check camera functionality.
- **Microphone Test** — Checks microphone input.
- **Speaker Test** — Tests audio output.
- **Testing Guidelines** — Provides instructions for performing hardware tests.
- **Access Code Management** — Uses Supabase to manage access codes for the website.

## 4. Technology Stack

- HTML5 — Website structure
- CSS3 — Interface design and styling
- JavaScript — Interactive functionality
- Supabase — Access code management
- GitHub — Source code repository
- Netlify — Website hosting and deployment

## 5. Project Structure

```text
AssureIT/
├── audio/
├── css/
├── images/
├── js/
├── index.html
├── main.html
└── README.md
```

## 6. Running the Website Locally

To run the project locally:

1. Download the source code from the GitHub repository.
2. Extract the downloaded ZIP file.
3. Open the project folder in Visual Studio Code.
4. Open `index.html` using a browser or the Live Server extension.
5. Navigate through the website to access the available hardware tests.

Camera and microphone features may require browser permissions and a secure context.

## 7. Updating the Published Website Through Netlify

AssureIT is currently deployed through Netlify Drop. Future developers can update the live website by manually uploading the latest project files.

### Steps to Update the Website

1. Open https://app.netlify.com and sign in to the Netlify account that manages AssureIT.
2. Select the **assureit** project from the dashboard.
3. Navigate to the **Deploys** tab.
4. Locate the manual deployment upload area.
5. Prepare the updated website folder containing the latest HTML, CSS, JavaScript, images, and other required assets.
6. Upload the complete updated website folder to Netlify.
7. Wait for the deployment process to finish.
8. Open https://assureit.netlify.app to verify that the changes are reflected on the live website.

### Important Notes

- Ensure that `index.html` is located at the root of the folder being uploaded.
- Upload the complete website folder rather than individual modified files to avoid missing dependencies.
- Make sure all required assets are included.
- Verify the website after every deployment.
- Save the updated source code to GitHub to maintain version history.
- Because the website uses manual deployment, updating GitHub alone will not automatically update the live website.

## 8. Supabase Access Code Management

AssureIT uses Supabase to manage the access codes required to enter the website.

Authorized administrators can add, modify, or remove access codes directly through the Supabase Table Editor without editing the website's source code or redeploying it.

### Accessing the Access Codes

1. Go to https://supabase.com/dashboard.
2. Sign in using the Supabase account provided during the project handover.
3. Select the AssureIT project.
4. Navigate to **Table Editor** in the left sidebar.
5. Open the **Access Code** table to view the existing access codes.

### Adding a New Access Code

1. Open the Access Code table.
2. Click **Insert** or **Insert row**.
3. Enter the new access code in the appropriate field.
4. Save the record.
5. Test the new access code on the AssureIT website.

### Modifying an Access Code

1. Locate the access code you want to update.
2. Select the corresponding row.
3. Change the existing code to the new value.
4. Save the changes.
5. Verify that the updated code works correctly.

### Removing an Access Code

1. Locate the access code you want to remove.
2. Select the corresponding row.
3. Click **Delete**.
4. Confirm the deletion.
5. Verify that the removed code can no longer be used.

### Important Notes

- Access codes can be managed directly through Supabase.
- Adding, modifying, or removing access codes does not normally require a Netlify redeployment.
- Only authorized personnel should manage access codes.
- Avoid changing unrelated Supabase settings.
- Always verify access code functionality after making changes.
## 9. Modifying the Source Code

Future developers can modify the application using Visual Studio Code or another compatible code editor.

- Edit HTML files to modify the website structure and content.
- Edit files inside `css/` to change the website's appearance.
- Edit files inside `js/` to update the hardware testing functionality.
- Update the `images/` and `audio/` folders when modifying visual or audio assets.

After making changes:

1. Test the website locally.
2. Save and commit the changes to GitHub.
3. Deploy the updated website folder through Netlify.
4. Verify that the updated website functions correctly.

**Note:** Routine access code management can be performed through Supabase without modifying the website's source code.

## 10. Maintenance and Troubleshooting

Future developers should:

- Regularly verify the functionality of hardware testing features.
- Test camera and microphone permissions in supported browsers.
- Ensure that all JavaScript, CSS, image, and audio files load correctly.
- Check the browser developer console for errors.
- Maintain updated copies of the source code in GitHub.
- Review Netlify deployment logs if a deployment fails.
- Check Supabase database records if access codes are not working.
- Verify that the website can communicate with Supabase.
- Review database permissions and security policies when troubleshooting access issues.

## 11. Project Handover

The AssureIT project uses three main platforms:

| Platform | Purpose |
|---|---|
| GitHub | Source code storage, version control, and documentation |
| Netlify | Website hosting and deployment |
| Supabase | Access code management |

### Project Links

**GitHub Repository:** https://github.com/Rin1803/AssureIT

**Live Website:** https://assureit.netlify.app

**Netlify Dashboard:** https://app.netlify.com

**Supabase Dashboard:** https://supabase.com/dashboard

### Handover Instructions

Future developers and administrators can:

1. **Access the source code** through the GitHub repository.
2. **Modify website features and design** by editing the HTML, CSS, and JavaScript files.
3. **Publish website updates** by uploading the complete updated website folder through the Netlify Deploys tab.
4. **Manage website access codes** through the Supabase Table Editor by adding, modifying, or removing access code records.
5. **Maintain the application** by monitoring website functionality, database connectivity, and deployment status.

The receiving team should have appropriate access to GitHub, Netlify, and Supabase before assuming responsibility for the project.

Account credentials and sensitive configuration information should be transferred securely and should not be stored in this repository.

---

**AssureIT — Hardware Testing Platform**

Developed to support laptop hardware testing and User Acceptance Testing before device deployment.

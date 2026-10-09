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

## 4. Technology Stack

- HTML5 — Website structure
- CSS3 — Interface design and styling
- JavaScript — Interactive functionality
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

**Important Notes:**

- Ensure that `index.html` is located at the root of the folder being uploaded.
- Upload the complete website folder rather than individual modified files to avoid missing dependencies.
- Make sure all required assets are included.
- Verify the website after every deployment.
- Save the updated source code to GitHub to maintain version history.
- Because the website uses manual deployment, updating GitHub alone will not automatically update the live website.

## 8. Modifying the Source Code

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

## 9. Maintenance and Troubleshooting

Future developers should:

- Regularly verify the functionality of hardware testing features.
- Test camera and microphone permissions in supported browsers.
- Ensure that all JavaScript, CSS, image, and audio files load correctly.
- Check the browser developer console for errors.
- Maintain updated copies of the source code in GitHub.
- Review Netlify deployment logs if a deployment fails.

## 10. Project Handover

The AssureIT source code is maintained through GitHub, while the published website is hosted on Netlify.

Future maintenance requires appropriate access to both platforms.

**GitHub Repository:** https://github.com/Rin1803/AssureIT

**Live Website:** https://assureit.netlify.app

**Deployment Platform:** https://app.netlify.com

Future developers may modify the source code and manually redeploy the updated website using the Netlify Deploys tab.

The receiving team should ensure that the appropriate GitHub repository access and Netlify project permissions have been transferred before assuming maintenance responsibilities.

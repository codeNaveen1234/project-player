# ProjectPlayer

The Project Player is a flexible Angular-based Web component for project consumption. Easily adaptable for various frameworks or vanilla JS apps. Enhance user experiences seamlessly built with the help of angular version 17.
## Prerequisites for setup

Angular 17, Nodejs 18.20.7

## Setup

Run `npm install` after cloning the repo in local to install the necessary dependencies

## Build ProjectPlayer and generate the webcomponent

Run `npm run build-player` To build the player with the latest changes and to reflect the changes in webcomponent

## Demo Application

Navigate to `projects/demo-app` and Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

In-case the changes have been done in the library, after successful build by `npm run build-player` the changes would automatically reflect in the app as well. ( only applicable to this app and not the react demo app).

## Webcomponent

## Steps to Include Web Component in Angular Project

1. **Download the Web Component**
   - Run the following command to install the web component:
     ```bash
     npm i project-player
     ```

2. **Include the Web Component Script**
   - Open the `angular.json` file.
   - Navigate to the `"scripts"` section under `projects -> project-player-library -> architect -> build`.
   - Add the path to the web component script:
     ```json
     "scripts": [
       "node_modules/project-player/project-player-component.js"
     ]
     ```

3. **Include the Web Component Styles**
   - In the same `angular.json` file, go to the `"styles"` section under `projects -> project-player-library -> architect -> build`.
   - Add the path to the web component's CSS file:
     ```json
     "styles": [
       "node_modules/project-player/styles.css"
     ]
     ```


## Steps to Consume the Project Web Component

###  Adding the Web Component Tag to an HTML File
Add the following tag created from the web component:

```html
<project-player [config]="config" [projectData]="projectData"></project-player>
```
```
config = {
  maxFileSize: <sizeInNumber>,
  baseUrl: <projectBaseUrl>,
  accessToken: <accessToken>,
  profileInfo: {}
}
```
```
projectData = <projectData>;
```

## Configuration and Project Data

1. **config**: This object contains the necessary settings for the player:
   - **maxFileSize**: The maximum size of the file (number), specified in MB.
   - **baseUrl**: The base URL for the project.
   - **accessToken**: The access token used for authentication.
   - **profileInfo**: Any additional profile-related information.

2. **projectData**:
   - This object having the `projectId` or `solutionId` keys used to hit the API for fetching the project data consumed by the player.

### Global Styling for the Player

This file defines the global styles for the player, using Ionic core styles and Material Design theme integration.
```css
:root {
    --primary-color: #832215;
    --disabled-btn-bg: #0000001f;
    --disabled-btn-text: #00000061;
}
```

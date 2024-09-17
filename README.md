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

The Webcomponent can be downloaded by running `npm i project-player`

In our angular.json file, we have included the published web component script under the "scripts" section (projects -> project-player-library -> architect -> build). This script is responsible for adding the questionnaire player web component functionality to our demo application `node_modules/project-player/project-player-component.js`

To include the npm published styles of the webcomponent in the demo app, use `node_modules/project-player/styles.css` in the "styles" section (projects -> project-player-library -> architect -> build in angular.json)'.


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

config: This object contains necessary settings like:
	•	maxFileSize: The maximum size of the file (number)which will be in MB.
	•	baseUrl: The base URL for the project.
	•	accessToken: The access token for authentication.
	•	profileInfo: Any additional profile information.
projectData: This is the projectId or solutionId used to hit the API for fetching project   data that will be consumed by the player.

### Global Styling for the Player

This file defines the global styles for the player, using Ionic core styles and Material Design theme integration.
```css
:root {
    --primary-color: #832215;
    --disabled-btn-bg: #0000001f;
    --disabled-btn-text: #00000061;
}
```
This allows you to control the visual appearance of the web component and ensure it aligns with your application's design.
# RUN THE BACKEND
Ensure to install .Net 5.0 (https://dotnet.microsoft.com/en-us/download/dotnet/5.0?msclkid=380b26eebb9f11ec9cedc23a82540107)
CD to the project folder "Anchor-Editor-Backend/Anchor-Editor-Backend"

Run Command "dotnet run"

The backend will be hosted in 5001 by default


# API Instruction**
In Backend.postman_collection, import to postman

1. Ensure you have upload the xml file first at "https://localhost:5001/api/XMLFiles"

Then you can do the following operations:
1. Get plain text at "https://localhost:5001/api/PlainText"
2. Get all current anchors in the posted xml file at "https://localhost:5001/api/Anchors"
3. Get an Anchor at an position(index in the plain text, 548 in this case) at "https://localhost:5001/api/Anchors/548"
	Note that an index could have multiple anchors
4. Get an Anchor at a timestamp at "https://localhost:5001/api/Anchors/8.74s"
	Note that timestamp in unique
5. Upload a new anchor at "https://localhost:5001/api/Anchors?destinationTimestamp=3s&destinationLocation=0"
6. Update an exist8ing anchor at "https://localhost:5001/api/Anchors?originalTimestamp=0.00s&originalLocation=0&destinationTimestamp=0.5s&destinationLocation=5"
6. Delete an anchor at "https://localhost:5001/api/Anchors/0.5s"
7. Get most updated xml file at "https://localhost:5001/api/XMLFiles"


**RUN THE FRONTEND**
# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

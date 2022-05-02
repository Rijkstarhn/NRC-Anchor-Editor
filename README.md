# RUN THE BACKEND
Ensure to install .Net 5.0 SDK (https://dotnet.microsoft.com/en-us/download/dotnet/5.0?msclkid=380b26eebb9f11ec9cedc23a82540107)

MAC: https://dotnet.microsoft.com/en-us/download/dotnet/thank-you/sdk-5.0.407-macos-x64-installer

WINDOWS: https://dotnet.microsoft.com/en-us/download/dotnet/thank-you/sdk-5.0.407-windows-x86-installer

CD to the project folder "Backend/Anchor-Editor-Backend/Anchor-Editor-Backend"

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


# RUN THE FRONTEND
Just `npm install`, then `npm start`

# HOW TO USE
1. Upload your valid xml file and audio via the two inputs.
2. After loading, you will see text and audio wave in the web page, plus some buttons for various operation.
3. You will see red anchors and markers in text and audio area if your xml file contains anchor.
4. The first row of buttons are for audio control, you can play and pause, change the play speed, resume to normal speed.
5. The second row of buttons are for anchor control and file download. 
6. If you enter add anchor mode, you will not be able to switch to delete anchor mode unless you click cancel button. Actually you will see the delete anchor button become grey after you click add anchor button. This rule also applied to delete mode.
7. For add anchor mode, after you click add anchor button, you can click on any space in the text, and you will see a red bar denoting your current choice. After that you can click on the audio wave to choose the corresponding audio location. Once you're satisfied with your choice, click save button. You will see the red bar in text area and red polygon marker in audio area fixed.
8. For delete anchor mode, after you click delete anchor button, you can click on red bar in the text, and you will see it becomes green denoting your current choice, the corresponding marker in audio area will also becomes green. Once you make your choice, click save button.
9. When you satisfied with your edit, click download button. The updated xml file will be downloaded.



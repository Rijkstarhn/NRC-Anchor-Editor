**RUN THE BACKEND**
Ensure to install .Net 5.0 (https://dotnet.microsoft.com/en-us/download/dotnet/5.0?msclkid=380b26eebb9f11ec9cedc23a82540107)
CD to the project folder "Anchor-Editor-Backend/Anchor-Editor-Backend"
Run Command "dotnet run"
The backend will be hosted in 5000 by default


**API Instruction""
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
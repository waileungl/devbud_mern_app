# DEVBUD
<img src='https://user-images.githubusercontent.com/99300376/213829176-39182bfa-d13f-4d48-8be9-73be2b27789b.gif' width='1000'/>

#### Check it Out!

[Live Demo](https://devbud.williamzhan.com/) and
[Video Demo](https://vimeo.com/793111024)

DEVBUD. is a full-stack application built with React, MongoDB, Firebase, TailwindCSS, and WebRTC. This is a social networking app for software developers that also has a collaborative code space. In this app, aspiring developers are able to network with experienced developers to improve their coding skills. The collaborative code space has group live chat messaging, live group video calls, screen sharing, and a collaborative code editor that supports JavaScript, Python, and Java. Check it out!

# Technologies Used
DEVBUD. is built on React, MongoDB, WebRTC, Firebase, and TailwindCSS. 

This application was deployed using AWS.

<img src='https://user-images.githubusercontent.com/99300376/213823336-072c57c4-555e-4d08-9867-b50f6bc1d845.png' width='50'/> <img src='https://user-images.githubusercontent.com/99300376/213824126-33b9b9e7-b24d-430a-9d55-7f880a0af280.png' width='50'/> <img src='https://user-images.githubusercontent.com/99300376/213824215-6c4d8095-9dc3-471f-a616-24f7a4db14fc.png' width='50'/>
<img src='https://user-images.githubusercontent.com/99300376/213824251-e81c775d-165e-43bf-82f3-bdc6ae86757a.png' width='50'/> <img src='https://user-images.githubusercontent.com/99300376/213824256-821522ac-1a6a-407a-a74b-61cb3b203c9e.png' width='50'/>
<img src='https://user-images.githubusercontent.com/99300376/213824834-f116be87-2e57-45c5-894f-5dd857e2115d.png' width='50'/>
<img src='https://user-images.githubusercontent.com/99300376/213824838-912ed7fa-c3df-4dd2-8972-283e5e184532.png' width='50'/>

# Features and Highlights

* [Landing Page](#examples)
  - [Login/Registration](#Login/Registration)
  - [Full CRUD for registered users](#FullCRUDforregisteredusers)
  - [Image Uploading with Firebase ](#ImageUploadingwithFirebase)
  - [Mobile-First Design](#MobileFirstDesign)

* [Code Space](#templates)
  - [Create Room Page](#CreateRoomPage)
  - [Collaborative Code Editor](#CollaborativeCodeEditor)
  - [Live Group Call](#LiveGroupCall)
  - [Screen Sharing](#ScreenSharing)
  - [Live Chat Messaging](#LiveChatMessaging)
  
* Conclusion and Next Steps
  - [What I've Learned](#WhatIveLearned)
  - [Next Steps](#NextSteps)


<a name='Login/Registration'></a>
## Login/Registration
<img src='https://user-images.githubusercontent.com/110699040/213883194-a41f8b07-f96f-46bd-8507-b16d01d22c6f.gif' width='800'/>
<!-- ![registration_gif](https://user-images.githubusercontent.com/110699040/213883194-a41f8b07-f96f-46bd-8507-b16d01d22c6f.gif) -->

The login and registration were created as a multi-step form. The first page asks for the user's email and password, while the second form asks for additional infromation like full name, education, years of experience, a short description and preferred coding languages. 

In order for a user to become a tutor, he/she must first create an account. This will also allow them to edit their profile information. 

<a name='FullCRUDforregisteredusers'></a>
## Full CRUD for registered users
<img src='https://user-images.githubusercontent.com/110699040/213883962-c58d8f73-f540-4d16-a2e0-621fdee445cf.gif' width='800'/>
<!-- ![crud_gif](https://user-images.githubusercontent.com/110699040/213883962-c58d8f73-f540-4d16-a2e0-621fdee445cf.gif) -->

Registered users have access to full CRUD features regarding their profile. A regular user can only browse through the list of developers and use the code space. However, registered users can edit their profile information, update their profile picture and delete their account. 

<a name='ImageUploadingwithFirebase'></a>
## Image Uploading with Firebase 
<img src='https://user-images.githubusercontent.com/110699040/213883936-82ca21d2-d3e4-4ffc-a1e9-9715368864e6.gif' width='800' />
<!-- ![upload_pic_gif](https://user-images.githubusercontent.com/110699040/213883936-82ca21d2-d3e4-4ffc-a1e9-9715368864e6.gif) -->

DEVBUD uses Firebase to allow users to upload an image from their local computer to add as their profile picture. The image is then stored in Firebase.

<a name='MobileFirstDesign'></a>
## Mobile-First Design
<img src='https://user-images.githubusercontent.com/110699040/213885906-50bf8974-2600-4a5c-9fd8-f7ce621986b6.gif' width='800' />
<!-- ![responsive_video_gif](https://user-images.githubusercontent.com/110699040/213885906-50bf8974-2600-4a5c-9fd8-f7ce621986b6.gif) -->

DEVBUD was created with the mobile-first design approach. This means that users can still use and enjoy the application on any type of device. This application is responsive, so it will fit any screen size from an iPhone to a larger desktop.

<a name='CreateRoomPage'></a>
## Create Room Page
<img src='https://user-images.githubusercontent.com/110699040/213889096-34fa4fd5-693d-473a-a04d-f52310734749.gif' width='800' />
<!-- ![create_room_gif](https://user-images.githubusercontent.com/110699040/213889096-34fa4fd5-693d-473a-a04d-f52310734749.gif) -->

The Code Space comes with an animated toggleable feature that allows users to switch between the create a room form and join a room form. 

Next to each form there is a carousel with indicators that allows users to easily navigate through a collection of images and descriptions on how to use teh code space.

<a name='CollaborativeCodeEditor'></a>
## Collaborative Code Editor
<img src='https://user-images.githubusercontent.com/110699040/213901355-3ffb2f98-f821-4c57-b0b8-c7722c277fde.gif' width='800' />
<!-- ![code_edit_gif](https://user-images.githubusercontent.com/110699040/213901355-3ffb2f98-f821-4c57-b0b8-c7722c277fde.gif) -->

DEVBUD'S Code Space comes with a built-in collaborative code editor that supports JavaScript, Java, and Python. Just like in Google Docs any code that is written and executed in the code editor will be seen by all the users in the code space. This allows users to work together with their colleagues on projects, assignments, or homework. 

<a name='LiveGroupCall'></a>
## Live Group Call
<img src='https://user-images.githubusercontent.com/110699040/213899719-a4b6d13c-37fb-4bca-850e-90cb4b1291aa.gif' width='800' />
<!-- ![video_room_Gif](https://user-images.githubusercontent.com/110699040/213899719-a4b6d13c-37fb-4bca-850e-90cb4b1291aa.gif) -->

The live group call feature was implemented using webRTC. The Code Space can support live group calls with any user that joins the room, and each user is able to turn off their camera, mute their microphone or share their screen. 

<a name='ScreenSharing'></a>
## Screen Sharing
<img src='https://user-images.githubusercontent.com/110699040/213900629-893fd59c-b4a2-4d4c-88f4-5fe5d2fc5066.gif' width='800' />
<!-- ![share_gif](https://user-images.githubusercontent.com/110699040/213900629-893fd59c-b4a2-4d4c-88f4-5fe5d2fc5066.gif) -->

The screen-sharing feature was also implemented using webRTC. Users are allowed to share their screen, window, or a specific tab with all the other users in the Code Space. This feature allows for better communication between parties and makes learning more efficient. 

<a name='LiveChatMessaging'></a>
## Live Chat Messaging
<img src='https://user-images.githubusercontent.com/110699040/213891852-7e6d43d1-5b82-427f-8559-936119ec031f.gif' width='800' />
<!-- ![chat_room_gif](https://user-images.githubusercontent.com/110699040/213891852-7e6d43d1-5b82-427f-8559-936119ec031f.gif) -->

The Code Space comes with live group chat messaging, that was integrated using webRTC. The top right corner of the chat box has a participant counter that keeps track of the number of users in the room. Any time a new user joins the room, all the other users will be notified through a notification in the chat box. This is another mode that users can use to stay in communication with each other. 

<a name='WhatIveLearned'></a>
## What I've Learned

After 16 weeks as a Full Stack Software Engineering student at Coding Dojo, this capstone project gave me the opportunity to apply and demonstrate what I have learned: 

- Set up a backend server with user authentication and error handling.
- Designed a frontend application with React components and connected it to the backend.
- Implemented full CRUD features.

This project has given me the opportunity to explore:

- Implement the image upload feature and use Firebase to store the images. 
- Use Augora's webRTC to implement live group chat messaging, live video calls, and screen sharing.
- Designed the application to be responsive by using the mobile-first design approach.

<a name='NextSteps'></a>
## Next Steps

- Create a resource page that will have more information on free learning resources that aspiring developers can use to learn and improve their coding skills. (v1.0.1)
- Use the Google Gmail API to allow users to send emails to other users directly from the app.
- Use the Google Calendar API to allow users to schedule meeting times with other users.

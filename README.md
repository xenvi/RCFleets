# RCFleets
#### Video Demo: https://www.youtube.com/watch?v=w6rFTHxMI6w
#### Description:
React/Python Django web application for users to save and share their RC car fleets!

Create card posts for each of your car(s) to build your fleet. Visit other user profiles to view other fleets and their specifications. Create your profile to introduce yourself to other users or just to keep track of the state of your current cars. Favorite your top cars, document your best speeds, keep track of current pinion sizes or upload an image of your car!

This project utilizes Django (python web framework) for secure user authentication through the Rest Framework and scalable relationship-based system. An advanced user authentication system is implemented including email activation, password reset, and utilization of JWT session tokens. Using React on the frontend allows for a dynamic application, improved performance through the Virtual DOM and partial page refresh. Combined with python, we have a scalable, fast user interface.

Though this project is still a work in progress, CRUD capabilities are implemented for users to read posts/profiles and create posts/profiles. Update and delete functionalities are in the works!

Folder structure:
- backend: python/django rest framework
    - core (app): core python app containing app settings, url paths, env file, and other setup-related files
    - accounts (app): app handling everything user/authentication related. contains 2 models, user and profile
    - fleets (app): app handling everything fleets related. contains 2 models, fleetpost and fleetinfo which contains a one-to-one relationship with the accounts app (user)
- frontend/src: javascript/react
    -  components: folder containing reusable react components imported in container pages
    -  containers: folder containing container react pages
    -  hoc: folder containing higher-order layout wrapper
    -  redux: folder for state management
    -  util: folder for util functions and database schemas


# Short Term TODO
- ~~Add Home page (recent card posts)~~
- ~~Add Profile page~~
- Add CRUD abilities for RC Car info card
- Expand footer with links/social
- ~~Ensure Responsive~~
- ~~Improve field errors on forms~~
- ~~Create confirmation pages/alerts after password reset/confirm reset~~
- Improve automated email templates for auth
- Move media folder to host CDN (option: Amazon S3 bucket) for django images
- ~~Refactor extra user details to UserProfile One-to-one relation~~
- Add loading UI/states to pages
- Add image expansion functionality on click (inline image viewer)
- Refactor!!!

# Long Term TODO
- "Remember Me" functionality - extend access/refresh token use to keep user logged in
- Shop based (user selling portal for RC related items with chat) features
- Forum/follow based features
- Notifications
- Google Analytics
- React Helmet (resolve google crawl indexing issues with React)
- Social login
- Hosting (heroku)

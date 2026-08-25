
4.753
# VS Code + OpenCode for the gallery project

#SITE TO SHOWCASE PHOTOGRAPHS.

Name: 'Cami Fotos'. Subtitle: 'A story in images'

##It has a homepage:

Homepage with a simple form with one field to enter a password and a button that says 'Enter the gallery' to log in. Include two examples of the access modes to choose from: 'Family' and 'Administration', each with a different password.

It should have a black background. A full-size cover image (.jpg) that fits the screen, with a low-intensity left-side and the login form on the right.

##It has a gallery organized by name:

Once logged in, users access the galleries page. This page contains a grid of gallery names with images. This image is selected from the gallery folder, provided the image filename begins with 00. Clicking on the image takes you to the page containing all the images in each gallery.
The gallery must be protected with authentication.

##Contains the images in the image gallery:
The image gallery displays all the photos in the gallery in a grid. Clicking on each photo opens it in full-screen lightbox view. Each gallery has a folder containing its photos.

If accessed in administrator mode, the site must have a button in the menu to access the administration panel, allowing users to create and modify galleries and add new photos.

If accessed in family mode, there will be no administration button.

The site must have a page with access statistics showing the user, date, and galleries and images viewed.

The password must be stored using an environment variable.

The session must prevent an unauthenticated user from directly accessing the photos:

```text
/gallery/gallery name1
/gallery/gallery name2
/gallery/gallery name3

The architecture must ensure that a person without a valid session cannot obtain the photos simply by knowing their URL.

##The main objective is for the experience to be extremely simple:

1. The user enters the site.

2. Enters a password.

3. Accesses a page that displays the names of available galleries.

4. Selects a gallery name.

5. Views the photos corresponding to that gallery.

6. Can open a photo in full screen.

7. Can navigate between photos.

8. Can return to the gallery selection screen.

## 2. Project Principles

The application must adhere to these rules:

* Maintain an extremely simple design.

* Use a black or very dark gray background.
* Use an elegant and minimalist interface.

* Give absolute prominence to the photographs.

* Do not use unnecessary visual elements.

* Do not use excessive animations.

* Do not use bright colors except for small interactive elements.

* Prioritize loading speed.

* Prioritize privacy and security.

* The code should be easy to maintain.

* The architecture should allow for easily adding new years.

* Do not introduce unnecessary dependencies.

* Do not implement features that have not been requested.

## Site Features

* Password-protected login page.

* Persistent session.

* Private gallery.

* Photographs organized by gallery name.

* View by gallery name.

* Within each gallery, a grid of photographs.

* Full-screen/lightbox photo display.

* Previous/next navigation.

* Fully responsive design.

* Black/dark background.

* Minimalist, modern, and simple typography. * No unnecessary elements.

* Optimized image loading.

* Lazy loading.

* Simple panel or structure for adding images.

* Real image protection, not just hiding them with JavaScript.

## Responsive design
The application must function correctly on:

* Desktop
* Laptop
* Tablet
* iPhone
* Android

A mobile-first approach should be used where appropriate.

## Technology stack

Use:

* Astro
* JavaScript
* HTML
* CSS
Always prioritize native Astro, JavaScript, and CSS solutions.

## Performance

The site must be optimized for images.

Implement:

* Lazy loading
* Thumbnails
* Responsive images where possible
* Modern formats like WebP where appropriate
* Compression
* Explicit image dimensions
* Avoid unnecessary JavaScript

## Do not allow:

* Accidental horizontal scrolling
* Distorted images
* Buttons that are too small
* Illegible text
* Off-screen elements

Finally:
Provide documentation with all the necessary requirements for uploading and publishing the site to any hosting provider.
Enviar comentarios


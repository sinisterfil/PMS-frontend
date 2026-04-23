# Project Matching Platform

This project is a frontend demo for a university project matching system.

The platform brings together three user roles:

- Student
- Advisor
- Admin

Our goal was to create a clear and simple interface where each user can see the pages and actions related to their role.

## Technologies

- React
- Vite
- CSS

## Project Content

In this project, we created a small university platform with a role-based dashboard system.

The application starts with a single login page.
After login, the system opens a different dashboard according to the email address of the user.

Inside the project, we added these main parts:

- A login page
- A student dashboard
- An advisor dashboard
- An admin dashboard
- Project cards and project detail area
- Announcement section
- Profile pages
- Search area

## Login Page

We added one common login page for all users.

On this page:

- The user enters email and password
- The system checks the email
- The system identifies the role automatically
- The related dashboard opens after login

This makes the entry part simple and easy to understand during the presentation.

## Student Side

For the student user, we added these sections:

### Home

On the home page, the student can see:

- Summary cards
- Announcements
- Selected project details

This part gives a quick overview of the platform.

### My Projects

In the My Projects section, we added:

- Project cards
- Project title
- Project owner
- Project type
- Project status
- A button to see details
- A button to apply

When a student clicks a project, the details area shows more information such as description, required skills, advisor, and team member count.

### Create Project

In this page, we added a project creation form.

The student can enter:

- Project title
- Description
- Field
- Project type
- Advisor
- Team member number
- Required skills

After submitting the form, the new project is added to the project list.

### Find Advisor

In the advisor search page, we added:

- Advisor list
- Advisor name
- Expertise area
- Department
- Availability status
- Send request button

This section helps students search for suitable advisors.

### Profile

On the student profile page, we added:

- Full name
- Email
- Department and year
- Interests
- Skills
- GitHub
- LinkedIn

This part shows a simple student profile in the interface.

## Advisor Side

For the advisor role, we added a separate dashboard with these sections:

### Home

The advisor home page includes:

- Statistics cards
- Announcement panel
- Project detail area

This gives the advisor a quick summary.

### My Projects

In this section, the advisor can:

- View project cards
- Open project details
- Review student project information

This area is useful for checking the projects related to advising.

### Incoming Requests

In the request management page, we added a table with:

- Student name
- Project name
- Project type
- Request status
- Accept button
- Reject button

This makes it easy to demonstrate how an advisor can manage student requests.

### Profile

On the advisor profile page, we added:

- Full name
- Email
- Department
- Academic title
- Areas of expertise
- Research interests
- Availability status

This page presents the advisor information clearly.

## Admin Side

For the admin role, we added management pages.

### Home

On the admin home page, we included:

- General statistics
- Announcement area
- Project detail preview

### Manage Students

In this section, the admin can see a table of students with:

- Name
- Department
- Year

### Manage Advisors

In the advisor management area, we added:

- Advisor account table
- Department information
- Status information
- Toggle status button

We also added an advisor availability section where the admin can see whether an advisor is available or busy.

### Manage Projects

In this section, the admin can:

- View all project cards
- Select a project
- Open the project detail area

### Create Announcement

We added an announcement form for the admin.

The admin can enter:

- Title
- Category
- Announcement text

After publishing, the new announcement appears in the system.

## Common Interface Parts

Some parts are used in more than one role.

These shared parts are:

- Sidebar navigation
- Search bar
- Top bar
- Status message area
- Announcement panel
- Project details card
- Profile information rows

This helped us keep the project organized and reusable.

## Demo Accounts

You can use these demo accounts in the presentation:

- Student: `sevinc.yigit@ogr.university.edu.tr`
- Advisor: `sila.korklubasoglu@university.edu.tr`
- Admin: `admin@university.edu.tr`
- Password for all accounts: `123456`

## How to Run

1. Install dependencies

```bash
npm install
```

2. Start the development server

```bash
npm run dev
```

3. Build the project

```bash
npm run build
```

## Presentation Script

### First Person

Hello everyone. We created a project called Project Matching Platform.

This is a frontend demo for a university system.

In this platform, we focused on three main user types: student, advisor, and admin.

At the beginning of the project, we wanted to build a simple and understandable structure.

Because of that, we started with the login part.

We added one common login page for all users.

On this page, the user enters email and password.

After that, the system checks the email and opens the correct dashboard automatically.

Then we designed the student side.

On the student dashboard, we added a home page with summary cards, announcements, and project details.

We also added a My Projects page where students can see project cards and open project details.

Another important part is the Create Project page.

Here, the student can enter the title, description, project type, advisor, team member count, and required skills.

We also added a Find Advisor page.

In that section, students can see advisor names, expertise areas, departments, and availability information.

There is also a profile page for the student with personal and academic information.

### Second Person

After the student side, we built the advisor and admin sections.

For the advisor dashboard, we added a home page, a project page, an incoming requests page, and a profile page.

In the incoming requests section, the advisor can see student requests in a table and accept or reject them.

This is useful to show how advisor actions work in the system.

For the admin side, we added more management pages.

The admin can manage students, advisors, projects, and announcements.

In the Manage Students page, we show the student list.

In the Manage Advisors page, we show advisor account status and advisor availability.

In the Manage Projects page, the admin can review all projects.

We also added a Create Announcement page where the admin can publish announcements for the platform.

Besides these role-based pages, we added common interface parts such as the sidebar, search bar, top area, announcement panel, and project detail card.

We developed the project with React and Vite, and we used CSS for the design.

Our aim was to build a clean, role-based, and easy-to-present interface for a university project matching system.

Thank you for listening.

## Short Presentation Version

### First Person Short

Our project is a university Project Matching Platform.
We added one login page for all users.
Then we created the student side with home, project list, create project, advisor search, and profile pages.

### Second Person Short

We also created advisor and admin dashboards.
The advisor can manage incoming requests, and the admin can manage students, advisors, projects, and announcements.
We built the project with React, Vite, and CSS.

import React, { useState } from "react";

const menus = {
  student: ["Home", "My Projects", "Create Project", "Find Advisor", "Profile"],
  advisor: ["Home", "My Projects", "Incoming Requests", "Profile"],
  admin: ["Home", "Manage Students", "Manage Advisors", "Create Announcement"],
};

const initialProjects = [
  {
    id: 1,
    title: "AI Chatbot",
    owner: "Sevinc Yigit",
    type: "Course Project",
    status: "Open",
    description: "A smart assistant to support course-related communication.",
    requiredSkills: ["React", "Node.js", "UI/UX"],
    teamMembers: 4,
    advisor: "Not assigned",
    interests: ["Conversational AI", "Automation", "Web Development"],
    ownerGithub: "github.com/sevincyigit",
    ownerLinkedIn: "linkedin.com/in/sevincyigit",
  },
  {
    id: 2,
    title: "Mobile App",
    owner: "Merve Yilmaz",
    type: "TUBITAK",
    status: "Advisor Assigned",
    description: "A mobile-first campus collaboration platform.",
    requiredSkills: ["Flutter", "Firebase", "UX Research"],
    teamMembers: 5,
    advisor: "Prof. Selin Yuce",
    interests: ["Product Design", "Mobile UX", "Community Apps"],
    ownerGithub: "github.com/merveyilmaz",
    ownerLinkedIn: "linkedin.com/in/merveyilmaz",
  },
  {
    id: 3,
    title: "Research Paper",
    owner: "Derya Koc",
    type: "Teknofest",
    status: "Needs Members",
    description: "An AI-focused paper on recommendation systems for teamwork.",
    requiredSkills: ["Python", "Machine Learning", "Data Analysis"],
    teamMembers: 3,
    advisor: "Prof. Mehmet Yildiz",
    interests: ["Academic Research", "Recommender Systems", "Data Science"],
    ownerGithub: "github.com/deryakoc",
    ownerLinkedIn: "linkedin.com/in/deryakoc",
  },
  {
    id: 4,
    title: "Smart Agriculture",
    owner: "Sevinc Yigit",
    type: "TUBITAK",
    status: "Pending",
    description: "Sensors and analytics dashboard for agricultural monitoring.",
    requiredSkills: ["React", "Python", "IoT"],
    teamMembers: 4,
    advisor: "Not assigned",
    interests: ["AI", "Sustainability", "IoT"],
    ownerGithub: "github.com/sevincyigit",
    ownerLinkedIn: "linkedin.com/in/sevincyigit",
  },
];

const initialAnnouncements = [
  {
    id: 1,
    title: "TUBITAK Application Deadline Approaching",
    body: "Students who plan to apply should upload their proposal before the deadline.",
    tag: "TUBITAK",
    tone: "blue",
  },
  {
    id: 2,
    title: "Teknofest Project Submissions Open",
    body: "Teams can now create projects and invite members through the platform.",
    tag: "Teknofest",
    tone: "red",
  },
  {
    id: 3,
    title: "Course Project Group Formation Deadline",
    body: "Students without a group after the deadline will be assigned automatically.",
    tag: "Course Project",
    tone: "amber",
  },
];

const initialAdvisors = [
  {
    id: 1,
    name: "Prof. Selin Yuce",
    expertise: "Artificial Intelligence",
    department: "Software Engineering",
    available: true,
    expertiseAreas: ["Machine Learning", "Data Science"],
    researchInterests: ["Deep Learning", "Natural Language Processing", "Computer Vision"],
    supervisedProjects: ["AI-based Chatbot Systems", "Image Processing Projects"],
  },
  {
    id: 2,
    name: "Prof. Duygu Dogan",
    expertise: "UI/UX",
    department: "Software Engineering",
    available: true,
    expertiseAreas: ["Interaction Design", "Usability Testing"],
    researchInterests: ["Design Systems", "Mobile UX", "Human Computer Interaction"],
    supervisedProjects: ["Campus App UX Redesign", "Accessibility Improvement Projects"],
  },
  {
    id: 3,
    name: "Prof. Mehmet Yildiz",
    expertise: "Data Mining",
    department: "Computer Engineering",
    available: false,
    expertiseAreas: ["Data Mining", "Predictive Analytics"],
    researchInterests: ["Recommender Systems", "Big Data", "Knowledge Discovery"],
    supervisedProjects: ["Student Analytics Platform", "Recommendation Engine Projects"],
  },
  {
    id: 4,
    name: "Prof. Ahmet Yilmaz",
    expertise: "Cyber Security",
    department: "Computer Engineering",
    available: true,
    expertiseAreas: ["Cyber Security", "Network Defense"],
    researchInterests: ["Threat Detection", "Secure Systems", "Digital Forensics"],
    supervisedProjects: ["Secure Messaging Tools", "Network Monitoring Dashboards"],
  },
];

const initialRequests = [
  {
    id: 1,
    student: "Sevinc Yigit",
    project: "AI-Based Smart Agriculture",
    type: "TUBITAK",
    status: "Waiting",
    department: "Software Engineering",
    year: "3rd Year",
    teamMembers: 4,
    requestedDate: "23 Apr 2026",
    expectedDuration: "6 months",
    projectField: "Artificial Intelligence / IoT",
    advisorPreference: "Prof. Selin Yuce",
    description: "An AI-assisted agriculture platform that combines field sensors, crop health prediction, and a monitoring dashboard.",
    objective: "To help agricultural teams monitor crop conditions in real time and predict irrigation or disease risks earlier.",
    deliverables: ["Sensor dashboard", "Crop health prediction model", "Mobile notifications", "Advisor progress reports"],
    requiredSkills: ["React", "Python", "IoT"],
  },
  {
    id: 2,
    student: "Mergen Yilmaz",
    project: "Food App",
    type: "TUBITAK",
    status: "Waiting",
    department: "Computer Engineering",
    year: "4th Year",
    teamMembers: 3,
    requestedDate: "22 Apr 2026",
    expectedDuration: "4 months",
    projectField: "Mobile Development / Health Tech",
    advisorPreference: "Prof. Duygu Dogan",
    description: "A nutrition and meal planning app focused on personalized recommendations and a clean mobile experience.",
    objective: "To provide users with healthier meal planning suggestions tailored to dietary goals and daily habits.",
    deliverables: ["Mobile prototype", "Recommendation engine", "User testing report"],
    requiredSkills: ["Flutter", "Firebase", "UX Research"],
  },
  {
    id: 3,
    student: "Firdevs Su",
    project: "ADHD",
    type: "Teknofest",
    status: "Waiting",
    department: "Software Engineering",
    year: "4th Year",
    teamMembers: 5,
    requestedDate: "21 Apr 2026",
    expectedDuration: "5 months",
    projectField: "EdTech / Behavioral Analytics",
    advisorPreference: "Prof. Mehmet Yildiz",
    description: "A support tool for ADHD students with personalized reminders, progress tracking, and behavioral analytics.",
    objective: "To improve academic planning and focus support for students with ADHD through intelligent reminders and analytics.",
    deliverables: ["Student mobile app", "Behavior analytics dashboard", "Pilot test summary"],
    requiredSkills: ["Python", "Machine Learning", "Data Analysis"],
  },
  {
    id: 4,
    student: "Emre Guner",
    project: "AI Predictor",
    type: "Teknofest",
    status: "Accepted",
    department: "Electrical Engineering",
    year: "2nd Year",
    teamMembers: 4,
    requestedDate: "18 Apr 2026",
    expectedDuration: "5 months",
    projectField: "Artificial Intelligence / Forecasting",
    advisorPreference: "Prof. Selin Yuce",
    description: "A prediction engine that analyzes historical competition and project data to estimate team performance.",
    objective: "To support competition teams with forecasting insights for planning, resource usage, and milestone risks.",
    deliverables: ["Prediction engine", "Admin dashboard", "Evaluation dataset"],
    requiredSkills: ["Python", "Deep Learning", "Dashboard Design"],
  },
];

const students = [
  { id: 1, name: "Sevinc Yigit", department: "Software Engineering", year: "3" },
  { id: 2, name: "Firdevs Su", department: "Software Engineering", year: "4" },
  { id: 3, name: "Emre Guner", department: "Electrical Engineering", year: "2" },
  { id: 4, name: "Umut Kaya", department: "Computer Engineering", year: "4" },
];

const studentProfiles = [
  {
    email: "sevinc.yigit@ogr.university.edu.tr",
    password: "123456",
    role: "student",
    name: "Sevinc Yigit",
    department: "Software Engineering",
    year: "3rd Year",
    shortBio: "Software engineering student focused on AI-driven products and collaborative project development.",
    interests: ["Artificial Intelligence", "Machine Learning"],
    skills: ["React", "Python", "UI/UX"],
    github: "github.com/sevincyigit",
    linkedIn: "linkedin.com/in/sevincyigit",
  },
  {
    email: "firdevs.su@ogr.university.edu.tr",
    password: "123456",
    role: "student",
    name: "Firdevs Su",
    department: "Software Engineering",
    year: "4th Year",
    shortBio: "Senior student who enjoys frontend problem solving, clean interfaces, and practical AI features.",
    interests: ["Web Development", "AI"],
    skills: ["React", "UI/UX", "Python"],
    github: "github.com/firdevssu",
    linkedIn: "linkedin.com/in/firdevssu",
  },
  {
    email: "emre.guner@ogr.university.edu.tr",
    password: "123456",
    role: "student",
    name: "Emre Guner",
    department: "Electrical Engineering",
    year: "2nd Year",
    shortBio: "Electrical engineering student interested in embedded systems, robotics, and hands-on prototyping.",
    interests: ["Embedded Systems", "Robotics"],
    skills: ["C", "IoT", "PCB Design"],
    github: "github.com/emreguner",
    linkedIn: "linkedin.com/in/emreguner",
  },
];

const initialTeamRequests = [
  {
    id: 1,
    projectId: 1,
    projectTitle: "AI Chatbot",
    projectType: "Course Project",
    projectOwner: "Sevinc Yigit",
    requesterName: "Firdevs Su",
    status: "Waiting",
    requestedDate: "25 Apr 2026",
    note: "I can support both frontend development and basic ML integration for the chatbot flow.",
  },
];

const initialAdvisorAccounts = [
  { id: 1, name: "Prof. Selin Yuce", department: "Software Engineering", status: "Active" },
  { id: 2, name: "Prof. Duygu Dogan", department: "Software Engineering", status: "Active" },
  { id: 3, name: "Prof. Ahmet Yilmaz", department: "Computer Engineering", status: "Inactive" },
];

const initialAdvisorProfiles = [
  {
    id: 1,
    email: "sila.korklubasoglu@university.edu.tr",
    password: "123456",
    role: "advisor",
    name: "Prof. Selin Yuce",
    department: "Software Engineering",
    title: "Professor",
    expertiseAreas: ["Machine Learning", "Python", "UI/UX"],
    researchInterests: ["Natural Language Processing", "Computer Vision"],
    supervisedProjects: ["AI-based Chatbot Systems", "Image Processing Projects", "Web-based AI Tools"],
    available: true,
  },
];

const emptyForm = {
  title: "",
  description: "",
  type: "Course Project",
  field: "Software Engineering",
  advisor: "Not assigned",
  teamMembers: "4",
  skills: "React, Node.js",
};

const announcementFormInitial = {
  title: "",
  category: "Course Project",
  body: "",
};

const loginFormInitial = {
  email: "",
  password: "",
};

const staffAccounts = [
  {
    email: "admin@university.edu.tr",
    password: "123456",
    role: "admin",
    name: "System Admin",
    department: "Project Coordination Office",
  },
];

function App() {
  const [role, setRole] = useState("student");
  const [view, setView] = useState("Home");
  const [loggedIn, setLoggedIn] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [studentDirectory, setStudentDirectory] = useState(studentProfiles);
  const [advisorProfiles, setAdvisorProfiles] = useState(initialAdvisorProfiles);
  const [projects, setProjects] = useState(initialProjects);
  const [announcements, setAnnouncements] = useState(initialAnnouncements);
  const [advisors, setAdvisors] = useState(initialAdvisors);
  const [requests, setRequests] = useState(initialRequests);
  const [teamRequests, setTeamRequests] = useState(initialTeamRequests);
  const [advisorAccounts, setAdvisorAccounts] = useState(initialAdvisorAccounts);
  const [selectedProjectId, setSelectedProjectId] = useState(initialProjects[0].id);
  const [selectedRequestId, setSelectedRequestId] = useState(null);
  const [selectedTeamRequestId, setSelectedTeamRequestId] = useState(initialTeamRequests[0]?.id || null);
  const [selectedAdvisorId, setSelectedAdvisorId] = useState(null);
  const [message, setMessage] = useState("Enter your university email to sign in. The system will determine your role automatically.");
  const [projectForm, setProjectForm] = useState(emptyForm);
  const [announcementForm, setAnnouncementForm] = useState(announcementFormInitial);
  const [loginForm, setLoginForm] = useState(loginFormInitial);
  const [currentUser, setCurrentUser] = useState(null);

  const selectedProject = projects.find((project) => project.id === selectedProjectId) || null;
  const normalizedSearch = searchText.trim().toLowerCase();

  const filteredProjects = projects.filter((project) => {
    if (!normalizedSearch) return true;
    return [project.title, project.owner, project.type, project.status].some((value) =>
      value.toLowerCase().includes(normalizedSearch),
    );
  });

  const filteredAdvisors = advisors.filter((advisor) => {
    if (!normalizedSearch) return true;
    return [advisor.name, advisor.expertise, advisor.department].some((value) =>
      value.toLowerCase().includes(normalizedSearch),
    );
  });

  const studentProjects = filteredProjects.filter((project) => project.owner === currentUser?.name);
  const discoverProjects = filteredProjects.filter((project) => project.owner !== currentUser?.name);
  const advisorProjects = filteredProjects.filter((project) => project.advisor === currentUser?.name);
  const advisorRequests = requests.filter((request) => request.advisorPreference === currentUser?.name);
  const selectedStudentProject = studentProjects.find((project) => project.id === selectedProjectId) || studentProjects[0] || null;
  const selectedDiscoverProject = discoverProjects.find((project) => project.id === selectedProjectId) || discoverProjects[0] || null;
  const selectedAdvisorProject = advisorProjects.find((project) => project.id === selectedProjectId) || advisorProjects[0] || null;
  const studentIncomingRequests = teamRequests.filter((request) => request.projectOwner === currentUser?.name);
  const selectedTeamRequest = studentIncomingRequests.find((request) => request.id === selectedTeamRequestId) || studentIncomingRequests[0] || null;

  const menu = menus[role];

  function handleLogout() {
    setLoggedIn(false);
    setSearchText("");
    setLoginForm(loginFormInitial);
    setCurrentUser(null);
    setSelectedTeamRequestId(initialTeamRequests[0]?.id || null);
    setSelectedAdvisorId(null);
    setMessage("You are on the login screen. Sign in with your university email.");
  }

  function handleLogin() {
    const normalizedEmail = loginForm.email.trim().toLowerCase();
    const matchedAccount =
      studentDirectory.find((account) => account.email.toLowerCase() === normalizedEmail) ||
      advisorProfiles.find((account) => account.email.toLowerCase() === normalizedEmail) ||
      staffAccounts.find((account) => account.email.toLowerCase() === normalizedEmail);

    if (!matchedAccount) {
      setMessage("No account matched this email. Try one of the demo university emails shown below.");
      return;
    }

    if (loginForm.password !== matchedAccount.password) {
      setMessage("Incorrect password. Please try again.");
      return;
    }

    setRole(matchedAccount.role);
    setCurrentUser(matchedAccount);
    setView("Home");
    setLoggedIn(true);
    setSelectedAdvisorId(null);
    setSelectedTeamRequestId(
      matchedAccount.role === "student"
        ? teamRequests.find((request) => request.projectOwner === matchedAccount.name)?.id || null
        : null,
    );
    setMessage(`${labelForRole(matchedAccount.role)} dashboard opened for ${matchedAccount.name}.`);
  }

  function handleStudentProfileSave(profileUpdates) {
    if (currentUser?.role !== "student") return;

    let updatedStudent = null;
    const previousName = currentUser.name;

    setStudentDirectory(
      studentDirectory.map((student) => {
        if (student.email !== currentUser.email) return student;
        updatedStudent = {
          ...student,
          ...profileUpdates,
          interests: normalizeCommaSeparatedList(profileUpdates.interests),
          skills: normalizeCommaSeparatedList(profileUpdates.skills),
        };
        return updatedStudent;
      }),
    );

    if (updatedStudent) {
      if (updatedStudent.name !== previousName) {
        setProjects(
          projects.map((project) =>
            project.owner === previousName ? { ...project, owner: updatedStudent.name } : project,
          ),
        );
        setTeamRequests(
          teamRequests.map((request) => ({
            ...request,
            projectOwner: request.projectOwner === previousName ? updatedStudent.name : request.projectOwner,
            requesterName: request.requesterName === previousName ? updatedStudent.name : request.requesterName,
          })),
        );
      }
      setCurrentUser(updatedStudent);
      setMessage("Profile updated successfully.");
    }
  }

  function handleAdminStudentSave(originalEmail, profileUpdates) {
    let updatedStudent = null;
    let previousStudent = null;

    setStudentDirectory(
      studentDirectory.map((student) => {
        if (student.email !== originalEmail) return student;
        previousStudent = student;
        updatedStudent = {
          ...student,
          ...profileUpdates,
          interests: normalizeCommaSeparatedList(profileUpdates.interests),
          skills: normalizeCommaSeparatedList(profileUpdates.skills),
        };
        return updatedStudent;
      }),
    );

    if (updatedStudent && previousStudent && updatedStudent.name !== previousStudent.name) {
      setProjects(
        projects.map((project) =>
          project.owner === previousStudent.name ? { ...project, owner: updatedStudent.name } : project,
        ),
      );
      setTeamRequests(
        teamRequests.map((request) => ({
          ...request,
          projectOwner: request.projectOwner === previousStudent.name ? updatedStudent.name : request.projectOwner,
          requesterName: request.requesterName === previousStudent.name ? updatedStudent.name : request.requesterName,
        })),
      );
    }

    if (updatedStudent) {
      setMessage(`Student profile updated for ${updatedStudent.name}.`);
    }
  }

  function handleAdminAddStudent(profileUpdates) {
    const normalizedEmail = profileUpdates.email.trim().toLowerCase();

    if (!normalizedEmail) {
      setMessage("Student email is required.");
      return;
    }

    if (studentDirectory.some((student) => student.email.toLowerCase() === normalizedEmail)) {
      setMessage("A student with this email already exists.");
      return;
    }

    const nextStudent = {
      id: Date.now(),
      email: normalizedEmail,
      password: "123456",
      role: "student",
      name: profileUpdates.name || "New Student",
      department: profileUpdates.department || "Software Engineering",
      year: profileUpdates.year || "1st Year",
      shortBio: profileUpdates.shortBio || "New student profile created by admin.",
      interests: normalizeCommaSeparatedList(profileUpdates.interests),
      skills: normalizeCommaSeparatedList(profileUpdates.skills),
      github: profileUpdates.github || "",
      linkedIn: profileUpdates.linkedIn || "",
    };

    setStudentDirectory([nextStudent, ...studentDirectory]);
    setMessage(`Student "${nextStudent.name}" added successfully.`);
  }

  function handleAdvisorProfileSave(profileUpdates) {
    if (currentUser?.role !== "advisor") return;

    let updatedAdvisor = null;
    const previousName = currentUser.name;

    setAdvisorProfiles(
      advisorProfiles.map((advisor) => {
        if (advisor.email !== currentUser.email) return advisor;
        updatedAdvisor = {
          ...advisor,
          ...profileUpdates,
          expertiseAreas: normalizeCommaSeparatedList(profileUpdates.expertiseAreas),
          researchInterests: normalizeCommaSeparatedList(profileUpdates.researchInterests),
          supervisedProjects: normalizeCommaSeparatedList(profileUpdates.supervisedProjects),
          available: typeof profileUpdates.available === "boolean" ? profileUpdates.available : advisor.available,
        };
        return updatedAdvisor;
      }),
    );

    if (updatedAdvisor) {
      setAdvisors(
        advisors.map((advisor) =>
          advisor.name === previousName
            ? {
                ...advisor,
                name: updatedAdvisor.name,
                department: updatedAdvisor.department,
                expertise: updatedAdvisor.expertiseAreas[0] || advisor.expertise,
                expertiseAreas: updatedAdvisor.expertiseAreas,
                researchInterests: updatedAdvisor.researchInterests,
                supervisedProjects: updatedAdvisor.supervisedProjects,
                available: updatedAdvisor.available,
              }
            : advisor,
        ),
      );
      setAdvisorAccounts(
        advisorAccounts.map((advisor) =>
          advisor.name === previousName
            ? { ...advisor, name: updatedAdvisor.name, department: updatedAdvisor.department }
            : advisor,
        ),
      );
      setProjects(
        projects.map((project) =>
          project.advisor === previousName ? { ...project, advisor: updatedAdvisor.name } : project,
        ),
      );
      setRequests(
        requests.map((request) =>
          request.advisorPreference === previousName ? { ...request, advisorPreference: updatedAdvisor.name } : request,
        ),
      );
      setCurrentUser(updatedAdvisor);
      setMessage("Advisor profile updated successfully.");
    }
  }

  function handleCreateProject(event) {
    event.preventDefault();
    const nextProject = {
      id: Date.now(),
      title: projectForm.title || "Untitled Project",
      owner: currentUser?.name || "Sevinc Yigit",
      type: projectForm.type,
      status: "Open",
      description: projectForm.description || "No description provided yet.",
      requiredSkills: projectForm.skills
        .split(",")
        .map((skill) => skill.trim())
        .filter(Boolean),
      teamMembers: Number(projectForm.teamMembers || 4),
      advisor: projectForm.advisor,
    };

    setProjects([nextProject, ...projects]);
    setSelectedProjectId(nextProject.id);
    setProjectForm(emptyForm);
    setView("My Projects");
    setMessage(`Project "${nextProject.title}" created successfully.`);
  }

  function handlePublishAnnouncement(event) {
    event.preventDefault();
    const tone = announcementForm.category === "Teknofest" ? "red" : announcementForm.category === "TUBITAK" ? "blue" : "amber";
    const nextAnnouncement = {
      id: Date.now(),
      title: announcementForm.title || "Untitled Announcement",
      body: announcementForm.body || "Announcement details were not provided.",
      tag: announcementForm.category,
      tone,
    };

    setAnnouncements([nextAnnouncement, ...announcements]);
    setAnnouncementForm(announcementFormInitial);
    setView("Home");
    setMessage(`Announcement "${nextAnnouncement.title}" published.`);
  }

  function handleRequestDecision(id, nextStatus) {
    setRequests(
      requests.map((request) => (request.id === id ? { ...request, status: nextStatus } : request)),
    );
    setMessage(`Request marked as ${nextStatus.toLowerCase()}.`);
  }

  function handleAdvisorRequest(name) {
    setMessage(`Advisor request sent to ${name}.`);
  }

  function handleApplyToProject(project) {
    if (!currentUser) return;

    const alreadyRequested = teamRequests.some(
      (request) =>
        request.projectId === project.id &&
        request.requesterName === currentUser.name &&
        request.status === "Waiting",
    );

    if (alreadyRequested) {
      setMessage(`You already sent a teammate request for ${project.title}.`);
      return;
    }

    const nextRequest = {
      id: Date.now(),
      projectId: project.id,
      projectTitle: project.title,
      projectType: project.type,
      projectOwner: project.owner,
      requesterName: currentUser.name,
      status: "Waiting",
      requestedDate: "26 Apr 2026",
      note: `I would like to contribute to ${project.title} with ${currentUser.skills?.join(", ") || "my skills"}.`,
    };

    setTeamRequests([nextRequest, ...teamRequests]);
    setMessage(`Teammate request sent to ${project.owner} for ${project.title}.`);
  }

  function handleTeamRequestDecision(id, nextStatus) {
    setTeamRequests(
      teamRequests.map((request) => (request.id === id ? { ...request, status: nextStatus } : request)),
    );
    setMessage(`Teammate request ${nextStatus.toLowerCase()}.`);
  }

  function handleRemoveProject(id) {
    const projectToRemove = projects.find((project) => project.id === id);
    const remainingProjects = projects.filter((project) => project.id !== id);

    setProjects(remainingProjects);

    if (selectedProjectId === id) {
      setSelectedProjectId(remainingProjects[0]?.id || null);
    }

    if (projectToRemove) {
      setMessage(`Project "${projectToRemove.title}" removed.`);
    }
  }

  function toggleAdvisorAccount(id) {
    setAdvisorAccounts(
      advisorAccounts.map((advisor) =>
        advisor.id === id
          ? { ...advisor, status: advisor.status === "Active" ? "Inactive" : "Active" }
          : advisor,
      ),
    );
  }

  function handleAdminAdvisorSave(id, profileUpdates) {
    const previousAdvisor =
      advisorProfiles.find((advisor) => advisor.id === id) ||
      advisorAccounts.find((advisor) => advisor.id === id);

    if (!previousAdvisor) return;

    const nextExpertiseAreas = normalizeCommaSeparatedList(profileUpdates.expertiseAreas);
    const nextResearchInterests = normalizeCommaSeparatedList(profileUpdates.researchInterests);
    const nextSupervisedProjects = normalizeCommaSeparatedList(profileUpdates.supervisedProjects);
    const nextStatus = profileUpdates.status || (profileUpdates.available ? "Active" : "Inactive");
    const nextAvailable = nextStatus === "Active";

    const updatedAdvisorProfile = {
      ...previousAdvisor,
      ...profileUpdates,
      name: profileUpdates.name || previousAdvisor.name,
      email: profileUpdates.email || previousAdvisor.email,
      department: profileUpdates.department || previousAdvisor.department,
      title: profileUpdates.title || previousAdvisor.title,
      expertiseAreas: nextExpertiseAreas,
      researchInterests: nextResearchInterests,
      supervisedProjects: nextSupervisedProjects,
      available: nextAvailable,
    };

    setAdvisorProfiles(
      advisorProfiles.map((advisor) => (advisor.id === id ? updatedAdvisorProfile : advisor)),
    );
    setAdvisorAccounts(
      advisorAccounts.map((advisor) =>
        advisor.id === id
          ? {
              ...advisor,
              name: updatedAdvisorProfile.name,
              department: updatedAdvisorProfile.department,
              status: nextStatus,
            }
          : advisor,
      ),
    );
    setAdvisors(
      advisors.map((advisor) =>
        advisor.id === id
          ? {
              ...advisor,
              name: updatedAdvisorProfile.name,
              department: updatedAdvisorProfile.department,
              expertise: nextExpertiseAreas[0] || advisor.expertise,
              expertiseAreas: nextExpertiseAreas,
              researchInterests: nextResearchInterests,
              supervisedProjects: nextSupervisedProjects,
              available: nextAvailable,
            }
          : advisor,
      ),
    );
    setProjects(
      projects.map((project) =>
        project.advisor === previousAdvisor.name ? { ...project, advisor: updatedAdvisorProfile.name } : project,
      ),
    );
    setRequests(
      requests.map((request) =>
        request.advisorPreference === previousAdvisor.name
          ? { ...request, advisorPreference: updatedAdvisorProfile.name }
          : request,
      ),
    );

    if (currentUser?.role === "advisor" && currentUser.email === updatedAdvisorProfile.email) {
      setCurrentUser(updatedAdvisorProfile);
    }

    setMessage(`Advisor profile updated for ${updatedAdvisorProfile.name}.`);
  }

  function handleAdminAddAdvisor(profileUpdates) {
    const normalizedEmail = profileUpdates.email.trim().toLowerCase();

    if (!normalizedEmail) {
      setMessage("Advisor email is required.");
      return;
    }

    const emailExists =
      advisorProfiles.some((advisor) => advisor.email.toLowerCase() === normalizedEmail) ||
      staffAccounts.some((account) => account.email.toLowerCase() === normalizedEmail);

    if (emailExists) {
      setMessage("An advisor with this email already exists.");
      return;
    }

    const nextId = Date.now();
    const available = profileUpdates.status !== "Inactive";
    const nextAdvisorProfile = {
      id: nextId,
      email: normalizedEmail,
      password: "123456",
      role: "advisor",
      name: profileUpdates.name || "New Advisor",
      department: profileUpdates.department || "Software Engineering",
      title: profileUpdates.title || "Professor",
      expertiseAreas: normalizeCommaSeparatedList(profileUpdates.expertiseAreas),
      researchInterests: normalizeCommaSeparatedList(profileUpdates.researchInterests),
      supervisedProjects: normalizeCommaSeparatedList(profileUpdates.supervisedProjects),
      available,
    };

    setAdvisorProfiles([nextAdvisorProfile, ...advisorProfiles]);
    setAdvisorAccounts([
      {
        id: nextId,
        name: nextAdvisorProfile.name,
        department: nextAdvisorProfile.department,
        status: available ? "Active" : "Inactive",
      },
      ...advisorAccounts,
    ]);
    setAdvisors([
      {
        id: nextId,
        name: nextAdvisorProfile.name,
        expertise: nextAdvisorProfile.expertiseAreas[0] || "General Advising",
        department: nextAdvisorProfile.department,
        available,
        expertiseAreas: nextAdvisorProfile.expertiseAreas,
        researchInterests: nextAdvisorProfile.researchInterests,
        supervisedProjects: nextAdvisorProfile.supervisedProjects,
      },
      ...advisors,
    ]);
    setMessage(`Advisor "${nextAdvisorProfile.name}" added successfully.`);
  }

  function toggleAdvisorAvailability(id) {
    const toggledAdvisor = advisors.find((advisor) => advisor.id === id);

    setAdvisors(
      advisors.map((advisor) =>
        advisor.id === id ? { ...advisor, available: !advisor.available } : advisor,
      ),
    );

    if (toggledAdvisor) {
      setAdvisorProfiles(
        advisorProfiles.map((advisor) =>
          advisor.name === toggledAdvisor.name ? { ...advisor, available: !advisor.available } : advisor,
        ),
      );

      if (currentUser?.role === "advisor" && currentUser.name === toggledAdvisor.name) {
        setCurrentUser({ ...currentUser, available: !toggledAdvisor.available });
      }
    }
  }

  return (
    <div className="app-shell">
      <div className="workspace-stage">
      {loggedIn ? (
        <div className="dashboard">
          <aside className="sidebar">
            <div className="brand">PMS</div>
            <nav>
              {menu.map((item) => (
                <button
                  key={item}
                  className={`nav-item ${view === item ? "selected" : ""}`}
                  onClick={() => setView(item)}
                >
                  {item}
                </button>
              ))}
              <button className="nav-item" onClick={handleLogout}>
                Logout
              </button>
            </nav>
          </aside>

          <main className="content">
            <header className="topbar">
              <div className="search-box">
                <input value={searchText} onChange={(event) => setSearchText(event.target.value)} placeholder="Search..." />
              </div>
              <div className="topbar-actions">
                <button className="icon-btn" type="button" onClick={() => setMessage("You have 3 important announcements to review.")}>
                  🔔
                </button>
                <div className="profile-pill">
                  <div className="avatar">{initialsForName(currentUser?.name || profileNameForRole(role))}</div>
                  <span>{currentUser?.name || profileNameForRole(role)}</span>
                </div>
              </div>
            </header>

            <div className="status-banner">{message}</div>

            <div className="view-area">
              {role === "student" && (
                <StudentPages
                  view={view}
                  announcements={announcements}
                  projects={studentProjects}
                  discoverProjects={discoverProjects}
                  advisors={filteredAdvisors}
                  selectedProject={selectedStudentProject}
                  selectedDiscoverProject={selectedDiscoverProject}
                  onSelectProject={setSelectedProjectId}
                  onApplyToProject={handleApplyToProject}
                  onAdvisorRequest={handleAdvisorRequest}
                  onProjectFormChange={setProjectForm}
                  projectForm={projectForm}
                  onCreateProject={handleCreateProject}
                  currentUser={currentUser}
                  incomingRequests={studentIncomingRequests}
                  selectedTeamRequest={selectedTeamRequest}
                  onSelectTeamRequest={setSelectedTeamRequestId}
                  onTeamRequestDecision={handleTeamRequestDecision}
                  selectedAdvisorId={selectedAdvisorId}
                  onSelectAdvisor={setSelectedAdvisorId}
                  onStudentProfileSave={handleStudentProfileSave}
                  studentDirectory={studentDirectory}
                />
              )}

              {role === "advisor" && (
                <AdvisorPages
                  view={view}
                  announcements={announcements}
                  projects={advisorProjects}
                  requests={advisorRequests}
                  selectedRequestId={selectedRequestId}
                  onSelectRequest={setSelectedRequestId}
                  onRequestDecision={handleRequestDecision}
                  selectedProject={selectedAdvisorProject}
                  onSelectProject={setSelectedProjectId}
                  onRemoveProject={handleRemoveProject}
                  onAdvisorProfileSave={handleAdvisorProfileSave}
                  currentUser={currentUser}
                />
              )}

              {role === "admin" && (
                <AdminPages
                  view={view}
                  announcements={announcements}
                  students={studentDirectory}
                  advisors={advisorAccounts}
                  advisorProfiles={advisorProfiles}
                  projects={filteredProjects}
                  announcementForm={announcementForm}
                  onAnnouncementFormChange={setAnnouncementForm}
                  onPublishAnnouncement={handlePublishAnnouncement}
                  onToggleAdvisorAccount={toggleAdvisorAccount}
                  onToggleAdvisorAvailability={toggleAdvisorAvailability}
                  advisorDirectory={advisors}
                  selectedProject={selectedProject}
                  onSelectProject={setSelectedProjectId}
                  onAddStudent={handleAdminAddStudent}
                  onSaveStudent={handleAdminStudentSave}
                  onAddAdvisor={handleAdminAddAdvisor}
                  onSaveAdvisor={handleAdminAdvisorSave}
                  currentUser={currentUser}
                />
              )}
            </div>
          </main>
        </div>
      ) : (
        <AuthScreen
          loginForm={loginForm}
          onLoginFormChange={setLoginForm}
          onLogin={handleLogin}
        />
      )}
      </div>
    </div>
  );
}

function StudentPages({
  view,
  announcements,
  projects,
  discoverProjects,
  advisors,
  selectedProject,
  selectedDiscoverProject,
  onSelectProject,
  onApplyToProject,
  onAdvisorRequest,
  projectForm,
  onProjectFormChange,
  onCreateProject,
  currentUser,
  incomingRequests,
  selectedTeamRequest,
  onSelectTeamRequest,
  onTeamRequestDecision,
  selectedAdvisorId,
  onSelectAdvisor,
  onStudentProfileSave,
  studentDirectory,
}) {
  if (view === "My Projects") {
    return (
      <>
        <SectionTitle title="My Projects" subtitle="Browse project cards and open project details." />
        <ProjectGrid items={projects} onSelectProject={onSelectProject} onApplyToProject={onApplyToProject} />
        <ProjectDetailsCard project={selectedProject} />
        <IncomingTeammateRequests
          items={incomingRequests}
          selectedRequest={selectedTeamRequest}
          onSelectRequest={onSelectTeamRequest}
          onDecision={onTeamRequestDecision}
          studentDirectory={studentDirectory}
        />
      </>
    );
  }

  if (view === "Create Project") {
    return (
      <form className="card form-card create-form-card" onSubmit={onCreateProject}>
        <SectionTitle title="Create Project" subtitle="Publishing a new project updates the My Projects list." />
        <div className="form-grid">
          <InputField label="Project Title" value={projectForm.title} onChange={(value) => onProjectFormChange({ ...projectForm, title: value })} placeholder="AI-Based Smart Agriculture System" span />
          <InputField label="Description" value={projectForm.description} onChange={(value) => onProjectFormChange({ ...projectForm, description: value })} placeholder="Briefly explain your project idea and goals." span textarea />
          <SelectField label="Field" value={projectForm.field} onChange={(value) => onProjectFormChange({ ...projectForm, field: value })} options={["Software Engineering", "Computer Engineering"]} />
          <SelectField label="Type" value={projectForm.type} onChange={(value) => onProjectFormChange({ ...projectForm, type: value })} options={["Course Project", "TUBITAK", "Teknofest"]} />
          <SelectField label="Advisor" value={projectForm.advisor} onChange={(value) => onProjectFormChange({ ...projectForm, advisor: value })} options={["Not assigned", "Prof. Selin Yuce", "Prof. Duygu Dogan"]} />
          <InputField label="Team Members" value={projectForm.teamMembers} onChange={(value) => onProjectFormChange({ ...projectForm, teamMembers: value })} placeholder="4" />
          <InputField label="Required Skills" value={projectForm.skills} onChange={(value) => onProjectFormChange({ ...projectForm, skills: value })} placeholder="React, Node.js, UI/UX" span />
        </div>
        <div className="actions">
          <button className="primary-btn" type="submit">
            Create Project
          </button>
        </div>
      </form>
    );
  }

  if (view === "Find Advisor") {
    const selectedAdvisor = advisors.find((advisor) => advisor.id === selectedAdvisorId) || null;

    return (
      <div className="card panel-card">
        <SectionTitle title="Find Advisor" subtitle="Search the list and send advisor requests." />
        {selectedAdvisor ? <AdvisorProfileModal advisor={selectedAdvisor} onClose={() => onSelectAdvisor(null)} /> : null}
        <div className="advisor-list">
          {advisors.map((advisor) => (
            <div className="advisor-row advisor-request-row" key={advisor.id}>
              <div className="avatar large">{advisor.name.slice(0, 2)}</div>
              <div className="advisor-meta">
                <div className="advisor-name">{advisor.name}</div>
                <div className="muted">
                  {advisor.expertise} • {advisor.department}
                </div>
              </div>
              <span className={`badge ${advisor.available ? "green" : "amber"}`}>
                {advisor.available ? "Available" : "Busy"}
              </span>
              <div className="advisor-request-actions">
                <button className="ghost-btn" type="button" onClick={() => onSelectAdvisor(advisor.id)}>
                  View Profile
                </button>
                <button className="primary-btn" type="button" onClick={() => onAdvisorRequest(advisor.name)}>
                  Send Request
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (view === "Profile") {
    return <EditableStudentProfile currentUser={currentUser} onSave={onStudentProfileSave} />;
  }

  return (
    <>
      <StatsRow items={[["Total Projects", "4"], ["Pending Requests", "2"], ["Approved Projects", "3"], ["Rejected Projects", "1"]]} />
      <AnnouncementPanel items={announcements} />
      <SectionTitle title="Open Projects" subtitle="Browse other student projects and send a teammate request." />
      <ProjectGrid items={discoverProjects} onSelectProject={onSelectProject} onApplyToProject={onApplyToProject} />
      <ProjectDetailsCard project={selectedDiscoverProject} showOwnerProfile studentDirectory={studentDirectory} />
    </>
  );
}

function AdvisorPages({
  view,
  announcements,
  projects,
  requests,
  selectedRequestId,
  onSelectRequest,
  onRequestDecision,
  selectedProject,
  onSelectProject,
  onRemoveProject,
  onAdvisorProfileSave,
  currentUser,
}) {
  if (view === "My Projects") {
    return (
      <>
        <SectionTitle title="My Projects" subtitle="Here you can view the projects you've accepted." />
        <ProjectGrid items={projects} onSelectProject={onSelectProject} compact hideStatus onRemoveProject={onRemoveProject} />
        <ProjectDetailsCard project={selectedProject} />
      </>
    );
  }

  if (view === "Incoming Requests") {
    return (
      <>
        <div className="card table-card">
          <SectionTitle title="Incoming Requests" subtitle="Accept, reject, or open the project details before making your decision." />
          <table className="data-table">
            <thead>
              <tr>
                <th>Student</th>
                <th>Project</th>
                <th>Type</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((request) => (
                <React.Fragment key={request.id}>
                  <tr className={request.id === selectedRequestId ? "selected-request-row" : ""}>
                    <td>{request.student}</td>
                    <td>{request.project}</td>
                    <td>{request.type}</td>
                    <td>{request.status}</td>
                    <td className="table-actions request-action-cell">
                      <button className="primary-btn small" type="button" onClick={() => onRequestDecision(request.id, "Accepted")}>
                        Accept
                      </button>
                      <button className="danger-btn small-danger-btn" type="button" onClick={() => onRequestDecision(request.id, "Rejected")}>
                        Reject
                      </button>
                      <button className="ghost-btn small-ghost-btn" type="button" onClick={() => onSelectRequest(request.id)}>
                        View Details
                      </button>
                    </td>
                  </tr>

                  {request.id === selectedRequestId && (
                    <tr className="request-details-row">
                      <td colSpan="5">
                        <div className="inline-request-details">
                          <div className="detail-stack">
                            <div className="detail-overview">
                              <strong>{request.project}</strong>
                              <p>{request.description}</p>
                            </div>

                            <div className="detail-inline">
                              <span className="badge blue">{request.type}</span>
                              <span className={`badge ${request.status === "Accepted" ? "green" : request.status === "Rejected" ? "red" : "amber"}`}>
                                {request.status}
                              </span>
                              <span className="badge sand">{request.projectField}</span>
                            </div>

                            <div className="request-detail-grid">
                              <div className="detail-block">
                                <strong>Project Objective</strong>
                                <p>{request.objective}</p>
                              </div>

                              <div className="detail-block detail-cardlet">
                                <strong>Student</strong>
                                <p>{request.student}</p>
                                <strong>Department / Year</strong>
                                <p>{request.department} / {request.year}</p>
                                <strong>Requested Advisor</strong>
                                <p>{request.advisorPreference}</p>
                                <strong>Requested On</strong>
                                <p>{request.requestedDate}</p>
                              </div>
                            </div>

                            <div className="request-detail-grid">
                              <div className="detail-block">
                                <strong>Expected Deliverables</strong>
                                <div className="request-deliverable-list">
                                  {request.deliverables.map((item) => (
                                    <div className="request-deliverable-item" key={item}>
                                      {item}
                                    </div>
                                  ))}
                                </div>
                              </div>

                              <div className="detail-block detail-cardlet">
                                <strong>Team Size</strong>
                                <p>{request.teamMembers} students</p>
                                <strong>Planned Duration</strong>
                                <p>{request.expectedDuration}</p>
                              </div>
                            </div>

                            <div className="detail-block">
                              <strong>Required Skills</strong>
                              <div className="tag-list">
                                {request.requiredSkills.map((skill) => (
                                  <span className="tag" key={skill}>
                                    {skill}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </>
    );
  }

  if (view === "Profile") {
    return <EditableAdvisorProfile currentUser={currentUser} onSave={onAdvisorProfileSave} />;
  }

  return (
    <>
      <StatsRow items={[["Total Students", "24"], ["Incoming Requests", "6"], ["Accepted Projects", "4"]]} />
      <AnnouncementPanel items={announcements} />
      <ProjectDetailsCard project={selectedProject} />
    </>
  );
}

function AdminPages({
  view,
  announcements,
  students,
  advisors,
  advisorProfiles,
  projects,
  announcementForm,
  onAnnouncementFormChange,
  onPublishAnnouncement,
  onToggleAdvisorAccount,
  onToggleAdvisorAvailability,
  advisorDirectory,
  selectedProject,
  onSelectProject,
  onAddStudent,
  onSaveStudent,
  onAddAdvisor,
  onSaveAdvisor,
}) {
  if (view === "Manage Students") {
    return <AdminStudentsPanel students={students} onAddStudent={onAddStudent} onSaveStudent={onSaveStudent} />;
  }

  if (view === "Manage Advisors") {
    return (
      <AdminAdvisorsPanel
        advisors={advisors}
        advisorProfiles={advisorProfiles}
        advisorDirectory={advisorDirectory}
        onAddAdvisor={onAddAdvisor}
        onSaveAdvisor={onSaveAdvisor}
      />
    );
  }

  if (view === "Create Announcement") {
    return (
      <form className="card form-card create-form-card" onSubmit={onPublishAnnouncement}>
        <SectionTitle title="Create Announcement" subtitle="Publishing adds a new announcement to the dashboard." />
        <div className="form-grid">
          <InputField label="Title" value={announcementForm.title} onChange={(value) => onAnnouncementFormChange({ ...announcementForm, title: value })} placeholder="Course Project Group Formation Deadline" span />
          <SelectField label="Category" value={announcementForm.category} onChange={(value) => onAnnouncementFormChange({ ...announcementForm, category: value })} options={["Course Project", "TUBITAK", "Teknofest"]} span />
          <InputField label="Announcement" value={announcementForm.body} onChange={(value) => onAnnouncementFormChange({ ...announcementForm, body: value })} placeholder="Write the announcement details..." span textarea />
        </div>
        <div className="actions">
          <button className="primary-btn" type="submit">
            Publish
          </button>
        </div>
      </form>
    );
  }

  return (
    <>
      <StatsRow items={[["Total Students", "140"], ["Total Advisors", "18"], ["Total Projects", `${projects.length}`]]} />
      <AnnouncementPanel items={announcements} />
      <ProjectDetailsCard project={selectedProject} />
    </>
  );
}

function AdminStudentsPanel({ students, onAddStudent, onSaveStudent }) {
  const [selectedStudentEmail, setSelectedStudentEmail] = useState(students[0]?.email || null);
  const [editingStudentEmail, setEditingStudentEmail] = useState(null);
  const [showAddStudent, setShowAddStudent] = useState(false);
  const [addForm, setAddForm] = useState(() => buildStudentProfileForm(null));

  React.useEffect(() => {
    if (!students.length) {
      setSelectedStudentEmail(null);
      setEditingStudentEmail(null);
      return;
    }

    if (!students.some((student) => student.email === selectedStudentEmail)) {
      setSelectedStudentEmail(students[0].email);
    }

    if (editingStudentEmail && !students.some((student) => student.email === editingStudentEmail)) {
      setEditingStudentEmail(null);
    }
  }, [students, selectedStudentEmail, editingStudentEmail]);

  const selectedStudent = students.find((student) => student.email === selectedStudentEmail) || null;
  const editingStudent = students.find((student) => student.email === editingStudentEmail) || null;

  function updateAddField(key, value) {
    setAddForm((previous) => ({ ...previous, [key]: value }));
  }

  function handleAddSubmit(event) {
    event.preventDefault();
    onAddStudent(addForm);
    setAddForm(buildStudentProfileForm(null));
    setShowAddStudent(false);
  }

  return (
    <>
      <div className="card table-card">
        <SectionTitle title="Manage Students" subtitle="Review student accounts and open profile details." />
        <div className="toolbar admin-student-toolbar">
          <input placeholder="Search" />
          <select defaultValue="Department">
            <option>Department</option>
          </select>
          <select defaultValue="Year">
            <option>Year</option>
          </select>
          <button className="primary-btn" type="button" onClick={() => setShowAddStudent((value) => !value)}>
            {showAddStudent ? "Close Add Student" : "Add Student"}
          </button>
        </div>
        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Department</th>
              <th>Year</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.email}>
                <td>{student.name}</td>
                <td>{student.department}</td>
                <td>{student.year}</td>
                <td className="table-actions">
                  <button
                    className="ghost-btn small-ghost-btn"
                    type="button"
                    onClick={() => {
                      setSelectedStudentEmail(student.email);
                      setEditingStudentEmail(null);
                    }}
                  >
                    View Profile
                  </button>
                  <button
                    className="primary-btn small"
                    type="button"
                    onClick={() => {
                      setEditingStudentEmail(student.email);
                      setSelectedStudentEmail(student.email);
                    }}
                  >
                    Edit Profile
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showAddStudent ? (
        <form className="card form-card" onSubmit={handleAddSubmit}>
          <div className="profile-editor-header">
            <SectionTitle title="Add Student" subtitle="Create a new student account from the admin panel." />
            <div className="profile-editor-actions">
              <button className="ghost-btn" type="button" onClick={() => setShowAddStudent(false)}>
                Cancel
              </button>
              <button className="primary-btn" type="submit">
                Add Student
              </button>
            </div>
          </div>
          <div className="profile-editor-grid">
            <InputField label="Full Name" value={addForm.name} onChange={(value) => updateAddField("name", value)} placeholder="Student name" />
            <InputField label="Email" value={addForm.email} onChange={(value) => updateAddField("email", value)} placeholder="student@ogr.university.edu.tr" />
            <InputField label="Department" value={addForm.department} onChange={(value) => updateAddField("department", value)} placeholder="Software Engineering" />
            <InputField label="Year" value={addForm.year} onChange={(value) => updateAddField("year", value)} placeholder="3rd Year" />
            <InputField label="Short Bio" value={addForm.shortBio} onChange={(value) => updateAddField("shortBio", value)} placeholder="Write a short bio." span textarea />
            <InputField label="GitHub" value={addForm.github} onChange={(value) => updateAddField("github", value)} placeholder="github.com/username" span />
            <InputField label="LinkedIn" value={addForm.linkedIn} onChange={(value) => updateAddField("linkedIn", value)} placeholder="linkedin.com/in/username" span />
            <InputField label="Skills" value={addForm.skills} onChange={(value) => updateAddField("skills", value)} placeholder="React, Python, UI/UX" span />
            <InputField label="Interests" value={addForm.interests} onChange={(value) => updateAddField("interests", value)} placeholder="AI, Web Development" span />
          </div>
        </form>
      ) : null}

      {selectedStudent && !editingStudent ? <StudentProfilePreviewCard student={selectedStudent} /> : null}
      {editingStudent ? (
        <AdminStudentEditForm
          key={editingStudent.email}
          student={editingStudent}
          onSave={onSaveStudent}
          onClose={() => setEditingStudentEmail(null)}
        />
      ) : null}
    </>
  );
}

function AdminAdvisorsPanel({ advisors, advisorProfiles, advisorDirectory, onAddAdvisor, onSaveAdvisor }) {
  const [showAddAdvisor, setShowAddAdvisor] = useState(false);
  const [editingAdvisorId, setEditingAdvisorId] = useState(null);
  const [addForm, setAddForm] = useState({
    name: "",
    email: "",
    department: "",
    title: "Professor",
    expertiseAreas: "",
    researchInterests: "",
    supervisedProjects: "",
    status: "Active",
  });

  const editingAdvisor = advisorProfiles.find((advisor) => advisor.id === editingAdvisorId) || null;
  const advisorDirectoryEntry = advisorDirectory.find((advisor) => advisor.id === editingAdvisorId) || null;

  function updateAddField(key, value) {
    setAddForm((previous) => ({ ...previous, [key]: value }));
  }

  function handleAddSubmit(event) {
    event.preventDefault();
    onAddAdvisor(addForm);
    setAddForm({
      name: "",
      email: "",
      department: "",
      title: "Professor",
      expertiseAreas: "",
      researchInterests: "",
      supervisedProjects: "",
      status: "Active",
    });
    setShowAddAdvisor(false);
  }

  return (
    <>
      <div className="card table-card">
        <SectionTitle title="Manage Advisors" subtitle="Manage advisor accounts and update their status." />
        <div className="toolbar admin-student-toolbar">
          <input placeholder="Search" />
          <select defaultValue="Department">
            <option>Department</option>
          </select>
          <select defaultValue="Status">
            <option>Status</option>
          </select>
          <button className="primary-btn" type="button" onClick={() => setShowAddAdvisor((value) => !value)}>
            {showAddAdvisor ? "Close Add Advisor" : "Add Advisor"}
          </button>
        </div>
        <table className="data-table">
          <thead>
            <tr>
              <th>Advisor Name</th>
              <th>Department</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {advisors.map((advisor) => (
              <tr key={advisor.id}>
                <td>{advisor.name}</td>
                <td>{advisor.department}</td>
                <td>{advisor.status}</td>
                <td>
                  <button className="primary-btn small" type="button" onClick={() => setEditingAdvisorId(advisor.id)}>
                    Edit Profile
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showAddAdvisor ? (
        <form className="card form-card" onSubmit={handleAddSubmit}>
          <div className="profile-editor-header">
            <SectionTitle title="Add Advisor" subtitle="Create a new advisor account from the admin panel." />
            <div className="profile-editor-actions">
              <button className="ghost-btn" type="button" onClick={() => setShowAddAdvisor(false)}>
                Cancel
              </button>
              <button className="primary-btn" type="submit">
                Add Advisor
              </button>
            </div>
          </div>
          <div className="profile-editor-grid">
            <InputField label="Full Name" value={addForm.name} onChange={(value) => updateAddField("name", value)} placeholder="Advisor name" />
            <InputField label="Email" value={addForm.email} onChange={(value) => updateAddField("email", value)} placeholder="advisor@university.edu.tr" />
            <InputField label="Department" value={addForm.department} onChange={(value) => updateAddField("department", value)} placeholder="Software Engineering" />
            <InputField label="Academic Title" value={addForm.title} onChange={(value) => updateAddField("title", value)} placeholder="Professor" />
            <InputField label="Areas of Expertise" value={addForm.expertiseAreas} onChange={(value) => updateAddField("expertiseAreas", value)} placeholder="Machine Learning, Python" span />
            <InputField label="Research Interests" value={addForm.researchInterests} onChange={(value) => updateAddField("researchInterests", value)} placeholder="NLP, Computer Vision" span />
            <InputField label="Previously Supervised Project Types" value={addForm.supervisedProjects} onChange={(value) => updateAddField("supervisedProjects", value)} placeholder="AI Chatbot Systems, Image Processing Projects" span textarea />
            <div className="field span-2">
              <label>Status</label>
              <select value={addForm.status} onChange={(event) => updateAddField("status", event.target.value)}>
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </div>
          </div>
        </form>
      ) : null}

      {editingAdvisor ? (
        <AdminAdvisorEditForm
          advisor={editingAdvisor}
          directoryAdvisor={advisorDirectoryEntry}
          onSave={onSaveAdvisor}
          onClose={() => setEditingAdvisorId(null)}
        />
      ) : null}
    </>
  );
}

function AuthScreen({ loginForm, onLoginFormChange, onLogin }) {
  return (
    <div className="login-page">
      <section className="welcome-panel">
        <div>
          <p className="eyebrow">Project Matching Platform</p>
          <h1>Single Sign-In</h1>
          <p>
            Sign in from a single page. The system identifies whether you are a student, advisor, or admin from your email address.
          </p>
        </div>
      </section>
      <section className="form-panel">
        <div className="card login-card auth-card">
          <h2>Sign In</h2>
          <div className="field">
            <label>Email</label>
            <input
              placeholder="name@university.edu.tr"
              value={loginForm.email}
              onChange={(event) => onLoginFormChange({ ...loginForm, email: event.target.value })}
            />
          </div>
          <div className="field">
            <label>Password</label>
            <input
              type="password"
              placeholder="********"
              value={loginForm.password}
              onChange={(event) => onLoginFormChange({ ...loginForm, password: event.target.value })}
            />
          </div>
          <button className="primary-btn auth-submit" type="button" onClick={onLogin}>
            Sign In
          </button>
          <p className="auth-hint">
            Demo accounts: sevinc.yigit@ogr.university.edu.tr, firdevs.su@ogr.university.edu.tr, sila.korklubasoglu@university.edu.tr, admin@university.edu.tr
          </p>
          <p className="auth-hint">All demo accounts use the password: 123456</p>
        </div>
      </section>
    </div>
  );
}

function AnnouncementPanel({ items }) {
  return (
    <div className="card panel-card">
      <SectionTitle title="Announcements" subtitle="Important deadlines and updates for the platform." />
      <div className="announcement-list">
        {items.map((item) => (
          <div className="announcement-item" key={item.id}>
            <div>
              <div className="announcement-title">{item.title}</div>
              <p>{item.body}</p>
            </div>
            <span className={`badge ${item.tone}`}>{item.tag}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProjectGrid({ items, onSelectProject, onApplyToProject, compact = false, hideStatus = false, onRemoveProject = null }) {
  const palette = ["mint", "sand", "rose", "sky", "peach", "lilac"];
  return (
    <div className={`project-grid ${compact ? "compact-grid" : ""}`}>
      {items.map((project, index) => (
        <div className={`project-card tone-${palette[index % palette.length]}`} key={project.id}>
          <div className="project-header">
            <h3>{project.title}</h3>
            <span className="badge blue">{project.type}</span>
          </div>
          <p className="muted">{project.owner}</p>
          <div className="project-footer">
            {!hideStatus ? <span className="muted">{project.status}</span> : <span />}
            <div className="inline-actions">
              <button className="ghost-btn" type="button" onClick={() => onSelectProject(project.id)}>
                {compact ? "View Project" : "View Details"}
              </button>
              {compact && onRemoveProject ? (
                <button className="danger-btn small" type="button" onClick={() => onRemoveProject(project.id)}>
                  Remove Project
                </button>
              ) : null}
              {!compact && (
                <button className="primary-btn small" type="button" onClick={() => onApplyToProject(project)}>
                  Apply
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function ProjectDetailsCard({ project, showOwnerProfile = false, studentDirectory = [] }) {
  if (!project) return null;

  return (
    <div className="card details-card">
      <SectionTitle title="Project Details" subtitle="Selected project preview card." />
      <div className="detail-stack">
        <div className="detail-overview">
          <strong>{project.title}</strong>
          <p>{project.description}</p>
        </div>
        <div className="detail-inline">
          <span className="badge blue">{project.type}</span>
          <span className="badge green">{project.status}</span>
        </div>
        <div className="detail-grid">
          <div className="detail-block">
            <strong>Required Skills</strong>
            <div className="tag-list">
              {project.requiredSkills.map((skill) => (
              <span className="tag" key={skill}>
                  {skill}
                </span>
              ))}
            </div>
            {project.interests?.length ? (
              <>
                <strong className="detail-subtitle">Interests</strong>
                <div className="tag-list">
                  {project.interests.map((interest) => (
                    <span className="tag soft" key={interest}>
                      {interest}
                    </span>
                  ))}
                </div>
              </>
            ) : null}
          </div>
          <div className="detail-block detail-cardlet">
            <strong>Project Owner</strong>
            <p>{project.owner}</p>
            <strong>Advisor</strong>
            <p>{project.advisor}</p>
            <strong>Team Members Needed</strong>
            <p>{project.teamMembers}</p>
          </div>
        </div>
        {showOwnerProfile ? <ProjectOwnerCard project={project} studentDirectory={studentDirectory} /> : null}
      </div>
    </div>
  );
}

function ProjectOwnerCard({ project, studentDirectory }) {
  const ownerProfile = studentDirectory.find((student) => student.name === project.owner);

  return (
    <div className="detail-block owner-card">
      <div className="owner-card-header">
        <div className="avatar large">{initialsForName(project.owner)}</div>
        <div>
          <strong>{project.owner}</strong>
          <p>{project.type} project owner</p>
        </div>
      </div>
      <div className="profile-rows compact-profile-rows">
        <div className="profile-row">
          <span>Department / Year</span>
          <strong>{ownerProfile ? `${ownerProfile.department} / ${ownerProfile.year}` : "Student project owner"}</strong>
        </div>
        <div className="profile-row">
          <span>Skills</span>
          <strong>{ownerProfile?.skills?.join(", ") || project.requiredSkills.join(", ")}</strong>
        </div>
        <div className="profile-row">
          <span>Interests</span>
          <strong>{ownerProfile?.interests?.join(", ") || project.interests?.join(", ") || "Project collaboration"}</strong>
        </div>
        <div className="profile-row">
          <span>GitHub</span>
          <strong>{ownerProfile?.github || project.ownerGithub || "github.com/project-owner"}</strong>
        </div>
        <div className="profile-row">
          <span>LinkedIn</span>
          <strong>{ownerProfile?.linkedIn || project.ownerLinkedIn || "linkedin.com/in/project-owner"}</strong>
        </div>
      </div>
    </div>
  );
}

function IncomingTeammateRequests({ items, selectedRequest, onSelectRequest, onDecision, studentDirectory }) {
  if (!items.length) {
    return (
      <div className="card panel-card">
        <SectionTitle title="Incoming Requests" subtitle="Requests from students who want to join your project." />
        <div className="empty-state">You do not have any teammate requests yet.</div>
      </div>
    );
  }

  return (
    <div className="card panel-card">
      <SectionTitle title="Incoming Requests" subtitle="Review the student profile before accepting or rejecting." />
      <div className="incoming-request-layout">
        <div className="incoming-request-list">
          {items.map((request) => (
            <button
              className={`incoming-request-item ${selectedRequest?.id === request.id ? "selected" : ""}`}
              key={request.id}
              type="button"
              onClick={() => onSelectRequest(request.id)}
            >
              <div>
                <strong>{request.requesterName}</strong>
                <p>{request.projectTitle}</p>
              </div>
              <span className={`badge ${request.status === "Accepted" ? "green" : request.status === "Rejected" ? "red" : "amber"}`}>
                {request.status}
              </span>
            </button>
          ))}
        </div>
        {selectedRequest ? <TeammateRequestProfileCard request={selectedRequest} onDecision={onDecision} studentDirectory={studentDirectory} /> : null}
      </div>
    </div>
  );
}

function AdvisorProfileModal({ advisor, onClose }) {
  return (
    <div className="advisor-profile-overlay">
      <div className="advisor-profile-card">
        <div className="advisor-profile-topbar">
          <div>
            <p className="eyebrow muted-eyebrow">View Profile</p>
            <h3>Advisor Profile</h3>
          </div>
          <button className="icon-btn close-btn" type="button" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="advisor-profile-header">
          <div className="avatar profile-avatar">{initialsForName(advisor.name)}</div>
          <div>
            <strong>{advisor.name}</strong>
            <p>{advisor.department}</p>
          </div>
        </div>

        <div className="profile-rows compact-profile-rows advisor-profile-rows">
          <div className="profile-row">
            <span>Department</span>
            <strong>{advisor.department}</strong>
          </div>
          <div className="profile-row">
            <span>Areas of Expertise</span>
            <strong className="inline-tag-wrap">
              {advisor.expertiseAreas.map((item) => (
                <span className="tag soft" key={item}>
                  {item}
                </span>
              ))}
            </strong>
          </div>
          <div className="profile-row">
            <span>Research Interests</span>
            <strong>{advisor.researchInterests.join(", ")}</strong>
          </div>
          <div className="profile-row">
            <span>Previously Supervised Project Types</span>
            <strong>{advisor.supervisedProjects.join(", ")}</strong>
          </div>
          <div className="profile-row">
            <span>Status</span>
            <strong>
              <span className={`badge ${advisor.available ? "green" : "amber"}`}>
                {advisor.available ? "Active" : "Busy"}
              </span>
            </strong>
          </div>
        </div>
      </div>
    </div>
  );
}

function TeammateRequestProfileCard({ request, onDecision, studentDirectory }) {
  const profile = studentDirectory.find((student) => student.name === request.requesterName);

  return (
    <div className="request-profile-card">
      <div className="request-profile-header">
        <div className="avatar profile-avatar">{initialsForName(request.requesterName)}</div>
        <div>
          <h3>{request.requesterName}</h3>
          <p>You have received a teammate request for {request.projectTitle}.</p>
        </div>
      </div>

      <div className="profile-rows compact-profile-rows">
        <div className="profile-row">
          <span>Department</span>
          <strong>{profile?.department || "Software Engineering"} {profile?.year || "3rd Year"}</strong>
        </div>
        <div className="profile-row">
          <span>Skills</span>
          <strong>{profile?.skills?.join(", ") || "React, UI/UX"}</strong>
        </div>
        <div className="profile-row">
          <span>Interests</span>
          <strong>{profile?.interests?.join(", ") || "Web Development, AI"}</strong>
        </div>
        <div className="profile-row">
          <span>GitHub</span>
          <strong>{profile?.github || "github.com/student"}</strong>
        </div>
        <div className="profile-row">
          <span>LinkedIn</span>
          <strong>{profile?.linkedIn || "linkedin.com/in/student"}</strong>
        </div>
        <div className="profile-row">
          <span>Note</span>
          <strong>{request.note}</strong>
        </div>
      </div>

      <div className="request-profile-actions">
        <button className="primary-btn" type="button" onClick={() => onDecision(request.id, "Accepted")}>
          Accept
        </button>
        <button className="danger-btn" type="button" onClick={() => onDecision(request.id, "Rejected")}>
          Reject
        </button>
      </div>
    </div>
  );
}

function EditableStudentProfile({ currentUser, onSave }) {
  const [formState, setFormState] = useState(() => buildStudentProfileForm(currentUser));
  const [isEditing, setIsEditing] = useState(false);

  React.useEffect(() => {
    setFormState(buildStudentProfileForm(currentUser));
    setIsEditing(false);
  }, [currentUser]);

  if (!currentUser) return null;

  function updateField(key, value) {
    setFormState((previous) => ({ ...previous, [key]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    onSave(formState);
    setIsEditing(false);
  }

  function handleCancel() {
    setFormState(buildStudentProfileForm(currentUser));
    setIsEditing(false);
  }

  return (
    <form className="card profile-card" onSubmit={handleSubmit}>
      <div className="profile-editor-header">
        <SectionTitle title="Profile" subtitle="Keep your short bio and links up to date for teammates and advisors." />
        <div className="profile-editor-actions">
          {isEditing ? (
            <>
              <button className="ghost-btn" type="button" onClick={handleCancel}>
                Cancel
              </button>
              <button className="primary-btn" type="submit">
                Save Changes
              </button>
            </>
          ) : (
            <button className="primary-btn" type="button" onClick={() => setIsEditing(true)}>
              Edit Profile
            </button>
          )}
        </div>
      </div>

      <div className="profile-editor-grid">
        <InputField
          label="Short Bio"
          value={formState.shortBio}
          onChange={(value) => updateField("shortBio", value)}
          placeholder="Write a short bio about yourself."
          disabled={!isEditing}
          span
          textarea
        />
        <InputField label="Full Name" value={formState.name} onChange={(value) => updateField("name", value)} placeholder="Sevinc Yigit" disabled={!isEditing} />
        <InputField label="Email" value={formState.email} onChange={(value) => updateField("email", value)} placeholder="name@ogr.university.edu.tr" disabled={!isEditing} />
        <InputField label="Department" value={formState.department} onChange={(value) => updateField("department", value)} placeholder="Software Engineering" disabled={!isEditing} />
        <InputField label="Year" value={formState.year} onChange={(value) => updateField("year", value)} placeholder="3rd Year" disabled={!isEditing} />
        <InputField label="GitHub" value={formState.github} onChange={(value) => updateField("github", value)} placeholder="github.com/username" disabled={!isEditing} span />
        <InputField label="LinkedIn" value={formState.linkedIn} onChange={(value) => updateField("linkedIn", value)} placeholder="linkedin.com/in/username" disabled={!isEditing} span />
        <InputField label="Skills" value={formState.skills} onChange={(value) => updateField("skills", value)} placeholder="React, Python, UI/UX" disabled={!isEditing} span />
        <InputField label="Interests" value={formState.interests} onChange={(value) => updateField("interests", value)} placeholder="Artificial Intelligence, Machine Learning" disabled={!isEditing} span />
      </div>
    </form>
  );
}

function EditableAdvisorProfile({ currentUser, onSave }) {
  const [formState, setFormState] = useState(() => buildAdvisorProfileForm(currentUser));
  const [isEditing, setIsEditing] = useState(false);

  React.useEffect(() => {
    setFormState(buildAdvisorProfileForm(currentUser));
    setIsEditing(false);
  }, [currentUser]);

  if (!currentUser) return null;

  function updateField(key, value) {
    setFormState((previous) => ({ ...previous, [key]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    onSave(formState);
    setIsEditing(false);
  }

  function handleCancel() {
    setFormState(buildAdvisorProfileForm(currentUser));
    setIsEditing(false);
  }

  return (
    <form className="card profile-card" onSubmit={handleSubmit}>
      <div className="profile-editor-header">
        <SectionTitle title="Advisor Profile" subtitle="View and manage your personal information." />
        <div className="profile-editor-actions">
          {isEditing ? (
            <>
              <button className="ghost-btn" type="button" onClick={handleCancel}>
                Cancel
              </button>
              <button className="primary-btn" type="submit">
                Save Changes
              </button>
            </>
          ) : (
            <button className="primary-btn" type="button" onClick={() => setIsEditing(true)}>
              Edit Profile
            </button>
          )}
        </div>
      </div>

      <div className="advisor-profile-form-grid">
        <div className="advisor-avatar-panel">
          <div className="avatar advisor-profile-avatar">{initialsForName(formState.name || currentUser.name)}</div>
          <button className="ghost-btn small-ghost-btn" type="button" onClick={() => setIsEditing(true)}>
            Edit Profile
          </button>
        </div>

        <div className="advisor-profile-fields">
          <div className="profile-editor-grid">
            <InputField label="Full Name" value={formState.name} onChange={(value) => updateField("name", value)} placeholder="Prof. Selin Yuce" disabled={!isEditing} />
            <InputField label="Email" value={formState.email} onChange={(value) => updateField("email", value)} placeholder="name@university.edu.tr" disabled={!isEditing} />
            <InputField label="Department" value={formState.department} onChange={(value) => updateField("department", value)} placeholder="Software Engineering" disabled={!isEditing} />
            <InputField label="Academic Title" value={formState.title} onChange={(value) => updateField("title", value)} placeholder="Professor" disabled={!isEditing} />
            <InputField label="Areas of Expertise" value={formState.expertiseAreas} onChange={(value) => updateField("expertiseAreas", value)} placeholder="Machine Learning, Python, UI/UX" disabled={!isEditing} span />
            <InputField label="Research Interests" value={formState.researchInterests} onChange={(value) => updateField("researchInterests", value)} placeholder="Natural Language Processing, Computer Vision" disabled={!isEditing} span />
            <InputField label="Previously Supervised Project Types" value={formState.supervisedProjects} onChange={(value) => updateField("supervisedProjects", value)} placeholder="AI-based Chatbot Systems, Image Processing Projects" disabled={!isEditing} span textarea />
          </div>

          <div className="advisor-status-row">
            <div>
              <strong>Status</strong>
              <p>{formState.available ? "Available for advising" : "Not available for advising"}</p>
            </div>
            <button
              className={`status-toggle ${formState.available ? "on" : "off"} ${isEditing ? "" : "disabled"}`}
              type="button"
              aria-pressed={formState.available}
              onClick={() => {
                if (!isEditing) return;
                updateField("available", !formState.available);
              }}
            >
              <span className="status-toggle-track">
                <span className="status-toggle-thumb" />
              </span>
              <span className="status-toggle-label">{formState.available ? "On" : "Off"}</span>
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

function StudentProfilePreviewCard({ student }) {
  return (
    <div className="card profile-card">
      <SectionTitle title="View Profile" subtitle="Student profile details visible to the admin." />
      <ProfileRows
        rows={[
          ["Short Bio", student.shortBio || "No short bio added yet."],
          ["Full Name", student.name],
          ["Email", student.email],
          ["Department / Year", `${student.department} / ${student.year}`],
          ["Skills", student.skills?.join(", ") || "-"],
          ["Interests", student.interests?.join(", ") || "-"],
          ["GitHub", student.github || "-"],
          ["LinkedIn", student.linkedIn || "-"],
        ]}
      />
    </div>
  );
}

function AdminStudentEditForm({ student, onSave, onClose }) {
  const [formState, setFormState] = useState(() => buildStudentProfileForm(student));

  function updateField(key, value) {
    setFormState((previous) => ({ ...previous, [key]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    onSave(student.email, formState);
    onClose();
  }

  return (
    <form className="card profile-card" onSubmit={handleSubmit}>
      <div className="profile-editor-header">
        <SectionTitle title="Edit Profile" subtitle="Update the selected student profile." />
        <div className="profile-editor-actions">
          <button className="ghost-btn" type="button" onClick={onClose}>
            Cancel
          </button>
          <button className="primary-btn" type="submit">
            Save Changes
          </button>
        </div>
      </div>

      <div className="profile-editor-grid">
        <InputField
          label="Short Bio"
          value={formState.shortBio}
          onChange={(value) => updateField("shortBio", value)}
          placeholder="Write a short bio about the student."
          span
          textarea
        />
        <InputField label="Full Name" value={formState.name} onChange={(value) => updateField("name", value)} placeholder="Student name" />
        <InputField label="Email" value={formState.email} onChange={(value) => updateField("email", value)} placeholder="student@ogr.university.edu.tr" />
        <InputField label="Department" value={formState.department} onChange={(value) => updateField("department", value)} placeholder="Software Engineering" />
        <InputField label="Year" value={formState.year} onChange={(value) => updateField("year", value)} placeholder="3rd Year" />
        <InputField label="GitHub" value={formState.github} onChange={(value) => updateField("github", value)} placeholder="github.com/username" span />
        <InputField label="LinkedIn" value={formState.linkedIn} onChange={(value) => updateField("linkedIn", value)} placeholder="linkedin.com/in/username" span />
        <InputField label="Skills" value={formState.skills} onChange={(value) => updateField("skills", value)} placeholder="React, Python, UI/UX" span />
        <InputField label="Interests" value={formState.interests} onChange={(value) => updateField("interests", value)} placeholder="AI, Web Development" span />
      </div>
    </form>
  );
}

function AdminAdvisorEditForm({ advisor, directoryAdvisor, onSave, onClose }) {
  const [formState, setFormState] = useState(() => ({
    name: advisor.name || "",
    email: advisor.email || "",
    department: advisor.department || "",
    title: advisor.title || "",
    expertiseAreas: (advisor.expertiseAreas || []).join(", "),
    researchInterests: (advisor.researchInterests || []).join(", "),
    supervisedProjects: (advisor.supervisedProjects || []).join(", "),
    status: advisor.available ? "Active" : "Inactive",
  }));

  function updateField(key, value) {
    setFormState((previous) => ({ ...previous, [key]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    onSave(advisor.id, formState);
    onClose();
  }

  return (
    <form className="card profile-card" onSubmit={handleSubmit}>
      <div className="profile-editor-header">
        <SectionTitle title="Manage Advisor Profile" subtitle="Update all advisor details from the admin panel." />
        <div className="profile-editor-actions">
          <button className="ghost-btn" type="button" onClick={onClose}>
            Cancel
          </button>
          <button className="primary-btn" type="submit">
            Save Changes
          </button>
        </div>
      </div>

      <div className="advisor-profile-form-grid">
        <div className="advisor-avatar-panel">
          <div className="avatar advisor-profile-avatar">{initialsForName(formState.name || advisor.name)}</div>
          <button className="ghost-btn small-ghost-btn" type="button">
            Change Photo
          </button>
        </div>

        <div className="advisor-profile-fields">
          <div className="profile-editor-grid">
            <InputField label="Full Name" value={formState.name} onChange={(value) => updateField("name", value)} placeholder="Enter the full name" />
            <InputField label="Email" value={formState.email} onChange={(value) => updateField("email", value)} placeholder="advisor@university.edu.tr" />
            <InputField label="Department" value={formState.department} onChange={(value) => updateField("department", value)} placeholder="Department" />
            <InputField label="Academic Title" value={formState.title} onChange={(value) => updateField("title", value)} placeholder="Academic Title" />
            <InputField label="Areas of Expertise" value={formState.expertiseAreas} onChange={(value) => updateField("expertiseAreas", value)} placeholder="Machine Learning, Python, Data Science" span />
            <InputField label="Research Interests" value={formState.researchInterests} onChange={(value) => updateField("researchInterests", value)} placeholder="Natural Language Processing, Computer Vision" span />
            <InputField label="Previously Supervised Project Types" value={formState.supervisedProjects} onChange={(value) => updateField("supervisedProjects", value)} placeholder="AI-based Chatbot Systems, Image Processing Projects" span textarea />
          </div>

          <div className="advisor-status-edit-grid">
            <div className="profile-row">
              <span>Directory Availability</span>
              <strong>{directoryAdvisor?.available ? "Available" : "Busy"}</strong>
            </div>
            <div className="field">
              <label>Status</label>
              <select value={formState.status} onChange={(event) => updateField("status", event.target.value)}>
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

function StatsRow({ items }) {
  return (
    <div className="stats-row">
      {items.map(([label, value]) => (
        <div className="stat-card" key={label}>
          <div className="stat-value">{value}</div>
          <div className="stat-label">{label}</div>
        </div>
      ))}
    </div>
  );
}

function ProfileRows({ rows }) {
  return (
    <div className="profile-rows">
      {rows.map(([label, value]) => (
        <div className="profile-row" key={label}>
          <span>{label}</span>
          <strong>{value}</strong>
        </div>
      ))}
    </div>
  );
}

function buildStudentProfileForm(currentUser) {
  return {
    name: currentUser?.name || "",
    email: currentUser?.email || "",
    department: currentUser?.department || "",
    year: currentUser?.year || "",
    shortBio: currentUser?.shortBio || "",
    github: currentUser?.github || "",
    linkedIn: currentUser?.linkedIn || "",
    skills: (currentUser?.skills || []).join(", "),
    interests: (currentUser?.interests || []).join(", "),
  };
}

function buildAdvisorProfileForm(currentUser) {
  return {
    name: currentUser?.name || "",
    email: currentUser?.email || "",
    department: currentUser?.department || "",
    title: currentUser?.title || "",
    expertiseAreas: (currentUser?.expertiseAreas || []).join(", "),
    researchInterests: (currentUser?.researchInterests || []).join(", "),
    supervisedProjects: (currentUser?.supervisedProjects || []).join(", "),
    available: currentUser?.available ?? true,
  };
}

function normalizeCommaSeparatedList(value) {
  if (Array.isArray(value)) return value;
  return String(value || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function InputField({ label, value, onChange, placeholder, span = false, textarea = false, disabled = false }) {
  return (
    <div className={`field ${span ? "span-2" : ""}`}>
      <label>{label}</label>
      {textarea ? (
        <textarea rows="5" value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} disabled={disabled} />
      ) : (
        <input value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} disabled={disabled} />
      )}
    </div>
  );
}

function SelectField({ label, value, onChange, options, span = false }) {
  return (
    <div className={`field ${span ? "span-2" : ""}`}>
      <label>{label}</label>
      <select value={value} onChange={(event) => onChange(event.target.value)}>
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </div>
  );
}

function SimpleToolbar() {
  return (
    <div className="toolbar">
      <input placeholder="Search" />
      <select defaultValue="Department">
        <option>Department</option>
      </select>
      <select defaultValue="Status">
        <option>Status</option>
      </select>
    </div>
  );
}

function SectionTitle({ title, subtitle }) {
  return (
    <div className="section-title">
      <h2>{title}</h2>
      <p>{subtitle}</p>
    </div>
  );
}

function labelForRole(role) {
  if (role === "advisor") return "Advisor";
  if (role === "admin") return "Admin";
  return "Student";
}

function profileNameForRole(role) {
  if (role === "advisor") return "Prof. Selin Yuce";
  if (role === "admin") return "System Admin";
  return "Sevinc Yigit";
}

function initialsForName(name) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || "")
    .join("");
}

export default App;

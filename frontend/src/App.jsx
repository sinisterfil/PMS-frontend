import React, { useEffect, useState } from "react";
import {
  applyToProject,
  clearToken,
  createAnnouncement,
  createAdvisor,
  createProject,
  createStudent,
  getAdvisorById,
  getAdvisorAccounts,
  getAdvisors,
  getAnnouncements,
  getMe,
  getProjectApplications,
  getProjects,
  getRequests,
  getStudentById,
  getStudents,
  hasToken,
  login,
  sendAdvisorRequest,
  storeToken,
  toggleAdvisorAvailability as toggleAdvisorAvailabilityApi,
  toggleAdvisorStatus as toggleAdvisorStatusApi,
  updateAdvisor,
  updateMe,
  updateProjectApplication,
  updateRequest,
  updateStudent,
} from "./api";

const menus = {
  student: ["Home", "My Projects", "Create Project", "Find Advisor", "Profile"],
  advisor: ["Home", "My Projects", "Incoming Requests", "Profile"],
  admin: ["Home", "Manage Students", "Manage Advisors", "Manage Projects", "Create Announcement"],
};

const adminProjectCategories = [
  { key: "ALL", label: "All Projects", deadline: "30 Nov 2026" },
  { key: "TUBITAK", label: "TUBITAK Projects", deadline: "30 Nov 2026" },
  { key: "Teknofest", label: "Teknofest Projects", deadline: "30 Oct 2026" },
  { key: "Course Project", label: "Course Projects", deadline: "30 Sep 2026" },
];

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

function splitTextList(value) {
  return String(value || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function formatYearLabel(value) {
  const raw = String(value || "").trim();
  if (!raw) return "";
  if (/year/i.test(raw)) return raw;
  if (raw === "1") return "1st Year";
  if (raw === "2") return "2nd Year";
  if (raw === "3") return "3rd Year";
  return `${raw}th Year`;
}

function normalizeYearInput(value) {
  const raw = String(value || "").trim();
  if (!raw) return "";
  const match = raw.match(/^(\d+)/);
  return match ? match[1] : raw;
}

function buildStudentRecord(student, fallback = {}) {
  return {
    id: student.id,
    email: student.email,
    role: "student",
    password: "123456",
    name: student.name,
    department: student.department || "",
    year: formatYearLabel(student.year || ""),
    shortBio: student.bio || "",
    interests: Array.isArray(student.interests) ? student.interests : [],
    skills: Array.isArray(student.skills) ? student.skills : [],
    github: student.github_link || "",
    linkedIn: student.linkedin_link || "",
  };
}

function buildAdvisorRecord(advisor, fallback = {}) {
  const profileId = advisor.instructor_profile_id || advisor.profile_id || advisor.id;
  const userId = advisor.user_id || (advisor.instructor_profile_id ? advisor.id : advisor.userId);
  const expertiseSource = advisor.expertise ?? fallback.expertiseAreas?.join(", ");
  const researchSource = advisor.research_interests ?? fallback.researchInterests?.join(", ");
  const supervisedSource = advisor.supervised_project_types ?? fallback.supervisedProjects?.join(", ");
  const expertiseAreas = Array.isArray(advisor.expertise)
    ? advisor.expertise
    : splitTextList(expertiseSource);
  const researchInterests = Array.isArray(advisor.research_interests)
    ? advisor.research_interests
    : splitTextList(researchSource);
  const supervisedProjects = Array.isArray(advisor.supervised_project_types)
    ? advisor.supervised_project_types
    : splitTextList(supervisedSource);

  return {
    id: profileId,
    userId,
    email: advisor.email ?? fallback.email ?? "",
    role: "advisor",
    password: "123456",
    name: advisor.name,
    department: advisor.department ?? fallback.department ?? "",
    title: advisor.title ?? fallback.title ?? "Professor",
    expertise: expertiseAreas[0] || fallback.expertise || "General Advising",
    expertiseAreas,
    researchInterests,
    supervisedProjects,
    available:
      advisor.available ??
      (advisor.is_available != null ? Boolean(advisor.is_available) : fallback.available ?? true),
  };
}

function enrichProjectsWithMocks(items) {
  return items.map((project) => ({
    ...project,
    requiredSkills: project.requiredSkills || [],
    interests: Array.isArray(project.interests) ? project.interests : [],
    ownerGithub: project.ownerGithub || "",
    ownerLinkedIn: project.ownerLinkedIn || "",
  }));
}

function enrichStudentsWithMocks(items) {
  return items.map((student) => {
    const fallback =
      studentProfiles.find((entry) => entry.email === student.email) ||
      studentProfiles.find((entry) => entry.name === student.name);
    return buildStudentRecord(student, fallback);
  });
}

function enrichAdvisorsWithMocks(items) {
  return items.map((advisor) => {
    const profileFallback =
      initialAdvisorProfiles.find((entry) => entry.email === advisor.email) ||
      initialAdvisorProfiles.find((entry) => entry.name === advisor.name);
    const listFallback = initialAdvisors.find((entry) => entry.name === advisor.name);
    return buildAdvisorRecord(advisor, { ...listFallback, ...profileFallback });
  });
}

function buildAdvisorAccounts(items, profiles) {
  return items.map((account) => {
    const profile = profiles.find((entry) => entry.id === account.id || entry.name === account.name);
    return {
      id: account.id,
      name: account.name,
      department: account.department || profile?.department || "",
      status: account.status || (profile?.available ? "Active" : "Inactive"),
    };
  });
}

function enrichUserFromBackend(user) {
  if (!user) return null;

  if (user.role === "student") {
    const fallback = studentProfiles.find((entry) => entry.email === user.email) || {};
    return buildStudentRecord(user, fallback);
  }

  if (user.role === "advisor") {
    const fallback =
      initialAdvisorProfiles.find((entry) => entry.email === user.email) ||
      initialAdvisors.find((entry) => entry.name === user.name) ||
      {};
    return buildAdvisorRecord(user, fallback);
  }

  return {
    id: user.id,
    role: user.role,
    name: user.name,
    email: user.email,
    department: user.department || "Project Coordination Office",
  };
}

function enrichAdvisorRequestsWithMocks(items, projects = [], currentUser = null) {
  return items.map((request) => {
    const fallback = initialRequests.find(
      (entry) => entry.student === request.student && entry.project === request.project,
    );
    const matchedProject = projects.find((project) => project.title === request.project);
    const projectDescription = matchedProject?.description || fallback?.description || request.message;
    const projectSkills = matchedProject?.requiredSkills || fallback?.requiredSkills || [];
    const projectTeamMembers = matchedProject?.teamMembers || fallback?.teamMembers || 0;

    return {
      ...fallback,
      ...request,
      projectField: fallback?.projectField || matchedProject?.type || request.type,
      description: projectDescription || "No additional description provided.",
      objective: fallback?.objective || projectDescription || "No project objective shared yet.",
      deliverables: fallback?.deliverables || [],
      teamMembers: projectTeamMembers,
      expectedDuration: fallback?.expectedDuration || "-",
      advisorPreference: currentUser?.name || fallback?.advisorPreference || "-",
      requestedDate: fallback?.requestedDate || request.created_at || "-",
      requiredSkills: projectSkills,
      year: fallback?.year || "-",
      department: fallback?.department || "-",
    };
  });
}

function buildTeamRequestsFromApplications(applicationsByProject, studentRecords) {
  return applicationsByProject.flatMap(({ project, applications }) =>
    applications.map((application) => {
      const fallback = studentRecords.find((entry) => entry.email === application.student_email);
      return {
        id: application.id,
        projectId: project.id,
        projectTitle: project.title,
        projectType: project.type,
        projectOwner: project.owner,
        requesterName: application.student_name,
        status: application.status,
        requestedDate: application.applied_at,
        note: application.note || "No note shared.",
        requesterEmail: application.student_email,
        department: application.department || fallback?.department || "",
        year: formatYearLabel(application.year_level || fallback?.year || ""),
        github: application.github_link || fallback?.github || "",
        linkedIn: application.linkedin_link || fallback?.linkedIn || "",
        skills: fallback?.skills || [],
        interests: fallback?.interests || [],
      };
    }),
  );
}

function mergeStudentDirectoryRecords(items) {
  const map = new Map();

  for (const item of items) {
    if (!item) continue;
    const key = item.email || item.name;
    if (!key) continue;

    map.set(key, {
      ...(map.get(key) || {}),
      ...item,
      skills: Array.isArray(item.skills) ? item.skills : map.get(key)?.skills || [],
      interests: Array.isArray(item.interests) ? item.interests : map.get(key)?.interests || [],
    });
  }

  return Array.from(map.values());
}

async function fetchAdvisorDirectory(search = "") {
  const advisors = await getAdvisors(search);
  const advisorDetails = await Promise.all(
    advisors.map(async (advisor) => {
      try {
        const detail = await getAdvisorById(advisor.id);
        return { ...detail, profile_id: advisor.id };
      } catch {
        return advisor;
      }
    }),
  );
  return enrichAdvisorsWithMocks(advisorDetails);
}

function App() {
  const [role, setRole] = useState("student");
  const [view, setView] = useState("Home");
  const [loggedIn, setLoggedIn] = useState(false);
  const [isHydrating, setIsHydrating] = useState(hasToken());
  const [searchText, setSearchText] = useState("");
  const [studentDirectory, setStudentDirectory] = useState([]);
  const [advisorProfiles, setAdvisorProfiles] = useState([]);
  const [projects, setProjects] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [advisors, setAdvisors] = useState([]);
  const [requests, setRequests] = useState([]);
  const [teamRequests, setTeamRequests] = useState([]);
  const [advisorAccounts, setAdvisorAccounts] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [selectedRequestId, setSelectedRequestId] = useState(null);
  const [selectedTeamRequestId, setSelectedTeamRequestId] = useState(null);
  const [selectedAdvisorId, setSelectedAdvisorId] = useState(null);
  const [message, setMessage] = useState("Enter your university email to sign in. The system will determine your role automatically.");
  const [projectForm, setProjectForm] = useState(emptyForm);
  const [announcementForm, setAnnouncementForm] = useState(announcementFormInitial);
  const [loginForm, setLoginForm] = useState(loginFormInitial);
  const [currentUser, setCurrentUser] = useState(null);
  const [projectApplicationTarget, setProjectApplicationTarget] = useState(null);
  const [projectApplicationNote, setProjectApplicationNote] = useState("");

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

  const allStudentProjects = projects.filter((project) => project.owner === currentUser?.name);
  const studentProjects = filteredProjects.filter((project) => project.owner === currentUser?.name);
  const discoverProjects = filteredProjects.filter((project) => project.owner !== currentUser?.name);
  const advisorProjects = filteredProjects.filter((project) => project.advisor === currentUser?.name);
  const advisorRequests = requests.filter((request) => request.status === "Waiting");
  const selectedStudentProject = studentProjects.find((project) => project.id === selectedProjectId) || studentProjects[0] || null;
  const selectedDiscoverProject = discoverProjects.find((project) => project.id === selectedProjectId) || discoverProjects[0] || null;
  const selectedAdvisorProject = advisorProjects.find((project) => project.id === selectedProjectId) || advisorProjects[0] || null;
  const studentIncomingRequests = teamRequests.filter(
    (request) => request.projectOwner === currentUser?.name && request.status === "Waiting",
  );
  const selectedTeamRequest =
    selectedTeamRequestId == null
      ? null
      : studentIncomingRequests.find((request) => request.id === selectedTeamRequestId) || null;

  const menu = menus[role];

  useEffect(() => {
    if (!hasToken()) {
      setIsHydrating(false);
      return;
    }

    bootstrapSession();
  }, []);

  async function bootstrapSession() {
    try {
      const me = enrichUserFromBackend(await getMe());
      setRole(me.role);
      setCurrentUser(me);
      setLoggedIn(true);
      setView("Home");
      await loadAppData(me);
      setMessage(`${labelForRole(me.role)} dashboard opened for ${me.name}.`);
    } catch (error) {
      clearToken();
      setLoggedIn(false);
      setCurrentUser(null);
      setMessage(error.message || "Session could not be restored.");
    } finally {
      setIsHydrating(false);
    }
  }

  async function loadAppData(user) {
    const [projectItems, announcementItems] = await Promise.all([
      getProjects(),
      getAnnouncements(),
    ]);

    const nextProjects = enrichProjectsWithMocks(projectItems);
    setProjects(nextProjects);
    setAnnouncements(announcementItems);
    setSelectedProjectId((previous) => {
      if (previous && nextProjects.some((project) => project.id === previous)) return previous;
      return nextProjects[0]?.id || null;
    });

    if (user.role === "student") {
      const advisorItems = await fetchAdvisorDirectory();
      setAdvisors(advisorItems);

      const ownedProjects = nextProjects.filter((project) => project.owner === user.name);
      const applicationBundles = await Promise.all(
        ownedProjects.map(async (project) => ({
          project,
          applications: await getProjectApplications(project.id).catch(() => []),
        })),
      );
      const nextTeamRequests = buildTeamRequestsFromApplications(applicationBundles, studentDirectory);
      const nextStudentDirectory = mergeStudentDirectoryRecords([
        user,
        ...nextTeamRequests.map((request) => ({
          email: request.requesterEmail,
          role: "student",
          name: request.requesterName,
          department: request.department,
          year: request.year,
          github: request.github,
          linkedIn: request.linkedIn,
          skills: request.skills,
          interests: request.interests,
        })),
      ]);
      setStudentDirectory(nextStudentDirectory);
      setTeamRequests(nextTeamRequests);
      setSelectedTeamRequestId(null);
      return;
    }

    if (user.role === "advisor") {
      const nextRequests = enrichAdvisorRequestsWithMocks(await getRequests(), nextProjects, user);
      setRequests(nextRequests);
      setSelectedRequestId(null);
      return;
    }

    if (user.role === "admin") {
      const [studentsFromApi, advisorAccountsFromApi, nextAdvisors] = await Promise.all([
        getStudents(),
        getAdvisorAccounts(),
        fetchAdvisorDirectory(),
      ]);

      const nextStudents = enrichStudentsWithMocks(studentsFromApi);

      setStudentDirectory(nextStudents);
      setAdvisors(nextAdvisors);
      setAdvisorProfiles(nextAdvisors);
      setAdvisorAccounts(buildAdvisorAccounts(advisorAccountsFromApi, nextAdvisors));
    }
  }

  function handleLogout() {
    clearToken();
    setLoggedIn(false);
    setSearchText("");
    setLoginForm(loginFormInitial);
    setCurrentUser(null);
    setSelectedTeamRequestId(null);
    setSelectedRequestId(null);
    setSelectedAdvisorId(null);
    setMessage("You are on the login screen. Sign in with your university email.");
  }

  async function handleLogin() {
    try {
      setMessage("Signing in and loading your dashboard...");
      const { token } = await login(loginForm.email.trim(), loginForm.password);
      storeToken(token);
      const me = enrichUserFromBackend(await getMe());

      setRole(me.role);
      setCurrentUser(me);
      setView("Home");
      setLoggedIn(true);
      setSelectedAdvisorId(null);
      setSelectedRequestId(null);
      await loadAppData(me);
      setMessage(`${labelForRole(me.role)} dashboard opened for ${me.name}.`);
    } catch (error) {
      clearToken();
      setMessage(error.message || "Sign in failed.");
    }
  }

  async function handleStudentProfileSave(profileUpdates) {
    if (currentUser?.role !== "student") return;

    try {
      await updateMe({
        department: profileUpdates.department,
        year_level: normalizeYearInput(profileUpdates.year),
        bio: profileUpdates.shortBio,
        github_link: profileUpdates.github,
        linkedin_link: profileUpdates.linkedIn,
        skills: normalizeCommaSeparatedList(profileUpdates.skills),
        interests: normalizeCommaSeparatedList(profileUpdates.interests),
      });
    } catch (error) {
      setMessage(error.message || "Profile could not be updated.");
      return;
    }

    const refreshedStudent = enrichUserFromBackend(await getMe());
    setCurrentUser(refreshedStudent);
    setStudentDirectory((previous) =>
      previous.map((student) => (student.email === refreshedStudent.email ? refreshedStudent : student)),
    );
    setMessage("Profile updated successfully.");
  }

  async function handleAdminStudentSave(originalEmail, profileUpdates) {
    const student = studentDirectory.find((entry) => entry.email === originalEmail);
    if (!student) return false;

    try {
      await updateStudent(student.id, {
        name: profileUpdates.name,
        department: profileUpdates.department,
        year_level: normalizeYearInput(profileUpdates.year),
        bio: profileUpdates.shortBio,
        github_link: profileUpdates.github,
        linkedin_link: profileUpdates.linkedIn,
        skills: normalizeCommaSeparatedList(profileUpdates.skills),
        interests: normalizeCommaSeparatedList(profileUpdates.interests),
      });
      const refreshedStudent = enrichStudentsWithMocks([await getStudentById(student.id)])[0];
      setStudentDirectory((previous) =>
        previous.map((entry) => (entry.id === refreshedStudent.id ? refreshedStudent : entry)),
      );
      setMessage(`Student profile updated for ${refreshedStudent.name}.`);
      return true;
    } catch (error) {
      setMessage(error.message || "Student profile could not be updated.");
      return false;
    }
  }

  async function handleAdminAddStudent(profileUpdates) {
    const normalizedEmail = profileUpdates.email.trim().toLowerCase();

    if (!normalizedEmail) {
      setMessage("Student email is required.");
      return false;
    }

    if (studentDirectory.some((student) => student.email.toLowerCase() === normalizedEmail)) {
      setMessage("A student with this email already exists.");
      return false;
    }

    try {
      const created = await createStudent({
        name: profileUpdates.name || "New Student",
        email: normalizedEmail,
        department: profileUpdates.department || "Software Engineering",
        year_level: normalizeYearInput(profileUpdates.year) || "1",
        bio: profileUpdates.shortBio || "",
        github_link: profileUpdates.github || "",
        linkedin_link: profileUpdates.linkedIn || "",
        skills: normalizeCommaSeparatedList(profileUpdates.skills),
        interests: normalizeCommaSeparatedList(profileUpdates.interests),
      });
      const nextStudent = enrichStudentsWithMocks([await getStudentById(created.id)])[0];
      setStudentDirectory((previous) => [nextStudent, ...previous]);
      setMessage(`Student "${nextStudent.name}" added successfully.`);
      return true;
    } catch (error) {
      setMessage(error.message || "Student could not be added.");
      return false;
    }
  }

  async function handleAdvisorProfileSave(profileUpdates) {
    if (currentUser?.role !== "advisor") return;

    try {
      await updateMe({
        department: profileUpdates.department,
        academic_title: profileUpdates.title,
        areas_of_expertise: profileUpdates.expertiseAreas,
        research_interests: profileUpdates.researchInterests,
        is_available: profileUpdates.available ? 1 : 0,
        supervised_project_types: normalizeCommaSeparatedList(profileUpdates.supervisedProjects),
      });
    } catch (error) {
      setMessage(error.message || "Advisor profile could not be updated.");
      return;
    }

    const refreshedAdvisor = enrichUserFromBackend(await getMe());
    setCurrentUser(refreshedAdvisor);
    setAdvisorProfiles((previous) =>
      previous.map((advisor) => (advisor.email === refreshedAdvisor.email ? refreshedAdvisor : advisor)),
    );
    setAdvisors((previous) =>
      previous.map((advisor) => (advisor.email === refreshedAdvisor.email ? refreshedAdvisor : advisor)),
    );
    setMessage("Advisor profile updated successfully.");
  }

  async function handleCreateProject(event) {
    event.preventDefault();
    try {
      const createdProject = await createProject({
        title: projectForm.title,
        description: projectForm.description,
        type: projectForm.type,
        teamMembers: projectForm.teamMembers,
        skills: projectForm.skills,
      });

      const nextProject = enrichProjectsWithMocks([createdProject])[0];
      setProjects([nextProject, ...projects]);
      setSelectedProjectId(nextProject.id);
      setProjectForm(emptyForm);
      setView("My Projects");
      setMessage(`Project "${nextProject.title}" created successfully.`);
    } catch (error) {
      setMessage(error.message || "Project could not be created.");
    }
  }

  async function handlePublishAnnouncement(event) {
    event.preventDefault();
    try {
      const nextAnnouncement = await createAnnouncement({
        title: announcementForm.title,
        body: announcementForm.body,
        category: announcementForm.category,
      });
      setAnnouncements([nextAnnouncement, ...announcements]);
      setAnnouncementForm(announcementFormInitial);
      setView("Home");
      setMessage(`Announcement "${nextAnnouncement.title}" published.`);
    } catch (error) {
      setMessage(error.message || "Announcement could not be published.");
    }
  }

  async function handleRequestDecision(id, nextStatus) {
    const requestToUpdate = requests.find((request) => request.id === id);
    try {
      await updateRequest(id, nextStatus);
      setRequests(
        requests.map((request) => (request.id === id ? { ...request, status: nextStatus } : request)),
      );
      if (nextStatus === "Accepted" && requestToUpdate) {
        setProjects((previous) =>
          previous.map((project) =>
            project.title === requestToUpdate.project
              ? {
                  ...project,
                  advisor: currentUser?.name || project.advisor,
                  status: "Advisor Assigned",
                }
              : project,
          ),
        );
      }
      setSelectedRequestId(null);
      setMessage(`Request marked as ${nextStatus.toLowerCase()}.`);
    } catch (error) {
      setMessage(error.message || "Request could not be updated.");
    }
  }

  async function handleAdvisorRequest(advisor, projectId) {
    const ownedProject =
      allStudentProjects.find((project) => project.id === projectId) ||
      allStudentProjects[0] ||
      selectedStudentProject;
    if (!ownedProject) {
      setMessage("Create a project before sending an advisor request.");
      return false;
    }

    try {
      await sendAdvisorRequest(advisor.id, ownedProject.id);
      setMessage(`Advisor request sent to ${advisor.name}.`);
      return true;
    } catch (error) {
      setMessage(error.message || "Advisor request could not be sent.");
      return false;
    }
  }

  async function submitProjectApplication(project, note = "") {
    if (!currentUser) return;

    try {
      await applyToProject(project.id, note);
      setMessage(`Teammate request sent to ${project.owner} for ${project.title}.`);
      return true;
    } catch (error) {
      setMessage(error.message || "Project application could not be sent.");
      return false;
    }
  }

  function handleApplyToProject(project) {
    setProjectApplicationTarget(project);
    setProjectApplicationNote("");
  }

  async function handleTeamRequestDecision(id, nextStatus) {
    const request = teamRequests.find((entry) => entry.id === id);
    if (!request) return;

    try {
      await updateProjectApplication(request.projectId, id, nextStatus);
      setTeamRequests(
        teamRequests.map((entry) => (entry.id === id ? { ...entry, status: nextStatus } : entry)),
      );
      setSelectedTeamRequestId(null);
      setMessage(`Teammate request ${nextStatus.toLowerCase()}.`);
    } catch (error) {
      setMessage(error.message || "Teammate request could not be updated.");
    }
  }

  function handleRemoveProject() {
    setMessage("Project removal is not connected here because the current backend only supports student-owned deletes.");
  }

  function handleAdminProjectSave() {
    setMessage("Admin project editing is not connected because the backend does not expose an admin project update endpoint.");
    return false;
  }

  async function toggleAdvisorAccount(id) {
    try {
      await toggleAdvisorStatusApi(id);
      const [advisorAccountsFromApi, nextAdvisors] = await Promise.all([
        getAdvisorAccounts(),
        fetchAdvisorDirectory(),
      ]);
      setAdvisors(nextAdvisors);
      setAdvisorProfiles(nextAdvisors);
      setAdvisorAccounts(buildAdvisorAccounts(advisorAccountsFromApi, nextAdvisors));
      setMessage("Advisor account status updated.");
    } catch (error) {
      setMessage(error.message || "Advisor account status could not be updated.");
    }
  }

  async function handleAdminAdvisorSave(id, profileUpdates) {
    const advisor = advisorProfiles.find((entry) => entry.id === id);
    if (!advisor?.userId) {
      setMessage("Advisor update is missing the backend user id.");
      return false;
    }

    try {
      await updateAdvisor(advisor.userId, {
        name: profileUpdates.name,
        department: profileUpdates.department,
        academic_title: profileUpdates.title,
        areas_of_expertise: profileUpdates.expertiseAreas,
        research_interests: profileUpdates.researchInterests,
        is_available: profileUpdates.status === "Inactive" ? 0 : 1,
        supervised_project_types: normalizeCommaSeparatedList(profileUpdates.supervisedProjects),
      });
      const [advisorAccountsFromApi, nextAdvisors] = await Promise.all([
        getAdvisorAccounts(),
        fetchAdvisorDirectory(),
      ]);
      setAdvisors(nextAdvisors);
      setAdvisorProfiles(nextAdvisors);
      setAdvisorAccounts(buildAdvisorAccounts(advisorAccountsFromApi, nextAdvisors));
      const updatedAdvisorProfile = nextAdvisors.find((advisor) => advisor.id === id);
      if (currentUser?.role === "advisor" && updatedAdvisorProfile?.email === currentUser.email) {
        setCurrentUser(updatedAdvisorProfile);
      }
      setMessage(`Advisor profile updated for ${updatedAdvisorProfile?.name || "advisor"}.`);
      return true;
    } catch (error) {
      setMessage(error.message || "Advisor profile could not be updated.");
      return false;
    }
  }

  async function handleAdminAddAdvisor(profileUpdates) {
    const normalizedEmail = profileUpdates.email.trim().toLowerCase();

    if (!normalizedEmail) {
      setMessage("Advisor email is required.");
      return false;
    }

    const emailExists =
      advisorProfiles.some((advisor) => advisor.email.toLowerCase() === normalizedEmail) ||
      staffAccounts.some((account) => account.email.toLowerCase() === normalizedEmail);

    if (emailExists) {
      setMessage("An advisor with this email already exists.");
      return false;
    }

    try {
      await createAdvisor({
        name: profileUpdates.name || "New Advisor",
        email: normalizedEmail,
        department: profileUpdates.department || "Software Engineering",
        academic_title: profileUpdates.title || "Professor",
        areas_of_expertise: profileUpdates.expertiseAreas,
        research_interests: profileUpdates.researchInterests,
        is_available: profileUpdates.status === "Inactive" ? 0 : 1,
        supervised_project_types: normalizeCommaSeparatedList(profileUpdates.supervisedProjects),
      });
      const [advisorAccountsFromApi, nextAdvisors] = await Promise.all([
        getAdvisorAccounts(),
        fetchAdvisorDirectory(),
      ]);
      setAdvisors(nextAdvisors);
      setAdvisorProfiles(nextAdvisors);
      setAdvisorAccounts(buildAdvisorAccounts(advisorAccountsFromApi, nextAdvisors));
      const createdAdvisor = nextAdvisors.find((advisor) => advisor.email === normalizedEmail);
      setMessage(`Advisor "${createdAdvisor?.name || profileUpdates.name}" added successfully.`);
      return true;
    } catch (error) {
      setMessage(error.message || "Advisor could not be added.");
      return false;
    }
  }

  async function toggleAdvisorAvailability(id) {
    try {
      await toggleAdvisorAvailabilityApi(id);
      const nextAdvisors = await fetchAdvisorDirectory();
      setAdvisors(nextAdvisors);
      setAdvisorProfiles(nextAdvisors);
      setMessage("Advisor availability updated.");
    } catch (error) {
      setMessage(error.message || "Advisor availability could not be updated.");
    }
  }

  return (
    <div className="app-shell">
      <div className="workspace-stage">
      {isHydrating ? (
        <div className="login-page">
          <section className="form-panel">
            <div className="card login-card auth-card">
              <h2>Loading Session</h2>
              <p className="auth-hint">Your dashboard is being prepared from the backend.</p>
            </div>
          </section>
        </div>
      ) : loggedIn ? (
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
                  teamRequests={teamRequests}
                  ownedProjects={allStudentProjects}
                  projectApplicationTarget={projectApplicationTarget}
                  projectApplicationNote={projectApplicationNote}
                  onProjectApplicationNoteChange={setProjectApplicationNote}
                  onSubmitProjectApplication={submitProjectApplication}
                  onCloseProjectApplication={() => setProjectApplicationTarget(null)}
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
                  onSaveProject={handleAdminProjectSave}
                  onDeleteProject={handleRemoveProject}
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
  teamRequests,
  ownedProjects,
  projectApplicationTarget,
  projectApplicationNote,
  onProjectApplicationNoteChange,
  onSubmitProjectApplication,
  onCloseProjectApplication,
}) {
  const [studentProjectModalId, setStudentProjectModalId] = useState(null);
  const [discoverProjectModalId, setDiscoverProjectModalId] = useState(null);
  const [advisorRequestTarget, setAdvisorRequestTarget] = useState(null);

  const activeStudentProject = projects.find((project) => project.id === studentProjectModalId) || null;
  const activeDiscoverProject = discoverProjects.find((project) => project.id === discoverProjectModalId) || null;

  if (view === "My Projects") {
    return (
      <>
        <SectionTitle title="My Projects" subtitle="Browse project cards and open project details." />
        <ProjectGrid
          items={projects}
          onSelectProject={(id) => {
            onSelectProject(id);
            setStudentProjectModalId(id);
          }}
          onApplyToProject={onApplyToProject}
          showApply={false}
        />
        <IncomingTeammateRequests
          items={incomingRequests}
          selectedRequest={selectedTeamRequest}
          onSelectRequest={onSelectTeamRequest}
          onDecision={onTeamRequestDecision}
          studentDirectory={studentDirectory}
        />
        {activeStudentProject ? (
          <div className="admin-panel-overlay">
            <div className="admin-panel-sheet">
              <div className="admin-panel-topbar">
                <div>
                  <p className="eyebrow muted-eyebrow">My Project</p>
                  <h3>Project Details</h3>
                </div>
                <button className="icon-btn close-btn" type="button" onClick={() => setStudentProjectModalId(null)}>
                  ×
                </button>
              </div>
              <ProjectDetailsCard
                project={activeStudentProject}
                embedded
                teamRequests={teamRequests}
                studentDirectory={studentDirectory}
                currentUser={currentUser}
              />
            </div>
          </div>
        ) : null}
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
        {advisorRequestTarget ? (
          <div className="admin-panel-overlay">
            <div className="admin-panel-sheet">
              <div className="admin-panel-topbar">
                <div>
                  <p className="eyebrow muted-eyebrow">Send Request</p>
                  <h3>Select Project</h3>
                </div>
                <button className="icon-btn close-btn" type="button" onClick={() => setAdvisorRequestTarget(null)}>
                  ×
                </button>
              </div>
              <div className="profile-card embedded-profile-card">
                <div className="request-deliverable-list">
                  {ownedProjects.map((project) => (
                    <button
                      key={project.id}
                      className="request-deliverable-item"
                      type="button"
                      onClick={async () => {
                        const sent = await onAdvisorRequest(advisorRequestTarget, project.id);
                        if (sent) setAdvisorRequestTarget(null);
                      }}
                    >
                      {project.title}
                    </button>
                  ))}
                </div>
                <div className="profile-editor-actions">
                  <button className="ghost-btn" type="button" onClick={() => setAdvisorRequestTarget(null)}>
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : null}
        <div className="advisor-list">
          {advisors.map((advisor) => (
            <div className="advisor-row advisor-request-row" key={advisor.id}>
              <div className="avatar large">{initialsForName(advisor.name)}</div>
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
                <button
                  className="primary-btn"
                  type="button"
                  onClick={() => {
                    if (!ownedProjects.length) {
                      onAdvisorRequest(advisor, null);
                      return;
                    }

                    if (ownedProjects.length === 1) {
                      onAdvisorRequest(advisor, ownedProjects[0].id);
                      return;
                    }

                    setAdvisorRequestTarget(advisor);
                  }}
                >
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
      <StatsRow
        items={[
          ["Total Projects", `${projects.length}`],
          ["Pending Requests", `${incomingRequests.filter((request) => request.status === "Waiting").length}`],
          ["Approved Projects", `${projects.filter((project) => project.status === "Advisor Assigned").length}`],
          ["Rejected Projects", `${incomingRequests.filter((request) => request.status === "Rejected").length}`],
        ]}
      />
      <AnnouncementPanel items={announcements} />
      {projectApplicationTarget ? (
        <div className="admin-panel-overlay">
          <div className="admin-panel-sheet">
            <div className="admin-panel-topbar">
              <div>
                <p className="eyebrow muted-eyebrow">Apply To Project</p>
                <h3>{projectApplicationTarget.title}</h3>
              </div>
              <button className="icon-btn close-btn" type="button" onClick={onCloseProjectApplication}>
                ×
              </button>
            </div>
            <form
              className="profile-card embedded-profile-card"
              onSubmit={async (event) => {
                event.preventDefault();
                const sent = await onSubmitProjectApplication(projectApplicationTarget, projectApplicationNote);
                if (sent) onCloseProjectApplication();
              }}
            >
              <div className="profile-editor-grid">
                <InputField
                  label="Request Note"
                  value={projectApplicationNote}
                  onChange={onProjectApplicationNoteChange}
                  placeholder="Write a short note about why you want to join this project."
                  span
                  textarea
                />
              </div>
              <div className="profile-editor-actions">
                <button className="ghost-btn" type="button" onClick={onCloseProjectApplication}>
                  Cancel
                </button>
                <button className="primary-btn" type="submit">
                  Send Request
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
      <SectionTitle title="Open Projects" subtitle="Browse other student projects and send a teammate request." />
      <ProjectGrid
        items={discoverProjects}
        onSelectProject={(id) => {
          onSelectProject(id);
          setDiscoverProjectModalId(id);
        }}
        onApplyToProject={onApplyToProject}
      />
      {activeDiscoverProject ? (
        <div className="admin-panel-overlay">
          <div className="admin-panel-sheet">
            <div className="admin-panel-topbar">
              <div>
                <p className="eyebrow muted-eyebrow">Open Project</p>
                <h3>Project Details</h3>
              </div>
              <button className="icon-btn close-btn" type="button" onClick={() => setDiscoverProjectModalId(null)}>
                ×
              </button>
            </div>
            <ProjectDetailsCard project={activeDiscoverProject} showOwnerProfile studentDirectory={studentDirectory} embedded />
          </div>
        </div>
      ) : null}
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
  const [advisorProjectModalId, setAdvisorProjectModalId] = useState(null);
  const activeAdvisorProject = projects.find((project) => project.id === advisorProjectModalId) || null;
  const selectedRequest = selectedRequestId == null ? null : requests.find((request) => request.id === selectedRequestId) || null;

  if (view === "My Projects") {
    return (
      <>
        <SectionTitle title="My Projects" subtitle="Here you can view the projects you've accepted." />
        <ProjectGrid
          items={projects}
          onSelectProject={(id) => {
            onSelectProject(id);
            setAdvisorProjectModalId(id);
          }}
          compact
          hideStatus
          onRemoveProject={onRemoveProject}
        />
        {activeAdvisorProject ? (
          <div className="admin-panel-overlay">
            <div className="admin-panel-sheet">
              <div className="admin-panel-topbar">
                <div>
                  <p className="eyebrow muted-eyebrow">Advisor Project</p>
                  <h3>Project Details</h3>
                </div>
                <button className="icon-btn close-btn" type="button" onClick={() => setAdvisorProjectModalId(null)}>
                  ×
                </button>
              </div>
              <ProjectDetailsCard project={activeAdvisorProject} embedded />
            </div>
          </div>
        ) : null}
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
                <tr className={request.id === selectedRequestId ? "selected-request-row" : ""} key={request.id}>
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
              ))}
            </tbody>
          </table>
        </div>
        {selectedRequest ? (
          <div className="admin-panel-overlay">
            <div className="admin-panel-sheet">
              <div className="admin-panel-topbar">
                <div>
                  <p className="eyebrow muted-eyebrow">Incoming Request</p>
                  <h3>Project Request Details</h3>
                </div>
                <button className="icon-btn close-btn" type="button" onClick={() => onSelectRequest(null)}>
                  ×
                </button>
              </div>

              <div className="detail-stack">
                <div className="detail-overview">
                  <strong>{selectedRequest.project}</strong>
                  <p>{selectedRequest.description}</p>
                </div>

                <div className="detail-inline">
                  <span className="badge blue">{selectedRequest.type}</span>
                  <span className={`badge ${selectedRequest.status === "Accepted" ? "green" : selectedRequest.status === "Rejected" ? "red" : "amber"}`}>
                    {selectedRequest.status}
                  </span>
                  <span className="badge amber">{selectedRequest.projectField}</span>
                </div>

                <div className="request-detail-grid">
                  <div className="detail-block">
                    <strong>Project Objective</strong>
                    <p>{selectedRequest.objective}</p>
                  </div>

                  <div className="detail-block detail-cardlet">
                    <strong>Student</strong>
                    <p>{selectedRequest.student}</p>
                    <strong>Department / Year</strong>
                    <p>{selectedRequest.department} / {selectedRequest.year}</p>
                    <strong>Requested Advisor</strong>
                    <p>{selectedRequest.advisorPreference}</p>
                    <strong>Requested On</strong>
                    <p>{selectedRequest.requestedDate}</p>
                  </div>
                </div>

                <div className="request-detail-grid">
                  <div className="detail-block">
                    <strong>Expected Deliverables</strong>
                    <div className="request-deliverable-list">
                      {selectedRequest.deliverables.map((item) => (
                        <div className="request-deliverable-item" key={item}>
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="detail-block detail-cardlet">
                    <strong>Team Size</strong>
                    <p>{selectedRequest.teamMembers} students</p>
                    <strong>Planned Duration</strong>
                    <p>{selectedRequest.expectedDuration}</p>
                  </div>
                </div>

                <div className="detail-block">
                  <strong>Required Skills</strong>
                  <div className="tag-list">
                    {selectedRequest.requiredSkills.map((skill) => (
                      <span className="tag" key={skill}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </>
    );
  }

  if (view === "Profile") {
    return <EditableAdvisorProfile currentUser={currentUser} onSave={onAdvisorProfileSave} />;
  }

  return (
    <>
      <StatsRow
        items={[
          ["Total Projects", `${projects.length}`],
          ["Incoming Requests", `${requests.filter((request) => request.status === "Waiting").length}`],
          ["Accepted Projects", `${projects.filter((project) => project.status === "Advisor Assigned").length}`],
        ]}
      />
      <AnnouncementPanel items={announcements} />
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
  onSaveProject,
  onDeleteProject,
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

  if (view === "Manage Projects") {
    return (
      <AdminProjectsPanel
        projects={projects}
        onSelectProject={onSelectProject}
        onSaveProject={onSaveProject}
        onDeleteProject={onDeleteProject}
      />
    );
  }

  return (
    <>
      <StatsRow items={[["Total Students", `${students.length}`], ["Total Advisors", `${advisors.length}`], ["Total Projects", `${projects.length}`]]} />
      <AnnouncementPanel items={announcements} />
    </>
  );
}

function AdminProjectsPanel({ projects, onSelectProject, onSaveProject, onDeleteProject }) {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [editingProjectId, setEditingProjectId] = useState(null);
  const [categorySearch, setCategorySearch] = useState("");

  const projectCategories = adminProjectCategories.map((category) => {
    const items =
      category.key === "ALL"
        ? projects
        : projects.filter((project) => project.type === category.key);
    return {
      ...category,
      activeProjects: items.length,
      totalStudents: items.reduce((sum, project) => sum + Number(project.teamMembers || 0), 0),
      items,
    };
  });

  const activeCategory =
    projectCategories.find((category) => category.key === selectedCategory) || projectCategories[0];
  const normalizedSearch = categorySearch.trim().toLowerCase();
  const visibleProjects = activeCategory.items.filter((project) => {
    if (!normalizedSearch) return true;
    return [project.title, project.owner, project.advisor].some((value) =>
      String(value || "").toLowerCase().includes(normalizedSearch),
    );
  });
  const editingProject = visibleProjects.find((project) => project.id === editingProjectId) ||
    projects.find((project) => project.id === editingProjectId) ||
    null;

  React.useEffect(() => {
    if (!selectedCategory && projectCategories[0]) {
      setSelectedCategory(projectCategories[0].key);
    }

    if (selectedCategory && !projectCategories.some((category) => category.key === selectedCategory)) {
      setSelectedCategory(projectCategories[0]?.key || null);
    }

    if (editingProjectId && !projects.some((project) => project.id === editingProjectId)) {
      setEditingProjectId(null);
    }
  }, [selectedCategory, projectCategories, editingProjectId, projects]);

  return (
    <>
      <div className="card table-card admin-projects-panel">
        <SectionTitle title="Manage Projects" subtitle="Manage projects with the same structured layout used across the admin panel." />

        <div className="toolbar admin-project-toolbar">
          <div className="admin-project-tabs" role="tablist" aria-label="Project categories">
            {projectCategories.map((category) => (
              <button
                key={category.key}
                className={`admin-project-tab-button ${activeCategory.key === category.key ? "active" : ""}`}
                type="button"
                onClick={() => setSelectedCategory(category.key)}
              >
                {category.label}
              </button>
            ))}
          </div>

          <div className="admin-project-toolbar-controls">
            <input
              value={categorySearch}
              onChange={(event) => setCategorySearch(event.target.value)}
              placeholder="Search"
            />
            <button className="primary-btn" type="button">
              Add Category
            </button>
          </div>
        </div>

        <div className="admin-project-category-meta">
          <span className="badge blue">{activeCategory.label}</span>
          <span>{activeCategory.activeProjects} active projects</span>
          <span>{activeCategory.totalStudents} total students</span>
          <span>Deadline {activeCategory.deadline}</span>
        </div>

        <table className="data-table admin-projects-table">
          <thead>
            <tr>
              <th>Project Name</th>
              <th>Project Owner</th>
              <th>Advisor</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {visibleProjects.map((project) => (
              <tr key={project.id}>
                <td>{project.title}</td>
                <td>{project.owner}</td>
                <td>{project.advisor}</td>
                <td className="table-actions">
                  <button
                    className="primary-btn small"
                    type="button"
                    onClick={() => {
                      onSelectProject(project.id);
                      setEditingProjectId(project.id);
                    }}
                  >
                    Edit Project
                  </button>
                  <button className="small-danger-btn" type="button" onClick={() => onDeleteProject(project.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {!visibleProjects.length ? <div className="empty-state">No projects matched this category search.</div> : null}
      </div>

      {editingProject ? (
        <div className="admin-panel-overlay">
          <div className="admin-panel-sheet">
            <div className="admin-panel-topbar">
              <div>
                <p className="eyebrow muted-eyebrow">Edit Project</p>
                <h3>Manage Project Details</h3>
              </div>
              <button className="icon-btn close-btn" type="button" onClick={() => setEditingProjectId(null)}>
                ×
              </button>
            </div>

            <AdminProjectEditForm
              key={editingProject.id}
              project={editingProject}
              onSave={onSaveProject}
              onClose={() => setEditingProjectId(null)}
              embedded
            />
          </div>
        </div>
      ) : null}
    </>
  );
}

function AdminStudentsPanel({ students, onAddStudent, onSaveStudent }) {
  const [selectedStudentEmail, setSelectedStudentEmail] = useState(null);
  const [editingStudentEmail, setEditingStudentEmail] = useState(null);
  const [showAddStudent, setShowAddStudent] = useState(false);
  const [addForm, setAddForm] = useState(() => buildStudentProfileForm(null));

  React.useEffect(() => {
    if (!students.length) {
      setSelectedStudentEmail(null);
      setEditingStudentEmail(null);
      return;
    }

    if (selectedStudentEmail && !students.some((student) => student.email === selectedStudentEmail)) {
      setSelectedStudentEmail(null);
    }

    if (editingStudentEmail && !students.some((student) => student.email === editingStudentEmail)) {
      setEditingStudentEmail(null);
    }
  }, [students, selectedStudentEmail, editingStudentEmail]);

  const selectedStudent = students.find((student) => student.email === selectedStudentEmail) || null;
  const editingStudent = students.find((student) => student.email === editingStudentEmail) || null;
  const activeStudentPanel = editingStudent ? "edit" : selectedStudent ? "view" : null;

  function updateAddField(key, value) {
    setAddForm((previous) => ({ ...previous, [key]: value }));
  }

  async function handleAddSubmit(event) {
    event.preventDefault();
    const saved = await onAddStudent(addForm);
    if (!saved) return;
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
        <div className="admin-panel-overlay">
          <div className="admin-panel-sheet">
            <div className="admin-panel-topbar">
              <div>
                <p className="eyebrow muted-eyebrow">Add Student</p>
                <h3>Create Student Account</h3>
              </div>
              <button className="icon-btn close-btn" type="button" onClick={() => setShowAddStudent(false)}>
                ×
              </button>
            </div>

            <form className="profile-card embedded-profile-card" onSubmit={handleAddSubmit}>
              <div className="profile-editor-header overlay-form-actions">
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
          </div>
        </div>
      ) : null}

      {activeStudentPanel ? (
        <div className="admin-panel-overlay">
          <div className="admin-panel-sheet">
            <div className="admin-panel-topbar">
              <div>
                <p className="eyebrow muted-eyebrow">
                  {activeStudentPanel === "edit" ? "Edit Student" : "View Student"}
                </p>
                <h3>{activeStudentPanel === "edit" ? "Manage Student Profile" : "Student Profile"}</h3>
              </div>
              <button
                className="icon-btn close-btn"
                type="button"
                onClick={() => {
                  setEditingStudentEmail(null);
                  setSelectedStudentEmail(null);
                }}
              >
                ×
              </button>
            </div>

            {selectedStudent && !editingStudent ? <StudentProfilePreviewCard student={selectedStudent} embedded /> : null}
            {editingStudent ? (
              <AdminStudentEditForm
                key={editingStudent.email}
                student={editingStudent}
                onSave={onSaveStudent}
                onClose={() => {
                  setEditingStudentEmail(null);
                  setSelectedStudentEmail(null);
                }}
                embedded
              />
            ) : null}
          </div>
        </div>
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

  async function handleAddSubmit(event) {
    event.preventDefault();
    const saved = await onAddAdvisor(addForm);
    if (!saved) return;
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
        <div className="admin-panel-overlay">
          <div className="admin-panel-sheet">
            <div className="admin-panel-topbar">
              <div>
                <p className="eyebrow muted-eyebrow">Add Advisor</p>
                <h3>Create Advisor Account</h3>
              </div>
              <button className="icon-btn close-btn" type="button" onClick={() => setShowAddAdvisor(false)}>
                ×
              </button>
            </div>

            <form className="profile-card embedded-profile-card" onSubmit={handleAddSubmit}>
              <div className="profile-editor-header overlay-form-actions">
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
          </div>
        </div>
      ) : null}

      {editingAdvisor ? (
        <div className="admin-panel-overlay">
          <div className="admin-panel-sheet">
            <div className="admin-panel-topbar">
              <div>
                <p className="eyebrow muted-eyebrow">Edit Advisor</p>
                <h3>Manage Advisor Profile</h3>
              </div>
              <button className="icon-btn close-btn" type="button" onClick={() => setEditingAdvisorId(null)}>
                ×
              </button>
            </div>

            <AdminAdvisorEditForm
              advisor={editingAdvisor}
              directoryAdvisor={advisorDirectoryEntry}
              onSave={onSaveAdvisor}
              onClose={() => setEditingAdvisorId(null)}
              embedded
            />
          </div>
        </div>
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

function ProjectGrid({ items, onSelectProject, onApplyToProject, compact = false, hideStatus = false, onRemoveProject = null, showApply = true }) {
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
              {!compact && showApply && (
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

function ProjectDetailsCard({
  project,
  showOwnerProfile = false,
  studentDirectory = [],
  embedded = false,
  teamRequests = [],
  currentUser = null,
}) {
  if (!project) return null;

  const acceptedTeammates = teamRequests
    .filter((request) => request.projectId === project.id && request.status === "Accepted")
    .map((request) => {
      const profile =
        studentDirectory.find((student) => student.email === request.requesterEmail) ||
        studentDirectory.find((student) => student.name === request.requesterName);
      return {
        name: request.requesterName,
        department: profile?.department || request.department || "",
        year: profile?.year || request.year || "",
        email: request.requesterEmail || profile?.email || "",
      };
    });

  return (
    <div className={embedded ? "details-card embedded-profile-card" : "card details-card"}>
      {!embedded ? <SectionTitle title="Project Details" subtitle="Selected project preview card." /> : null}
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
            {currentUser?.name === project.owner ? (
              <>
                <strong>Current Teammates</strong>
                <div className="request-deliverable-list">
                  <div className="request-deliverable-item">{project.owner} (Owner)</div>
                  {acceptedTeammates.map((member) => (
                    <div className="request-deliverable-item" key={member.email || member.name}>
                      {member.name}
                      {member.department || member.year ? ` • ${[member.department, member.year].filter(Boolean).join(" / ")}` : ""}
                    </div>
                  ))}
                </div>
              </>
            ) : null}
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
          <strong>{ownerProfile?.github || project.ownerGithub || "-"}</strong>
        </div>
        <div className="profile-row">
          <span>LinkedIn</span>
          <strong>{ownerProfile?.linkedIn || project.ownerLinkedIn || "-"}</strong>
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
      {selectedRequest ? (
        <div className="admin-panel-overlay">
          <div className="admin-panel-sheet">
            <div className="admin-panel-topbar">
              <div>
                <p className="eyebrow muted-eyebrow">Incoming Request</p>
                <h3>Teammate Request Details</h3>
              </div>
              <button className="icon-btn close-btn" type="button" onClick={() => onSelectRequest(null)}>
                ×
              </button>
            </div>
            <TeammateRequestProfileCard request={selectedRequest} onDecision={onDecision} studentDirectory={studentDirectory} />
          </div>
        </div>
      ) : null}
    </div>
  );
}

function AdvisorProfileModal({ advisor, onClose }) {
  return (
    <div className="admin-panel-overlay">
      <div className="admin-panel-sheet">
        <div className="admin-panel-topbar">
          <div>
            <p className="eyebrow muted-eyebrow">View Profile</p>
            <h3>Advisor Profile</h3>
          </div>
          <button className="icon-btn close-btn" type="button" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="advisor-profile-card embedded-profile-card">
          <div className="advisor-profile-header">
            <div className="avatar profile-avatar">{initialsForName(advisor.name)}</div>
            <div>
              <strong>{advisor.name}</strong>
              <p>{advisor.expertise} • {advisor.department}</p>
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
                  {advisor.available ? "Available" : "Busy"}
                </span>
              </strong>
            </div>
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
    <>
      <div className="card profile-card">
        <div className="profile-editor-header">
          <SectionTitle title="Profile" subtitle="Keep your short bio and links up to date for teammates and advisors." />
          <div className="profile-editor-actions">
            <button className="primary-btn" type="button" onClick={() => setIsEditing(true)}>
              Edit Profile
            </button>
          </div>
        </div>

        <ProfileRows
          rows={[
            ["Short Bio", formState.shortBio || "No short bio added yet."],
            ["Full Name", formState.name],
            ["Email", formState.email],
            ["Department / Year", `${formState.department} / ${formState.year}`],
            ["GitHub", formState.github || "-"],
            ["LinkedIn", formState.linkedIn || "-"],
            ["Skills", formState.skills || "-"],
            ["Interests", formState.interests || "-"],
          ]}
        />
      </div>

      {isEditing ? (
        <div className="admin-panel-overlay">
          <div className="admin-panel-sheet">
            <div className="admin-panel-topbar">
              <div>
                <p className="eyebrow muted-eyebrow">Edit Profile</p>
                <h3>Manage Student Profile</h3>
              </div>
              <button className="icon-btn close-btn" type="button" onClick={handleCancel}>
                ×
              </button>
            </div>

            <form className="profile-card embedded-profile-card" onSubmit={handleSubmit}>
              <div className="profile-editor-header overlay-form-actions">
                <div className="profile-editor-actions">
                  <button className="ghost-btn" type="button" onClick={handleCancel}>
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
                  placeholder="Write a short bio about yourself."
                  span
                  textarea
                />
                <InputField label="Full Name" value={formState.name} onChange={(value) => updateField("name", value)} placeholder="Sevinc Yigit" />
                <InputField label="Email" value={formState.email} onChange={(value) => updateField("email", value)} placeholder="name@ogr.university.edu.tr" />
                <InputField label="Department" value={formState.department} onChange={(value) => updateField("department", value)} placeholder="Software Engineering" />
                <InputField label="Year" value={formState.year} onChange={(value) => updateField("year", value)} placeholder="3rd Year" />
                <InputField label="GitHub" value={formState.github} onChange={(value) => updateField("github", value)} placeholder="github.com/username" span />
                <InputField label="LinkedIn" value={formState.linkedIn} onChange={(value) => updateField("linkedIn", value)} placeholder="linkedin.com/in/username" span />
                <InputField label="Skills" value={formState.skills} onChange={(value) => updateField("skills", value)} placeholder="React, Python, UI/UX" span />
                <InputField label="Interests" value={formState.interests} onChange={(value) => updateField("interests", value)} placeholder="Artificial Intelligence, Machine Learning" span />
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </>
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
    <>
      <div className="card profile-card">
        <div className="profile-editor-header">
          <SectionTitle title="Advisor Profile" subtitle="View and manage your personal information." />
          <div className="profile-editor-actions">
            <button className="primary-btn" type="button" onClick={() => setIsEditing(true)}>
              Edit Profile
            </button>
          </div>
        </div>

        <ProfileRows
          rows={[
            ["Full Name", formState.name],
            ["Email", formState.email],
            ["Department", formState.department],
            ["Academic Title", formState.title],
            ["Areas of Expertise", formState.expertiseAreas || "-"],
            ["Research Interests", formState.researchInterests || "-"],
            ["Previously Supervised Project Types", formState.supervisedProjects || "-"],
            ["Status", formState.available ? "Available for advising" : "Not available for advising"],
          ]}
        />
      </div>

      {isEditing ? (
        <div className="admin-panel-overlay">
          <div className="admin-panel-sheet">
            <div className="admin-panel-topbar">
              <div>
                <p className="eyebrow muted-eyebrow">Edit Profile</p>
                <h3>Manage Advisor Profile</h3>
              </div>
              <button className="icon-btn close-btn" type="button" onClick={handleCancel}>
                ×
              </button>
            </div>

            <form className="profile-card embedded-profile-card" onSubmit={handleSubmit}>
              <div className="profile-editor-header overlay-form-actions">
                <div className="profile-editor-actions">
                  <button className="ghost-btn" type="button" onClick={handleCancel}>
                    Cancel
                  </button>
                  <button className="primary-btn" type="submit">
                    Save Changes
                  </button>
                </div>
              </div>

              <div className="advisor-profile-form-grid">
                <div className="advisor-avatar-panel">
                  <div className="avatar advisor-profile-avatar">{initialsForName(formState.name || currentUser.name)}</div>
                </div>

                <div className="advisor-profile-fields">
                  <div className="profile-editor-grid">
                    <InputField label="Full Name" value={formState.name} onChange={(value) => updateField("name", value)} placeholder="Prof. Selin Yuce" />
                    <InputField label="Email" value={formState.email} onChange={(value) => updateField("email", value)} placeholder="name@university.edu.tr" />
                    <InputField label="Department" value={formState.department} onChange={(value) => updateField("department", value)} placeholder="Software Engineering" />
                    <InputField label="Academic Title" value={formState.title} onChange={(value) => updateField("title", value)} placeholder="Professor" />
                    <InputField label="Areas of Expertise" value={formState.expertiseAreas} onChange={(value) => updateField("expertiseAreas", value)} placeholder="Machine Learning, Python, UI/UX" span />
                    <InputField label="Research Interests" value={formState.researchInterests} onChange={(value) => updateField("researchInterests", value)} placeholder="Natural Language Processing, Computer Vision" span />
                    <InputField label="Previously Supervised Project Types" value={formState.supervisedProjects} onChange={(value) => updateField("supervisedProjects", value)} placeholder="AI-based Chatbot Systems, Image Processing Projects" span textarea />
                  </div>

                  <div className="advisor-status-row">
                    <div>
                      <strong>Status</strong>
                      <p>{formState.available ? "Available for advising" : "Not available for advising"}</p>
                    </div>
                    <button
                      className={`status-toggle ${formState.available ? "on" : "off"}`}
                      type="button"
                      aria-pressed={formState.available}
                      onClick={() => updateField("available", !formState.available)}
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
          </div>
        </div>
      ) : null}
    </>
  );
}

function StudentProfilePreviewCard({ student, embedded = false }) {
  return (
    <div className={embedded ? "profile-card embedded-profile-card" : "card profile-card"}>
      {!embedded ? <SectionTitle title="View Profile" subtitle="Student profile details visible to the admin." /> : null}
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

function AdminStudentEditForm({ student, onSave, onClose, embedded = false }) {
  const [formState, setFormState] = useState(() => buildStudentProfileForm(student));

  function updateField(key, value) {
    setFormState((previous) => ({ ...previous, [key]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const saved = await onSave(student.email, formState);
    if (saved === false) return;
    onClose();
  }

  return (
    <form className={embedded ? "profile-card embedded-profile-card" : "card profile-card"} onSubmit={handleSubmit}>
      <div className="profile-editor-header">
        {!embedded ? <SectionTitle title="Edit Profile" subtitle="Update the selected student profile." /> : null}
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

function AdminAdvisorEditForm({ advisor, directoryAdvisor, onSave, onClose, embedded = false }) {
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

  async function handleSubmit(event) {
    event.preventDefault();
    const saved = await onSave(advisor.id, formState);
    if (saved === false) return;
    onClose();
  }

  return (
    <form className={embedded ? "profile-card embedded-profile-card" : "card profile-card"} onSubmit={handleSubmit}>
      <div className="profile-editor-header">
        {!embedded ? <SectionTitle title="Manage Advisor Profile" subtitle="Update all advisor details from the admin panel." /> : null}
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

function AdminProjectEditForm({ project, onSave, onClose, embedded = false }) {
  const [formState, setFormState] = useState(() => ({
    title: project.title || "",
    owner: project.owner || "",
    advisor: project.advisor || "",
    type: project.type || "Course Project",
    status: project.status || "Open",
    teamMembers: String(project.teamMembers || 0),
    description: project.description || "",
    requiredSkills: (project.requiredSkills || []).join(", "),
    interests: (project.interests || []).join(", "),
    ownerGithub: project.ownerGithub || "",
    ownerLinkedIn: project.ownerLinkedIn || "",
  }));

  function updateField(key, value) {
    setFormState((previous) => ({ ...previous, [key]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const saved = await onSave(project.id, formState);
    if (saved === false) return;
    onClose();
  }

  return (
    <form className={embedded ? "profile-card embedded-profile-card" : "card profile-card"} onSubmit={handleSubmit}>
      <div className="profile-editor-header">
        {!embedded ? <SectionTitle title="Edit Project" subtitle="Update the selected project from the admin panel." /> : null}
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
        <InputField label="Project Title" value={formState.title} onChange={(value) => updateField("title", value)} placeholder="Project title" />
        <InputField label="Project Owner" value={formState.owner} onChange={(value) => updateField("owner", value)} placeholder="Student name" />
        <InputField label="Advisor" value={formState.advisor} onChange={(value) => updateField("advisor", value)} placeholder="Advisor name" />
        <SelectField
          label="Project Type"
          value={formState.type}
          onChange={(value) => updateField("type", value)}
          options={adminProjectCategories.map((category) => category.key)}
        />
        <SelectField
          label="Status"
          value={formState.status}
          onChange={(value) => updateField("status", value)}
          options={["Open", "Pending", "Advisor Assigned", "Needs Members"]}
        />
        <InputField label="Team Members" value={formState.teamMembers} onChange={(value) => updateField("teamMembers", value)} placeholder="4" />
        <InputField label="Description" value={formState.description} onChange={(value) => updateField("description", value)} placeholder="Project description" span textarea />
        <InputField label="Required Skills" value={formState.requiredSkills} onChange={(value) => updateField("requiredSkills", value)} placeholder="React, Python, UI/UX" span />
        <InputField label="Interests" value={formState.interests} onChange={(value) => updateField("interests", value)} placeholder="AI, Sustainability" span />
        <InputField label="Owner GitHub" value={formState.ownerGithub} onChange={(value) => updateField("ownerGithub", value)} placeholder="github.com/username" span />
        <InputField label="Owner LinkedIn" value={formState.ownerLinkedIn} onChange={(value) => updateField("ownerLinkedIn", value)} placeholder="linkedin.com/in/username" span />
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
          <option key={typeof option === "string" ? option : option.value} value={typeof option === "string" ? option : option.value}>
            {typeof option === "string" ? option : option.label}
          </option>
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

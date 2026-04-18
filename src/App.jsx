import React, { useState } from "react";

const roleTabs = [
  { id: "student", label: "Student" },
  { id: "advisor", label: "Advisor" },
  { id: "admin", label: "Admin" },
];

const menus = {
  student: ["Home", "My Projects", "Create Project", "Find Advisor", "Profile"],
  advisor: ["Home", "My Projects", "Incoming Requests", "Profile"],
  admin: ["Home", "Manage Students", "Manage Advisors", "Manage Projects", "Create Announcement"],
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
  { id: 1, name: "Prof. Selin Yuce", expertise: "Artificial Intelligence", department: "Software Engineering", available: true },
  { id: 2, name: "Prof. Duygu Dogan", expertise: "UI/UX", department: "Software Engineering", available: true },
  { id: 3, name: "Prof. Mehmet Yildiz", expertise: "Data Mining", department: "Computer Engineering", available: false },
  { id: 4, name: "Prof. Ahmet Yilmaz", expertise: "Cyber Security", department: "Computer Engineering", available: true },
];

const initialRequests = [
  { id: 1, student: "Sevinc Yigit", project: "AI-Based Smart Agriculture", type: "TUBITAK", status: "Waiting" },
  { id: 2, student: "Mergen Yilmaz", project: "Food App", type: "TUBITAK", status: "Waiting" },
  { id: 3, student: "Firdevs Su", project: "ADHD", type: "Teknofest", status: "Waiting" },
  { id: 4, student: "Emre Guner", project: "AI Predictor", type: "Teknofest", status: "Accepted" },
];

const students = [
  { id: 1, name: "Sevinc Yigit", department: "Software Engineering", year: "3" },
  { id: 2, name: "Firdevs Su", department: "Software Engineering", year: "4" },
  { id: 3, name: "Emre Guner", department: "Electrical Engineering", year: "2" },
  { id: 4, name: "Umut Kaya", department: "Computer Engineering", year: "4" },
];

const initialAdvisorAccounts = [
  { id: 1, name: "Sila Korklubasoglu", department: "Software Engineering", status: "Active" },
  { id: 2, name: "Ayse Demir", department: "Software Engineering", status: "Active" },
  { id: 3, name: "Ahmet Yilmaz", department: "Computer Engineering", status: "Inactive" },
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

const privilegedRolePasswords = {
  advisor: "advisor2026",
  admin: "admin2026",
};

const signupFormInitial = {
  fullName: "",
  email: "",
  password: "",
  department: "",
  rolePassword: "",
};

function App() {
  const [role, setRole] = useState("student");
  const [view, setView] = useState("Home");
  const [loggedIn, setLoggedIn] = useState(true);
  const [authMode, setAuthMode] = useState("login");
  const [searchText, setSearchText] = useState("");
  const [projects, setProjects] = useState(initialProjects);
  const [announcements, setAnnouncements] = useState(initialAnnouncements);
  const [advisors, setAdvisors] = useState(initialAdvisors);
  const [requests, setRequests] = useState(initialRequests);
  const [advisorAccounts, setAdvisorAccounts] = useState(initialAdvisorAccounts);
  const [selectedProjectId, setSelectedProjectId] = useState(initialProjects[0].id);
  const [message, setMessage] = useState("Buttons now update the interface. You can switch roles and pages.");
  const [projectForm, setProjectForm] = useState(emptyForm);
  const [announcementForm, setAnnouncementForm] = useState(announcementFormInitial);
  const [signupForm, setSignupForm] = useState(signupFormInitial);

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

  const menu = menus[role];

  function handleRoleChange(nextRole) {
    setRole(nextRole);
    setView("Home");
    setSearchText("");
    setLoggedIn(true);
    setMessage(`${labelForRole(nextRole)} preview activated.`);
  }

  function handleLogout() {
    setLoggedIn(false);
    setAuthMode("login");
    setMessage("You are on the login screen.");
  }

  function handleLogin() {
    setLoggedIn(true);
    setMessage(`${labelForRole(role)} dashboard opened.`);
  }

  function handleRegister() {
    if (role !== "student") {
      const expectedPassword = privilegedRolePasswords[role];
      if (signupForm.rolePassword.trim() !== expectedPassword) {
        setMessage(`${labelForRole(role)} registration password is incorrect.`);
        return;
      }
    }

    setSignupForm(signupFormInitial);
    setAuthMode("login");
    setMessage(`${labelForRole(role)} account created successfully. You can now sign in.`);
  }

  function handleCreateProject(event) {
    event.preventDefault();
    const nextProject = {
      id: Date.now(),
      title: projectForm.title || "Untitled Project",
      owner: "Sevinc Yigit",
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
    setMessage(`Application submitted for ${project.title}.`);
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

  function toggleAdvisorAvailability(id) {
    setAdvisors(
      advisors.map((advisor) =>
        advisor.id === id ? { ...advisor, available: !advisor.available } : advisor,
      ),
    );
  }

  return (
    <div className="app-shell">
      <div className="role-switcher">
        <div>
          <strong>Project Matching Platform</strong>
          <div className="switcher-subtitle"></div>
        </div>
        <div className="chip-row">
          {roleTabs.map((tab) => (
            <button
              key={tab.id}
              className={`chip ${role === tab.id ? "active" : ""}`}
              onClick={() => handleRoleChange(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

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
                  <div className="avatar">{initialsForRole(role)}</div>
                  <span>{profileNameForRole(role)}</span>
                </div>
              </div>
            </header>

            <div className="status-banner">{message}</div>

            <div className="view-area">
              {role === "student" && (
                <StudentPages
                  view={view}
                  announcements={announcements}
                  projects={filteredProjects}
                  advisors={filteredAdvisors}
                  selectedProject={selectedProject}
                  onSelectProject={setSelectedProjectId}
                  onApplyToProject={handleApplyToProject}
                  onAdvisorRequest={handleAdvisorRequest}
                  onProjectFormChange={setProjectForm}
                  projectForm={projectForm}
                  onCreateProject={handleCreateProject}
                />
              )}

              {role === "advisor" && (
                <AdvisorPages
                  view={view}
                  announcements={announcements}
                  projects={filteredProjects.slice(0, 4)}
                  requests={requests}
                  onRequestDecision={handleRequestDecision}
                  selectedProject={selectedProject}
                  onSelectProject={setSelectedProjectId}
                />
              )}

              {role === "admin" && (
                <AdminPages
                  view={view}
                  announcements={announcements}
                  students={students}
                  advisors={advisorAccounts}
                  projects={filteredProjects}
                  announcementForm={announcementForm}
                  onAnnouncementFormChange={setAnnouncementForm}
                  onPublishAnnouncement={handlePublishAnnouncement}
                  onToggleAdvisorAccount={toggleAdvisorAccount}
                  onToggleAdvisorAvailability={toggleAdvisorAvailability}
                  advisorDirectory={advisors}
                  selectedProject={selectedProject}
                  onSelectProject={setSelectedProjectId}
                />
              )}
            </div>
          </main>
        </div>
      ) : (
        <AuthScreen
          role={role}
          mode={authMode}
          onLogin={handleLogin}
          onSwitchMode={setAuthMode}
          signupForm={signupForm}
          onSignupFormChange={setSignupForm}
          onRegister={handleRegister}
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
  advisors,
  selectedProject,
  onSelectProject,
  onApplyToProject,
  onAdvisorRequest,
  projectForm,
  onProjectFormChange,
  onCreateProject,
}) {
  if (view === "My Projects") {
    return (
      <>
        <SectionTitle title="My Projects" subtitle="Browse project cards and open project details." />
        <ProjectGrid items={projects} onSelectProject={onSelectProject} onApplyToProject={onApplyToProject} />
        <ProjectDetailsCard project={selectedProject} />
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
    return (
      <div className="card panel-card">
        <SectionTitle title="Find Advisor" subtitle="Search the list and send advisor requests." />
        <div className="advisor-list">
          {advisors.map((advisor) => (
            <div className="advisor-row" key={advisor.id}>
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
              <button className="ghost-btn" type="button" onClick={() => onAdvisorRequest(advisor.name)}>
                Send Request
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (view === "Profile") {
    return (
      <div className="card profile-card">
        <SectionTitle title="Profile" subtitle="Static student profile summary for the demo." />
        <ProfileRows
          rows={[
            ["Full Name", "Sevinc Yigit"],
            ["Department / Year", "Software Engineering / 3"],
            ["Interests", "Artificial Intelligence, Machine Learning"],
            ["Skills", "React, Python, UI/UX"],
            ["GitHub", "github.com/sevincyigit"],
            ["LinkedIn", "linkedin.com/in/sevincyigit"],
          ]}
        />
      </div>
    );
  }

  return (
    <>
      <StatsRow items={[["Total Projects", "4"], ["Pending Requests", "2"], ["Approved Projects", "3"], ["Rejected Projects", "1"]]} />
      <AnnouncementPanel items={announcements} />
      <ProjectDetailsCard project={selectedProject} />
    </>
  );
}

function AdvisorPages({ view, announcements, projects, requests, onRequestDecision, selectedProject, onSelectProject }) {
  if (view === "My Projects") {
    return (
      <>
        <SectionTitle title="My Projects" subtitle="Advisor-side view of projects waiting for review." />
        <ProjectGrid items={projects} onSelectProject={onSelectProject} compact />
        <ProjectDetailsCard project={selectedProject} />
      </>
    );
  }

  if (view === "Incoming Requests") {
    return (
      <div className="card table-card">
        <SectionTitle title="Incoming Requests" subtitle="Accepting or rejecting updates request status live." />
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
              <tr key={request.id}>
                <td>{request.student}</td>
                <td>{request.project}</td>
                <td>{request.type}</td>
                <td>{request.status}</td>
                <td className="table-actions">
                  <button className="primary-btn small" type="button" onClick={() => onRequestDecision(request.id, "Accepted")}>
                    Accept
                  </button>
                  <button className="danger-btn" type="button" onClick={() => onRequestDecision(request.id, "Rejected")}>
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  if (view === "Profile") {
    return (
      <div className="card profile-card">
        <SectionTitle title="Advisor Profile" subtitle="Instructor profile shown to students." />
        <ProfileRows
          rows={[
            ["Full Name", "Sila Korklubasoglu"],
            ["Department", "Software Engineering"],
            ["Academic Title", "Professor"],
            ["Areas of Expertise", "Machine Learning, Python, UI/UX"],
            ["Research Interests", "Natural Language Processing, Computer Vision"],
            ["Status", "Available for advising"],
          ]}
        />
      </div>
    );
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
  projects,
  announcementForm,
  onAnnouncementFormChange,
  onPublishAnnouncement,
  onToggleAdvisorAccount,
  onToggleAdvisorAvailability,
  advisorDirectory,
  selectedProject,
  onSelectProject,
}) {
  if (view === "Manage Students") {
    return (
      <div className="card">
        <SectionTitle title="Manage Students" subtitle="Admin student table for quick review." />
        <SimpleToolbar />
        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Department</th>
              <th>Year</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td>{student.name}</td>
                <td>{student.department}</td>
                <td>{student.year}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  if (view === "Manage Advisors") {
    return (
      <>
        <div className="card table-card">
          <SectionTitle title="Manage Advisors" subtitle="Toggle account activity from the admin panel." />
          <table className="data-table">
            <thead>
              <tr>
                <th>Name</th>
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
                    <button className="ghost-btn" type="button" onClick={() => onToggleAdvisorAccount(advisor.id)}>
                      Toggle Status
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="card panel-card">
          <SectionTitle title="Advisor Availability" subtitle="Directory view reflecting advising availability." />
          <div className="advisor-list">
            {advisorDirectory.map((advisor) => (
              <div className="advisor-row" key={advisor.id}>
                <div className="advisor-meta">
                  <div className="advisor-name">{advisor.name}</div>
                  <div className="muted">{advisor.department}</div>
                </div>
                <span className={`badge ${advisor.available ? "green" : "amber"}`}>
                  {advisor.available ? "Available" : "Busy"}
                </span>
                <button className="ghost-btn" type="button" onClick={() => onToggleAdvisorAvailability(advisor.id)}>
                  Toggle Availability
                </button>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }

  if (view === "Manage Projects") {
    return (
      <>
        <SectionTitle title="Manage Projects" subtitle="Admin project overview and detail preview." />
        <ProjectGrid items={projects} onSelectProject={onSelectProject} compact />
        <ProjectDetailsCard project={selectedProject} />
      </>
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

function AuthScreen({ role, mode, onLogin, onSwitchMode, signupForm, onSignupFormChange, onRegister }) {
  return (
    <div className="login-page">
      <section className="welcome-panel">
        <div>
          <p className="eyebrow">Project Matching Platform</p>
          <h1>{mode === "login" ? "Welcome Back!" : "Create Your Account"}</h1>
          <p>
            {mode === "login"
              ? "Sign in to manage your projects and build your team."
              : "Register to create projects, join teams and connect with advisors."}
          </p>
        </div>
      </section>
      <section className="form-panel">
        <div className="card login-card auth-card">
          <div className="auth-toggle">
            <button
              className={`auth-tab ${mode === "login" ? "active" : ""}`}
              type="button"
              onClick={() => onSwitchMode("login")}
            >
              Sign In
            </button>
            <button
              className={`auth-tab ${mode === "signup" ? "active" : ""}`}
              type="button"
              onClick={() => onSwitchMode("signup")}
            >
              Sign Up
            </button>
          </div>

          {mode === "login" ? (
            <>
              <h2>{labelForRole(role)} Login</h2>
              <div className="field">
                <label>Email</label>
                <input placeholder="name@university.edu.tr" />
              </div>
              <div className="field">
                <label>Password</label>
                <input type="password" placeholder="********" />
              </div>
              <button className="primary-btn auth-submit" type="button" onClick={onLogin}>
                Sign In
              </button>
              <button className="ghost-btn auth-secondary" type="button" onClick={() => onSwitchMode("signup")}>
                Create an account
              </button>
            </>
          ) : (
            <>
              <h2>{labelForRole(role)} Registration</h2>
              <div className="field">
                <label>Full Name</label>
                <input
                  placeholder="Sevinc Yigit"
                  value={signupForm.fullName}
                  onChange={(event) => onSignupFormChange({ ...signupForm, fullName: event.target.value })}
                />
              </div>
              <div className="field">
                <label>Email</label>
                <input
                  placeholder="name@university.edu.tr"
                  value={signupForm.email}
                  onChange={(event) => onSignupFormChange({ ...signupForm, email: event.target.value })}
                />
              </div>
              <div className="field">
                <label>Password</label>
                <input
                  type="password"
                  placeholder="Create a password"
                  value={signupForm.password}
                  onChange={(event) => onSignupFormChange({ ...signupForm, password: event.target.value })}
                />
              </div>
              <div className="field">
                <label>Department</label>
                <input
                  placeholder="Software Engineering"
                  value={signupForm.department}
                  onChange={(event) => onSignupFormChange({ ...signupForm, department: event.target.value })}
                />
              </div>
              {role !== "student" && (
                <div className="field">
                  <label>{labelForRole(role)} Registration Password</label>
                  <input
                    type="password"
                    placeholder={`Enter ${labelForRole(role).toLowerCase()} access password`}
                    value={signupForm.rolePassword}
                    onChange={(event) => onSignupFormChange({ ...signupForm, rolePassword: event.target.value })}
                  />
                </div>
              )}
              <button className="primary-btn auth-submit" type="button" onClick={onRegister}>
                Register
              </button>
              <button className="ghost-btn auth-secondary" type="button" onClick={() => onSwitchMode("login")}>
                I already have an account
              </button>
              <p className="auth-hint">
                To register as an Advisor or Admin, please request the role-specific password from the course instructor.
              </p>
            </>
          )}
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

function ProjectGrid({ items, onSelectProject, onApplyToProject, compact = false }) {
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
            <span className="muted">{project.status}</span>
            <div className="inline-actions">
              <button className="ghost-btn" type="button" onClick={() => onSelectProject(project.id)}>
                View Details
              </button>
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

function ProjectDetailsCard({ project }) {
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
      </div>
    </div>
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

function InputField({ label, value, onChange, placeholder, span = false, textarea = false }) {
  return (
    <div className={`field ${span ? "span-2" : ""}`}>
      <label>{label}</label>
      {textarea ? (
        <textarea rows="5" value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} />
      ) : (
        <input value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} />
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
  if (role === "advisor") return "Sila Korklubasoglu";
  if (role === "admin") return "Admin";
  return "Sevinc Yigit";
}

function initialsForRole(role) {
  if (role === "advisor") return "SK";
  if (role === "admin") return "AD";
  return "SY";
}

export default App;

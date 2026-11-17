"use strict";

document.documentElement.classList.add("js-ready");

const menuToggle = document.querySelector(".menu-toggle");
const navContent = document.querySelector(".nav-content");
const navLinks = document.querySelectorAll(".nav-links a");

function setMenuOpen(isOpen) {
  if (!menuToggle || !navContent) return;
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
  navContent.classList.toggle("is-open", isOpen);
}

menuToggle?.addEventListener("click", () => {
  setMenuOpen(menuToggle.getAttribute("aria-expanded") !== "true");
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => setMenuOpen(false));
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") setMenuOpen(false);
});

const revealElements = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealElements.forEach((element) => revealObserver.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("is-visible"));
}

const roles = ["Java Developer", "Full Stack Developer", "Software Developer"];
const typedRole = document.querySelector(".typed-role");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

if (typedRole && !reducedMotion.matches) {
  let roleIndex = 0;
  let characterIndex = roles[0].length;
  let deleting = true;

  function typeNextCharacter() {
    const role = roles[roleIndex];
    characterIndex += deleting ? -1 : 1;
    typedRole.textContent = role.slice(0, characterIndex);

    let delay = deleting ? 48 : 86;
    if (deleting && characterIndex === 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      delay = 300;
    } else if (!deleting && characterIndex === roles[roleIndex].length) {
      deleting = true;
      delay = 1500;
    }
    window.setTimeout(typeNextCharacter, delay);
  }

  window.setTimeout(typeNextCharacter, 1800);
}

document.querySelectorAll(".project-detail-button").forEach((button) => {
  button.addEventListener("click", () => {
    const details = button.closest(".project-content")?.querySelector(".project-extra");
    if (!details) return;
    const isExpanded = button.getAttribute("aria-expanded") === "true";
    button.setAttribute("aria-expanded", String(!isExpanded));
    details.hidden = isExpanded;
    button.firstChild.textContent = isExpanded ? "Project details " : "Hide details ";
  });
});

document.querySelector(".resume-download")?.addEventListener("click", () => {
  const resume = [
    "SAKSHI DHAS",
    "Aspiring Java Full Stack Developer",
    "Maharashtra, India",
    "",
    "PROFILE",
    "MCA student passionate about software development and building practical applications. Currently learning full-stack Java and Spring Boot.",
    "",
    "EDUCATION",
    "Master of Computer Applications (MCA) — Bharati Vidyapeeth, Pune (Currently pursuing)",
    "Bachelor of Computer Applications (BCA) — Bharati Vidyapeeth University",
    "",
    "TECHNICAL SKILLS",
    "Core Java, Python, HTML5, CSS3, JavaScript, PHP, MySQL, SQLite, OOP concepts",
    "Currently learning: Full-stack Java and Spring Boot",
    "",
    "PROJECTS",
    "TaskFlow — Desktop task manager | Python, CustomTkinter, SQLite",
    "College Attendance Management System | Python Flask, MySQL, HTML, CSS",
    "Healthcare Appointment Booking System | HTML, CSS, JavaScript, PHP, MySQL",
    "ResumeAI — AI resume builder | Web application",
    "Movie Website | HTML, CSS, JavaScript",
    "",
    "Contact details and project links can be added when available."
  ].join("\n");
  const file = new Blob([resume], { type: "text/plain;charset=utf-8" });
  const downloadUrl = URL.createObjectURL(file);
  const downloadLink = document.createElement("a");
  downloadLink.href = downloadUrl;
  downloadLink.download = "Sakshi-Dhas-Resume.txt";
  document.body.append(downloadLink);
  downloadLink.click();
  downloadLink.remove();
  window.setTimeout(() => URL.revokeObjectURL(downloadUrl), 1000);
});

const contactForm = document.querySelector("#contact-form");
const formStatus = document.querySelector("#form-status");

contactForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!contactForm.reportValidity()) return;

  const formData = new FormData(contactForm);
  const message = [
    `Name: ${formData.get("name")}`,
    `Email: ${formData.get("email")}`,
    "",
    String(formData.get("message"))
  ].join("\n");

  try {
    await navigator.clipboard.writeText(message);
    formStatus.textContent = "Message copied. Paste it into your email app to send it.";
    formStatus.classList.remove("is-error");
    formStatus.classList.add("is-success");
  } catch {
    formStatus.textContent = "Clipboard access isn’t available here. Select and copy your message manually.";
    formStatus.classList.remove("is-success");
    formStatus.classList.add("is-error");
  }
});

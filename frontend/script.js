/* ============================
   EVENTS DATA
============================ */
const eventsData = [
  {
    id: 1,
    title: "Tech Symposium 2026",
    category: "tech",
    featured: true,
    date: "April 15, 2026",
    location: "Block A, KU Campus",
    description: "Join the biggest tech event...",
    price: "Free",
    img: "https://kunievents.netlify.app/e3.jpeg",
    time: "10:00 AM - 6:00 PM",
    seats: 500
  },
  {
    id: 2,
    title: "Cultural Fest – Tarang 2026",
    category: "cultural",
    featured: true,
    date: "April 22, 2026",
    location: "Main Auditorium",
    description: "Annual cultural fest...",
    price: "₹100",
    img: "https://kunievents.netlify.app/e1.jpeg",
    time: "9:00 AM - 10:00 PM",
    seats: 2000
  },
  {
    id: 3,
    title: "UX Workshop",
    category: "workshop",
    featured: false,
    date: "April 28, 2026",
    location: "Design Studio",
    description: "Hands-on UX workshop",
    price: "₹250",
    img: "https://kunievents.netlify.app/e2.jpeg",
    time: "9:30 AM - 5:00 PM",
    seats: 60
  },
  {
    id: 4,
    title: "Sports Meet",
    category: "sports",
    featured: false,
    date: "May 3, 2026",
    location: "Sports Complex",
    description: "Inter-college sports",
    price: "Free",
    img: "https://kunievents.netlify.app/e4.jpeg",
    time: "7:00 AM - 7:00 PM",
    seats: 1000
  },
  {
    id: 5,
    title: "AI Conference",
    category: "tech",
    featured: true,
    date: "May 10, 2026",
    location: "Seminar Hall",
    description: "AI future discussions",
    price: "₹150",
    img: "https://kunievents.netlify.app/e3.jpeg",
    time: "11:00 AM - 5:00 PM",
    seats: 300
  },
  {
    id: 6,
    title: "Photography Walk",
    category: "cultural",
    featured: false,
    date: "May 18, 2026",
    location: "KU Campus",
    description: "Photography event",
    price: "Free",
    img: "https://kunievents.netlify.app/e2.jpeg",
    time: "7:00 AM - 12:00 PM",
    seats: 80
  }
];

let currentFilter = "all";
let currentSearch = "";

/* ============================
   RENDER EVENTS
============================ */
function renderEvents() {
  const grid = document.getElementById("eventsGrid");
  const noEvents = document.getElementById("noEvents");

  const filtered = eventsData.filter(ev => {
    const matchFilter =
      currentFilter === "all" ||
      (currentFilter === "featured" && ev.featured) ||
      ev.category === currentFilter;

    const matchSearch =
      !currentSearch ||
      ev.title.toLowerCase().includes(currentSearch) ||
      ev.description.toLowerCase().includes(currentSearch);

    return matchFilter && matchSearch;
  });

  grid.innerHTML = "";

  if (filtered.length === 0) {
    noEvents.style.display = "block";
    return;
  }

  noEvents.style.display = "none";

  filtered.forEach(ev => {
    const card = document.createElement("div");
    card.className = "event-card";

    card.innerHTML = `
      <div class="event-card-img">
        <img src="${ev.img}" />
      </div>
      <div class="event-card-body">
        <h3>${ev.title}</h3>
        <p>${ev.date}</p>
        <button class="btn btn-primary" onclick="registerEvent(${ev.id})">Register</button>
      </div>
    `;

    grid.appendChild(card);
  });
}

/* ============================
   FILTER + SEARCH
============================ */
function setFilter(filter, btn) {
  currentFilter = filter;
  document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
  renderEvents();
}

function filterEvents() {
  currentSearch = document.getElementById("searchInput").value.toLowerCase();
  renderEvents();
}

/* ============================
   REGISTER EVENT (FIXED)
============================ */
async function registerEvent(id) {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    openLogin();
    return;
  }

  try {
    const res = await fetch("http://localhost:5000/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user_id: user.id,
        event_id: id
      })
    });

    if (res.ok) {
      showToast("Registered successfully ✅");
    } else {
      showToast("Already registered ❌");
    }
  } catch (err) {
    console.error(err);
    showToast("Error ❌");
  }
}

/* ============================
   LOGIN
============================ */
async function handleLogin(e) {
  e.preventDefault();

  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPass").value;

  try {
    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    if (res.ok) {
      const user = await res.json();

      localStorage.setItem("user", JSON.stringify(user));

      closeModal("loginModal");

      const profileBtn = document.getElementById("profileBtn");
      if (profileBtn) {
        profileBtn.innerHTML = `<i class="fa-solid fa-user-check"></i> <span>Hi, ${email.split("@")[0]}</span>`;
      }

      showToast("Login successful ✅");
    } else {
      showToast("Invalid credentials ❌");
    }
  } catch (err) {
    console.error(err);
    showToast("Server error ❌");
  }
}

/* ============================
   REGISTER USER
============================ */
async function handleRegister(e) {
  e.preventDefault();

  const email = document.getElementById("regEmail").value;
  const password = document.getElementById("regPass").value;

  try {
    const res = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    if (res.ok) {
      showToast("Registered successfully ✅");
      toggleAuth();
    } else {
      showToast("User already exists ❌");
    }
  } catch (err) {
    console.error(err);
    showToast("Server error ❌");
  }
}

/* ============================
   TOGGLE LOGIN/REGISTER
============================ */
function toggleAuth() {
  const login = document.getElementById("loginForm");
  const register = document.getElementById("registerForm");
  const text = document.getElementById("toggleText");

  if (register.style.display === "none") {
    register.style.display = "block";
    login.style.display = "none";
    text.textContent = "Already have an account?";
  } else {
    register.style.display = "none";
    login.style.display = "block";
    text.textContent = "Don't have an account?";
  }
}
function openProfile() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    openLogin(); // show login if not logged in
    return;
  }

  document.getElementById("profileEmail").textContent = user.email;

  openModal("profileModal");
}
function logoutUser() {
  localStorage.removeItem("user");

  closeModal("profileModal");

  // reset button text
  const profileBtn = document.getElementById("profileBtn");
  if (profileBtn) {
    profileBtn.innerHTML = `<i class="fa-regular fa-user"></i> <span>Profile</span>`;
  }

  showToast("Logged out successfully ✅");
}

/* ============================
   MODALS
============================ */
function openModal(id) {
  document.getElementById(id).classList.add("open");
}

function closeModal(id) {
  document.getElementById(id).classList.remove("open");
}

function openLogin() {
  openModal("loginModal");
}

/* ============================
   TOAST
============================ */
function showToast(msg) {
  alert(msg);
}function openProfile() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    openLogin();
    return;
  }

  document.getElementById("profileEmail").textContent = user.email;

  openModal("profileModal");
}

/* ============================
   INIT
============================ */
document.addEventListener("DOMContentLoaded", () => {
  renderEvents();
});
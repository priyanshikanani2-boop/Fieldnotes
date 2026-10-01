const stories = [
  {
    id: "morning-rituals", category: "Life", title: "A slower kind of morning", author: "Avery Chen", date: "Sep 16, 2026", minutes: 5,
    excerpt: "What happens when the first thing you reach for isn't your phone, but the light at the window?",
    image: "https://images.unsplash.com/photo-1445116572660-236099ec97a0?auto=format&fit=crop&w=900&q=80", reads: 982,
    body: "The kettle is the first thing to make a sound. Then the floorboards, then the neighborhood outside the window finding its voice.\n\nFor a long time, I let a glowing screen decide what my mornings felt like. Headlines, messages, and other people's urgencies arrived before I had even met my own day.\n\nNow I leave the phone in another room. I make coffee slowly. I open the window, even when the air is sharp. Nothing dramatic happens. That is the lovely part. The day gets to arrive at its own pace, and so do I."
  },
  {
    id: "coastline", category: "Places", title: "The coastline that taught me to look closer", author: "Noah Bennett", date: "Sep 14, 2026", minutes: 7,
    excerpt: "A weekend on the northern shore, following tide pools and the people who know them best.",
    image: "https://images.unsplash.com/photo-1473116763249-2faaef81ccda?auto=format&fit=crop&w=900&q=80", reads: 845,
    body: "We arrived at low tide, when the shoreline pulls back its blue curtain and leaves the small world behind it exposed.\n\nLena has been coming to this beach since she was little. She walks slowly, not because of the pebbles, but because there is always something worth seeing: a sea star folded against the rock, a glint of green glass, the little silver flick of a fish in the shallows.\n\nBy lunch, the water was returning. We sat on a sun-warmed wall and watched the ordinary work of the tide. I went home wanting to be the kind of person who looks a little longer."
  },
  {
    id: "ordinary-music", category: "Culture", title: "The songs hiding in an ordinary day", author: "Jules Okafor", date: "Sep 12, 2026", minutes: 4,
    excerpt: "A listening exercise for the walk to work, the washing up, and everything between.",
    image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=900&q=80", reads: 728,
    body: "The laundromat has a soundtrack: the slow tumble of the big machines, a little metallic click as the door turns, someone's radio leaking a chorus into the afternoon.\n\nI started writing down these sounds as a way to pay attention. Not to make them beautiful, exactly. They were already doing fine. I only wanted to meet the moment on its own terms.\n\nAfter a week, my list included rain on the market awning and the elevator in my building clearing its throat. It turns out the ordinary day is never quite silent."
  },
  {
    id: "making-room", category: "Ideas", title: "On making room for unfinished things", author: "Sam Rivera", date: "Sep 10, 2026", minutes: 6,
    excerpt: "A small case for the half-read book, the rough draft, and the work still taking shape.",
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=900&q=80", reads: 691,
    body: "On the corner of my desk sits a notebook with three first pages and no second ones. I used to see it as proof that I could not finish anything. Lately, I have begun to see it as something else: evidence that I am willing to start.\n\nThe finished things get all the shelf space. They have spines and dates and their names written neatly on the cover. But the unfinished things have a kind of openness the finished ones cannot keep. They still have room for surprise.\n\nI am learning to leave a little space for that."
  },
  {
    id: "little-bookshop", category: "Places", title: "A bookshop with no clock on the wall", author: "Mina Patel", date: "Sep 8, 2026", minutes: 5,
    excerpt: "Inside the neighborhood shop that makes a whole afternoon feel like a good idea.",
    image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=900&q=80", reads: 614,
    body: "There is no clock in the bookshop on Alder Street. I noticed this only after my second visit, which feels like a small kind of proof that the place is working.\n\nThe owner, Bea, says she took it down during the renovation and forgot to put it back. Now she considers it a feature. People browse without checking the time. Children read on the floor. Someone always comes in looking for a gift and leaves with something for themselves.\n\nI left with a book I did not know I needed and nowhere in particular to be."
  },
  {
    id: "garden", category: "Life", title: "What the garden gives back", author: "Rory Ellis", date: "Sep 5, 2026", minutes: 8,
    excerpt: "The community garden is less about growing vegetables and more about growing alongside each other.",
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=900&q=80", reads: 572,
    body: "The garden is noisy on Saturdays. There are spades meeting stubborn earth, children negotiating over watering cans, and the steady conversation of people who do not see one another during the rest of the week.\n\nWe grow tomatoes and herbs and more zucchini than any of us can reasonably eat. We also grow the habit of showing up. That has turned out to be the better harvest.\n\nWhen the season ends, we fold the chairs and cover the beds. Then we make tea and plan what to plant next year."
  }
];

const featureStory = {
  id: "beginning-again", category: "Editor's letter", title: "The quiet art of beginning again", author: "Mara Lewis", date: "Sep 18, 2026", minutes: 6,
  excerpt: "On small resets, open windows, and the particular courage it takes to start where you are.",
  image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1400&q=85", reads: 1200,
  body: "Every September, the light changes its mind. It comes in lower through the kitchen window and lands in a different place on the table. I have always taken this as permission to begin again.\n\nNot in a sweeping, life-overhaul kind of way. More like opening the windows. Clearing one small corner of the desk. Calling someone I have been meaning to call.\n\nWe tend to make beginnings sound like grand gestures. But most of the ones that matter arrive quietly. A walk taken a different way. A page written without knowing where it leads. A kind word offered before you have thought of the perfect thing to say.\n\nThe point is not to become someone else by Monday. It is to notice where you are, and begin there."
};

const storageKeys = { posts: "fieldnotes-posts", saved: "fieldnotes-saved" };
const readStorage = (key, fallback) => {
  try {
    const value = JSON.parse(localStorage.getItem(key));
    return value ?? fallback;
  } catch {
    return fallback;
  }
};

let userStories = readStorage(storageKeys.posts, []);
let savedStories = new Set(readStorage(storageKeys.saved, []));
let activeCategory = "All";
let savedOnly = false;
let toastTimer;

const grid = document.querySelector("#story-grid");
const searchInput = document.querySelector("#story-search");
const resultNote = document.querySelector("#result-note");
const emptyState = document.querySelector("#empty-state");
const savedToggle = document.querySelector("#saved-toggle");
const storyDialog = document.querySelector("#story-dialog");
const composeDialog = document.querySelector("#compose-dialog");
const toast = document.querySelector("#toast");

function allStories() {
  return [...userStories, ...stories];
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[character]);
}

function initials(name) {
  return name.split(/\s+/).slice(0, 2).map((part) => part[0] ?? "").join("").toUpperCase();
}

function renderStories() {
  const query = searchInput.value.trim().toLowerCase();
  const filtered = allStories().filter((story) => {
    const matchesCategory = activeCategory === "All" || story.category === activeCategory;
    const matchesSearch = !query || `${story.title} ${story.author} ${story.category} ${story.excerpt}`.toLowerCase().includes(query);
    const matchesSaved = !savedOnly || savedStories.has(story.id);
    return matchesCategory && matchesSearch && matchesSaved;
  });

  grid.innerHTML = filtered.map((story, index) => `
    <article class="story-card" style="animation-delay:${Math.min(index * 45, 225)}ms">
      <div class="story-cover">
        <button class="story-image-button" type="button" data-read="${escapeHtml(story.id)}" aria-label="Read ${escapeHtml(story.title)}">
          <img src="${escapeHtml(story.image)}" alt="" loading="lazy">
          <span class="story-category">${escapeHtml(story.category)}</span>
        </button>
        <button class="bookmark-button" type="button" data-save="${escapeHtml(story.id)}" aria-label="${savedStories.has(story.id) ? "Remove saved story" : "Save story"}" aria-pressed="${savedStories.has(story.id)}">${savedStories.has(story.id) ? "♥" : "♡"}</button>
      </div>
      <div class="story-meta"><span>${escapeHtml(story.category)}</span><span>${escapeHtml(story.date)} &nbsp;·&nbsp; ${story.minutes} min</span></div>
      <h3><button type="button" data-read="${escapeHtml(story.id)}">${escapeHtml(story.title)}</button></h3>
      <p class="story-excerpt">${escapeHtml(story.excerpt)}</p>
      <div class="story-author"><span class="avatar avatar-green">${escapeHtml(initials(story.author))}</span><span>${escapeHtml(story.author)}</span></div>
    </article>`).join("");

  emptyState.hidden = filtered.length > 0;
  grid.hidden = filtered.length === 0;
  resultNote.textContent = query || activeCategory !== "All" || savedOnly
    ? `${filtered.length} ${filtered.length === 1 ? "story" : "stories"}${savedOnly ? " saved" : ""}`
    : "";
  document.querySelector("#saved-count").textContent = savedStories.size;
}

function renderPopular() {
  const popular = [...allStories()].sort((a, b) => b.reads - a.reads).slice(0, 3);
  document.querySelector("#popular-list").innerHTML = popular.map((story) => `
    <li><button class="popular-story" type="button" data-read="${escapeHtml(story.id)}"><strong>${escapeHtml(story.title)}</strong><span>${escapeHtml(story.author)} &nbsp;·&nbsp; ${story.minutes} min</span></button></li>`).join("");
}

function findStory(id) {
  return [featureStory, ...allStories()].find((story) => story.id === id);
}

function openStory(story) {
  if (!story) return;
  document.querySelector("#dialog-story-content").innerHTML = `
    <img class="dialog-story-image" src="${escapeHtml(story.image)}" alt="">
    <article class="dialog-story-copy">
      <p class="eyebrow">${escapeHtml(story.category)} &nbsp;·&nbsp; ${story.minutes} min read</p>
      <h2 id="dialog-title">${escapeHtml(story.title)}</h2>
      <p class="dialog-story-deck">${escapeHtml(story.excerpt)}</p>
      <div class="dialog-story-byline"><span class="avatar avatar-green">${escapeHtml(initials(story.author))}</span><span>By <strong>${escapeHtml(story.author)}</strong> &nbsp;·&nbsp; ${escapeHtml(story.date)}</span></div>
      <div class="dialog-story-body">${escapeHtml(story.body || story.excerpt)}</div>
    </article>`;
  storyDialog.showModal();
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove("is-visible"), 2400);
}

function saveStories() {
  localStorage.setItem(storageKeys.saved, JSON.stringify([...savedStories]));
  renderStories();
}

document.querySelectorAll(".category-chip").forEach((button) => {
  button.addEventListener("click", () => {
    activeCategory = button.dataset.category;
    document.querySelectorAll(".category-chip").forEach((chip) => {
      const selected = chip === button;
      chip.classList.toggle("is-selected", selected);
      chip.setAttribute("aria-pressed", String(selected));
    });
    renderStories();
  });
});

searchInput.addEventListener("input", renderStories);
document.addEventListener("keydown", (event) => {
  if (event.key === "/" && !["INPUT", "TEXTAREA", "SELECT"].includes(document.activeElement.tagName)) {
    event.preventDefault();
    searchInput.focus();
  }
  if (event.key === "Escape") {
    storyDialog.close();
    composeDialog.close();
  }
});

document.addEventListener("click", (event) => {
  const saveButton = event.target.closest("[data-save]");
  if (saveButton) {
    event.stopPropagation();
    const id = saveButton.dataset.save;
    if (savedStories.has(id)) {
      savedStories.delete(id);
      showToast("Removed from your saved stories.");
    } else {
      savedStories.add(id);
      showToast("Saved for a quieter moment.");
    }
    saveStories();
    return;
  }

  const readButton = event.target.closest("[data-read]");
  if (readButton) openStory(findStory(readButton.dataset.read));
  if (event.target.closest("[data-close-dialog]")) {
    storyDialog.close();
    composeDialog.close();
  }
});

document.querySelector("#feature-open").addEventListener("click", () => openStory(featureStory));
document.querySelector("#feature-read").addEventListener("click", () => openStory(featureStory));
document.querySelector("#open-compose").addEventListener("click", () => composeDialog.showModal());

savedToggle.addEventListener("click", () => {
  savedOnly = !savedOnly;
  savedToggle.setAttribute("aria-pressed", String(savedOnly));
  savedToggle.querySelector("span:nth-child(2)").textContent = savedOnly ? "All stories" : "Saved";
  renderStories();
  document.querySelector("#stories").scrollIntoView({ behavior: "smooth", block: "start" });
});

document.querySelector("#clear-filters").addEventListener("click", () => {
  searchInput.value = "";
  activeCategory = "All";
  savedOnly = false;
  savedToggle.setAttribute("aria-pressed", "false");
  savedToggle.querySelector("span:nth-child(2)").textContent = "Saved";
  document.querySelectorAll(".category-chip").forEach((chip) => {
    const selected = chip.dataset.category === "All";
    chip.classList.toggle("is-selected", selected);
    chip.setAttribute("aria-pressed", String(selected));
  });
  renderStories();
});

document.querySelector("#compose-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const title = form.get("title").trim();
  const author = form.get("author").trim();
  const summary = form.get("summary").trim();
  const body = form.get("body").trim();
  const image = form.get("image").trim();
  const story = {
    id: `reader-${Date.now()}`,
    title,
    author,
    category: form.get("category"),
    excerpt: summary,
    body,
    image: image || "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=900&q=80",
    date: new Intl.DateTimeFormat("en", { month: "short", day: "numeric", year: "numeric" }).format(new Date()),
    minutes: Math.max(1, Math.ceil(body.split(/\s+/).length / 200)),
    reads: 0
  };

  try {
    userStories = [story, ...userStories];
    localStorage.setItem(storageKeys.posts, JSON.stringify(userStories));
  } catch {
    userStories = userStories.filter((post) => post.id !== story.id);
    showToast("Could not save this story. Check your browser storage.");
    return;
  }

  event.currentTarget.reset();
  composeDialog.close();
  activeCategory = "All";
  savedOnly = false;
  searchInput.value = "";
  savedToggle.setAttribute("aria-pressed", "false");
  savedToggle.querySelector("span:nth-child(2)").textContent = "Saved";
  document.querySelectorAll(".category-chip").forEach((chip) => {
    const selected = chip.dataset.category === "All";
    chip.classList.toggle("is-selected", selected);
    chip.setAttribute("aria-pressed", String(selected));
  });
  renderStories();
  renderPopular();
  showToast("Your story is published on this device.");
  document.querySelector("#stories").scrollIntoView({ behavior: "smooth", block: "start" });
});

document.querySelector("#newsletter-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const emailInput = document.querySelector("#newsletter-email");
  document.querySelector("#newsletter-message").textContent = `You're on the list, ${emailInput.value.trim()}. See you Sunday.`;
  emailInput.value = "";
});

renderStories();
renderPopular();
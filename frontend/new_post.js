// DOM Elements
const postForm = document.getElementById("post-form");
const postTitle = document.getElementById("post-title");
const postText = document.getElementById("post-text");

// Handle posting
postForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const title = postTitle.value.trim();
  const body = postText.value.trim();
  if (!title || !body) return;

  try {
    const res = await fetch(`http://localhost:3000/posts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, body }),
    });

    if (!res.ok) throw new Error("Failed to create new post");

    const newPost = await res.json();

    // Redirect directly to new post
    window.location.href = `post.html?id=${newPost.id}`;
  } catch (err) {
    alert(err.message);
  }
});

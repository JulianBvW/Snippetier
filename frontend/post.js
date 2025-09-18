// Get Post ID
const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get("id");

// DOM Elements
const postContainer = document.getElementById("single-post-container");
const commentsContainer = document.getElementById("comment-list-container");
const commentForm = document.getElementById("comment-form");
const commentText = document.getElementById("comment-text");

// Load and display post
async function loadPost() {
  try {
    const res = await fetch(`http://localhost:3000/posts/${postId}`);
    if (!res.ok) throw new Error("Post not found");
    const post = await res.json();

    // Render post and comments
    renderPost(post);
    renderComments(post.comments);
  } catch (err) {
    postContainer.innerHTML = `<p style="color: red">Error loading post: ${err.message}</p>`;
  }
}

// Render function for the post
function renderPost(post) {
  postContainer.innerHTML = `
    <div class="post">
	
	<div class="meta green">
	  <span class="author">${post.author}</span>
	  <span class="date">${post.created_at}</span>
	</div>
	
	<div class="post-title">${post.title}</div>
	<div class="post-body">
	  ${post.body}
	</div>
	
	<div class="actions green" style="justify-content: right;">
	  <div class="stats">
		<button class="action-btn"><span class="key">Y</span> ${post.likes}</button>
		<button class="action-btn"><span class="key">n</span> ${post.dislikes}</button>
		<button class="action-btn"><span class="key">//</span> ${post.comments.length}</button>
	  </div>
	</div>
    </div>`;
}

// Render function for comments
function renderComments(comments) {
  if (comments.length === 0) {
    commentsContainer.innerHTML = `
      <div class="comment-body">
        <p>No comments yet.
        <br>Be the first to comment!</p>
      </div>`;
    return;
  }

  commentsContainer.innerHTML = comments
    .map(
      (comment) => `
    <div class="comment">
      	<div class="meta green">
		  <span class="author">${comment.author}</span>
		  <span class="date">${comment.created_at}</span>
		</div>
        <div class="comment-body">
          ${comment.body}
        </div>
    </div>
    `
    )
    .join("");
}

// Handle new comment submission
commentForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const body = commentText.value.trim();
  if (!body) return;

  try {
    const res = await fetch(`http://localhost:3000/posts/${postId}/comments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ body }),
    });

    if (!res.ok) throw new Error("Failed to add comment");

    const newComment = await res.json();

    // Append comment immediately
    commentsContainer.innerHTML += `
    <div class="comment">
      	<div class="meta green">
		  <span class="author">${newComment.author}</span>
		  <span class="date">${newComment.created_at}</span>
		</div>
        <div class="comment-body">
          ${newComment.body}
        </div>
    </div>
    `;

    // Clear textarea
    commentText.value = "";
  } catch (err) {
    alert(err.message);
  }
});

loadPost();

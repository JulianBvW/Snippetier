async function loadPosts() {
  const res = await fetch("http://localhost:3000/posts");
  const posts = await res.json();

  const container = document.getElementById("post-list-container");
  container.innerHTML = posts
    .map(
      (post) => `
      <div class="post">
	  
		<div class="meta green">
		  <span class="author">${post.author}</span>
		  <span class="date">${post.created_at}</span>
		</div>
		
		<div class="post-title">${post.title}</div>
		<div class="post-body">
		  ${post.body.split(" ").slice(0, 40).join(" ")}...
		</div>
		
		<div class="actions">
		  <button class="action-btn" onclick="window.location.href='post.html?id=${
        post.id
      }'">&gt; see post</button>
		  <div class="stats">
			<button class="action-btn"><span class="key">Y</span> ${post.likes}</button>
			<button class="action-btn"><span class="key">n</span> ${post.dislikes}</button>
			<button class="action-btn"><span class="key">//</span> ${
        post.comments.length
      }</button>
		  </div>
		</div>
		
	  </div>
    `
    )
    .join("");
}

loadPosts();

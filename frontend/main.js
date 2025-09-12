async function loadPosts() {
  const res = await fetch("http://localhost:3000/posts");
  const posts = await res.json();

  const container = document.getElementById("posts");
  container.innerHTML = posts
    .map(
      (post) => `
      <div class="post">
	  
		<div class="meta green">
		  <span class="author">${post.author}</span>
		  <span class="date">${post.created_at}</span>
		</div>
		
		<div class="title">${post.title}</div>
		<div class="excerpt">
		  ${post.body.split(" ").slice(0, 40).join(" ")}...
		</div>
		
		<div class="actions green">
		  <span class="see-post">&gt; see post</span>
		  <div class="stats">
			<span><span class="key">Y</span> ${post.likes}</span>
			<span><span class="key">n</span> ${post.dislikes}</span>
			<span><span class="key">//</span> ${post.comments.length}</span>
		  </div>
		</div>
		
	  </div>
    `
    )
    .join("");
}

loadPosts();

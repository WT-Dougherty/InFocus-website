function handleMarkdownResponse(response) {
  return response.text();
}

function convertMarkdownToHtml(markdown) {
  const html = marked.parse(markdown);
  document.getElementById('markdown-content').innerHTML = html;
  hljs.highlightAll();
}

function showError() {
  document.getElementById('markdown-content').innerText = 'Failed to load Markdown file.';
}

// Set up syntax highlighting behavior for marked
marked.setOptions({
  highlight: function (code) {
    return hljs.highlightAuto(code).value;
  }
});

// Get the ?file=... value from the URL
var file = new URLSearchParams(window.location.search).get('file');

// Fetch & render the Markdown file
if (file) {
  fetch(file)
    .then(handleMarkdownResponse)
    .then(convertMarkdownToHtml)
    .catch(showError);
} else {
  document.getElementById('markdown-content').innerText = 'Project Coming Soon';
}
const file = new URLSearchParams(window.location.search).get('file');

marked.setOptions({
  highlight: function (code, lang) {
    return hljs.highlightAuto(code).value;
  }
});

if (file) {
  fetch(file)
    .then(res => res.text())
    .then(markdown => {
      const html = marked(markdown);
      document.getElementById('markdown-content').innerHTML = html;
      hljs.highlightAll();
    })
    .catch(() => {
      document.getElementById('markdown-content').innerText = 'Failed to load Markdown file.';
    });
} else {
  document.getElementById('markdown-content').innerText = 'No file specified.';
}

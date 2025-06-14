function blurOtherLinks(activeLink) {
  for (let i = 0; i < links.length; i++) {
    if (links[i] !== activeLink) {
      links[i].style.filter = 'blur(2px)';
    }
  }
}

function clearAllBlurs() {
  for (let i = 0; i < links.length; i++) {
    links[i].style.filter = 'none';
  }
}

function handleLink(link) {
  link.addEventListener('mouseenter', function () {
    blurOtherLinks(link);
  });

  link.addEventListener('mouseleave', function () {
    clearAllBlurs();
  });
}

// main
var links = document.querySelectorAll('.navbar a');
for (var i = 0; i < links.length; i++) {
  handleLink(links[i]);
}
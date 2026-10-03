const searchInput = document.getElementById('linkSearch');
const links = document.querySelectorAll('.card-container a');

// 1. Target the element where you want the count to appear
const countDisplay = document.getElementById('linkCount');

function filterLinks() {
  const query = searchInput.value.toLowerCase();
  let visibleCount = 0;

  links.forEach(link => {
    const text = link.textContent.toLowerCase();

    if (text.includes(query)) {
      link.style.display = 'block';
      visibleCount++;
    } else {
      link.style.display = 'none';
    }
  });

  if (countDisplay) {
    if (visibleCount === 0) {
      countDisplay.textContent = '⚠️ No jobs found.';
    } else if (visibleCount === 1) {
      countDisplay.textContent = '1 job found.';
    } else {
      countDisplay.textContent = `${visibleCount} jobs found.`;
    }
  }
}

// Run the filter every time the user types
searchInput.addEventListener('input', filterLinks);

// Run the filter once on page load to show the initial count
filterLinks();

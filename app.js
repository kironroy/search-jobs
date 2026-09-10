const searchInput = document.getElementById('linkSearch');
const links = document.querySelectorAll('.card-container a');

// 1. Target the element where you want the count to appear
const countDisplay = document.getElementById('linkCount');

function filterLinks() {
  const query = searchInput.value.toLowerCase();
  let visibleCount = 0; // 2. Initialize the counter

  links.forEach(link => {
    const text = link.textContent.toLowerCase();

    // 3. Check for matches and increment the counter
    if (text.includes(query)) {
      link.style.display = 'block';
      visibleCount++;
    } else {
      link.style.display = 'none';
    }
  });

  // 4. Render the count or "Item not found" to the HTML
  if (countDisplay) {
    if (visibleCount === 0) {
      countDisplay.textContent = '⚠️ Item not found.';
    } else {
      countDisplay.textContent = `${visibleCount} job site.`;
    }
  }
}

// Run the filter every time the user types
searchInput.addEventListener('input', filterLinks);

// Run the filter once on page load to show the initial count
filterLinks();

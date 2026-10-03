document.addEventListener('DOMContentLoaded', () => {
  const linkList = document.getElementById('link-list');
  const filterBtns = document.querySelectorAll('.filter-btn');
  let allLinks = [];

  // 1. Fetch JSON data
  async function fetchLinks() {
    try {
      const response = await fetch('data.json');
      if (!response.ok) throw new Error('Network response was not ok');
      allLinks = await response.json();
      renderLinks(allLinks);
    } catch (error) {
      linkList.innerHTML = `<li style="color: red;">Error loading links. Please ensure data.json is in the correct folder.</li>`;
      console.error('Error fetching data:', error);
    }
  }

  // 2. Render Links to the DOM
  function renderLinks(links) {
    linkList.innerHTML = '';

    if (links.length === 0) {
      linkList.innerHTML = `<li>No links found for this category.</li>`;
      return;
    }

    links.forEach(link => {
      const li = document.createElement('li');
      li.className = 'link-card';

  li.innerHTML = `
        <span class="keyword-badge">${link.keyword}</span>
        <img src="${link.logo}" alt="${link.alt}" style="max-height: 50px; width: auto; margin-top: 10px; display: block;">
        <h3><a href="${link.url}" target="_blank" rel="noopener noreferrer">${link.name}</a></h3>
        <p>${link.description}</p>
      `;
      linkList.appendChild(li);
    });
  }

  // 3. Handle Filtering
  filterBtns.forEach(btn => {
    btn.addEventListener('click', e => {
      // Update active state and ARIA attributes for screen readers
      filterBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-pressed', 'false');
      });
      e.target.classList.add('active');
      e.target.setAttribute('aria-pressed', 'true');

      const filterType = e.target.getAttribute('data-filter');

      if (filterType === 'all') {
        renderLinks(allLinks);
      } else {
        // Filter by the 'keyword' parameter from your JSON
        const filteredLinks = allLinks.filter(
          link => link.keyword === filterType,
        );
        renderLinks(filteredLinks);
      }
    });
  });

  fetchLinks();
});

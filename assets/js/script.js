const shortcutModal = new bootstrap.Modal(document.getElementById('shortcutModal'));

document.getElementById('inputForm').addEventListener('submit', (evt) => {
  evt.preventDefault();

  // DOM selectors
  const linksListEl = document.getElementById('linksList');
  const nameInputEl = document.getElementById('nameInput');
  const urlInputEl = document.getElementById('urlInput');

  // Get user input
  const name = nameInputEl.value;
  const url = urlInputEl.value;

  // If not user inputs don't do anything
  if (!name || !url) {
    return;
  }

  // Reset the input form
  nameInputEl.value = '';
  urlInputEl.value = '';

  // Get the base url of the website
  const favIcoUrl = url.match(/[^https:/].+.com/i);

  // Create the li element and insert to the page
  const htmlStr = `
    <li>
      <a href="${url}" target="_blank" class="card col align-center">
        <img src='https://icons.duckduckgo.com/ip3/${favIcoUrl}.ico' alt="" />
        <span>${name}</span>
      </a>
    </li>
    `;
  linksListEl.insertAdjacentHTML('beforeend', htmlStr);

  // Close the modal
  shortcutModal.hide();

  // Save the list to localStorage
  localStorage.setItem("shortcuts", linksListEl.innerHTML);
});

addEventListener('DOMContentLoaded', () => {
  document.getElementById('linksList').innerHTML = localStorage.getItem("shortcuts") || '';
})

const shortcutModal = new bootstrap.Modal(document.getElementById('shortcutModal'));

// DOM selectors
const linksListEl = document.getElementById('linksList');
const nameInputEl = document.getElementById('nameInput');
const urlInputEl = document.getElementById('urlInput');

// Form submission handler to add a shortcut to the list
document.getElementById('inputForm').addEventListener('submit', (evt) => {
  evt.preventDefault();

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
  const favIcoUrl = url.match(/(?:https:\/\/)(.*.com)/i);

  // Create the li element and insert to the page
  const htmlStr = `
    <li id="${name}" draggable="true">
      <button class="delete-btn" draggable="false">x</button>
      <a href="${url}" class="card col align-center">
        <img src='https://icons.duckduckgo.com/ip3/${favIcoUrl}.ico' alt="" draggable="false"/>
        ${name}
      </a>
    </li>`;
  linksListEl.insertAdjacentHTML('beforeend', htmlStr);

  // Close the modal
  shortcutModal.hide();

  // Save the list to localStorage
  localStorage.setItem("shortcuts", linksListEl.innerHTML);
});

addEventListener('DOMContentLoaded', () => {
  linksListEl.innerHTML = localStorage.getItem("shortcuts") || '';

  // Delete button event handler
  linksListEl.addEventListener('click', (evt) => {
    // If not a delete button exit out
    if (!evt.target.matches('.delete-btn')) {
      return;
    }
    // Delete the parent element ie. li tag
    evt.target.parentElement.remove();

    // Save the list to localStorage
    localStorage.setItem("shortcuts", linksListEl.innerHTML);
  })

  // Draging and Drop API
  linksListEl.addEventListener('dragstart', (evt) => {
    // Store the dragged element
    evt.dataTransfer.setData('text/plain', evt.target.parentElement.id);
    evt.dataTransfer.setDragImage(evt.target.parentElement, 0, 0);
    evt.target.classList.add('dragging');
  });

  // Set up the dragover event handler to allow the drop
  linksListEl.addEventListener('dragover', (evt) => {
    // Prevent the default behavior to allow dropping
    evt.preventDefault();
    evt.target.classList.add('dragover');
  });

  // Set up the dragleave event handler to remove the highlight
  linksListEl.addEventListener('dragleave', (evt) => {
    evt.target.classList.remove('dragover');
  });

  // Set up the drop event handler
  linksListEl.addEventListener('drop', (evt) => {
    // Prevent the default behavior to avoid the file being opened
    evt.preventDefault();

    // Get the data from the transfer
    const data = evt.dataTransfer.getData('text/plain');
    const source = document.getElementById(data);

    if (evt.target.matches('ul')) {
      evt.target.insertAdjacentElement('beforeend', source)
    }
    else {
      // Find the dropped element
      const droppedEl = evt.target.closest('li');
      // Insert the dragged element before the dropped element
      droppedEl.insertAdjacentElement('beforebegin', source);
    }

    // Remove the highlight
    evt.target.classList.remove('dragover');
  });

  // Delete the original element
  linksListEl.addEventListener('dragend', (evt) => {
    evt.target.classList.remove('dragging');
  });
})

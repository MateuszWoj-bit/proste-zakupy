const itemInput = document.getElementById('itemInput');
const addBtn = document.getElementById('addBtn');
const list = document.getElementById('list');



let items = JSON.parse(localStorage.getItem('shoppingList')) || [];

function saveList() {
  localStorage.setItem('shoppingList', JSON.stringify(items));
}

function renderList() {
  list.innerHTML = '';
  items.forEach((item, index) => {
    const li = document.createElement('li');
    li.className = 'flex items-center justify-between p-2 bg-gray-100 rounded';


    const leftSection = document.createElement('div');
    leftSection.className = 'flex items-center gap-2';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = item.done;
    checkbox.className = 'form-checkbox h-5 w-5';
    checkbox.onchange = () => {
      items[index].done = checkbox.checked;
      saveList();
      renderList();
    };

    const span = document.createElement('span');
    span.textContent = item.text;
    span.className = item.done ? 'line-through text-gray-500' : '';

    leftSection.appendChild(checkbox);
    leftSection.appendChild(span);

    const delBtn = document.createElement('button');
    delBtn.textContent = '❌';
    delBtn.onclick = () => {
      items.splice(index, 1);
      saveList();
      renderList();
    };

    li.appendChild(leftSection);
    li.appendChild(delBtn);
    list.appendChild(li);
  });
}


addBtn.onclick = () => {
  const text = itemInput.value.trim();
  if (text !== '') {
    items.push({ text, done: false });
    itemInput.value = '';
    saveList();
    renderList();
  }
};

itemInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') addBtn.click();
});

renderList();

const clearCheckedBtn = document.getElementById('clearCheckedBtn');
const confirmModal = document.getElementById('confirmModal');
const confirmBtn = document.getElementById('confirmBtn');
const cancelBtn = document.getElementById('cancelBtn');

clearCheckedBtn.onclick = () => {
  const hasChecked = items.some(item => item.done);
  if (!hasChecked) {
    alert("There are no checked items to clear.");
    return;
  }
  confirmModal.classList.remove('hidden');
};

confirmBtn.onclick = () => {
  items = items.filter(item => !item.done);
  saveList();
  renderList();
  confirmModal.classList.add('hidden');
};

cancelBtn.onclick = () => {
  confirmModal.classList.add('hidden');
};

confirmModal.addEventListener('click', (e) => {
  if (e.target === confirmModal) {
    confirmModal.classList.add('hidden');
  }
});





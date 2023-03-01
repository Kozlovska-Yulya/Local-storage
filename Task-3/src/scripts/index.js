import { setItem, getItem } from './storage.js';
const tasks = [
  { id: 'first-task', text: 'Buy milk', done: false },
  { id: 'second-task', text: 'Pick up Tom from airport', done: false },
  { id: 'third-task', text: 'Visit party', done: false },
  { id: 'fourth-task', text: 'Visit doctor', done: true },
  { id: 'fifth-task', text: 'Buy meat', done: true },
];

const listElem = document.querySelector('.list');

const renderTasks = () => {
  const getTasksList = getItem('tasksList') || [];

  listElem.innerHTML = '';
  const tasksElems = getTasksList
    .sort((a, b) => a.done - b.done)
    .map(({ text, done, id }) => {
      const listItemElem = document.createElement('li');
      listItemElem.classList.add('list__item');
      const checkbox = document.createElement('input');
      checkbox.setAttribute('type', 'checkbox');
      checkbox.setAttribute('data-id', id);
      checkbox.checked = done;
      checkbox.classList.add('list__item-checkbox');
      if (done) {
        listItemElem.classList.add('list__item_done');
      }
      listItemElem.append(checkbox, text);

      return listItemElem;
    });

  listElem.append(...tasksElems);
};

renderTasks(tasks);

//////

const inputElem = document.querySelector('.task-input');
const createBtnElem = document.querySelector('.create-task-btn');

function haveValue() {
  const valueInputElem = inputElem.value;
  if (!valueInputElem) {
    return;
  }
  inputElem.innerHTML = '';

  const getTaskList = getItem('tasksList') || [];

  const newTasksList = getTaskList.concat({
    text: valueInputElem,
    done: false,
    id: Math.random().toString(),
  });

  setItem('tasksList', newTasksList);

  renderTasks();
}

function checkboxClick(event) {
  const isCheckbox = event.target.classList.contains('list__item-checkbox');
  if (!isCheckbox) {
    return;
  }

  const taskData = tasks.find(({ id }) => id === event.target.dataset.id);

  Object.assign(taskData, { done: event.target.checked });
  renderTasks(tasks);
}

createBtnElem.addEventListener('click', haveValue);
listElem.addEventListener('click', checkboxClick);

const onStorageChange = (e) => {
  if (e.key === 'tasksList') {
    renderTasks();
  }
};

window.addEventListener('storage', onStorageChange);

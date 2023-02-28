localStorage.setItem('hobbies', JSON.stringify({ name: 'Tom' }));
localStorage.setItem('lesson', JSON.stringify(null));

function getLocalStorage() {
  return Object.entries(localStorage).reduce((acc, [key, value]) => {
    let newValue;
    try {
      newValue = JSON.parse(value);
    } catch (e) {
      newValue = value;
    }
    return {
      ...acc,
      [key]: newValue,
    };
  }, {});
}

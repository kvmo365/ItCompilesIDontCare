
document.addEventListener('DOMContentLoaded', () => {
  // Insert header, menu, footer
  ['includes/header.html', 'includes/menu.html', 'includes/footer.html'].forEach(path => {
    fetch(path).then(res => res.text()).then(html => {
      if (path.includes('header')) document.body.insertAdjacentHTML('afterbegin', html);
      else if (path.includes('menu')) document.body.insertAdjacentHTML('afterbegin', html);
      else document.body.insertAdjacentHTML('beforeend', html);
    });
  });

  // Event handling (after slight delay to ensure DOM updated)
  setTimeout(() => {
    document.body.addEventListener('click', e => {
      if (e.target.id === 'hamburger') document.getElementById('overlay').classList.remove('hidden');
      if (e.target.id === 'close-overlay' || e.target.id === 'overlay') {
        document.getElementById('overlay').classList.add('hidden');
      }
    });

    // Load user greeting
    const user = JSON.parse(localStorage.getItem('userData') || '{}');
    if (user.firstName) {
      const greet = document.getElementById('greeting');
      if (greet) greet.textContent = `Hi, ${user.firstName}!`;
    }
  }, 500);
});

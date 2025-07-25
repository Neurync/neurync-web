function redirectTo404() {
  window.location.href = '/404.html';
}

function validateUserId(userId) {
  const regex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;

  if (!userId || regex.test(userId))
    redirectTo404();
}

async function loadUserData(userId) {
  const response = await fetch(`http://localhost:3333/users/public/${userId.replace(/^"|"$/g, "")}`);

  if (response.status !== 200)
    redirectTo404();

  const data = await response.json();
  return data;
}

window.addEventListener("DOMContentLoaded", async () => {
  const params = new URLSearchParams(window.location.search);
  const userId = params.get('user');

  validateUserId(userId);

  const user = await loadUserData(userId);
  console.table(user);
});
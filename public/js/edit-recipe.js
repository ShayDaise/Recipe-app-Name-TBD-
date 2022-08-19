async function editFormHandler(event) {
    event.preventDefault();
  
    const title = document.querySelector('input[name="recipe-title"]').value.trim();
    const recipe_desc = document.querySelector('input[name="recipe-desc"]').value.trim();
    const recipe_text = document.querySelector('input[name="recipe-text"]').value.trim();
    const id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];
    const response = await fetch(`/api/recipes/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        title,
        recipe_desc,
        recipe_text
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    if (response.ok) {
      document.location.replace('/dashboard/');
    } else {
      alert(response.statusText);
    }
  }
  
  document.querySelector('.edit-recipe-form').addEventListener('submit', editFormHandler);
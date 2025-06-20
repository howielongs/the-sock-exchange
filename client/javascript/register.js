document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registerForm');
  
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
  
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
  
      try {
        const response = await fetch('http://localhost:9000/api/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ name, email })
        });
  
        const result = await response.json();
        console.log(result); // should show { message: 'success' }
      } catch (error) {
        console.error('Error registering user:', error);
      }
    });
  });
  
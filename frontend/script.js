document.addEventListener('DOMContentLoaded', () => {
    const userList = document.getElementById('userList');
    const userDetails = document.getElementById('userDetails');
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    
    // Fetch all users
    async function fetchUsers() {
      try {
        const response = await fetch('http://localhost:3009/api/users');
        const users = await response.json();
        displayUsers(users);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    }
    
    // Fetch single user
    async function fetchUser(id) {
      try {
        const response = await fetch(`http://localhost:3009/api/users/${id}`);
        const user = await response.json();
        displayUserDetails(user);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    }
    
    // Search users
    async function searchUsers(query) {
      try {
        const response = await fetch(`http://localhost:3009/api/users`);
        const users = await response.json();
        
        const results = users.filter(user => 
          Object.values(user).some(val => 
            String(val).toLowerCase().includes(query.toLowerCase())
          )
        );
        
        displayUsers(results);
      } catch (error) {
        console.error('Error searching users:', error);
      }
    }
    
    // Display users in the list
    function displayUsers(users) {
      userList.innerHTML = '';
      
      if (users.length === 0) {
        userList.innerHTML = '<p>No users found</p>';
        return;
      }
      
      users.forEach(user => {
        const userCard = document.createElement('div');
        userCard.className = 'user-card';
        userCard.innerHTML = `
          <h3>${user.first_name} ${user.last_name}</h3>
          <p>${user.email}</p>
        `;
        userCard.addEventListener('click', () => fetchUser(user.id));
        userList.appendChild(userCard);
      });
    }
    
    // Display user details
    function displayUserDetails(user) {
      userDetails.innerHTML = `
        <div class="detail-item">
          <strong>ID:</strong> ${user.id}
        </div>
        <div class="detail-item">
          <strong>Name:</strong> ${user.first_name} ${user.last_name}
        </div>
        <div class="detail-item">
          <strong>Email:</strong> ${user.email}
        </div>
        <div class="detail-item">
          <strong>Gender:</strong> ${user.gender}
        </div>
        <div class="detail-item">
          <strong>IP Address:</strong> ${user.ip_address}
        </div>
      `;
    }
    
    // Event listeners
    searchBtn.addEventListener('click', () => {
      const query = searchInput.value.trim();
      if (query) {
        searchUsers(query);
      } else {
        fetchUsers();
      }
    });
    
    // Initial load
    fetchUsers();
  });
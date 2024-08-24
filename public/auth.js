const baseUrl = 'http://95.130.227.52:3001'; 




async function register() {
    const login = document.getElementById('registerLogin').value.trim();
    const password = document.getElementById('registerPassword').value.trim();
    const name = document.getElementById('registerName').value.trim();
    const lastname = document.getElementById('registerLastName').value.trim();
    const role = document.getElementById('registerRole').value.trim();
    const phone = document.getElementById('registerPhone').value.trim();
    const department = document.getElementById('registerDepartment').value.trim();

    const registerData = {
        login,
        password,
        name,
        lastname,
        role,
        phone,
        department
    };

    try {
        const response = await fetch(`${baseUrl}/user/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(registerData),
        });

        if (response.ok) {
            const result = await response.json();
            alert('Registration successful');
            console.log(result); // Handle the result as needed
        } else {
            const errorData = await response.json();
            alert(`Failed to register: ${errorData.message}`);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while registering');
    }
}

// Example of making an authenticated request using the token
async function fetchUserData() {
    const token = localStorage.getItem('authToken');

    try {
        const response = await fetch(`${baseUrl}/user/profile`, { // Replace with the appropriate endpoint
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        });

        if (response.ok) {
            const userData = await response.json();
            console.log('User Data:', userData);
        } else {
            const errorData = await response.json();
            alert(`Failed to fetch user data: ${errorData.message}`);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while fetching user data');
    }
}
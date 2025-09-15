const fetch = require('node-fetch').default;

async function testRegistration() {
  try {
    console.log('Testing registration endpoint...');
    
    const testUser = {
      name: 'Test User',
      email: 'testuser@christuniversity.in',
      studentId: 'BTEST2024001',
      program: 'Computer Science',
      password: 'password123'
    };
    
    console.log('Sending registration request...');
    console.log('Data:', testUser);
    
    const response = await fetch('http://localhost:3000/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testUser)
    });
    
    console.log('Response status:', response.status);
    const data = await response.json();
    console.log('Response data:', data);
    
    if (response.ok) {
      console.log('✅ Registration successful!');
    } else {
      console.log('❌ Registration failed:', data.message);
    }
    
  } catch (error) {
    console.error('❌ Test error:', error.message);
  }
}

testRegistration();

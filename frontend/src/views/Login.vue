<template>
  <div class="page-container">
    <div class="login-card">
      <div class="left-panel">
        <div class="welcome-content">
          <h1 class="welcome-title">Welcome to Task Manager</h1>
          <p class="welcome-text">
            This is the sign-in page created by Yelish Giri.
            Design was inspired from freepik.
          </p>
        </div>
        <div class="abstract-shapes"></div>
      </div>
      <div class="right-panel">
        <h2 class="login-title">USER LOGIN</h2>
        
        <form @submit.prevent="login" class="login-form">
          <div class="input-container">
            <div class="input-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
            </div>
            <input 
              id="username"
              v-model="username" 
              type="text" 
              placeholder="Username" 
              required 
            />
          </div>
          
          <div class="input-container">
            <div class="input-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
            </div>
            <input 
              id="password"
              v-model="password" 
              type="password" 
              placeholder="Password" 
              required 
            />
          </div>
          
          <div class="remember-forgot">
            <div class="remember">
              <input type="checkbox" id="remember" />
              <label for="remember">Remember</label>
            </div>
            <a href="#" class="forgot-link">Forgot password?</a>
          </div>
          
          <button type="submit" class="login-button">
            LOGIN
          </button>
        </form>
        
        <div class="guest-login">
          <button @click="loginAsGuest" class="guest-button">
            Login as Guest
          </button>
        </div>
        
        <div class="signup-link">
          <p>
            Don't have an account? 
            <router-link to="/signup">Sign Up</router-link>
          </p>
        </div>
        
        <div v-if="error" class="error-message">
          {{ error }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const username = ref('');
    const password = ref('');
    const error = ref('');
    const router = useRouter();

    // Function to handle regular login
    const login = async () => {
      try {
        const response = await fetch('http://localhost:3000/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username: username.value, password: password.value })
        });

        const data = await response.json();
        if (response.ok) {
          localStorage.setItem('token', data.token);
          router.push('/home');
        } else {
          error.value = data.message;
        }
      } catch (err) {
        error.value = "Login failed.";
      }
    };

    // Function to handle guest login
    const loginAsGuest = async () => {
      try {
        const response = await fetch('http://localhost:3000/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username: 'guest', password: '' }) // Guest login with empty password
        });

        const data = await response.json();
        if (response.ok) {
          localStorage.setItem('token', data.token);
          router.push('/home');
        } else {
          error.value = data.message;
        }
      } catch (err) {
        error.value = "Guest login failed.";
      }
    };

    return { username, password, login, loginAsGuest, error };
  }
};
</script>

<style scoped>
.page-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #6a5cf7 0%, #8b5cf7 100%);
  padding: 20px;
  font-family: Arial, sans-serif;
  position: relative;
}

.login-card {
  display: flex;
  width: 100%;
  max-width: 1000px;
  min-height: 550px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

/* Left panel styles */
.left-panel {
  position: relative;
  width: 50%;
  padding: 60px 40px;
  background: linear-gradient(135deg, #7a67ff 0%, #b56ef9 100%);
  color: white;
  overflow: hidden;
}

.welcome-content {
  position: relative;
  z-index: 2;
}

.welcome-title {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 20px;
}

.welcome-text {
  font-size: 1rem;
  line-height: 1.6;
}

.abstract-shapes {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
  z-index: 1;
  background-image: 
    radial-gradient(circle at 70% 30%, rgba(255, 122, 89, 0.6) 0%, rgba(255, 122, 89, 0) 50%),
    linear-gradient(45deg, rgba(255, 122, 89, 0) 0%, rgba(255, 122, 89, 0.6) 100%);
}

.abstract-shapes::before,
.abstract-shapes::after {
  content: "";
  position: absolute;
  background: linear-gradient(45deg, #ff7a59, #ff5a5f);
  border-radius: 50px;
}

.abstract-shapes::before {
  width: 300px;
  height: 60px;
  bottom: 20%;
  left: -50px;
  transform: rotate(25deg);
  opacity: 0.7;
}

.abstract-shapes::after {
  width: 200px;
  height: 40px;
  bottom: 40%;
  right: -30px;
  transform: rotate(-15deg);
  opacity: 0.5;
}

/* Right panel styles */
.right-panel {
  width: 50%;
  padding: 60px 40px;
  background: white;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.login-title {
  color: #8b5cf7;
  font-size: 1.5rem;
  margin-bottom: 40px;
  font-weight: 600;
  letter-spacing: 1px;
}

.login-form {
  width: 100%;
  max-width: 320px;
}

.input-container {
  position: relative;
  margin-bottom: 20px;
}

.input-icon {
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: #8b5cf7;
  opacity: 0.7;
}

.icon {
  width: 20px;
  height: 20px;
}

input[type="text"],
input[type="password"] {
  width: 100%;
  padding: 15px 15px 15px 45px;
  border: none;
  border-radius: 50px;
  background-color: #f0f0ff;
  font-size: 1rem;
  outline: none;
}

.remember-forgot {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  font-size: 0.9rem;
}

.remember {
  display: flex;
  align-items: center;
}

.remember input {
  margin-right: 5px;
}

.forgot-link {
  color: #8b5cf7;
  text-decoration: none;
}

.login-button {
  width: 100%;
  padding: 15px;
  border: none;
  border-radius: 50px;
  background: linear-gradient(to right, #a17af7, #d868f9);
  color: white;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  margin-bottom: 20px;
  transition: transform 0.2s;
}

.login-button:hover {
  transform: translateY(-2px);
}

.guest-button {
  width: 100%;
  padding: 12px;
  border: 1px solid #e2e8f0;
  border-radius: 50px;
  background: white;
  color: #718096;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.guest-button:hover {
  background-color: #f7fafc;
}

.guest-login {
  width: 100%;
  max-width: 320px;
  margin-bottom: 20px;
}

.signup-link {
  font-size: 0.9rem;
  color: #718096;
  margin-bottom: 20px;
}

.signup-link a {
  color: #8b5cf7;
  text-decoration: none;
  font-weight: 600;
}

.error-message {
  width: 100%;
  max-width: 320px;
  padding: 10px;
  background-color: #fed7d7;
  color: #e53e3e;
  border-radius: 8px;
  font-size: 0.9rem;
  text-align: center;
}

.footer {
  margin-top: 20px;
  color: white;
  font-size: 0.8rem;
  opacity: 0.8;
}

.freepik {
  font-weight: 600;
}

/* Responsive styles */
@media (max-width: 768px) {
  .login-card {
    flex-direction: column;
  }
  
  .left-panel, .right-panel {
    width: 100%;
  }
  
  .left-panel {
    padding: 40px 20px;
  }
  
  .welcome-title {
    font-size: 2rem;
  }
}
</style>
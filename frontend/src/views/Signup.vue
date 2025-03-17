<template>
  <div class="page-container">
    <div class="signup-card">
      <div class="left-panel">
        <h1 class="welcome-title">Welcome to Task Manager</h1>
        <p class="welcome-text">
          This is the sign-up page created by Yelish Giri.
            Design was inspired from freepik.
        </p>
        <div class="abstract-shapes"></div>
      </div>
      <div class="right-panel">
        <h2 class="signup-title">Sign Up</h2>
        <form @submit.prevent="signup" class="signup-form">
          <div class="input-container">
            <span class="input-icon">👤</span>
            <input v-model="username" type="text" placeholder="Username" required />
          </div>
          <div class="input-container">
            <span class="input-icon">🔒</span>
            <input v-model="password" type="password" placeholder="Password" required />
          </div>
          <button type="submit" class="signup-button">SIGN UP</button>
        </form>
        <p class="login-link">Already have an account? <router-link to="/login">Login</router-link></p>
        <p v-if="error" class="error-message">{{ error }}</p>
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

    const signup = async () => {
      try {
        const response = await fetch('http://localhost:3000/auth/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username: username.value, password: password.value })
        });

        const data = await response.json();
        if (response.ok) {
          router.push('/login');
        } else {
          error.value = data.message || 'Signup failed';
        }
      } catch (err) {
        error.value = "Signup failed";
      }
    };

    return { username, password, signup, error };
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
}

.signup-card {
  display: flex;
  width: 100%;
  max-width: 1000px;
  min-height: 550px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.left-panel {
  position: relative;
  width: 50%;
  padding: 60px 40px;
  background: linear-gradient(135deg, #7a67ff 0%, #b56ef9 100%);
  color: white;
  overflow: hidden;
}

.welcome-title {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 20px;
  position: relative;
  z-index: 2;
}

.welcome-text {
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 30px;
  position: relative;
  z-index: 2;
}

.abstract-shapes {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 60%;
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500"><path d="M50,250 L150,100 L250,300 L350,150 L450,250" stroke="%23ff7e5f" stroke-width="40" stroke-linecap="round" fill="none" opacity="0.6" /></svg>');
  background-size: cover;
  opacity: 0.6;
  z-index: 1;
}

.right-panel {
  width: 50%;
  padding: 60px 40px;
  background: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.signup-title {
  color: #8b5cf7;
  font-size: 1.5rem;
  margin-bottom: 40px;
  font-weight: 600;
  letter-spacing: 1px;
}

.signup-form {
  width: 100%;
  max-width: 320px;
}

.input-container {
  position: relative;
  margin-bottom: 20px;
  width: 100%;
}

.input-icon {
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: #8b5cf7;
  opacity: 0.7;
}

input {
  width: 100%;
  padding: 15px 15px 15px 45px;
  border: none;
  border-radius: 50px;
  background-color: #f0f0ff;
  font-size: 1rem;
  outline: none;
}

.signup-button {
  width: 100%;
  padding: 15px;
  border: none;
  border-radius: 50px;
  background: linear-gradient(to right, #a17af7, #d868f9);
  color: white;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  margin-top: 20px;
  transition: transform 0.2s;
}

.signup-button:hover {
  transform: translateY(-2px);
}

.login-link {
  margin-top: 20px;
  font-size: 0.9rem;
  color: #666;
}

.login-link a {
  color: #8b5cf7;
  text-decoration: none;
  font-weight: 600;
}

.error-message {
  margin-top: 15px;
  color: #e74c3c;
  font-size: 0.9rem;
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

@media (max-width: 768px) {
  .signup-card {
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
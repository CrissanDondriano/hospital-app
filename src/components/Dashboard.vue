<template>
    <div class="hospital-management">
      <header class="header">
        <h1>Hospital Management System</h1>
        <div class="user-info">
          <p>Welcome, {{ user.name }}!</p>
          <p>Your role: {{ user.role }}</p>
        </div>
      </header>
  
      <nav class="nav">
        <ul class="navbar">
          <li class="navbar-item" v-if="user.role === 'patient'">
            <span class="navbar-text">Patient Section</span>
          </li>
          <div class="nav-links">
            <li class="navbar-item">
              <router-link to="/records" class="decorated-link">View Medical Records</router-link>
            </li>
          </div>
          <div class="nav-links">
            <li class="navbar-item">
              <router-link to="/appointments" class="decorated-link" style="margin-right: 690px;">Book Appointments</router-link>
            </li>
            <li class="navbar-item">
              <button @click="logout" class="btn">Logout</button>
            </li>
          </div>
        </ul>
      </nav>
  
      <main class="content">
        <section v-if="user.role === 'admin'" class="section">
          <h2>Admin Section</h2>
          <router-link to="/patients">Manage Patients</router-link>
          <router-link to="/doctors">Manage Doctors</router-link>
          <router-link to="/appointments">Manage Appointments</router-link>
          <router-link to="/records">Manage Medical Records</router-link>
        </section>
        <section v-if="user.role === 'doctor'" class="section">
          <h2>Doctor Section</h2>
          <router-link to="/patients">View Patients</router-link>
          <router-link to="/appointments">Manage Appointments</router-link>
          <router-link to="/doctors">Update Profile</router-link>
          <router-link to="/records">Update Medical Records</router-link>
        </section>
        <section v-if="user.role === 'patient'" class="section">
          <h2></h2>
          <!-- Add patient-related content here -->
        </section>
      </main>
    </div>
  </template>
  

  <script>
export default {
  name: 'HospitalManagement',
  computed: {
    user() {
      return this.$store.getters.user;
    },
  },
  created() {
    if (this.$store.getters.isAuthenticated) {
      this.$store.dispatch('fetchUser');
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('logout');
      this.$router.push('/');
    },
  },
};
</script>
  
  <style scoped>
  .hospital-management {
  padding: 20px;
  font-family: Arial, sans-serif;
  background-image: url('https://t3.ftcdn.net/jpg/04/87/69/28/360_F_487692869_V8MZ1hLvhXQZKT50EV8Sh13AkdibGJb3.jpg');
  background-size: cover;
}

  
  .header {
    margin-bottom: 20px;
    text-align: center;
  }
  
  .user-info {
    margin-top: 10px;
  }
  
  .nav {
  margin-bottom: 20px;
  background-color: rgba(66, 105, 117, 0.5); /* 0.5 specifies 50% opacity */
  padding: 20px 0;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
  
  .navbar {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    justify-content: space-between;
  }
  
  .navbar-item {
    text-align: center;
    display: flex;
    align-items: center;
  }
  
  .navbar-text {
    padding: 10px 15px;
    font-size: 30px;
    color: #ecf0f1;
  }
  
  .nav-links {
    display: flex;
    gap: 20px;
  }
  
  .decorated-link {
    padding: 10px 15px;
    font-size: 18px;
    color: #151b1f;
    text-decoration: none;
    border-radius: 5px;
    transition: background-color 0.3s;
  }
  
  .decorated-link:hover {
    background-color: #4180aa;
    text-decoration: none;
  }
  
  .btn {
    padding: 10px 20px;
    background-color: #58a7dc;
    border: none;
    border-radius: 5px;
    color: white;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .btn:hover {
    background-color: #006ab1;
  }
  
  .content {
    margin-top: 20px;
  }
  
  .section {
    margin-bottom: 20px;
  }
  
  .section h2 {
    margin-bottom: 10px;
  }
  
  .section .router-link {
    display: block;
    margin-top: 10px;
  }
  </style>
  

<template>
<div class="dashboard" v-if="user">
    <div class="welcome">
        <h1>Welcome to Hospital Management System</h1>
        <div>
            <p>Welcome, {{ user.name }}!</p>
            <p>Your role: {{ user.role }}</p>
        </div>
        <button @click="logout" class="btn">Logout</button>
    </div>

    <div class="sections">
        <div v-if="user.role === 'admin'" class="admin-section">
            <h2>Admin Section</h2>
            <router-link to="/patients">Manage Patients</router-link>
            <router-link to="/doctors">Manage Doctors</router-link>
            <router-link to="/appointments">Manage Appointments</router-link>
            <router-link to="/records">Manage Medical Records</router-link>
        </div>

        <div v-if="user.role === 'doctor'" class="doctor-section">
            <h2>Doctor Section</h2>
            <router-link to="/patients">View Patients</router-link>
            <router-link to="/appointments">Manage Appointments</router-link>
            <router-link to="/records">Update Medical Records</router-link>
        </div>

        <div v-if="user.role === 'patient'" class="patient-section">
            <h2>Patient Section</h2>
            <router-link to="/appointments">Book Appointments</router-link>
            <router-link to="/records">View Medical Records</router-link>
        </div>
    </div>
</div>
</template>

  
<script>
export default {
    name: 'ManageDashboard',
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
.dashboard {
    padding: 20px;
}

.welcome {
    margin-bottom: 20px;
}

.sections {
    display: flex;
    justify-content: space-between;
}

.section {
    flex: 1;
}

.btn {
    padding: 10px 20px;
    background-color: #4facfe;
    border: none;
    border-radius: 5px;
    color: white;
    font-size: 16px;
    cursor: pointer;
}

.btn:hover {
    background-color: #00f2fe;
}

h2 {
    margin-top: 20px;
}

.router-link {
    display: block;
    margin-top: 10px;
    font-size: 18px;
    color: #4facfe;
    text-decoration: none;
}

.router-link:hover {
    text-decoration: underline;
}
</style>

<template>
<div>
    <h1>Doctors</h1>
    <button @click="fetchDoctors">Load Doctors</button>
    <ul>
        <li v-for="doctor in doctors" :key="doctor.id">{{ doctor.name }}</li>
    </ul>
</div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'ManageDoctors',
    data() {
        return {
            doctors: [],
        };
    },
    methods: {
        async fetchDoctors() {
            try {
                const response = await axios.get(this.$store.state.apiUrl + `/doctors`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    },
                });
                this.doctors = response.data;
            } catch (error) {
                console.error('Failed to fetch doctors', error);
            }
        },
    },
}
</script>

<style scoped>
.navbar-nav {
    display: flex;
    align-items: center;
    justify-content: flex-end;
}

.navbar {
    background: linear-gradient(to right, #4facfe, #37cad1);
}

.navbar-brand {
    color: #ffffff;
    font-weight: bold;
}

.nav-link {
    color: #ffffff;
    font-weight: bold;
    text-decoration: none;
    border-radius: 5px;
    transition: background-color 0.3s;
    display: flex;
    align-items: center;
    /* Center icon and text vertically */
}

.nav-link i {
    margin-right: 8px;
    /* Space between icon and text */
}

.no-hover:hover {
    background-color: inherit;
}

.user-img {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin-right: 8px;
    /* Space between image and text */
}

.logout-link {
    display: flex;
    align-items: center;
}

.logout-img {
    width: 20px;
    height: 20px;
    margin-right: 8px;
    /* Space between image and text */
}

.title {
    text-align: center;
    font-size: 24px;
    color: #333;
    margin-bottom: 20px;
    font-weight: bold;
}

.container {
    margin-top: 20px;
}

.logout-btn {
    color: #fff;
    background-color: #dc3545;
    padding: 10px 20px;
    border-radius: 5px;
    text-decoration: none;
    border: none;
    cursor: pointer;
    display: inline-block;
    transition: background-color 0.3s;
}

.button-icon {
    width: 20px;
    height: 20px;
    margin-right: 5px;
    /* Adjust spacing between icon and text */
}

.logout-btn:hover {
    background-color: #c82333;
}

.table-container {
    display: flex;
    flex-direction: column;
}

.table-custom {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
    border: 1px solid #ddd;
    /* Add border to the table */
}

.table-custom th,
.table-custom td {
    padding: 12px 15px;
    text-align: center;
    border: 2px solid #000000;
    /* Add border to table cells */
}

.table-custom th {
    background-color: #99c2eb;
    font-weight: bold;
}

.table-custom tr:nth-child(even) {
    background-color: #f2f2f2;
}

.table-custom tr:hover {
    background-color: #e9ecef;
}

.pagination-buttons {
    display: flex;
    justify-content: center;
    margin-top: 20px;
}

.pagination-buttons button {
    margin: 0 5px;
}

.action-buttons {
    display: flex;
    gap: 10px;
}

.button-icon {
    width: 20px;
    height: 20px;
    margin-right: 5px;
    filter: invert(100%);
}

.button-icon {
    width: 40px;
    height: 40px;
    margin-right: 2px;
    filter: invert(100%);
}

.edit-btn:hover {
    background-color: #27a2dc;
}

.delete-btn:hover {
    background-color: #f40303;
}

.edit-btn,
.delete-btn {
    background-color: transparent;
    border: 2px solid transparent;
    padding: 5px 15px;
    position: relative;
}

.edit-btn:hover,
.delete-btn:hover {
    border-color: #ccc;
}

.edit-btn::before,
.delete-btn::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 2px solid transparent;
    transition: border-color 0.3s;
}

.edit-btn:hover::before,
.delete-btn:hover::before {
    border-color: #ffffff;
}
</style>

<template>
<div class="container">
    <h1 class="title">Manage Appointments</h1>

    <div class="actions">
        <button v-if="user.role === 'patient'" @click="showAddAppointmentForm = true" class="btn add-btn">Book Appointment</button>
        <button @click="fetchAppointments" class="btn load-btn">Load Appointments</button>
    </div>

    <div v-if="showAddAppointmentForm" class="form-container">
        <h2>Book New Appointment</h2>
        <form @submit.prevent="addAppointment">
            <input type="text" v-model="newAppointment.doctor_name" placeholder="Doctor Name" required />
            <input type="date" v-model="newAppointment.date" placeholder="Date" required />
            <button type="submit" class="btn">Book</button>
        </form>
    </div>

    <div class="table-container">
        <table class="table-custom">
            <thead>
                <tr>
                    <th>Doctor Name</th>
                    <th>Patient Name</th>
                    <th>Date</th>
                    <th v-if="user.role !== 'patient'">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="appointment in appointments" :key="appointment.id">
                    <td>{{ appointment.doctor_name }}</td>
                    <td>{{ appointment.patient_name }}</td>
                    <td>{{ appointment.date }}</td>
                    <td v-if="user.role !== 'patient'">
                        <button @click="editAppointment(appointment)" class="btn edit-btn">Edit</button>
                        <button @click="deleteAppointment(appointment.id)" class="btn delete-btn">Delete</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>

    <div v-if="showEditAppointmentForm" class="form-container">
        <h2>{{ currentAppointment ? 'Edit Appointment' : 'View Appointment' }}</h2>
        <form @submit.prevent="updateAppointment">
            <input type="text" v-model="currentAppointment.doctor_name" placeholder="Doctor Name" required />
            <input type="text" v-model="currentAppointment.patient_name" placeholder="Patient Name" required />
            <input type="date" v-model="currentAppointment.date" placeholder="Date" required />
            <button type="submit" class="btn">{{ currentAppointment ? 'Update' : 'Close' }}</button>
        </form>
    </div>
</div>
</template>

    
<script>
import axios from 'axios';

export default {
    name: 'ManageAppointments',
    data() {
        return {
            appointments: [],
            newAppointment: {
                doctor_name: '',
                patient_name: '',
                date: ''
            },
            currentAppointment: {},
            showAddAppointmentForm: false,
            showEditAppointmentForm: false
        };
    },
    computed: {
        user() {
            return this.$store.getters.user;
        },
    },
    methods: {
        async fetchAppointments() {
            try {
                const response = await axios.get(this.$store.state.apiUrl + '/appointments', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                this.appointments = response.data;
            } catch (error) {
                console.error('Failed to fetch appointments', error);
            }
        },
        async addAppointment() {
            try {
                this.newAppointment.patient_name = this.user.name; // Assigning patient name based on the logged-in user
                const response = await axios.post(this.$store.state.apiUrl + '/appointments', this.newAppointment, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                this.appointments.push(response.data);
                this.newAppointment = {
                    doctor_name: '',
                    patient_name: '',
                    date: ''
                };
                this.showAddAppointmentForm = false;
            } catch (error) {
                console.error('Failed to book appointment', error);
            }
        },
        editAppointment(appointment) {
            this.currentAppointment = {
                ...appointment
            };
            this.showEditAppointmentForm = true;
        },
        async updateAppointment() {
            try {
                if (!this.currentAppointment) {
                    this.showEditAppointmentForm = false;
                    return;
                }
                const response = await axios.put(this.$store.state.apiUrl + `/appointments/${this.currentAppointment.id}`, this.currentAppointment, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                const index = this.appointments.findIndex(app => app.id === this.currentAppointment.id);
                this.appointments.splice(index, 1, response.data);
                this.showEditAppointmentForm = false;
                this.currentAppointment = {};
            } catch (error) {
                console.error('Failed to update appointment', error);
            }
        },
        async deleteAppointment(id) {
            try {
                await axios.delete(this.$store.state.apiUrl + `/appointments/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                this.appointments = this.appointments.filter(appointment => appointment.id !== id);
            } catch (error) {
                console.error('Failed to delete appointment', error);
            }
        }
    }
};
</script>

<style scoped>
.container {
    padding: 20px;
}

.title {
    text-align: center;
    font-size: 24px;
    color: #333;
    margin-bottom: 20px;
    font-weight: bold;
}

.actions {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
}

.btn {
    padding: 10px 20px;
    background-color: #4facfe;
    border: none;
    border-radius: 5px;
    color: white;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.btn:hover {
    background-color: #00f2fe;
}

.add-btn {
    background-color: #28a745;
}

.add-btn:hover {
    background-color: #218838;
}

.load-btn {
    background-color: #007bff;
}

.load-btn:hover {
    background-color: #0069d9;
}

.table-container {
    margin-top: 20px;
}

.table-custom {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
    border: 1px solid #ddd;
}

.table-custom th,
.table-custom td {
    padding: 12px 15px;
    text-align: center;
    border: 1px solid #ddd;
}

.table-custom th {
    background-color: #4facfe;
    color: white;
}

.table-custom tr:nth-child(even) {
    background-color: #f2f2f2;
}

.table-custom tr:hover {
    background-color: #e9ecef;
}

.form-container {
    margin-top: 20px;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 5px;
    background-color: #f9f9f9;
}

form input {
    display: block;
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 5px;
    border: 1px solid #ddd;
}

form button {
    width: 100%;
}

.edit-btn {
    background-color: #ffc107;
}

.edit-btn:hover {
    background-color: #e0a800;
}

.delete-btn {
    background-color: #dc3545;
}

.delete-btn:hover {
    background-color: #c82333;
}
</style>

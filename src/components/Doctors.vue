<template>
<div class="container">
    <h1 class="title">Manage Doctors</h1>

    <div class="actions">
        <button @click="showAddDoctorForm = true" class="btn add-btn">Add Doctor</button>
        <button @click="fetchDoctors" class="btn load-btn">Load Doctors</button>
    </div>

    <div v-if="showAddDoctorForm" class="form-container">
        <h2>Add New Doctor</h2>
        <form @submit.prevent="addDoctor">
            <input type="text" v-model="newDoctor.name" placeholder="Name" required />
            <input type="email" v-model="newDoctor.email" placeholder="Email" required />
            <button type="submit" class="btn">Add</button>
        </form>
    </div>

    <div class="table-container">
        <table class="table-custom">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="doctor in doctors" :key="doctor.id">
                    <td>{{ doctor.name }}</td>
                    <td>{{ doctor.email }}</td>
                    <td>
                        <button @click="editDoctor(doctor)" class="btn edit-btn">Edit</button>
                        <button @click="deleteDoctor(doctor.id)" class="btn delete-btn">Delete</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>

    <div v-if="showEditDoctorForm" class="form-container">
        <h2>Edit Doctor</h2>
        <form @submit.prevent="updateDoctor">
            <input type="text" v-model="currentDoctor.name" placeholder="Name" required />
            <input type="email" v-model="currentDoctor.email" placeholder="Email" required />
            <button type="submit" class="btn">Update</button>
        </form>
    </div>
</div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'ManageDoctors',
    data() {
        return {
            doctors: [],
            newDoctor: {
                name: '',
                email: ''
            },
            currentDoctor: {},
            showAddDoctorForm: false,
            showEditDoctorForm: false
        };
    },
    methods: {
        async fetchDoctors() {
            try {
                const response = await axios.get(this.$store.state.apiUrl + '/api/doctors', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                this.doctors = response.data;
            } catch (error) {
                console.error('Failed to fetch doctors', error);
            }
        },
        async addDoctor() {
            try {
                const response = await axios.post(this.$store.state.apiUrl + '/api/doctors', this.newDoctor, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                this.doctors.push(response.data);
                this.newDoctor = {
                    name: '',
                    email: ''
                };
                this.showAddDoctorForm = false;
            } catch (error) {
                console.error('Failed to add doctor', error);
            }
        },
        editDoctor(doctor) {
            this.currentDoctor = {
                ...doctor
            };
            this.showEditDoctorForm = true;
        },
        async updateDoctor() {
            try {
                const response = await axios.put(this.$store.state.apiUrl + `/api/doctors/${this.currentDoctor.id}`, this.currentDoctor, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                const index = this.doctors.findIndex(doc => doc.id === this.currentDoctor.id);
                this.doctors.splice(index, 1, response.data);
                this.showEditDoctorForm = false;
                this.currentDoctor = {};
            } catch (error) {
                console.error('Failed to update doctor', error);
            }
        },
        async deleteDoctor(id) {
            try {
                await axios.delete(this.$store.state.apiUrl + `/api/doctors/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                this.doctors = this.doctors.filter(doctor => doctor.id !== id);
            } catch (error) {
                console.error('Failed to delete doctor', error);
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

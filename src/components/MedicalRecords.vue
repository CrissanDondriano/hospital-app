<template>
<div class="container">
    <h1 class="title">Manage Medical Records</h1>

    <div class="actions">
        <button v-if="user.role === 'doctor'" @click="showAddRecordForm = true" class="btn add-btn">Add Record</button>
        <button @click="fetchRecords" class="btn load-btn">Load Records</button>
    </div>

    <div v-if="showAddRecordForm" class="form-container">
        <h2>Add New Record</h2>
        <form @submit.prevent="addRecord">
            <input type="number" v-model="newRecord.patient_id" placeholder="Patient ID" :readonly="user.role !== 'doctor'" required />
            <input type="text" v-model="newRecord.description" placeholder="Description" required />
            <input type="date" v-model="newRecord.date" required />
            <button type="submit" class="btn">Add</button>
        </form>
    </div>

    <div class="table-container">
        <table class="table-custom">
            <thead>
                <tr>
                    <th>Patient ID</th>
                    <th>Description</th>
                    <th>Date</th>
                    <th v-if="user.role === 'admin'">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="record in records" :key="record.id">
                    <td>{{ record.patient_id }}</td>
                    <td>{{ record.description }}</td>
                    <td>{{ record.date }}</td>
                    <td v-if="user.role === 'admin'">
                        <button @click="editRecord(record)" class="btn edit-btn">Edit</button>
                        <button @click="deleteRecord(record.id)" class="btn delete-btn">Delete</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>

    <div v-if="showEditRecordForm" class="form-container">
        <h2>{{ currentRecord ? 'Edit Record' : 'View Record' }}</h2>
        <form @submit.prevent="updateRecord">
            <input type="number" v-model="currentRecord.patient_id" placeholder="Patient ID" :readonly="user.role !== 'doctor'" required />
            <input type="text" v-model="currentRecord.description" placeholder="Description" required />
            <input type="date" v-model="currentRecord.date" required />
            <button type="submit" class="btn">{{ currentRecord ? 'Update' : 'Close' }}</button>
        </form>
    </div>
</div>
</template>

    
<script>
import axios from 'axios';

export default {
    name: 'ManageRecords',
    data() {
        return {
            records: [],
            newRecord: {
                patient_id: '',
                description: '',
                date: ''
            },
            currentRecord: {},
            showAddRecordForm: false,
            showEditRecordForm: false
        };
    },
    computed: {
        user() {
            return this.$store.getters.user;
        },
    },
    methods: {
        async fetchRecords() {
            try {
                const response = await axios.get(this.$store.state.apiUrl + '/records', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                this.records = response.data;
            } catch (error) {
                console.error('Failed to fetch records', error);
            }
        },
        async addRecord() {
            try {
                if (this.user.role === 'doctor') {
                    this.newRecord.patient_id = this.user.id; // Assigning patient ID based on the logged-in doctor
                }
                const response = await axios.post(this.$store.state.apiUrl + '/records', this.newRecord, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                this.records.push(response.data);
                this.newRecord = {
                    patient_id: '',
                    description: '',
                    date: ''
                };
                this.showAddRecordForm = false;
            } catch (error) {
                console.error('Failed to add record', error);
            }
        },
        editRecord(record) {
            this.currentRecord = {
                ...record
            };
            this.showEditRecordForm = true;
        },
        async updateRecord() {
            try {
                if (!this.currentRecord) {
                    this.showEditRecordForm = false;
                    return;
                }
                const response = await axios.put(this.$store.state.apiUrl + `/records/${this.currentRecord.id}`, this.currentRecord, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                const index = this.records.findIndex(rec => rec.id === this.currentRecord.id);
                this.records.splice(index, 1, response.data);
                this.showEditRecordForm = false;
                this.currentRecord = {};
            } catch (error) {
                console.error('Failed to update record', error);
            }
        },
        async deleteRecord(id) {
            try {
                await axios.delete(this.$store.state.apiUrl + `/records/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                this.records = this.records.filter(record => record.id !== id);
            } catch (error) {
                console.error('Failed to delete record', error);
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

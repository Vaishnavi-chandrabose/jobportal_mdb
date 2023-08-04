<template>
  <div>
    <form @submit.prevent="saveCandidate">
      <table>
        <tr>
          <td><label for="name">Name:</label></td>
          <td><input v-model="candidateData.name" type="text" id="name" /></td>
        </tr>
        <tr>
          <td><label for="position">Position:</label></td>
          <td><input v-model="candidateData.position" type="text" id="position" /></td>
        </tr>
        <tr>
          <td><label for="gender">Gender:</label></td>
          <td><input v-model="candidateData.gender" type="text" id="gender" /></td>
        </tr>
        <tr>
          <td><label for="experience">Experience:</label></td>
          <td><input v-model="candidateData.experience" type="text" id="experience" /></td>
        </tr>
        <tr>
          <td><label for="location">Location:</label></td>
          <td><input v-model="candidateData.location" type="text" id="location" /></td>
        </tr>
      </table>

      <button type="submit">Save Candidate</button>
    </form>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { usejobportal } from '../stores/jobportal';

export default defineComponent({
  setup() {
    const store = usejobportal();
    const candidateData = {
      name: '',
      position: '',
      gender: '',
      experience: '',
      location: '',
    };

  const saveCandidate = async () => {
      console.log('Save Candidate button clicked.');
      if (!store.validateForm(candidateData)) {
    console.log('Form validation failed. Candidate not saved.');
    return;
  }
      await store.saveJob(candidateData);
      resetForm();
    };

    const resetForm = () => {
      candidateData.name = '';
      candidateData.position = '';
      candidateData.gender = '';
      candidateData.experience = '';
      candidateData.location = '';
    };

    return {
      candidateData,
      saveCandidate,
    };
  },
});
</script>



<style>

.modal {
  position: fixed;
  top: 40%;
  bottom:0%;
  left: 80%;
  transform: translate(-50%, -50%);
  width: 50%;
  max-width: 600px;
  padding: 30px;
  background-color: #f1f1f1; 
  border-radius: 2px;
  z-index: 9999; 
}
.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 24px;
  cursor: pointer;
  color: #f00;  
}
.close-btn:hover {
  color: #d00; 
}
.close-btn:hover {
  color: #333;
}

.form-row {
  margin-bottom: 10px;
}

input[type="text"],
select,
input[type="number"] {
  width: 70%;
  padding: 8px;
  font-size: 16px;
  border: 2px solid #ccc;
  border-radius: 4px;
}

input[type="radio"] {
  margin-right: 8px;
}

button[type="submit"],
.button {
  display: block;
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 16px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button[type="submit"]:hover,
.button:hover {
  background-color: #0056b3;
}

button[type="submit"]:active,
.button:active {
  background-color: #003f80;
}
.error-message {
  position: absolute;
  top: 100%;
  bottom: -20px;
  left: 0;
  font-size: 14px;
  color: red;

.alert {
  
  position: absolute;
  top: 100%;
  left: 0;
  color: red;
}
#error-container {
  position: relative;
}
#error-container .error-message {
  position: absolute;
  bottom: 0px;
  left: 0;
}
}
</style>

<template>
  <div>
    <form @submit.prevent="saveCandidate">
      <table>
        <tr>
          <td><label for="candidateid">Candidate ID:</label></td>
          <td>
            <input v-model="candidateData.candidateid" type="number" id="candidateid" required/>
            <div v-if="showAlert && !candidateData.candidateid" class="error-message">
              Please Enter Candidate ID.
            </div>
          </td>
          <td><label for="name">Name:</label></td>
          <td>
            <input v-model="candidateData.name" type="text" id="name" />
            <div v-if="showAlert && !candidateData.name" class="error-message">
              Please Enter Candidate Name.
            </div>
          </td>
        </tr>
        <tr>
          <td><label for="position">Position:</label></td>
          <td>
            <select v-model="candidateData.position" id="position">
              <option value="" disabled>Select Position</option>
              <option value="Software Engineer">Software Engineer</option>
              <option value="FrontEnd Developer">FrontEnd Developer</option>
              <option value="BackEnd Developer">BackEnd Developer</option>
              <option value="Data Scientist">Data Scientist</option>
              <option value="Product Manager">Product Manager</option>
            </select>
            <div v-if="showAlert && !candidateData.position" class="error-message">
              Please Select a Position.
            </div>
          </td>
        </tr>
        <tr>
          <td><label>Gender:</label></td>
          <td>
            <label for="male">Male</label>
            <input v-model="candidateData.gender" type="radio" id="male" value="Male" />
            <label for="female">Female</label>
            <input v-model="candidateData.gender" type="radio" id="female" value="Female" />
            <div v-if="showAlert && !candidateData.gender" class="error-message">
              Please Select Candidate Gender.
            </div>
          </td>
        </tr>
        <tr>
          <td><label for="experience">Experience:</label></td>
          <td>
            <input v-model="candidateData.experience" type="number" id="experience" />
            <div v-if="showAlert && !candidateData.experience" class="error-message">
              Please Enter Candidate Experience.
            </div>
          </td>
        </tr>
        <tr>
          <td><label for="location">Location:</label></td>
          <td>
            <input v-model="candidateData.location" type="text" id="location" />
            <div v-if="showAlert && !candidateData.location" class="error-message">
              Please Enter Candidate Location.
            </div>
          </td>
        </tr>
      </table>
      <button type="submit">
         {{ saving ? 'Saving...' : 'Save Candidate' }}
      </button>
      <span class="close-btn" @click="closeAddCandidateModal">&times;</span>
    </form>
  </div>
</template>

<script>
import { defineComponent , ref } from 'vue';
import { usejobportal } from '../stores/jobportal';

export default defineComponent({
  setup() {
    const store = usejobportal();
    const candidateData = {
      candidateid:'',
      name: '',
      position: '',
      gender: '',
      experience: '',
      location: '',
    };

    const showAlert = ref(false); 
    const saving = ref(false); 

   const saveCandidate = async () => {
      console.log('Save Candidate button clicked.');
      if (!store.validateForm(candidateData)) {
        console.log('Form validation failed. Candidate not saved.');
        showAlert.value = true;
        return;
      }

      saving.value = true; 

      try {
        await store.saveJob(candidateData);
        resetForm();
      } catch (error) {
        console.error('Error saving candidate:', error);
      } finally {
        saving.value = false; 
      }
    };


    const resetForm = () => {
      candidateData.candidateid='';
      candidateData.name = '';
      candidateData.position = '';
      candidateData.gender = '';
      candidateData.experience = '';
      candidateData.location = '';
      showAlert.value = false; 
    };

    const closeAddCandidateModal = () => {
      const instance = getCurrentInstance();
      instance.emit('closeModal');
    };

    return {
      candidateData,
      saveCandidate,
      closeAddCandidateModal,
      showAlert,
      saving,
    };
  },
});
</script>




<style>

.modal {
  position: fixed;
  top: 40%;
  bottom:0%;
  left: 70%;
  transform: translate(-50%, -50%);
  width: 0%;
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
  width: 80%;
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
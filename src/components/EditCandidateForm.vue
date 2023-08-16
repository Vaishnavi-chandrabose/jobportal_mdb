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
      <button type="submit">Edit Candidate</button>
    </form>
  </div>
</template>

<script>
import { ref, defineComponent, toRefs } from 'vue';
import { usejobportal } from '../stores/jobportal';

export default defineComponent({
  props: {
    candidate: Object,
  }, 
  emits: ['saveCandidate', 'closeForm'],
 // Emit saveCandidate event when the form is submitted
 
  
  setup(props, { emit }) {
    const { candidate } = toRefs(props); // Destructure candidate object
    const candidateData = ref({ ...candidate.value });
    const saving = ref(false);
    const showAlert = ref(false);
    const store = usejobportal();
    const editedCandidateData = ref({ ...props.candidate }); // Copy prop data to a reactive variable

    const saveCandidate = async () => {
      try {
        saving.value = true;
        await store.editCandidate(candidateData.value); // Assuming editCandidate function updates in MongoDB
        emit('closeForm'); // Emit an event to close the form modal
      } catch (error) {
        console.error('Error saving candidate:', error);
      } finally {
        saving.value = false;
      }
      
    };

    return {
      candidateData,
      saveCandidate,
      saving,
      showAlert,
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
</style>
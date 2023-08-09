<template>
    <div>
      <h2>Edit Candidate</h2>
      <form @submit="submitForm" class="edit-candidate-form">
        <label for="name">Name:</label>
        <input v-model="editedCandidate.name" type="text" id="name" required><br>
  
        <label for="position">Position:</label>
        <input v-model="editedCandidate.position" type="text" id="position" required><br>
  
        <label for="gender">Gender:</label>
        <input v-model="editedCandidate.gender" type="text" id="gender" required><br>
  
        <label for="location">Location:</label>
        <input v-model="editedCandidate.location" type="text" id="location" required><br>
  
        <label for="experience">Experience:</label>
        <input v-model="editedCandidate.experience" type="text" id="experience" required><br>
  
        <button type="submit" class="save-button">Save Changes</button>
      </form>
    </div>
  </template>
  
  <script>
  import { usejobportal } from '@/stores/jobportal';
  import { defineComponent, ref } from 'vue';
  
  export default defineComponent({
    props: {
      candidate: {
        type: Object,
        required: true,
      },
    },
    setup(props) {
      const { editCandidate } = usejobportal();
      const editedCandidate = ref({ ...props.candidate });
  
     
    const submitForm = (event) => {
      event.preventDefault();
      editCandidate(editedCandidate.value);
      showForm.value = false;
    };
  
      return {
        editedCandidate,
        submitForm,
      };
    },
  });
  </script>
  
  <style scoped>
  .edit-candidate-form {
    max-width: 400px;
    margin: auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  label {
    font-weight: bold;
  }
  
  input {
    width: 100%;
    padding: 8px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  button.save-button {
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 10px 20px;
    cursor: pointer;
  }
  </style>
  
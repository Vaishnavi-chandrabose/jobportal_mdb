<template>
  <div>
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
import { ref } from 'vue';
import { usejobportal } from '@/stores/jobportal';

export default {
  props: ['candidate'],
  setup(props, { emit }) {
    const { editCandidate } = usejobportal();
    const editedCandidate = ref({ ...props.candidate });

    const saveEditedCandidate = async () => {
      await editCandidate(editedCandidate.value);
      emit('closeForm');
    };

    return {
      editedCandidate,
      saveEditedCandidate,
    };
  },
};
</script>



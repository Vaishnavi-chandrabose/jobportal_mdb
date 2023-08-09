<template>
  <div>
    <table class="fulwidth">
      <thead>
        <tr>
          <th>Candidateid</th>
          <th>Name</th>
          <th>Position</th>
          <th>Gender</th>
          <th>Location</th>
          <th>Experience</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(candidate, index) in candidates" :key="candidate.candidateid">
          <td>{{ candidate.candidateid }}</td>
          <td>{{ candidate.name }}</td>
          <td>{{ candidate.position }}</td>
          <td>{{ candidate.gender }}</td>
          <td>{{ candidate.location }}</td>
          <td>{{ candidate.experience }}</td>
          <td>
            <button @click="editCandidateFunction(candidate.candidateid)">Edit</button><br>
            <button @click="confirmDeleteCandidate(candidate.candidateid)"> Delete</button><br>
          </td>
          <EditCandidateForm :candidate="selectedCandidateData" v-if="showEditCandidateModal" />
        </tr>
      </tbody>
    </table>
    
  </div>
</template>

<script>
import { usejobportal } from '@/stores/jobportal'; // Make sure the import path is correct
import { defineComponent,ref } from 'vue';
import EditCandidateForm from '../components/EditCandidateForm.vue';

export default defineComponent({
  props: {
    candidates: {
      type: Array,
      required: true,
    },
  },
  setup() {
    const selectedCandidateData = ref(null);
    const showEditCandidateModal = ref(false);
    const store = usejobportal(); 
    const { candidates, deleteCandidate,actions } = usejobportal();    

    
    const confirmDeleteCandidate = (candidateId) => {
  console.log(candidateId); 
  const confirmation = confirm('Are you sure you want to delete the candidate?');
  if (confirmation) {
    deleteCandidate(candidateId);
  } else {
    console.log('Deletion canceled by user.');
  }
};
const editCandidateFunction = (candidate) => {
      console.log(candidate.candidateid); 
      const confirmation = confirm('Are you sure you want to edit the candidate?');
      if (confirmation) {
        selectedCandidateData.value = candidate;
        showEditCandidateModal.value = true;
      } else {
        console.log('Edit canceled by user.');
      }
    };

    return {
      confirmDeleteCandidate,
      editCandidateFunction,
      selectedCandidateData,
      showEditCandidateModal,
      candidates,
      actions,
      store,
    };
  },
});
</script>

<style>
.fulwidth {
  width: 1500px;
}

th,
td {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #ccc;
}

th {
  background-color: #6495ed;
  color: white;
}

tr:hover {
  background-color: #f5f5f5;
}
</style>

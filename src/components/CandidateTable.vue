<template>
  <div>
    <table class="fulwidth">
     
      <tbody>
        <tr v-for="(candidate, index) in candidates" :key="candidate.candidateid">
          <td>{{ candidate.candidateid }}</td>
          <td>{{ candidate.name }}</td>
          <td>{{ candidate.position }}</td>
          <td>{{ candidate.gender }}</td>
          <td>{{ candidate.location }}</td>
          <td>{{ candidate.experience }}</td>
          <td>
          <button @click="editCandidate(candidate)">Edit</button><br>
          
          <button @click="confirmDeleteCandidate(candidate.candidateid)">Delete</button>
          </td>
        </tr>
        <CandidateTable
  v-if="isDataLoaded"
  :candidates="candidates"
  @deleteCandidateAsync="deleteCandidateAsync"
  @editCandidate="editCandidateFunction"/>
      </tbody>
    </table>        
      <div v-if="showEditCandidateModal" class="modal">
        <div class="modal-content">
          <span class="close-btn" @click="closeEditForm">&times;</span>
          <EditCandidateForm :candidate="selectedCandidateData" @closeForm="closeEditForm" />
        </div>
      </div>
      </div>
</template>

<script>
import { usejobportal } from '@/stores/jobportal'; 
import { defineComponent, ref } from 'vue';
import EditCandidateForm from '../components/EditCandidateForm.vue';


export default defineComponent({
  props: {
    candidates: {
      type: Array,
      required: true,
      isDataLoaded: Boolean,
    },
    components: {
    EditCandidateForm,
  },
  },
  methods: {
    editCandidate(candidate) {
      this.$emit('editCandidate', candidate);
    },
  },
  

  setup() {
    const selectedCandidateData = ref(null);
    const showEditCandidateModal = ref(false);
    const store = usejobportal(); 

    const { candidates, deleteCandidate, actions } = usejobportal();    

    const confirmDeleteCandidate = (candidateId) => {
      const confirmation = confirm('Are you sure you want to delete the candidate?');
      if (confirmation) {
        deleteCandidate(candidateId);
      } else {
        console.log('Deletion canceled by user.');
      }
    };

    const editCandidateFunction = (candidate) => {
      selectedCandidateData.value = candidate;
      showEditCandidateModal.value = true;
    };

    const closeEditForm = () => {
      selectedCandidateData.value = null;
      showEditCandidateModal.value = false;
    };

    return {
      confirmDeleteCandidate,
      editCandidateFunction,
      selectedCandidateData,
      showEditCandidateModal,
      candidates,
      actions,
      store,
      closeEditForm,
    };
  },
});
</script>

<style>
.fulwidth {
  width: 1100px;
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

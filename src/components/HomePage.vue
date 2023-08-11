<template>
  <div class="home-page">
    <header>
      <h1>Home Page</h1>
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
    </table>
    </header>
    <main>
      <CandidateTable
        v-if="isDataLoaded"
        :candidates="candidates"
        :isDataLoaded="isDataLoaded"
        @deleteCandidateAsync="deleteCandidateAsync"
        @editCandidate="openEditCandidateForm"
      />
      <button @click="openAddCandidateModal">Add Candidate</button>
      <div v-if="showAddCandidateModal" class="modal">
        <div class="modal-content">
          <h2>Add Candidate</h2>
          <AddCandidateForm @addCandidate="AddCandidateForm" @closeModal="closeAddCandidateModal" />
        </div>
      </div>
      <div>
        <EditCandidateForm
      v-if="showEditCandidateForm"
      :candidate="selectedCandidateData"
      @saveCandidate="saveEditedCandidate"
      @closeForm="closeEditForm"
    />
    </div>
    </main>
  </div>
</template>


<script>
import { onMounted, ref } from 'vue';
import { usejobportal } from '@/stores/jobportal';
import CandidateTable from '../components/CandidateTable.vue';
import AddCandidateForm from '../components/AddCandidateForm.vue';
import EditCandidateForm from '../components/EditCandidateForm.vue';

export default {
  components: {
    CandidateTable,
    AddCandidateForm,
    EditCandidateForm,
  },
  setup() {
    const { candidates, getJobs, deleteCandidateAsync, editCandidate } = usejobportal();
    const isDataLoaded = ref(false);
    const showAddCandidateModal = ref(false);
    const showEditCandidateForm = ref(false);
    const selectedCandidateData = ref(null);

    onMounted(async () => {
      await getJobs();
      isDataLoaded.value = true;
    });

    const openAddCandidateModal = () => {
      showAddCandidateModal.value = true;
    };

    const closeAddCandidateModal = () => {
      showAddCandidateModal.value = false;
    };

    const openEditCandidateForm = (candidate) => {
      selectedCandidateData.value = candidate;
      showEditCandidateForm.value = true;
    };

    const closeEditForm = () => {
      showEditCandidateForm.value = false;
    };

    const saveEditedCandidate = async (editedCandidateData) => {
      try {
        await editCandidate(editedCandidateData);
        closeEditForm();
      } catch (error) {
        console.error('Error editing candidate:', error);
      }
    };

    return {
      candidates,
      deleteCandidateAsync,
      openAddCandidateModal,
      closeAddCandidateModal,
      showAddCandidateModal,
      showEditCandidateForm,
      selectedCandidateData,
      openEditCandidateForm,
      closeEditForm,
      isDataLoaded,
      saveEditedCandidate,
    };
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

html,
body {
  height: 100%;
  margin: 0;
  padding: 0;
}

.home-page {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start; 
  padding-top: 10%; 
}

#app {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 20px;
  font-family: 'Roboto', sans-serif;
}

button {
  display: block;
  margin: 0 auto;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
}

button:hover {
  background-color: #0056b3;
}

h1 {
  text-align: center;
  margin-bottom: 10px;
  font-family: 'Roboto', sans-serif;
  font-size: 30px;
  font-weight: 700;
  color: #333;
  background-color: #ffa07a;
  padding: 10px;
  border-radius: 2px;
   width: 100%;
}
.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  top: 30;
  left: 50;
  width: 100%;
  height: 70%;
  padding: 10px;
  border-radius: 10px;
  
}
fulwidth {
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






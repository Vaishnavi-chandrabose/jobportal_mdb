<template>
  <div class="home-page">
    <h1>Home Page</h1>
    <CandidateTable v-if="isDataLoaded" :candidates="candidates" @deleteCandidateAsync="deleteCandidateAsync" @openEditCandidateModal="openEditCandidateModal" />
    <button @click="openAddCandidateModal">Add Candidate</button>
    <div v-if="showAddCandidateModal" class="modal">
      <div class="modal-content">
        <h2>Add Candidate</h2>
        <AddCandidateForm @addCandidate="addCandidate" @closeModal="closeAddCandidateModal" />
      </div>
    </div>
  </div>
</template>


<script>
import { onMounted, ref } from 'vue';
import { usejobportal } from '@/stores/jobportal';
import CandidateTable from '../components/CandidateTable.vue';
import AddCandidateForm from '../components/AddCandidateForm.vue';

export default {
  components: {
    CandidateTable,
    AddCandidateForm,
  },
  setup() {
    const { candidates, getJobs, addCandidate, deleteCandidateAsync } = usejobportal();
    const isDataLoaded = ref(false);
    const showAddCandidateModal = ref(false);

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

    return {
      candidates,
      openAddCandidateModal,
      showAddCandidateModal,
      closeAddCandidateModal,
      isDataLoaded,
      deleteCandidateAsync,
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


</style>






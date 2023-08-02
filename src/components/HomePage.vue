<template>
  <div class="home-page">
    <h1>Home Page</h1>
    <CandidateTable v-if="isDataLoaded" :candidates="candidates" @deleteCandidate="deleteCandidate" @openEditCandidateModal="openEditCandidateModal" />
    <div v-else>Loading...</div>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue';
import { usejobportal } from '@/stores/jobportal';
import CandidateTable from '../components/CandidateTable.vue';

export default {
  components: {
    CandidateTable,
  },
  setup() {
    const { candidates, getJobs, deleteCandidate, openEditCandidateModal } = usejobportal();
    const isDataLoaded = ref(false); 

    onMounted(async () => {
      await getJobs();
      isDataLoaded.value = true; 
    });

    return {
      candidates,
      deleteCandidate,
      openEditCandidateModal,
      isDataLoaded, 
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
  justify-content: flex-start; /* Align content to the top */
  padding-top: 10%; /* Add 10% margin from the top */
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
}
</style>






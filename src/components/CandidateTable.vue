<template>
  <div>
    <table class="fulwidth">
      <thead>
        <tr>
          <th>Name</th>
          <th>Position</th>
          <th>Gender</th>
          <th>Location</th>
          <th>Experience</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(candidate, index) in candidates" :key="candidate.id">
          <td>{{ candidate.name }}</td>
          <td>{{ candidate.position }}</td>
          <td>{{ candidate.gender }}</td>
          <td>{{ candidate.location }}</td>
          <td>{{ candidate.experience }}</td>
        </tr>
      </tbody>
    </table>
    <div v-if="showEditCandidateModal" class="modal">
      <div class="modal-content">
        <EditCandidate :candidateData="selectedCandidateData" @updateCandidate="updateCandidateRow" @closeModal="closeEditCandidateModal" />
      </div>
    </div>
  </div>
</template>
<script>
import { usejobportal } from '@/stores/jobportal';
import { defineComponent,ref } from 'vue';

export default defineComponent({
  props: {
    candidates: {
      type: Array,
      required: true,
    },
  },
  setup() {
    const { candidates } = usejobportal();

    return {
      candidates,
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

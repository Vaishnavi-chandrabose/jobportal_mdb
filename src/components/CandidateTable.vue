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
            <button @click="confirmDeleteCandidate(candidate.candidateid)"> Edit</button><br>
            <button @click="confirmDeleteCandidate(candidate.candidateid)"> Delete</button><br>
          </td>
        </tr>
      </tbody>
    </table>
    
  </div>
</template>

<script>
import { usejobportal } from '@/stores/jobportal';
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    candidates: {
      type: Array,
      required: true,
    },
  },
  setup() {
    const { candidates, deleteCandidate } = usejobportal();
    

    
    const confirmDeleteCandidate = (candidateId) => {
  console.log(candidateId); // Add this line to check the candidateId
  const confirmation = confirm('Are you sure you want to delete the candidate?');
  if (confirmation) {
    deleteCandidate(candidateId);
  } else {
    console.log('Deletion canceled by user.');
  }
};


    return {
      candidates,
     confirmDeleteCandidate,
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

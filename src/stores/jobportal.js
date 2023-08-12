import { defineStore } from 'pinia';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

export const usejobportal = defineStore('jobportal', {
  state: () => ({
    candidates: [],
    showAddCandidateModal: false,
    showEditCandidateModal: false,
    selectedCandidateData: null,
    mongoData: [],
    isModalOpen: false,
    job: {
      candidateid: '',
      name: '',
      position: '',
      gender: '',
      experience: '',
      location: '',
    },
    errors: {
      candidateid: '',
      name: '',
      position: '',
      gender: '',
      experience: '',
      location: '',
    },
  }),

  actions: {


    async saveJob(candidateData) {
      if (!this.validateForm(candidateData)) {
        console.log('Form validation failed. Job not saved.');
        return;
      }
  
      try {
        const accessToken = await this.getMongoDBToken();
        if (!accessToken) {
          console.log('Failed to get MongoDB access token. Job not saved.');
          return;
        }
  
        const response = await axios.post(
          'https://ap-south-1.aws.data.mongodb-api.com/app/data-fhzlj/endpoint/data/v1/action/insertOne',
          {
            dataSource: 'Cluster0',
            database: 'job_portal_db',
            collection: 'Job_portal_tabel',
            document: candidateData,
          },
          {
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + accessToken,
            },
          }
        );
  
        this.candidates.push(candidateData);
  
        await this.getJobs();
      } catch (error) {
        console.log('API Error:', error);
      }
    },
    async addCandidate(newCandidate) {
      // Generate a unique ID for the candidate
      newCandidate.id = uuidv4();
      this.candidates.push(newCandidate);
      this.saveCandidatesToBackend();
    },
    async deleteCandidate(candidateId) {
  try {
    const accessToken = await this.getMongoDBToken();
    if (!accessToken) {
      console.log('Failed to get MongoDB access token. Candidate not deleted.');
      return;
    }

    const response = await axios.post(
      'https://ap-south-1.aws.data.mongodb-api.com/app/data-fhzlj/endpoint/data/v1/action/deleteOne',
      {
        dataSource: 'Cluster0',
        database: 'job_portal_db',
        collection: 'Job_portal_tabel',
        filter: {
          candidateid: candidateId, 
        },
      },
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + accessToken,
        },
      }
    );

    console.log('Candidate deleted from MongoDB:', response.data);

    this.candidates = this.candidates.filter(candidate => candidate.candidateid !== candidateId);

  } catch (error) {
    console.log('API Error:', error);
  }
},
    async getJobs() {
      try {
        const accessToken = await this.getMongoDBToken();
        if (!accessToken) {
          console.log('Failed to get MongoDB access token. Unable to fetch job data.');
          return;
        }

        let data = JSON.stringify({
          dataSource: 'Cluster0',
          database: 'job_portal_db',
          collection: 'Job_portal_tabel',
          filter: {},
        });

        let config = {
          method: 'post',
          url: 'https://ap-south-1.aws.data.mongodb-api.com/app/data-fhzlj/endpoint/data/v1/action/find',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + accessToken,
          },
          data: data,
        };

        const response = await axios.request(config);
        this.candidates = response.data.documents; // Corrected to set candidates with the fetched data
        console.log('Job data fetched successfully:', response.data.documents);
      } catch (error) {
        console.log('API Error:', error);
      }
    },


    async getMongoDBToken() {
      let refresh_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJiYWFzX2RhdGEiOm51bGwsImJhYXNfZGV2aWNlX2lkIjoiMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwIiwiYmFhc19kb21haW5faWQiOiI2NGEyOWI1NmYzNmE3ZjI4NmUzZmRkODUiLCJiYWFzX2lkIjoiNjRiNzUwODMyYjEyYjI4ZmRiNDMxMTM1IiwiYmFhc19pZGVudGl0eSI6eyJpZCI6IjY0YjYzMTU3ZjY1NjU4MzM1YzI2NDhiZCIsInByb3ZpZGVyX3R5cGUiOiJhcGkta2V5IiwicHJvdmlkZXJfaWQiOiI2NGEyOWI2MWYzNmE3ZjI4NmUzZmUwZmIifSwiZXhwIjoxNjk0OTE5Mjk5LCJpYXQiOjE2ODk3MzUyOTksInN0aXRjaF9kYXRhIjpudWxsLCJzdGl0Y2hfZGV2SWQiOiIwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAiLCJzdGl0Y2hfZG9tYWluSWQiOiI2NGEyOWI1NmYzNmE3ZjI4NmUzZmRkODUiLCJzdGl0Y2hfaWQiOiI2NGI3NTA4MzJiMTJiMjhmZGI0MzExMzUiLCJzdGl0Y2hfaWRlbnQiOnsiaWQiOiI2NGI2MzE1N2Y2NTY1ODMzNWMyNjQ4YmQiLCJwcm92aWRlcl90eXBlIjoiYXBpLWtleSIsInByb3ZpZGVyX2lkIjoiNjRhMjliNjFmMzZhN2YyODZlM2ZlMGZiIn0sInN1YiI6IjY0YjYzMTU3ZjY1NjU4MzM1YzI2NDhiYiIsInR5cCI6InJlZnJlc2gifQ.UGaUuGRmgCAbttJJZIGaR4WFNV1ER65DiC4pHY7LVdQ';

      let config = {
        method: 'post',
        url: 'https://ap-south-1.aws.realm.mongodb.com/api/client/v2.0/auth/session',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + refresh_token,
        },
      };

      try {
        const response = await axios.request(config);
        return response.data.access_token;
      } catch (error) {
        console.log('Error getting MongoDB access token:', error);
        return null;
      }
    },
    validateForm(candidateData) {
      if (!candidateData.name || !candidateData.position || !candidateData.gender)
       {
        return false;
      }

      return true;
    },
   
  },
  async deleteCandidate(candidateId) {
    try {
      const accessToken = await this.getMongoDBToken();
      if (!accessToken) {
        console.log('Failed to get MongoDB access token. Candidate not deleted.');
        return;
      }
  
      const response = await axios.post(
        'https://ap-south-1.aws.data.mongodb-api.com/app/data-fhzlj/endpoint/data/v1/action/deleteOne',
        {
          dataSource: 'Cluster0',
          database: 'job_portal_db',
          collection: 'Job_portal_tabel',
          filter: {
            candidateid: candidateId, 
          },
        },
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + accessToken,
          },
        }
      );
  
      console.log('Candidate deleted from MongoDB:', response.data);
  
      this.candidates = this.candidates.filter(candidate => candidate.candidateid !== candidateId);
  
    } catch (error) {
      console.log('API Error:', error);
    }
  },
  async editCandidate(updatedCandidateData) {
    try {
      const accessToken = await this.getMongoDBToken();
      if (!accessToken) {
        console.log('Failed to get MongoDB access token. Candidate not edited.');
        return;
      }
  
      const response = await axios.post(
        'https://ap-south-1.aws.data.mongodb-api.com/app/data-fhzlj/endpoint/data/v1/action/updateOne',
        {
          dataSource: 'Cluster0',
          database: 'job_portal_db',
          collection: 'Job_portal_tabel',
          filter: { candidateid: updatedCandidateData.candidateid },
          update: { $set: updatedCandidateData },
        },
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + accessToken,
          },
        }
      );
  
      console.log('Candidate updated in MongoDB:', response.data);
  
      // Update the candidate in the local candidates array
      const candidateIndex = this.candidates.findIndex(candidate => candidate.candidateid === updatedCandidateData.candidateid);
      if (candidateIndex !== -1) {
        this.candidates[candidateIndex] = updatedCandidateData;
      }
    } catch (error) {
      console.log('API Error:', error);
    }
  },
  

  methods: {
    resetForm() {
      this.job = {
        job_id: '',
        name: '',
        position: '',
        gender: '',
        experience: '',
        location: '',
      };
      this.errors = {
        job_id: '',
        name: '',
        position: '',
        gender: '',
        experience: '',
        location: '',
      };
    },
   
  },
  
  
});

usejobportal.id = 'job';

export default usejobportal;
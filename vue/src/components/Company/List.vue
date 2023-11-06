<template>
  <div class="home mt-5 mb-5">
    <div class="row">
      <div class="col-12 mb-2 text-end">
        <router-link :to='{name:"companyAdd"}' class="btn btn-primary">Create</router-link>
      </div>
      <div class="col-12">
        <div class="card">
          <div class="card-header">
            <h4>Company</h4>
          </div>
          <div class="card-body">
            <div class="table-responsive">
              <table class="table table-bordered">
                <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Logo</th>
                  <th>Website</th>
                  <th>Actions</th>
                </tr>
                </thead>
                <tbody v-if="this.checkTotal !== 0">
                <tr v-for="(company,key) in this.companiesData.data" :key="key">
                  <td>{{ company.name }}</td>
                  <td>{{ company.email }}</td>
                  <td><img v-if="company.logo_url" height="100" width="100" :src="company.logo_url" alt=""></td>
                  <td>{{ company.website }}</td>
                  <td>
                    <router-link :to='{name:"companyEdit",params:{id:company.id}}' class="btn btn-success">
                      Edit
                    </router-link>
                    <button type="button" @click="this.delete(company.id)" class="btn btn-danger">Delete</button>
                  </td>
                </tr>
                </tbody>
                <tbody v-else>
                <tr>
                  <td colspan="5" align="center">No Companies Found.</td>
                </tr>
                </tbody>
              </table>
            </div>
            <Bootstrap4Pagination :data="companiesData" @pagination-change-page="this.getResults"></Bootstrap4Pagination>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import { Bootstrap4Pagination } from 'laravel-vue-pagination';
import axios from "axios";
export default {
  name: "CompanyList",
  components:{
    Bootstrap4Pagination
  },
  data: function() {
    return {
      checkTotal : 0,
      companiesData: []
    };
  },
  computed: {
  },

  mounted() {
    this.getResults();
  },

  methods: {

    getResults: async function (page = 1) {
      axios.get(import.meta.env.VITE_APP_API_URL + "companies?page=" + page)
          .then(response => {
            this.checkTotal = response.data.total;
            this.companiesData = response.data;
          })
          .catch(() => {
          });

    },
    delete: function (companyId) {
      axios.delete(import.meta.env.VITE_APP_API_URL + "companies/" + parseInt(companyId)).then(() => {
        this.getResults();
      });
    }
  }
};
</script>

<style scoped>
.pagination{
  margin-bottom: 0;
}
</style>
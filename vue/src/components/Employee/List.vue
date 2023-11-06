<template>
  <div class="home mt-5 mb-5">
    <div class="row">
      <div class="col-12 mb-2 text-end">
        <router-link :to='{name:"EmployeeAdd"}' class="btn btn-primary">Create</router-link>
      </div>
      <div class="col-12">
        <div class="card">
          <div class="card-header">
            <h4>Employee</h4>
          </div>
          <div class="card-body">
            <div class="table-responsive">
              <table class="table table-bordered">
                <thead>
                <tr>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Company Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Actions</th>
                </tr>
                </thead>
                <tbody v-if="this.checkTotal !== 0">
                <tr v-for="(employee,key) in this.employeesData.data" :key="key">
                  <td>{{ employee.first_name }}</td>
                  <td>{{ employee.last_name }}</td>
                  <td>{{ employee.company_name }}</td>
                  <td>{{ employee.email }}</td>
                  <td>{{ employee.phone }}</td>
                  <td>
                    <router-link :to='{name:"EmployeeEdit",params:{id:employee.id}}' class="btn btn-success">
                      Edit
                    </router-link>
                    <button type="button" @click="this.delete(employee.id)" class="btn btn-danger">Delete</button>
                  </td>
                </tr>
                </tbody>
                <tbody v-else>
                <tr>
                  <td colspan="6" align="center">No Employees Found.</td>
                </tr>
                </tbody>
              </table>
            </div>
            <Bootstrap4Pagination :data="employeesData" @pagination-change-page="this.getResults"></Bootstrap4Pagination>
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
  name: "EmployeeList",
  components:{
    Bootstrap4Pagination
  },
  data: function() {
    return {
      checkTotal : 0,
      employeesData: []
    };
  },
  computed: {
  },

  mounted() {
    this.getResults();
  },

  methods: {

    getResults: async function (page = 1) {
      axios.get(import.meta.env.VITE_APP_API_URL + "employees?page=" + page)
          .then(response => {
            this.checkTotal = response.data.total;
            this.employeesData = response.data;
          })
          .catch(() => {
          });

    },
    delete: function (employeeId) {
      axios.delete(import.meta.env.VITE_APP_API_URL + "employees/" + parseInt(employeeId)).then(() => {
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
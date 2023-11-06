<template>
  <div class="home mt-5">
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-header">
            <h4>Update Company</h4>
          </div>
          <div class="card-body">
            <form @submit.prevent="this.update()">
              <div class="row">
                <div class="col-12 mb-2">
                  <div class="form-group">
                    <label for="first_name">First Name</label>
                    <input
                        type="text"
                        class="form-control"
                        :class="{ 'is-invalid': errors.first_name }"
                        id="first_name"
                        v-model="employeeData.first_name"
                        placeholder="Enter first name"
                    />
                    <div class="invalid-feedback" v-if="errors.first_name">
                      {{ errors.first_name[0] }}
                    </div>
                  </div>
                </div>
                <div class="col-12 mb-2">
                  <div class="form-group">
                    <label for="last_name">Last Name</label>
                    <input
                        type="text"
                        class="form-control"
                        :class="{ 'is-invalid': errors.last_name }"
                        id="last_name"
                        v-model="employeeData.last_name"
                        placeholder="Enter last name"
                    />
                    <div class="invalid-feedback" v-if="errors.last_name">
                      {{ errors.last_name[0] }}
                    </div>
                  </div>
                </div>
                <div class="col-12 mb-2">
                  <div class="form-group">
                    <label for="email">Email address</label>
                    <input
                        type="email"
                        class="form-control"
                        :class="{ 'is-invalid': errors.email }"
                        id="email"
                        v-model="employeeData.email"
                        placeholder="Enter email"
                    />
                    <div class="invalid-feedback" v-if="errors.email">
                      {{ errors.email[0] }}
                    </div>
                  </div>
                </div>
                <div class="col-12 mb-2">
                  <div class="form-group">
                    <label for="phone">Phone Number</label>
                    <input
                        type="text"
                        class="form-control"
                        :class="{ 'is-invalid': errors.phone }"
                        id="phone"
                        v-model="employeeData.phone"
                        placeholder="Enter phone number"
                    />
                    <div class="invalid-feedback" v-if="errors.phone">
                      {{ errors.phone[0] }}
                    </div>
                  </div>
                </div>

                <div class="col-12 mb-2">
                  <div class="form-group">
                    <label for="company_id">Company</label>
                    <select id="company_id" v-model="employeeData.company_id"
                            class="form-control"
                            :class="{ 'is-invalid': errors.company_id }">
                      <option value="">Select a company</option>
                      <option v-for="company in companies" :value="company.id">{{ company.name }}</option>
                    </select>
                    <div class="invalid-feedback" v-if="errors.company_id">
                      {{ errors.company_id[0] }}
                    </div>
                  </div>
                </div>
                <div class="col-12">
                  <button type="submit" class="btn btn-primary">Update</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import axios from "axios";

export default {
  name: "EmployeeEdit",

  data: function () {
    return {
      companies: [],
      employeeData: {
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        company_id: '',
      }
    };
  },
  computed: {
    ...mapGetters(["errors"]),
  },

  mounted() {
    this.$store.commit("setErrors", {});
    this.getCompanies();
    this.get();
  },

  methods: {
    getCompanies: async function () {
      await axios.get(import.meta.env.VITE_APP_API_URL + "getCompanies").then(response => {
        this.companies = response.data;
      }).catch((error) => {
        console.error(error);
      });
    },
    get: async function () {
      await axios.get(import.meta.env.VITE_APP_API_URL + "employees/" + this.$route.params.id).then(response => {
        const {first_name, last_name, email, phone, company_id} = response.data.data;
        this.employeeData.first_name = first_name;
        this.employeeData.last_name = last_name;
        this.employeeData.email = email;
        this.employeeData.phone = phone;
        this.employeeData.company_id = company_id;
      }).catch((error) => {
        console.error(error);
      });
    },

    update: function () {
      this.employeeData._method = 'patch';
      axios.post(import.meta.env.VITE_APP_API_URL + "employees/" + parseInt(this.$route.params.id), this.employeeData)
          .then(response => {
            if (response) {
              this.$router.push({name: "EmployeeList"});
            }
          });
    },
  }
};
</script>
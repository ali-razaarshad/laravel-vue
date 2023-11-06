<template>
  <div class="home mt-5">
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-header">
            <h4>Add Company</h4>
          </div>
          <div class="card-body">
            <form @submit.prevent="this.create()">
              <div class="row">
                <div class="col-12 mb-2">
                  <div class="form-group">
                    <label for="name">Name</label>
                    <input
                        type="text"
                        class="form-control"
                        :class="{ 'is-invalid': errors.name }"
                        id="name"
                        v-model="companyData.name"
                        placeholder="Enter name"
                    />
                    <div class="invalid-feedback" v-if="errors.name">
                      {{ errors.name[0] }}
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
                        v-model="companyData.email"
                        placeholder="Enter email"
                    />
                    <div class="invalid-feedback" v-if="errors.email">
                      {{ errors.email[0] }}
                    </div>
                  </div>
                </div>
                <div class="col-12 mb-2">
                  <div class="form-group">
                    <label for="file">Logo</label>
                    <input
                        type="file"
                        class="form-control"
                        :class="{ 'is-invalid': errors.logo }"
                        id="file"
                        v-on:change="onFileChange"
                        accept="image/*"
                        placeholder="Upload Logo"
                    />
                    <div class="invalid-feedback" v-if="errors.logo">
                      {{ errors.logo[0] }}
                    </div>
                  </div>
                </div>
                <div class="col-12 mb-2">
                  <div class="form-group">
                    <label for="website">Website</label>
                    <input
                        type="url"
                        class="form-control"
                        :class="{ 'is-invalid': errors.website }"
                        id="website"
                        v-model="companyData.website"
                        placeholder="Enter website"
                    />
                    <div class="invalid-feedback" v-if="errors.website">
                      {{ errors.website[0] }}
                    </div>
                  </div>
                </div>
                <div class="col-12">
                  <button type="submit" class="btn btn-primary">Save</button>
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
  name: "CompanyAdd",

  data: function () {
    return {
      companyData: {
        name: '',
        email: '',
        logo: '',
        website: '',
      }
    };
  },
  computed: {
    ...mapGetters(["errors"])
  },

  mounted() {
    this.$store.commit("setErrors", {});
  },

  methods: {
    onFileChange(e) {
      this.companyData.logo = e.target.files[0];
    },
    create: function () {

      axios.post(import.meta.env.VITE_APP_API_URL + "companies", this.companyData)
          .then(response => {
            if (response) {
              this.$router.push({name: "CompanyList"});
            }
          }).catch((error) => {

      });
    },
  }
};
</script>

<style scoped>

</style>
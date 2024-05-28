<template>
  <v-sheet class="mx-auto mt-8 br-t" width="600">
    <v-card class="pa-4">
      <h1 class="text-center">{{ isSignup ? "Register" : "Login" }}</h1>
      <br />
      <v-form fast-fail @submit.prevent>
        <v-text-field
          v-if="isSignup"
          v-model="username"
          label="username"
        ></v-text-field>
        <v-text-field v-model="email" label="email"></v-text-field>

        <v-text-field v-model="password" label="password"></v-text-field>
        <p v-if="!isSignup">
          Don't have an account?
          <span class="pointer" @click="signUp">Sign Up</span>
        </p>
        <p v-if="isSignup">
          Already have an account?
          <span class="pointer" @click="signUp">Login</span>
        </p>
        <v-btn
          class="mt-2"
          color="primary"
          type="submit"
          block
          @click="isSignup ? submitSignup() : submitLogin()"
          >{{ isSignup ? "signUp" : "Login" }}
        </v-btn>
      </v-form>
    </v-card>
  </v-sheet>
</template>
<script>
import { mapActions, mapState } from "vuex";

export default {
  data: () => ({
    email: "",
    password: "",
    username: "",
    isSignup: false,
  }),
  computed: {
    ...mapState("product", ["users"]),
  },
  created() {
    if (localStorage.getItem("user")) {
      this.$router.push({
        name: "ViewProfile",
      });
    }
  },
  methods: {
    ...mapActions("product", ["login", "signup"]),
    async submitLogin() {
      const user = await this.login({
        email: this.email,
        password: this.password,
      });
      if (!user) {
        alert("Invalid email or password!");
      }
      this.$router.push({
        name: "ViewProfile",
      });
    },
    submitSignup() {
      const isEmailExist = this.users.find((item) => item.email === this.email);
      if (isEmailExist) {
        alert("this email is already exist!");
        return;
      }
      if (!this.username || !this.email || !this.password) {
        alert("username email password must be required!");
        return;
      }
      this.signup({
        username: this.username,
        email: this.email,
        password: this.password,
      });
    },
    signUp() {
      this.isSignup = !this.isSignup;
    },
  },
};
</script>
<style>
.pointer {
  cursor: pointer;
  text-decoration: underline;
  color: var(---primary);
}
</style>

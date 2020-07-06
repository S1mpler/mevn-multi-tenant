<template>
  <section class="section-full-screen login">
  <!-- <img class="login__image" src="../assets/img/login.jpg" /> -->
  <div class="container">
    <div class="row">
      <div class="col-12 col-md-5 offset-md-1">
        <div class="login__card">
          <form @submit.prevent="login">
            <div class="form-row">
              <label>Email</label>
              <input
                required
                type="email"
                name="email"
              />
            </div>
            <div class="form-row">
              <label>Password</label>
              <input
                required
                type="password"
                name="password"
              />
            </div>
            <button
              class="button button--primary my-3"
              type="submit"
            >
              Login
            </button>
          </form>

          <div class="d-flex flex-column">
            <a class="link-underline-hover link-underline-hover--primary">
              Create an admin account
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Login extends Vue {
  // @Prop() private msg!: string;
  login(): void {
    this.$router.push({ path: 'dashboard' });
  }
}
</script>


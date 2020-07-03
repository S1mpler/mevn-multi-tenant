<template>
  <section class="section">
    <div class="container">
      <h1 class="h1">Organizations</h1>
      <button class="button button--primary">Add organization</button>
      <table class="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          <tr @click="toOrganization('1312312312312312')">
            <td>1312312312312312</td>
            <td>Organization first</td>
          </tr>
        </tbody>

      </table>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Dashboard extends Vue {
  // @Prop() private msg!: string;
  toOrganization(organizationId: string): void {
    this.$router.push({ path: `organization/${organizationId}` });
  }
}
</script>
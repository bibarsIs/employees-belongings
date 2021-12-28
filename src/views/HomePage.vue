<template>

  <div class="flex flex-col items-center">
    <EmployeesTable class="pt-8"></EmployeesTable>
  </div>
</template>

<script>
import EmployeesTable from "../components/EmployeesTable.vue";
export default {
  name: "HomePage",
  components: {EmployeesTable}
}
</script>

<style scoped>

</style>

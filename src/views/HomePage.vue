<template>

  <div class="flex flex-col items-center">
    <EmployeesTable class="pt-8 max-w-full min-w-[50%]"></EmployeesTable>
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

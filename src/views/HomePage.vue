<template>
  <div class="flex flex-col items-center">
    <h1 class="py-8 text-2xl">Список сотрудников</h1>
    <EmployeesTable></EmployeesTable>
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

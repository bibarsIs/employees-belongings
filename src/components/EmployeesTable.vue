<template>
  <table v-if="isLoading" class="table-fixed border-collapse border border-gray-400 shadow">
    <thead>
    <tr>
      <th @click="sortByName">ФИО</th>
      <th>Кол-во</th>
      <th>Общая стоимость</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="employee in employeeData" :key="employee['id']">
      <th>{{ `${employee.surname} ${employee.employeeName.charAt(0)}. ${employee.fatherName.charAt(0)}.` }}</th>
      <th>{{ employee.items.length }}</th>
      <th>{{ employee.items[0].itemCost }}</th>
    </tr>
    </tbody>
  </table>
  <span v-else>Загружается...</span>
</template>

<script>
import {computed, onMounted, reactive, ref} from "vue";
import axios from 'axios';

export default {
  name: "EmployeesTable",
  setup() {
    const isLoading = ref(false)
    let employeeData = ref(null)

    onMounted(async () => {
      const response = await axios.get('http://localhost:3001/data')
      employeeData.value = await response.data
      isLoading.value = true
    })

    function sortByName() {

    }

    return {
      employeeData,
      isLoading,
      sortByName
    }
  }
}
</script>

<style scoped>
  th {
    border: 1px solid black;
    padding: 4px;
  }
</style>

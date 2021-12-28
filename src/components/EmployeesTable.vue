<template>
  <div v-if="isLoading">
    <q-table
        title="Список сотрудников"
        :rows="rows"
        :columns="columns"
        row-key="id"
    />
  </div>
  <span v-else>Загружается...</span>
</template>

<script>
import {computed, onMounted, reactive, ref} from "vue";
import axios from 'axios';
import {columns, rows} from "../composables/tableData";


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


    return {
      employeeData,
      isLoading,
      columns, rows,
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

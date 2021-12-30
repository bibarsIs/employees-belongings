<template>
  <div>
    <q-table
        title="Список сотрудников"
        :rows="rows"
        :columns="columns"
        :row-key="row => row['id']"
        v-model:pagination="pagination"
        table-header-style="font-weight: bold"
        hide-pagination
        binary-state-sort
        :filter="filter"
        @request="handleRequest"
    >
      <template v-slot:top-right>
        <q-input rounded dense debounce="300" v-model="filter" placeholder="Поиск" model-value="">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>

    </q-table>
    <div class="row justify-center q-mt-md">
      <q-pagination
          v-model="pagination.page"
          color="grey-8"
          :max="pagesNumber"
          size="15px"
          :model-value="pagination.page"
      />
    </div>
  </div>
</template>

<script>
import {computed, onMounted, ref} from "vue";
import axios from 'axios';
import {columns, pagination, rows} from "../composables/tableData";


export default {
  name: "EmployeesTable",
  setup() {
    let employeeData = ref(null)
    const filter = ref('')

    onMounted(async () => {
      const response = await axios.get('http://localhost:3001/data')
      employeeData = await response.data


    })

    function fetchFromServer (startRow, count, filter, sortBy, descending) {
      const data = filter
          ? employeeData.filter(row => row.surname.includes(filter))
          : employeeData.slice()
      // handle sortBy
      if (sortBy) {
        const sortFn = sortBy === 'desc'
            ? (descending
                    ? (a, b) => (a.name > b.name ? -1 : a.name < b.name ? 1 : 0)
                    : (a, b) => (a.name > b.name ? 1 : a.name < b.name ? -1 : 0)
            )
            : (descending
                    ? (a, b) => (parseFloat(b[ sortBy ]) - parseFloat(a[ sortBy ]))
                    : (a, b) => (parseFloat(a[ sortBy ]) - parseFloat(b[ sortBy ]))
            )
        data.sort(sortFn)
      }


    return {
      employeeData,
      columns, rows, pagination,
      pagesNumber: computed(() => Math.ceil(rows.length / pagination.value.rowsPerPage)),
      filter
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

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
    >
      <template v-slot:top-right>
        <q-input rounded dense debounce="300" v-model="filter" placeholder="Поиск">
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
    const filter = ref('')

    onMounted(async () => {
      //
    })


    return {
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

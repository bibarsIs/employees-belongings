<template>
  <div class="flex flex-col justify-between items-center h-screen pt-32"> <!-- container -->
    <div class="flex flex-col items-start min-w-[50%] space-y-9">
      <q-form class="flex flex-col items-start space-y-3">

        <div class="flex items-center space-x-3">
          <label for="surname">Фамилия:</label>
          <q-input
              outlined
              id="surname"
              v-model="surname"
          >
          </q-input>
        </div>
        <div class="flex items-center space-x-3">

          <label for="surname">Имя:</label>
          <q-input
              outlined
              id="name"
              v-model="name"
          >
          </q-input>
        </div>
        <div class="flex items-center space-x-3">

          <label for="surname">Отчество:</label>
          <q-input
              outlined
              id="fatherName"
              v-model="fatherName"
          >
          </q-input>
        </div>
      </q-form>
      <span class="text-lg">
          Список выданных материальных ценностей:
      </span>
      <q-table
          title="Список сотрудников"
          :rows="rows"
          :columns="columns"
          :row-key="row => row['itemId']"
          table-header-style="font-weight: bold"
          hide-pagination
          binary-state-sort
          :filter="filter"
      >

      </q-table>
    </div>
  </div>
</template>

<script>
import {ref} from "vue";
import {columns, rows} from "../composables/itemsTable";

export default {
  name: "EditPage",

  setup() {
    const surname = ref('')
    const name = ref('')
    const fatherName = ref('')

    return {
      surname, name, fatherName,
      rows, columns
    }
  }

}
</script>

<style scoped>

</style>

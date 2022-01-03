<template>
  <div>
    <q-table
        title="Список сотрудников"
        :rows="rows"
        :columns="columns"
        :row-key="row => row['id']"
        v-model:pagination="pagination"
        hide-pagination
        binary-state-sort
        :filter="filter"
        @row-click="handleRowClick"
        @row-dblclick="handleRowDoubleClick"
        @row-contextmenu="handleRowRightClick"
    >
      <template v-slot:top-right>
        <q-input rounded dense debounce="300" v-model="filter" placeholder="Поиск">
          <template v-slot:append>
            <q-icon name="search"/>
          </template>
        </q-input>
      </template>

    </q-table>

    <!--  pagination  -->
    <div class="row justify-center q-mt-md">
      <q-pagination
          v-model="pagination.page"
          color="grey-8"
          :max="pagesNumber"
          size="15px"
          :model-value="pagination.page"
      />
    </div>

    <!--  shows context menu in cursor place for deleting  -->
    <q-menu
        v-model="showingContextMenu"
        touch-position
        context-menu
    >
      <q-btn color="red" @click="confirmDelete" label="Удалить" v-close-popup/>
    </q-menu>
    <!--  confirm deleting  -->
    <q-dialog v-model="confirmIsVisible">
      <q-card>
        <q-card-section class="flex flex-col justify-between space-y-4 m-4">
          <span>Подтвердить удаление?</span>
          <div class="flex justify-between space-x-8">
            <q-btn color="red" @click="handleDelete" label="Да" v-close-popup/>
            <q-btn color="primary" label="Отмена" v-close-popup/>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-dialog v-model="deletedPopUp">
      <q-card>
        <q-card-section class="flex flex-col">
          <span>Запись о сотруднике удалена</span>
        </q-card-section>
      </q-card>
    </q-dialog>

    <!-- link to add new record -->
    <div>
      <router-link :to="{ name: 'EditPage', params: {id: newId} }">
        <q-btn color="primary" label="Добавить"/>
      </router-link>
    </div>
  </div>
</template>

<script>
import {computed, onMounted, ref} from "vue";
import axios from 'axios';
import {columns, createNewId, pagination, rows} from "../composables/tableData";
import {useRouter} from "vue-router";


export default {
  name: "EmployeesTable",
  setup(delta) {
    const filter = ref('')

    const router = useRouter()

    const showingContextMenu = ref(false)
    const confirmIsVisible = ref(false)
    const deletedPopUp = ref(false)

    function handleRowClick(evt, row) {
      console.log('clicked row with id ' + row['id'])
    }

    // go to employee page at row double click
    function handleRowDoubleClick(evt, row) {
      router.push({name: 'EditPage', params: {id: row['id']}})
    }

    // delete employee
    const confirmDelete = ref(() => {
    })
    const handleDelete = ref(() => {
    })
    const handleRowRightClick = (evt, row) => {
      showingContextMenu.value = true

      confirmDelete.value = () => {
        confirmIsVisible.value = true
      }

      handleDelete.value = async () => {
        await axios.delete('http://localhost:3001/data/' + row['id'])
        rows.value = rows.value.filter(item => item['id'] !== row['id'])
        deletedPopUp.value = true
        router.go(0) // refresh page
      }
    }

    const newId = ref(1)

    onMounted(async () => {
      newId.value = createNewId(rows.value)
      console.log(newId.value)
    })


    return {
      columns, rows, pagination,
      pagesNumber: computed(() => Math.ceil(rows.value.length / pagination.value.rowsPerPage)),
      filter,
      handleRowClick, handleRowDoubleClick, handleRowRightClick,
      showingContextMenu, confirmDelete, confirmIsVisible, handleDelete, deletedPopUp,
      newId
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

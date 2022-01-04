<template>
  <!-- container -->
  <div class="flex flex-col items-center h-screen pt-16">
    <div class="font-bold mb-8 flex flex-col items-start min-w-[50%] justify-start">
      <router-link :to="{ name: 'HomePage' }" class="mb-12">
        <q-btn color="primary">
          <q-icon name="arrow_back"/>
          Назад
        </q-btn>
      </router-link>
      <h1 class="text-2xl">Данные о сотруднике</h1>
    </div>
    <div v-if="isLoading === true" class="flex content-center min-w-[50%] space-y-9">
      <q-spinner color="primary" size="3em"></q-spinner>
    </div>

    <div v-else class="flex flex-col items-start min-w-[50%] space-y-9">
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
          <label for="name">Имя:</label>
          <q-input
              outlined
              id="name"
              v-model="employeeName"
          >
          </q-input>
        </div>

        <div class="flex items-center space-x-3">
          <label for="fatherName">Отчество:</label>
          <q-input
              outlined
              id="fatherName"
              v-model="fatherName"
          >
          </q-input>
        </div>
      </q-form>

      <!--   table   -->
      <AddItem :employee-id="employeeData['id']" @updateTable="handleUpdateTable"></AddItem>
      <q-table
          title="Список выданных материальных ценностей:"
          :rows="rows"
          :columns="columns"
          :row-key="row => row['id']"
          table-header-style="font-weight: bold"
          hide-pagination
          binary-state-sort
      >
        <template v-slot:bottom-row>
          <q-tr class="text-right font-bold">
            <q-td colspan="2">
              Итого
            </q-td>
            <q-td>
              {{ totalCost }}
            </q-td>
          </q-tr>
        </template>
      </q-table>

      <div class="space-x-8">
        <q-btn color="primary" label="Сохранить" @click="handleSaveForm"/>
        <q-btn color="red" label="Отмена" @click="handleResetForm"/>
      </div>

      <q-dialog v-model="savedPopUp">
        <q-card>
          <q-card-section class="flex flex-col">
            <span>Сохранено</span>
          </q-card-section>
        </q-card>
      </q-dialog>

    </div>
  </div>

</template>

<script>
import {ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import {onMounted} from "vue";
import axios from "axios";
import AddItem from "./AddItem.vue";
import {createNewId} from "../composables/employeesTable";


export default {
  name: "EmployeeForm",
  components: {AddItem},
  props: {
    employeeData: {
      type: Object,
      required: true,
      default() {
        return {}
      }
    }
  },
  emits: ['employeeDataUpdated'],

  setup(props, context) {
    const route = useRoute()
    const router = useRouter()

    const surname = ref('')
    const employeeName = ref('')
    const fatherName = ref('')
    const employeeId = route.params.id
    const rows = ref([])
    let localEmployeeData = props.employeeData
    const totalCost = ref(null)
    const isLoading = ref(true)
    const savedPopUp = ref(false)
    const handleSaveForm = ref(() => {
    })


    const columns = [
      {
        name: 'id',
        required: true,
        label: '№ п/п',
        field: row => row['index'],
        format: val => val,
        sortable: true,
        style: `font-weight: bold`,
        align: "left"
      },
      {
        name: 'itemName',
        required: true,
        label: 'Название',
        field: row => row['itemName'],
        format: val => `${val}`,
        sortable: true,
        align: "right"

      },
      {
        name: 'totalCost',
        required: true,
        label: 'Стоимость',
        field: row => row['itemCost'],
        format: val => `${val}`,
        sortable: true,
        align: "right"

      }
    ]

    function calculateTotalCost(items) {
      return items.reduce((totalCost, item) => {
        return parseInt(totalCost) + parseInt(item['itemCost'])
      }, 0)
    }

    let initialRows = []
    onMounted(async () => {

      rows.value = localEmployeeData['items']
      if (rows.value !== undefined) {
        rows.value.forEach((row, index) => { // perhaps use Array.from().forEach?
          row['index'] = index + 1
        })
        totalCost.value = calculateTotalCost(rows.value)
      }
      initialRows = rows.value.slice(0) // pass by value
      surname.value = localEmployeeData['surname']
      employeeName.value = localEmployeeData['employeeName']
      fatherName.value = localEmployeeData['fatherName']

      isLoading.value = false

      handleSaveForm.value = async () => {
        await axios.patch('http://localhost:3001/data/' + localEmployeeData['id'], {
          employeeName: employeeName.value,
          surname: surname.value,
          fatherName: fatherName.value
        })
        savedPopUp.value = true
        //context.emit('employeeDataUpdated') todo
        setTimeout(async () => {await router.go(0)}, 1500) // refresh page, temp fast solution to update data
      }
    })


    function handleResetForm() {
      rows.value = initialRows // bug. Only works once
      surname.value = localEmployeeData['surname']
      employeeName.value = localEmployeeData['employeeName']
      fatherName.value = localEmployeeData['fatherName']

    }


    function handleUpdateTable(params) {
      rows.value.push({
        index: rows.value.at(-1)['index'] + 1,
        id: createNewId(rows),
        itemName: params.itemName,
        itemCost: params.itemCost
      })
    }
    return {
      surname, employeeName, fatherName,
      rows, columns, localEmployeeData,
      totalCost,
      isLoading,
      handleSaveForm, handleResetForm, savedPopUp,
      handleUpdateTable
    }
  }

}
</script>

<style scoped>

</style>

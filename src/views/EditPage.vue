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
import {fetchData} from "../composables/itemsTable";
import {useRoute, useRouter} from "vue-router";
import {onMounted} from "vue";
import axios from "axios";


export default {
  name: "EditPage",

  setup() {
    const route = useRoute()
    const router = useRouter()

    const surname = ref('')
    const employeeName = ref('')
    const fatherName = ref('')
    const employeeId = route.params.id
    const rows = ref('')
    const data = ref(null)
    const totalCost = ref(null)
    const isLoading = ref(true)
    const savedPopUp = ref(false)
    const handleSaveForm = ref(() => {
    })


    const columns = [ // need it here only because of index. Otherwise, would put into itemsTable.js
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

    onMounted(async () => {

      data.value = await fetchData(employeeId)
      rows.value = data.value['items']
      if (rows.value !== undefined) {
        rows.value.forEach((row, index) => { // perhaps use Array.from().forEach?
          row['index'] = index + 1
        })
        totalCost.value = calculateTotalCost(rows.value)
      }

      surname.value = data.value['surname']
      employeeName.value = data.value['employeeName']
      fatherName.value = data.value['fatherName']

      isLoading.value = false

      handleSaveForm.value = async () => {
        await axios.patch('http://localhost:3001/data/' + data.value['id'], {
          employeeName: employeeName.value,
          surname: surname.value,
          fatherName: fatherName.value
        })
        savedPopUp.value = true
        router.go(0) // refresh page
      }
    })


    function handleResetForm() {
      surname.value = data.value['surname']
      employeeName.value = data.value['employeeName']
      fatherName.value = data.value['fatherName']

    }

    return {
      surname, employeeName, fatherName,
      rows, columns, data,
      totalCost,
      isLoading,
      handleSaveForm, handleResetForm, savedPopUp
    }
  }

}
</script>

<style scoped>

</style>

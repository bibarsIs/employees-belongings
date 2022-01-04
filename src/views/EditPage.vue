<template>
  <div>
    <div v-if="isLoading" class="flex justify-center pt-32">
      <q-spinner size="6em"></q-spinner>
    </div>
    <EmployeeForm v-else :employee-data="employeeData" @employeeDataUpdated="handleEmployeeDataUpdated"></EmployeeForm>
  </div>
</template>

<script>
import EmployeeForm from "../components/EmployeeForm.vue";
import {onMounted, ref} from "vue";
import {fetchData} from "../composables/itemsTable";
import {useRoute} from "vue-router";

export default {
  name: 'EditPage',
  components: {
    EmployeeForm
  },

  setup() {
    const route = useRoute()

    const employeeData = ref(null)
    const employeeId = route.params.id
    const isLoading = ref(true)
    async function handleEmployeeDataUpdated() {
      employeeData.value = await fetchData(employeeId)
    }

    onMounted(async () => {
      employeeData.value = await fetchData(employeeId)
      isLoading.value = false
    })

    return {
      employeeData,
      handleEmployeeDataUpdated,
      isLoading
    }
  }
}
</script>

<style scoped>
</style>

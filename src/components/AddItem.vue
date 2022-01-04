<template>
  <div>
    <q-btn :label="addButtonText" color="secondary" @click="toggleAdd" class="mb-4"/>
    <transition name="fade">
      <div v-show="isAdding">
        <q-form @submit.prevent="addItem" class="flex space-x-4">
          <q-input
              ref="itemName"
              id="itemName"
              outlined
              v-model="itemNameModel"
              label="Название"
              lazy-rules="ondemand"
              :rules="[ val => val && val.length > 0 || 'Поле не должно быть пустым']"
          />
          <q-input
              outlined
              v-model="itemCostModel"
              label="Стоимость"
              lazy-rules="ondemand"
              :rules="[ val => val && val.length > 0 || 'Поле не должно быть пустым']"
          />
          <q-btn label="Добавить" type="submit" color="primary" class="mb-4"></q-btn>
        </q-form>

      </div>
    </transition>
  </div>
</template>

<script>
import {nextTick, ref} from "vue";
import axios from "axios";
import {useRouter} from "vue-router";

export default {
  name: "AddItem",
  props: {
    employeeId: Number
  },
  emits: ['updateTable'],
  setup(props, context) { // todo emit update table
    const router = useRouter()
    const employeeId = props.employeeId
    const itemName = ref(null)

    const isAdding = ref(false)
    const addButtonText = ref('Добавить новую МЦ')

    async function toggleAdd() {
      itemNameModel.value = ''
      itemCostModel.value = ''
      addButtonText.value = isAdding.value === false ? 'Отмена' : 'Добавить новую МЦ'
      isAdding.value = !isAdding.value
      await nextTick()
      itemName.value.focus()
    }

    async function addItem() {
      console.log("This function won't work with json-server. Not saved to db")
      /*await axios.post('/http://localhost:3001/data/' + employeeId + '/items', { // limitation of json-server. It only exposes 1 level. This will always throw 404 error
        itemName: itemNameModel,
        itemCost: itemCostModel,
      })*/
      console.log(itemNameModel.value, itemCostModel.value)
      context.emit('updateTable', {
        itemName: itemNameModel.value,
        itemCost: itemCostModel.value
      })
      await toggleAdd()

    }

    const itemNameModel = ref('')
    const itemCostModel = ref('')
    return {
      isAdding, addButtonText, toggleAdd,
      addItem,
      itemNameModel, itemCostModel,
      itemName
    }
  }
}
</script>

<style scoped>
.fade-enter-active {
  transition: all 1s ease;
}

.fade-enter-from,
.fade-leave-to {
  transform: translateX(70px);
  opacity: 0;
}

.fade-leave-active {
  position: absolute;
}
</style>

import axios from "axios";
import {ref} from "vue";

async function fetchData() {
    const response = await axios.get('http://localhost:3001/data')
    return await response.data
}

export const rows = ref(await fetchData())

function calculateTotalCost(items) {
    return items.reduce((totalCost, item) => {
        return parseInt(totalCost) + parseInt(item['itemCost'])

    }, 0)
}

export function createNewId(data) { // new id for adding new employee
    let result = 1
    for (let i = 0; i < data.length-1; i++) {
        if (data[i]['id'] + 1 !== data[i+1]['id']) {
            return data[i]['id'] + 1
        }
        result++
    }
    return result + 1

    // let result = 1
    // data.forEach((employee, index) => {
    //     if (index < data.length - 1) {
    //         result = index + 1
    //         if (employee['id'] + 1 !== data[index + 1]['id']) { // if next id isn't current id + 1
    //             result = employee['id'] + 1
    //             return result
    //         }
    //     } else {
    //         console.log('returning')
    //         return result + 10
    //     }
    // })
    // return 1
}

export const pagination = ref({
    sortBy: 'name',
    descending: false,
    page: 1,
    rowsPerPage: 10,
})

export const columns = [
    {
        name: 'name',
        required: true,
        label: 'ФИО',
        field: row => `${row.surname} ${row.employeeName.charAt(0)}. ${row.fatherName.charAt(0)}`,
        format: val => val,
        sortable: true,
        style: `font-weight: bold`,
        align: "left"
    },
    {
        name: 'totalAmount',
        required: true,
        label: 'Кол-во',
        field: row => row.items.length,
        format: val => val,
        sortable: true,
        align: "right"

    },
    {
        name: 'totalCost',
        required: true,
        label: 'Общая стоимость',
        field: row => calculateTotalCost(row['items']),
        format: val => val,
        sortable: true,
        align: "right"

    }
]


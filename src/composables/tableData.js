import axios from "axios";

export const columns = [
    {
        name: 'name',
        required: true,
        label: 'ФИО',
        field: row => row.employeeName,
        format: val => `${val}`,
        sortable: true
    },
    {
        name: 'totalAmount',
        required: true,
        label: 'Кол-во',
        field: row => row.items.length,
        format: val => `${val}`,
        sortable: true
    },
    {
        name: 'totalCost',
        required: true,
        label: 'общая стоимость',
        field: row => row.items[0].itemCost,
        format: val => `${val}`,
        sortable: true
    }
]

const response = await axios.get('http://localhost:3001/data')
export const rows = await response.data

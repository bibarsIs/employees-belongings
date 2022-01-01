import axios from "axios";

async function fetchData(employeeId) {
    const response = await axios.get('http://localhost:3001/data/' + employeeId)
    return await response.data
}
export const rows = await fetchData(1)

export const columns = [
    {
        name: 'id',
        required: true,
        label: '№ п/п',
        field: row => row.items.id,
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
        format: val => `${val}`,
        sortable: true,
        align: "right"

    },
    {
        name: 'totalCost',
        required: true,
        label: 'общая стоимость',
        field: row => calculateTotalCost(row.items),
        format: val => `${val}`,
        sortable: true,
        align: "right"

    }
]

import FormControlBase from './FormControlBase';

export const newSaleForm: FormControlBase[] = [
    {
        order: 0,
        label: 'Nom',
        name: 'name',
        type: 'text',
    },
    {
        order: 1,
        label: 'Condition',
        name: 'condition',
        type: 'text',
    },
    {
        order: 2,
        label: 'Prix',
        name: 'price',
        type: 'number',
    },
];


export default newSaleForm;

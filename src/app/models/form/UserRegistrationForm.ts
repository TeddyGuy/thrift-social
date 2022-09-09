import FormControlBase from './FormControlBase';

export const userRegistrationForm: FormControlBase[] = [
    {
        order: 0,
        label: 'Nom',
        name: 'name',
        type: 'text'
    },
    {
        order: 1,
        label: 'Email',
        name: 'email',
        type: 'email'
    },
    {
        order: 2,
        label: 'Mot de passe',
        name: 'password',
        type: 'password'
    },
];

import FormControlBase from './FormControlBase';

export const userLoginForm: FormControlBase[] = [
    {
        order: 0,
        label: 'Email',
        name: 'email',
        type: 'email'
    },
    {
        order: 1,
        label: 'Mot de passe',
        name: 'password',
        type: 'password'
    },
];
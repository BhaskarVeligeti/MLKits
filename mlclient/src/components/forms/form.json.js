export const signinForm = [
	{
		key: 'username',
		label: 'Username ',
		ind: '*', cln: ':',
		type: 'text',
		maxLength: 10,
		fieldValidations: {
			required: true,
			isCellnumber: true,
			minLength: 10,
			maxLength: 10
		},
		options: {
			autoComplete: 'given-name',
			placeholder: 'username...'
		}

	},
	{
		key: 'password',
		label: 'Password',
		ind: '*', cln: ':',
		type: 'password',
		maxLength: 10,
		fieldValidations: {
			required: true
		},
		options: {
			autoComplete: 'password',
			placeholder: 'password...',
		}
	},

];
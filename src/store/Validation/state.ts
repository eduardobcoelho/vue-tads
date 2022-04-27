export default {
  validations: {
    required: {
      required: true,
      message: 'Campo obrigatório!',
      trigger: ['input', 'blur'],
    },
    email: {
      type: 'email',
      message: 'E-mail inválido!',
      trigger: ['blur', 'input'],
    },
  },
};

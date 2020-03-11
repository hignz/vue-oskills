export default {
  data() {
    return {
      emailRules: [
        v => !!v || 'Required',
        v => /.+@.+/.test(v) || 'Email must be valid'
      ],
      requiredRules: [v => !!v || 'Required'],
      nameRules: [
        v => !!v || 'Required',
        v => v.length > 2 || 'Name must be at least 3 characters'
      ],
      arrayRules: [v => v.length > 0 || 'Required']
    };
  },
  methods: {
    minLength(min) {
      return v =>
        (v || '').length >= min || `A minimum of ${min} characters is needed`;
    },
    mustMatch(other) {
      return v => v !== other || 'Passwords must match';
    }
  }
};

export default {
  data() {
    return {
      emailRules: [
        v => !!v || 'Email is required',
        v => /.+@.+/.test(v) || 'Email must be valid'
      ],
      requiredRules: [v => !!v || 'Field is required'],
      passwordRules: [
        v => !!v || 'Password is required',
        v => v === this.password || 'Passwords must match',
        v => v.length > 7 || 'Password must be at least 8 characters'
      ],
      nameRules: [
        v => !!v || 'Required',
        v => v.length > 2 || 'Name must be at least 3 characters'
      ]
    };
  },
  methods: {
    minLength(min) {
      return v =>
        (v || '').length >= min || `A minimum of ${min} characters is needed`;
    }
  }
};

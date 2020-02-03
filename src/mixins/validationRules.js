export default {
  data() {
    return {
      emailRules: [
        v => !!v || 'Email is required',
        v => /.+@.+/.test(v) || 'Email must be valid'
      ],
      requiredRules: [v => !!v || 'Field is required']
    };
  },
  methods: {
    minLength(min) {
      return v =>
        (v || '').length >= min || `A minimum of ${min} characters is needed`;
    }
  }
};

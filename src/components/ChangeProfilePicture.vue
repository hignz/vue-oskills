<template>
  <v-form ref="form">
    <v-file-input
      v-model="file"
      :rules="rules"
      placeholder="Change your avatar"
      accept="image/png, image/jpeg, image/bmp"
      show-size
      required
    ></v-file-input>

    <v-btn text color="primary" block @click="upload">Change avatar</v-btn>
  </v-form>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      file: null,
      rules: [
        v => !!v || 'Required',
        v => !v || v.size < 1000000 || 'Avatar size should be less than 1 MB!'
      ]
    };
  },
  methods: {
    ...mapActions([
      'uploadProfilePicture',
      'toggleSnackbar',
      'updateUserAvatar'
    ]),
    upload() {
      if (this.$refs.form.validate()) {
        this.uploadProfilePicture(this.file)
          .then(res => {
            this.toggleSnackbar({
              show: true,
              text: 'Success!',
              color: 'success'
            });

            this.updateUserAvatar(res.url);
          })
          .catch(() => {
            this.toggleSnackbar({
              show: true,
              text: 'Something went wrong',
              color: 'error'
            });
          });
      }
    }
  }
};
</script>

<style></style>

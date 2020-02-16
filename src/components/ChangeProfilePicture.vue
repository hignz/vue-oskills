<template>
  <v-form ref="form">
    <v-file-input
      v-model="image"
      :rules="rules"
      placeholder="Change your avatar"
      accept="image/png, image/jpeg, image/bmp"
      show-size
      required
      @change="preview"
    ></v-file-input>
    <img v-if="image" :src="imageURL" />

    <v-btn text color="primary" block @click="upload">Upload</v-btn>
  </v-form>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      image: null,
      imageURL: '',
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
    preview() {
      if (!this.image) {
        return;
      }
      const fileReader = new FileReader();
      fileReader.addEventListener('load', () => {
        this.imageURL = fileReader.result;
      });

      fileReader.readAsDataURL(this.image);
    },
    upload() {
      if (this.$refs.form.validate()) {
        this.uploadProfilePicture(this.image)
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

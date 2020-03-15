<template>
  <v-form ref="form" v-model="valid">
    <v-file-input
      v-model="image"
      :rules="rules"
      placeholder="Change your avatar"
      accept="image/png, image/jpeg, image/bmp"
      show-size
      required
      @change="onFileChange()"
    ></v-file-input>

    <v-progress-linear
      v-if="isUploading"
      :value="uploadProgress"
    ></v-progress-linear>
    <v-btn
      text
      class="my-2"
      color="primary"
      block
      :disabled="!valid"
      :loading="isUploading"
      @click="onUpload()"
      >Upload</v-btn
    >
    <v-img v-if="image" :src="imageURL" />
  </v-form>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  data() {
    return {
      valid: null,
      image: null,
      imageURL: '',
      rules: [
        v => !!v || 'Required',
        v => !v || v.size < 1000000 || 'Avatar size should be less than 1 MB!'
      ],
      isUploading: false
    };
  },
  computed: {
    ...mapState(['uploadProgress'])
  },
  methods: {
    ...mapActions([
      'uploadProfilePicture',
      'toggleSnackbar',
      'updateUserAvatar'
    ]),
    onFileChange() {
      if (!this.image) {
        return;
      }
      const fileReader = new FileReader();
      fileReader.addEventListener('load', () => {
        this.imageURL = fileReader.result;
      });

      fileReader.readAsDataURL(this.image);
    },
    onUpload() {
      if (this.$refs.form.validate()) {
        this.isUploading = true;
        this.uploadProfilePicture(this.image)
          .then(res => {
            this.isUploading = false;

            this.toggleSnackbar({
              show: true,
              text: 'Avatar successfully uploaded!',
              color: 'success'
            });

            this.image = null;
            this.$refs.form.reset();
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

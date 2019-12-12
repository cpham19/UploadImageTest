<template>
  <v-row>
    <v-col cols="12" sm="6" offset-sm="3">
      <v-card>
        <v-container fluid>
          <form>
            <v-text-field v-model="caption" label="caption" type="text" required :rules="[required]" filled></v-text-field>
            <input type="file" id="file" ref="file" v-on:change="handleFileChange"/><br/><br/>
            <button type="button" class="btn btn-primary" v-on:click="uploadFile" :disabled="!caption || !fileExist">Upload</button>
          </form>
          <p class="successful" v-show="successfulAdd">Successfully uploaded image!</p>
          <p class="failed" v-show="failed">Cannot upload image!<br/>{{error}}</p>
          <v-row>
            <v-col v-for="image in images" :key="image._id" cols="3">
            <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-card v-on="on">
                    <v-img :src="image.path" aspect-ratio="1" class="grey lighten-2">
                    </v-img>
                    <v-card-title class="title">{{image.caption}}</v-card-title>
                  </v-card>
                </template>
                <span>{{image.originalname}}</span>
            </v-tooltip>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import HomeService from "@/services/HomeService";

export default {
  name: "Home",
  data() {
    return {
        images: [],
        file: {},
        fileExist: false,
        caption: '',
        successfulAdd: false,
        failed: false,
        required: (value) => !!value || 'Required Field',
        error: ''
    };
  },
  mounted() {
    this.getImages()
  },
  computed: {
  },
  methods: {
    handleFileChange() {
      this.file = this.$refs.file.files[0]
      this.fileExist = true
    },
    async uploadFile() {
      let formData = new FormData()
      formData.append("caption", this.caption)
      formData.append("file", this.file)

      this.successfulAdd = false
      this.failed = false
      try {
        const response = await HomeService.uploadFile(formData)
        this.successfulAdd = true
        this.file = {}
        this.caption = ''
        const input = this.$refs.file 
        this.$refs.file.type = 'text'
        this.$refs.file.type = 'file'
        this.fileExist = false
        this.getImages()
      }
      catch (err) {
        this.failed = true
        this.error = "Nothing was uploaded or file too large or file is not an image!"
      }
    },
    async getImages() {
      try {
        const response = await HomeService.getImages()
        this.images = response.data.images
      }
      catch(err) {
        console.log(err)
      }
    }
  },
  components: {

  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@media (max-width: 768px) {
}

.successful {
  color:green;
}

.failed {
  color:red;
}
</style>

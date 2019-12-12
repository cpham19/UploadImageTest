<template>
  <v-container fluid>
    <v-layout>
      <v-flex sm12>
        <div v-show="!error">
          <img :src="file" />
        </div>
        <p v-show="error">File does not exist!</p>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import HomeService from "@/services/HomeService";

export default {
  name: "ViewImage",
  data() {
    return {
        file: {},
        error: ''
    };
  },
  mounted() {
    const filename = this.$store.state.route.params.filename
    this.getImage(filename)
  },
  computed: {
  },
  methods: {
    async getImage(filename) {
        try {
          this.error = ''
          const response = await HomeService.getImage(filename)
          this.file = response.config.url
        }
        catch(error) {
          this.file = {}
          this.error = "File not found!"
        }
    }
  },
  components: {

  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.display {
  font-size: 36px;
}

@media (max-width: 768px) {
  .lead {
    font-size: 12px;
  }

  .display {
    font-size: 18px;
    padding: 20px;
  }
}

.successful {
  color:green;
}

.failed {
  color:red;
}
</style>

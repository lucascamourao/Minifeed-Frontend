<template>
  <div>
    <h1>Create Post</h1>
    <form @submit.prevent="createPost">
      <textarea rows="15" placeholder="Text" v-model="text" />

      <button type="submit">Create</button>
    </form>
  </div>
</template>

<script setup>
  import { ref } from "vue";
  import { useAxios } from "@/composables/useAxios";
  import { useToast } from "vue-toast-notification";

  const { post } = useAxios();
  const $toast = useToast();
  
  const text = ref("");

  const createPost = () => {
  post("/posts/", { text: text.value })
    .then((response) => {
      console.log(response);
      text.value = "";
    })
    .catch((error) => {
      if (error.response) {
        const status = error.response.status;

        if (status === 401) {
          $toast.error("You need to login first!", { position: "bottom" });
        } else {
          $toast.error("An unexpected error occurred.", { position: "bottom" });
        }
      } else {
        $toast.error(
          "Unable to reach the server. Please check your connection.",
          {
            position: "bottom",
          }
        );
      }
    });
  };

</script>

<style lang="scss" scoped></style>

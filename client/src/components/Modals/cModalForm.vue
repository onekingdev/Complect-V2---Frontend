<template lang="pug">
card-container.c-modal-review(:title="modalTitle" ref="modalWindow")
  template(#controls)
    c-button(type="icon" iconL="close" size="small" @click="closeModal()")
  template(#content)
    .grid-6
      c-field(label="Name" v-model="form.name" :errors="errors.name" required)
  template(#footer)
    c-button(title="Cancel" type="link" @click="closeModal()")
    c-button(:title="btnTitle" type="primary" @click="saveForm()")
</template>


<script>
import { ref, inject, computed, onMounted } from "vue";
import useModals from "~/store/Modals.js";
import { validates } from "~/core/utils.js";
import { required } from "@vuelidate/validators";
import { onClickOutside } from "@vueuse/core";
import { formLibraryData } from "~/data/data.js";
export default {
  "props": {
    "modalId": {
      "type": String,
      "required": true
    },
    "id": {
      "type": String,
      "default": "",
      "required": false
    },
    "callback": {
      "type": Function,
      "default": () => 1,
      "required": false
    },
    "duplicate": {
      "type": Boolean,
      "default": false
    }
  },
  setup ( props ) {
    const notification = inject( "notification" );
    const modalWindow = ref( null );
    const { deleteModal } = useModals();
    const modalTitle = ref( "" );
    const errors = ref({});
    const btnTitle = computed( () => props.duplicate ? "Duplicate" : "Edit" );
    const form = ref({
      "name": "",
      "owner": "Alex Lim",
      "status": "draft",
      "dateCreated": Date.now()
    });
    const rule = { "name": { required } };
    const closeModal = () => deleteModal( props.modalId );
    onClickOutside( modalWindow, () => closeModal() );

    const duplicateForm = () => {
      try {
        notification({
          "type": "success",
          "title": "Success",
          "message": "Form has been duplicated."
        });
        props.callback();
      } catch ( error ) {
        console.error( error );
        notification({
          "type": "error",
          "title": "Error",
          "message": "Form has not been duplicated. Please try again."
        });
      }
    };

    const updateForm = () => {
      try {
        notification({
          "type": "success",
          "title": "Success",
          "message": "Form has been updated."
        });
        props.callback();
      } catch ( error ) {
        console.error( error );
        notification({
          "type": "error",
          "title": "Error",
          "message": "Form has not been updated. Please try again."
        });
      }
    };

    const saveForm = async () => {
      errors.value = await validates( rule, form.value );
      if ( Object.keys( errors.value ).length > 0 ) return;
      try {
        if ( props.duplicate ) duplicateForm();
        else updateForm();
      } catch ( error ) {
        console.error( error );
      } finally {
        closeModal();
      }
    };

    onMounted( () => {
      form.value = formLibraryData.find( document => document._id === props.id );
      if ( props.duplicate ) {
        modalTitle.value = "Duplicate Form";
        form.value.name = `${form.value.name}(copy)`;
      } else modalTitle.value = "Edit Form";
    });

    return { modalWindow, modalTitle, btnTitle, errors, saveForm, form, closeModal };
  }
};
</script>

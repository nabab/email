<!-- HTML Document -->

<bbn-form :source="formData"
          :action="root + 'actions/folder/create'"
          class="bbn-padding bbn-lg"
          @success="success">
	<bbn-input v-model="formData.name"
						 class="bbn-wide"/>
</bbn-form>
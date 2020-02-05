<template>
	<input
		class="app-input"
		:type="type"
		:placeholder="placeholder"
		:id="id"
		:name="name"
		:readonly="readonly"
		:class="{ 'app-input-error': isInvalid }"
		@focus="selectText"
		v-model="inputValue"
		ref="input"
	/>
</template>

<script>
export default {
	props: {
		placeholder: {
			type: String,
			default: ""
		},
		id: {
			type: String
		},
		name: {
			type: String,
			required: true
		},
		type: {
			type: String,
			default: "text"
		},
		readonly: {
			type: Boolean,
			default: false
		},
		autofocus: {
			type: Boolean,
			default: false
		},
		autoselect: {
			type: String,
			default: ""
		},
		value: {
			default: null
		},
		isInvalid: {
			type: Boolean,
			default: false
		}
	},
	mounted() {
		if (this.autofocus) {
			this.$refs["input"].focus();
		}
	},
	methods: {
		selectText() {
			if (this.autoselect) {
				this.$refs["input"].select();
			}
		}
	},
	computed: {
		inputValue: {
			get() {
				return this.value;
			},
			set(inputValue) {
				if (this.type === "number") {
					this.$emit("input", Number(inputValue));
				} else {
					this.$emit("input", inputValue);
				}
			}
		}
	}
};
</script>

<style scoped>
.app-input {
	width: 100%;
	margin-bottom: 1.5rem;
	padding: 0.25rem;
	border: none;
	border-bottom: 2px solid var(--color-primary);
	color: var(--color-primary);
	background-color: var(--color-secondary);
	transition: border-color 0.2s;
}

.app-input:focus {
	outline: none;
}

.app-input-error {
	border-color: var(--color-red);
}
</style>
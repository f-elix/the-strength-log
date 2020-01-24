<template>
	<div class="textarea-ctn">
		<textarea
			class="textarea"
			:name="name"
			:id="id"
			:cols="cols"
			:rows="rows"
			:placeholder="placeholder"
			:disabled="disabled"
			v-model="textValue"
			@focus="focused = true"
			@blur="focused = false"
		></textarea>
		<label
			:for="id"
			class="textarea-label"
			:class="{ 'focused-label': focused || textValue }"
			>{{ labelText }}</label
		>
	</div>
</template>

<script>
export default {
	props: {
		name: {
			type: String
		},
		id: {
			type: String
		},
		cols: {
			type: String,
			default: "30"
		},
		rows: {
			type: String,
			default: "5"
		},
		labelText: {
			type: String
		},
		disabled: {
			type: Boolean,
			default: false
		},
		placeholder: {
			type: String
		},
		value: {
			type: String
		}
	},
	data() {
		return {
			focused: false
		};
	},
	computed: {
		textValue: {
			get() {
				return this.value;
			},
			set(textValue) {
				this.$emit("input", textValue);
			}
		}
	}
};
</script>

<style scoped>
.textarea-ctn {
	display: flex;
	flex-direction: column;
	position: relative;
}

.textarea-label {
	position: absolute;
	top: 0.5rem;
	left: 1rem;
	font-weight: bold;
	font-size: 1.5rem;
	color: var(--color-greyedout);
	transform: translateY(0.5rem);
	transition: font-size 0.2s ease-out, transform 0.2s ease-out;
}

.textarea {
	padding: 2rem 1rem 0.5rem;
	font-size: 1.5rem;
	border-radius: var(--default-radius);
	border: 2px solid var(--color-primary);
	color: var(--color-primary);
	background-color: transparent;
	transition: all 0.1s linear;
}

.textarea:focus {
	outline: none;
	background-color: var(--color-fg);
}

.focused-label {
	color: var(--color-primary);
	font-size: 1rem;
	transform: translateY(0);
}
</style>
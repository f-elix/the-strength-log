import Vue from "vue";
import { interpret } from "xstate";

export const generateVueMachine = machine => {
	return new Vue({
		created() {
			this.service
				.onTransition(state => {
					this.current = state;
					if (process.env.NODE_ENV === "development") {
						console.log(`[ ${machine.id.toUpperCase()} STATE ]`, this.current.value);
					}
				})
				.onChange(updatedContext => {
					this.context = updatedContext;
					if (process.env.NODE_ENV === "development") {
						console.log(`[ ${machine.id.toUpperCase()} CONTEXT ]`, updatedContext);
					}
				})
				.start();
		},
		data() {
			return {
				current: machine.initialState,
				context: machine.context,
				service: interpret(machine)
			};
		},
		methods: {
			send(event) {
				this.service.send(event);
			}
		}
	});
};

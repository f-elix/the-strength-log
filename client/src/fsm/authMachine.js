import { Machine, assign } from 'xstate';

import router from '../router';

const services = {
	isAuth: async () => {
		const token = localStorage.getItem('token');
		if (!token) {
			const error = new Error();
			error.errorMsg = 'Not authenticated';
			console.warn(error);
			throw error;
		}
		const isAuthQuery = {
			query: `
				query isAuthenticated($token: String!) {
					isAuth(token: $token)
				}
			`,
			variables: {
				token: token
			}
		};
		try {
			const res = await fetch(process.env.VUE_APP_API, {
				method: 'POST',
				headers: {
					'content-type': 'application/json'
				},
				body: JSON.stringify(isAuthQuery)
			});
			const data = await res.json();
			if (data.errors) {
				const error = new Error();
				error.message = data.errors[0].message;
				error.statusCode = data.errors[0].extensions.exception.statusCode;
				throw error;
			}
			if (!data.data.isAuth) {
				const error = new Error();
				error.errorMsg = 'Not authenticated';
				throw error;
			}
			return token;
		} catch (err) {
			console.warn(err);
			throw err;
		}
	},
	authUser: async (_, event) => {
		const { authQuery, queryName } = event.params;
		try {
			const res = await fetch(process.env.VUE_APP_API, {
				method: 'POST',
				headers: {
					'content-type': 'application/json'
				},
				body: JSON.stringify(authQuery)
			});
			const data = await res.json();
			if (data.errors) {
				const error = new Error();
				error.message = data.errors[0].message;
				error.statusCode = data.errors[0].extensions.exception.statusCode;
				throw error;
			}
			const token = data.data[queryName].token;
			return token;
		} catch (err) {
			err.errorMsg = 'You need an internet connection to login.';
			console.error(err);
			throw err;
		}
	},
	getUserData: async (_, event) => {
		const token = event.data;
		const userQuery = {
			query: `
				{
					getUserData {
						name
						createdAt
					}
				}
			`
		};
		try {
			const res = await fetch(process.env.VUE_APP_API, {
				method: 'POST',
				headers: {
					'content-type': 'application/json',
					authorization: token
				},
				body: JSON.stringify(userQuery)
			});
			const data = await res.json();
			if (data.errors) {
				const error = new Error();
				error.message = data.errors[0].message;
				error.statusCode = data.errors[0].extensions.exception.statusCode;
				throw error;
			}
			const userData = data.data.getUserData;
			return userData;
		} catch (err) {
			err.errorMsg = 'Something went wrong, please try again.';
			console.log(err);
			throw err;
		}
	}
};

const actions = {
	routeDashboard: () => {
		router.push('/dashboard').catch(err => console.log(err));
	},
	routeAuth: () => {
		router.push('/').catch(err => console.log(err));
	},
	storeToken: (_, event) => {
		localStorage.setItem('token', event.data);
	},
	clearToken: () => {
		localStorage.removeItem('token');
	},
	showError: assign({
		error: (_, event) => event.data.errorMsg || event.data.err.message
	}),
	clearError: assign({ error: '' }),
	updateUserData: assign({ userData: (_, event) => event.data }),
	clearUserData: assign({ userData: '' })
};

export const authMachine = Machine(
	{
		id: 'auth',
		context: {
			userData: {},
			error: '',
			loading: false
		},
		initial: 'loading',
		states: {
			idle: {
				id: 'idle',
				initial: 'login',
				states: {
					login: {
						on: {
							SIGNUP: 'signup',
							LOGIN: '#loading.authenticatingUser'
						},
						exit: ['clearError']
					},
					signup: {
						on: {
							LOGIN: 'login',
							SIGNUP: '#loading.authenticatingUser'
						},
						exit: ['clearError']
					},
					last: {
						type: 'history'
					}
				}
			},
			loading: {
				id: 'loading',
				initial: 'checkingForAuth',
				states: {
					checkingForAuth: {
						invoke: {
							src: 'isAuth',
							onDone: {
								target: 'loggingUser'
							},
							onError: {
								target: '#idle'
							}
						}
					},
					authenticatingUser: {
						id: 'authenticatingUser',
						invoke: {
							src: 'authUser',
							onDone: {
								target: 'loggingUser',
								actions: ['storeToken']
							},
							onError: {
								target: '#idle.last',
								actions: ['showError']
							}
						}
					},
					loggingUser: {
						invoke: {
							src: 'getUserData',
							onDone: {
								target: '#authenticated',
								actions: ['updateUserData', 'routeDashboard']
							},
							onError: {
								target: '#idle.last',
								actions: ['showError']
							}
						}
					}
				}
			},
			authenticated: {
				id: 'authenticated',
				on: {
					LOGOUT: {
						target: 'idle',
						actions: ['clearToken', 'clearUserData', 'routeAuth']
					},
					LOADED: {
						actions: ['routeDashboard']
					}
				}
			}
		}
	},
	{
		services,
		actions
	}
);

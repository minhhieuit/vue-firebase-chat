<template>
	<div id="app">
		<template v-if="listMesssage.length">
			<div class="login" v-if="!isLogin">
				<div class="enter-username">
					<input type="text" placeholder="Username" v-model="email" />
				</div>
				<div class="enter-password">
					<input type="text" placeholder="password" v-model="password" />
				</div>
				<button @click="register()">Register</button>
				<button @click="login()">Login</button>
			</div>
			<div class="chat-content" v-else>
				<h1>Hello: {{ email }}</h1>
				<div class="enter-message">
					<input type="text" placeholder="Message" v-model="message" />
					<button @click="sendMessage">Send</button>
				</div>
				<ul class="list-message" v-if="listMesssage.length">
					<li class="item-message" v-for="m in listMesssage" :key="m.id">
						<strong>{{ m.data.from }}</strong> : <i>{{ m.data.message }}</i>
					</li>
				</ul>

				<button @click="logout()">Logout</button>
			</div>
		</template>
		<template v-else>
			<div>
				<h1>Loading</h1>
			</div>
		</template>
	</div>
</template>

<script>
	import {
		collection,
		onSnapshot,
		addDoc,
		query,
		orderBy,
	} from 'firebase/firestore';
	import { db, register, login, auth } from './firebase';
	export default {
		name: 'App',
		components: {},
		data() {
			return {
				message: null,
				listMesssage: [],
				collectionDB: null,
				isRegister: false,
				isLogin: false,
				email: '',
				password: '',
			};
		},
		watch: {},
		methods: {
			logout() {
				auth
					.signOut()
					.then(() => {})
					.catch((e) => {
						console.log(e.code + ' ' + e.message);
					});
			},
			async login() {
				login(this.email, this.password)
					.then((res) => {
						console.log(res);
					})
					.catch((e) => {
						console.log(e);
					});
			},
			async register() {
				register(this.email, this.password);
			},
			async init() {
				auth.onAuthStateChanged((user) => {
					this.isLogin = user ? ((this.email = user.email), true) : false;
				});

				this.collectionDB = collection(db, 'chat');
				var vm = this;
				var q = query(this.collectionDB, orderBy('createdAt'));

				onSnapshot(q, (querySnapshot) => {
					let newMessages = [];
					querySnapshot.forEach((snapshot) => {
						let id = snapshot.id;
						let newMessage = {
							id: id,
							data: snapshot.data(),
						};
						newMessages.push(newMessage);
					});
					// vm.listMesssage = newMessages;
					vm.listMesssage = newMessages;
				});
			},
			sendMessage() {
				const vm = this;
				if (this.message) {
					addDoc(this.collectionDB, {
						message: this.message,
						createdAt: new Date(),
						from: this.email,
					})
						.then((res) => {
							console.log('res ', res);
							vm.message = null;
						})
						.catch((e) => {
							console.log('error: ' + e);
						});
				}
			},
		},
		created() {
			this.init();
		},
	};
</script>

<style>
	body {
		margin-top: 20px;
		background: #ebeef0;
	}
</style>

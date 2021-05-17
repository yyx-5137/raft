import Vue from 'vue'
import App from './App.vue'
import router from './router'
import {
	Row,
	Col,
	Divider,
	Card,
	Dialog,
	Table,
	TableColumn,
} from 'element-ui';
Vue.use(Row);
Vue.use(Card);
Vue.use(Col);
Vue.use(Divider);
Vue.use(Dialog);
Vue.use(Table);
Vue.use(TableColumn);
Vue.config.productionTip = false

new Vue({
	router,
	render: h => h(App)
}).$mount('#app')

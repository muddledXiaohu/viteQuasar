<script setup lang="ts" name="Login">
import { ref } from "vue";
import { loginApi } from "../../api/user/login";
import { useCounterStore } from "src/stores/modules/permission";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";
const appStore = useCounterStore();
const router = useRouter();
const $q = useQuasar();
const isLottieF = ref(false);
const isPwd = ref(false);
const loading = ref(false);
const loginForm = ref({
	user: "huweiguo",
	password: "Hyln#123456"
});
/**
 * @description: 登录
 */
const login = async () => {
	const data = await loginApi({
		jsonrpc: "2.0",
		method: "user.login",
		params: loginForm.value,
		auth: null,
		id: 1
	});
	if (data?.error?.message)
		return $q.notify({
			type: "negative",
			message: data?.error?.message
		});
	appStore.setToken(data?.result || "");
	$q.notify({
		type: "positive",
		message: "登录成功！"
	});
	router.push("/");
};
</script>
<template>
	<div class="flex justify-center items-center" style="height: 100vh">
		<div class="row base-card-shadow bg-white" style="width: 60vw; min-width: 300px">
			<div class="col-6 flex justify-center items-center" v-show="$q.screen.gt.sm">
				<q-skeleton type="text" height="70%" width="50%" v-if="!isLottieF" />
				<!-- <lottie-web-cimo align="right" style="height: 70%" :path="defaultOptions.path" @isLottieFinish="handleFinish"/> -->
			</div>
			<q-separator vertical inset v-if="$q.screen.gt.sm" />
			<div class="col flex justify-center items-center">
				<q-card square style="min-width: 290px; height: 100%; width: 60%" class="no-shadow">
					<q-card-section align="center">
						<h3 class="text-uppercase">弘元</h3>
						<!-- 用户名 -->
						<q-input
							class="logon-input"
							clearable
							standout="bg-cyan text-white"
							bottom-slots
							v-model="loginForm.user"
							label="账号"
						>
							<template v-slot:prepend>
								<q-icon name="account_circle" />
							</template>
						</q-input>
						<!-- 密码 -->
						<q-input
							class="logon-input"
							standout="bg-cyan text-white"
							bottom-slots
							v-model="loginForm.password"
							label="密码"
							:type="isPwd ? 'password' : 'text'"
							hint=""
						>
							<template v-slot:prepend>
								<q-icon name="vpn_key" />
							</template>
							<template v-slot:append>
								<q-icon @click="isPwd = !isPwd" :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer" />
							</template>
						</q-input>

						<!-- 登录按钮 -->
						<q-btn
							:loading="loading"
							class="logon-btn bg-logon-card-input"
							text-color="white"
							unelevated
							label=""
							style="font-size: large"
							@click="login"
							>登 录 系 统
						</q-btn>
						<!-- <div class="row justify-between" style="margin-bottom: 20px">
							<q-btn flat label="忘记密码" />
							<q-btn outline label="我要注册" />
						</div> -->
					</q-card-section>
				</q-card>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.logon-btn {
	font-size: large;
	margin-top: 0px;
	margin-bottom: 20px;
	width: 100%;
}

.bg-logon-card-input {
	background: linear-gradient(to right, #36d1dc 1%, #5b86e5 99%);
	transition: all 0.3s ease-in-out;
	background-size: 200% auto;
}

.bg-logon-card-input:hover {
	background-position: right center;
	box-shadow: 0 12px 20px -11px #5b86e5;
}
.cimo-shadow {
	box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 12px 0px !important;
	transition: All 0.2s ease-in-out;
}
.cimo-shadow:hover {
	box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 13px 3px !important;
}
.base-card-shadow {
	box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 12px 0px;
	border-radius: 4px;
}
</style>

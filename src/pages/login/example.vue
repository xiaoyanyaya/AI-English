<template>
	<view>
		<!-- 导航 -->
		<navBar title="下单支付" />

    <u--form :model="form" :rules="rules" ref="form">
      <view class="bg-white d-flex flex-column a-center py-4">
        <u-icon name="checkmark-circle-fill" color="var(--green)" size="70" />
        <view class="fs-36 fw-6">
          <template v-if="info.more">
            <view class="text-center">
              <view>共{{info.more}}笔订单</view>
              <view>合计需支付<text class="text-red">￥{{info.money}}</text></view>
            </view>
          </template>
          <template v-else>
            您已下单成功，请支付<text class="text-red">￥{{info.money}}</text>
          </template>
        </view>
      </view>

      <view class="bg-white rounded-20 pl-4 pr-2 m-2">
        <u-form-item label="请选择支付方式" labelWidth="220rpx" labelPosition="top">
          <view class="d-flex a-center j-sb pt-2">
            <block v-for="(item,index) in payWayList" :key="index">
              <view @tap="clickPay(item,index)" :class="info.payType==item.payType?'active':''">
                <u-button :icon="item.icon" :iconColor="item.iconColor" :text="item.text"
                          :customStyle="info.payType==item.payType?'border-color: red':''" />
              </view>
            </block>
          </view>
        </u-form-item>
        <template v-if="info.payType == 1">
          <u-form-item label="钱包余额" :labelWidth="labelWidth">
            <view class="text-red">￥{{balance}}</view>
          </u-form-item>
          <view v-if="balance==0" class="text-red fs-24">您的余额不足，无法支付该笔订单，请先去储值余额</view>
          <u-form-item label="支付密码" prop="payPassword" :required="true" :labelWidth="labelWidth">
            <view class="d-flex a-center">
              <u--input v-model="form.payPassword" clearable placeholder="请输入支付密码" maxlength="6" password
                        @clear="form.payPassword = ''" />
              <text class="pl-2 text-primary" @tap="showPop = true">请先设置支付密码</text>
            </view>
          </u-form-item>
        </template>
      </view>
    </u--form>

    <!-- 设置支付密码 -->
    <u-modal :show="showPop" title="设置支付密码" :showCancelButton="true" @cancel="closePop" @close="closePop"
             @confirm="confirmPop">
      <u--form :model="formPsd" :rules="rulesPsd" ref="formPsd">
        <u-form-item label="手机号码" prop="phone" :labelWidth="labelWidth">
          <u--input v-model="phone" inputAlign="right" border="none" disabled disabledColor="var(--white)" />
        </u-form-item>
        <u-form-item label="验证码" prop="captcha" :required="true" :labelWidth="labelWidth">
          <view class="d-flex j-sb">
            <view class="flex-1 mr-2">
              <u--input v-model="formPsd.captcha" border="none" clearable placeholder="请输入验证码"
                        @clear="formPsd.captcha = ''" />
            </view>
            <view>
              <u-button shape="circle" color="var(--primary)" size="small" @click="getCode" :text="codeTips" />
            </view>
          </view>
        </u-form-item>
        <u-form-item label="支付密码" prop="password" :required="true" :labelWidth="labelWidth">
          <u--input v-model="formPsd.password" border="none" inputAlign="right" password clearable placeholder="请输入支付密码"
                    @clear="formPsd.password = ''" />
        </u-form-item>
        <u-form-item label="确认支付密码" prop="confirmpassword" :required="true" :labelWidth="labelWidth">
          <u--input v-model="formPsd.confirmpassword" border="none" inputAlign="right" password clearable
                    placeholder="请确认支付密码" @clear="formPsd.confirmpassword = ''" />
        </u-form-item>
      </u--form>
    </u-modal>

    <!-- 验证码倒计时 -->
    <u-code seconds="60" ref="uCode" @change="changeCode" />

    <!-- 底部tab -->
    <navTab className="d-flex j-center a-center" :isShadow="false">
      <view class="w-50">
        <u-button color="var(--primary)" shape="circle" text="立即付款" @click="submitForm"/>
      </view>
    </navTab>

	</view>
</template>

<script>
	import {
		encryption,
		getEncryptedString
	} from './config/encryption/aesEncrypt';
	export default {
		data() {
			return {
				labelWidth: '200rpx',
				info: {
          payWay: 1, // 支付方式：1微信支付 2支付宝支付 3余额支付。 默认1微信支付
          orderType: 'vip_order_applet' //订单类型 此处为固定值
				},
				payWayList: [
					{
						icon: 'weixin-circle-fill',
						iconColor: 'var(--green)',
						text: '微信支付',
						payType: 1
					},
					{
						icon: 'zhifubao-circle-fill',
						iconColor: 'var(--blue)',
						text: '支付宝',
						payType: 2
					},
          {
            icon: 'red-packet-fill',
            iconColor: 'var(--reddark)',
            text: '余额支付',
            payType: 3
          }
				],
        //***********以下部分是选择了余额支付方式有关*******//
				form: {
          payPassword: ''// 支付密码（仅当余额支付的时候需要提供，且如果用户未设置支付密码的话，要先设置后才能继续余额支付方式）
				},
        rules: {
          payPassword: [{
            required: true,
            len: 6,
            message: '请输入支付密码',
            trigger: ['blur', 'change']
          }],
        },

        showPop: false,
        codeTips: '', //验证码倒计时字段
        formPsd: {
          password: '',
          confirmpassword: ''
        },
        rulesPsd: {
          captcha: {
            required: true,
            len: 6,
            message: '请填写6位验证码',
            trigger: ['blur', 'change'],
            validator: (rule, value, callback) => {
              return uni.$u.test.code(value, 6);
            }
          },
          password: [{
            required: true,
            message: '请输入密码',
            trigger: ['blur', 'change']
          }],
          confirmpassword: [{
            required: true,
            message: '请输入确认密码',
            trigger: ['blur', 'change']
          }],
        },
        //**********end**************//
			}
		},
		computed: {
			state() {
				return this.$store.state;
			},
			userInfo() {
				return this.$store.state.userInfo;
			},
			phone() {
				let text = this.$store.state.userInfo.phone.replace(this.$store.state.userInfo.phone.substring(3, 7), "****");
				return text
			}
		},
		methods: {
			jump({
				name,
				params
			}) {
				if (name) {
					return this.$Router.push({
						name,
						params
					});
				}
			},
			/* 选择支付方式 */
			clickPay(item, index) {
				this.info.payWay = item.payWay// 支付方式
			},
			/* 支付成功-跳转 */
			payBack(e) {
				uni.$u.toast(e);
				const {
					returnName
				} = this.info
				setTimeout(() => {
					if (returnName) {
						this.$Router.replace({
							name: returnName
						})
					} else {
						uni.$emit('refresh', {
							refresh: true
						});
						uni.navigateBack()
					}
				}, 1000)
			},
			/* 支付 */
			payment() {
				const {
          payWay // 支付方式
				} = this.info
				switch (Number(payWay)) { //支付方式
					case 1:
						this.wxpayWay()
						break
					case 2:
						this.alipayWay()
						break
				}
			},
			/* 微信支付 */
			async wxpayWay() {
				const {
					orderNo,// 订单号
          amount,// 订单金额
          orderType,// 订单类型
					description,// 订单描述
          payWay,// 支付方式
				} = this.info
				const {
					openid
				} = this.state
				let params = {
					orderNo: orderNo,// 订单号
					amount: amount,// 订单金额
          orderType, // 订单类型
					description, // 订单描述
					payWay // 支付方式
				}
				let result;
				// #ifdef APP-PLUS
				result = await this.$api.getAppNeedParam(params)
				// #endif

				// #ifdef MP
				params.openid = openid
				result = await this.$api.payPrepay(params)
				// #endif

				const {
					timeStamp,
					nonceStr,
					packageVal,
					signType,
					paySign,
					appId
				} = result.result;
				console.log('result.result',result.result)
				let orderInfo = {
					timeStamp,
					nonceStr,
					package: packageVal,
				}

				// #ifdef APP-PLUS
				let prepayid =  result.result.package.split("=")[1]
				let orderInfoApp = {
					prepayid: prepayid,
					appid: appId,
					partnerid: '1234567890', //微信支付商户号
					sign: paySign,
					package: "Sign=WXPay",
					noncestr: orderInfo.nonceStr,
					timestamp: orderInfo.timeStamp
				}
				switch (uni.getSystemInfoSync().platform) {
					case 'android':
						orderInfo = orderInfoApp
						break;
					case 'ios':
						orderInfo = orderInfoApp
						break;
				}
				// #endif
				// #ifdef MP
				orderInfo = {
					signType,
					paySign,
					...orderInfo,
				}
				// #endif

				this.toPay(orderInfo)
			},
			/* 支付宝支付 */
			alipayWay() {
				const {
					orderNo,// 订单号
          amount,// 订单金额
          orderType,// 订单类型
					description // 订单描述
				} = this.info
				let params = {
					body: {
						total_amount: amount, // 订单金额
						subject: description, // 订单描述
						body: orderNo // 订单号
					},
					// 1 生成二维码扫码支付 2.网页唤起APP支付，返回的是一个表单  需要前端渲染出来触发一下submit事件  3.APP支付，会返回给你app支付需要的参数
					// #ifdef APP-PLUS
					payWay: 2,// 网页唤起app支付
					// #endif

					// #ifdef MP
					payType: 1,// 生成二维码扫码支付
					// #endif
          payWayCode: 2, // 支付方式 ：填2即可  支付宝支付
          orderType,// 订单类型
				}

				this.$api.payAlipay(params).then(result => {
					const data = result.result
					// #ifdef APP-PLUS
					 plus.runtime.openURL(data);
					// this.toPay(data)
					// #endif
					// #ifdef MP
					this.$Router.push({
						name: 'webView',
						params: {
							src: data,
							title: description
						}
					});
					// #endif
				})
			},
			/* 去支付 */
			toPay(orderInfo) {
				let provider = '';
				switch (Number(this.info.payWay)) { //支付方式
					case 1:
						provider = 'wxpay'
						break
					case 2:
						provider = 'alipay'
						break
				}
				const _this = this
				uni.requestPayment({
					provider,
					// #ifdef APP-PLUS
					orderInfo,
					// #endif
					// #ifdef MP
					...orderInfo,
					// #endif
					success: function(res) {
						console.log('success:' + JSON.stringify(res));
						_this.payBack('支付成功')
					},
					fail(err) {
						console.log('fail:' + JSON.stringify(err));
						uni.$u.toast('支付失败')
					}
				});
			},
			/* 提交表单 */
			submitForm() {
				this.$refs.form.validate().then(valid => {
					switch (Number(this.info.payWay)) {
            case 1://微信支付
              this.payment()
              break
						case 2://支付宝支付
            case 3://余额支付
              this.balancePayment()
              break
					}
				}).catch(error => {
					console.log('error')
					console.log(error)
				})
			}
		},
		onLoad() {
			this.info = {
				...this.info,
				...this.$Route.query
			}
		},
		onReady() {
			// #ifdef MP
			//如果需要兼容微信小程序，并且校验规则中含有方法等，只能通过setRules方法设置规则。
			this.$refs.form.setRules(this.rules)
			this.$refs.formPsd.setRules(this.rulesPsd)
			// #endif
		}
	}
</script>

<style>
	page {
		background-color: var(--grayf2);
	}
</style>
<style lang="scss" scoped>
	.active {
		position: relative;

		/* 三角形 */
		&::after {
			content: "";
			position: absolute;
			bottom: 0rpx;
			right: 0rpx;
			border-bottom: 50rpx solid var(--reddark);
			border-left: 50rpx solid transparent;
		}

		/* 三角形勾 */
		&::before {
			content: '';
			position: absolute;
			width: 16rpx;
			height: 11rpx;
			background: transparent;
			bottom: 10rpx;
			right: 6rpx;
			border: 4rpx solid white;
			border-top: none;
			border-right: none;
			transform: rotate(-55deg);
			z-index: 9;
		}
	}
</style>

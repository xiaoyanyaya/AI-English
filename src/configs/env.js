const devDomain = 'http://182.42.120.41:17988/wapi/' // 测试环境
const proDomain = '' // 生产环境

const ENV = 'dev' // dev -测试 pro -生产

const apiDomain = ENV === 'pro' ? proDomain : devDomain
export {
  ENV,
  apiDomain,
}

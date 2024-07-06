const devDomain = 'https://wapi-dev.aien.xiaolixb.com/v1' // 测试环境
const proDomain = 'https://wapi.aien.xiaolixb.com/v1' // 生产环境

const ENV = 'pro' // dev -测试 pro -生产

const apiDomain = ENV === 'pro' ? proDomain : devDomain
export {
  ENV,
  apiDomain,
}

<template>
  <view class="main">
    <cy-navbar :showBack="true" :bgColor="backColor" textColor="#3D3D3D">
      <view class="t-size-30">Frank介绍</view>
    </cy-navbar>

    <view class="tabs">
      <view @click="clickTab1" :class="{ higlight: activeTab == 0 }">
        简介
      </view>
      <view @click="clickTab2" :class="{ higlight: activeTab == 1 }">
        使命
      </view>
      <view @click="clickTab3" :class="{ higlight: activeTab == 2 }">
        创新
      </view>
      <view @click="clickTab4" :class="{ higlight: activeTab == 3 }">
        教学
      </view>
    </view>

    <!-- 简介 -->
    <view v-if="activeTab == 0" class="tab1">
      <view class="image">
        <image :src="imageBaseUrl + '/frank/9-2-01.png'"></image>
      </view>
      <view class="box">
        <view class="title">弗兰克：陈东Frank</view>
        <view class="blue"></view>
        <view class="text">北京大学百年讲堂专题讲座特邀专家</view>
        <view class="text">CCTV-影响力对话栏目专访人物</view>
        <view class="text">IEEA国际英语精英大赛中方专家评委</view>
        <view class="text">原北京101网校高中英语名师面授主讲</view>
        <view class="text">福建三明学院海外学院客座教授、研究生导师</view>
        <view class="text">全国总工会中国职工技协英语名师工作室首席教研员</view>
      </view>
      <view class="box">
        <view class="title">弗兰克课程研发团队</view>
        <view class="blue"></view>
        <view class="text">在陈东老师带领下，</view>
        <view class="text">钻研和开发教材，完善课程体系，</view>
        <view class="text">教师好教，学生好学，</view>
        <view class="text">教材好，才好教，才教好!</view>
        <view class="text"
          >彻底
          <view class="hig"> 解放老师，解救学生，解困家长，解忧校长</view>
          !</view
        >
      </view>
    </view>

    <!-- 使命 -->
    <view v-else-if="activeTab == 1" class="tab2">
      <view class="box">
        <view class="title">
          <view class="zhu"></view>
          <view class="blue">解救</view>
          <view class="orange">学生</view>
        </view>
        <view class="cont">
          <view class="image2">
            <image :src="imageBaseUrl + '/frank/8-27-03.png'"></image>
          </view>
          <view class="text">
            <view
              ><text class="t-color-ED7E1F">1-2年</text>学完并掌握全日制学校
              <text class="t-color-ED7E1F">6-9年</text
              >必修课程内容，既能应试又能应用！<text class="t-color-ED7E1F"
                >考试成绩平均提分20-50分</text
              >。</view
            >
          </view>
        </view>
      </view>
      <view class="box">
        <view class="title">
          <view class="zhu"></view>
          <view class="blue">解放</view>
          <view class="orange">老师</view>
        </view>
        <view class="cont">
          <view class="text">
            <view
              >《弗兰克“四维”英语教学法》具有完整的教学理念，通过短时间的培训授课老师，使老师快速掌握教学原理、教学方法。</view
            >
            <view
              ><text class="t-color-ED7E1F">第一堂课</text>就可以使学生<text
                class="t-color-ED7E1F"
                >“开光开窍”</text
              >，打破对英语<text class="t-color-ED7E1F"
                >“不好学”“不好掌握”“记忆不牢”</text
              >等观念，给学员<text class="t-color-ED7E1F">颠覆性重塑</text
              >对英语学习的认知。学生在老师引导下从自主学习到脱离老师完全自学，解放老师。</view
            >
          </view>
          <view class="image">
            <image :src="imageBaseUrl + '/frank/8-27-02.png'"></image>
          </view>
        </view>
      </view>
      <view class="box">
        <view class="title">
          <view class="zhu"></view>
          <view class="blue">解困</view>
          <view class="orange">家长</view>
        </view>
        <view class="cont">
          <view class="text">
            <view
              >学生用<text class="t-color-ED7E1F">半年到一年</text>时间即可<text
                class="t-color-ED7E1F"
                >掌握学习能力</text
              >
              ，再根据自己的兴趣结合学校所学教材，阅读更多纯外教视频内容，做到学习生活化，生活学习化，家长不再为孩子英语学习“犯愁”。</view
            >
          </view>
          <view class="image3">
            <image :src="imageBaseUrl + '/frank/8-27-04.png'"></image>
          </view>
        </view>
      </view>
      <view class="box">
        <view class="title">
          <view class="zhu"></view>
          <view class="blue">解忧</view>
          <view class="orange">校长</view>
        </view>
        <view class="cont">
          <view class="image4">
            <image :src="imageBaseUrl + '/frank/8-27-05.png'"></image>
          </view>
          <view class="text">
            英语老师通过弗兰克英语教学体系的培训后，掌握应用先进的教学理念和教学体系，快速提升自身的教学技术和教学艺术，<text
              class="t-color-ED7E1F"
              >教学效率和教学质量轻松提升3-5倍</text
            >，彻底解忧校长！
          </view>
        </view>
      </view>
    </view>

    <!-- 创新 -->
    <view v-else-if="activeTab == 2" class="tab3">
      <view class="top_text">
        <image :src="imageBaseUrl + '/frank/8-27-06.png'"></image>
        <view class="text_color">
          <view class="blue">教学</view>
          <view class="orange">创新点</view>
        </view>
        <text>致力于改变中国英语教学之落后生态</text>
      </view>
      <view class="books">
        <image :src="imageBaseUrl + '/frank/8-27-07.png'"></image>
        <image :src="imageBaseUrl + '/frank/8-27-08.png'"></image>
        <image :src="imageBaseUrl + '/frank/8-27-09.png'"></image>
        <image :src="imageBaseUrl + '/frank/8-27-10.png'"></image>
      </view>
      <view class="box">
        <view class="t-size-26 t-color-3D3D3D font-weight-bold text-center mb-2"
          >创新一</view
        >
        <view class="t-size-30 t-color-1863E5 font-weight-bold text-center"
          >听说能力课程体系</view
        >
        <view class="text">
          <view class=""
            >英语连读有三种：1、辅音+元音 2、辅音+辅音
            3、元音+元音，国内知晓并同时掌握三种连读技能的英语老师不足<text
              class="t-color-E77415"
              >万分之五！</text
            >
          </view>
          <view
            ><text class="t-color-ED7E1F">弗兰克独创神奇的语音体系</text
            >：汉字“草书”原理运用于“听说”训练，彻底“治愈”中国人“聋哑口吃”英语之“症结”！做到<text
              class="t-color-E77415"
              >见词能拼读，见句能连读，见文能诵读。</text
            ></view
          >
        </view>
      </view>
      <view class="box">
        <view class="t-size-26 t-color-3D3D3D font-weight-bold text-center mb-2"
          >创新二</view
        >
        <view class="t-size-30 t-color-1863E5 font-weight-bold text-center"
          >告别无声的“纸上刷题”低效或无效的学习模式</view
        >
        <view class="text">
          <view
            >弗兰克英语听说读写与模仿纯外教语料50-2000小时“肌肉记忆”操练。</view
          >
        </view>
      </view>
      <view class="box">
        <view class="t-size-26 t-color-3D3D3D font-weight-bold text-center mb-2"
          >创新三</view
        >
        <view class="t-size-30 t-color-1863E5 font-weight-bold text-center"
          >长难语句法分析能力</view
        >
        <view class="text">
          <view
            ><text class="t-color-ED7E1F">30-40小时掌握6-9年的语法知识</text
            >，独创《图解的语法》：用生活化的图片或视频解释抽象的语法概念，精简为词法的“四大家族”，长难句的“五大鬼门关”，“全脑”教学模式，通俗易懂，科学趣味实用，终生难忘！<text
              class="t-color-ED7E1F"
              >2小时可以穿越“16种时态”</text
            >！</view
          >
        </view>
      </view>
      <view class="box">
        <view class="t-size-26 t-color-3D3D3D font-weight-bold text-center mb-2"
          >创新四</view
        >
        <view class="t-size-30 t-color-1863E5 font-weight-bold text-center"
          >独创弗兰克英语DIY自学系统</view
        >
        <view class="text">
          <view
            >以英语<text class="t-color-E77415">语言应试和应用</text>
            所必备的二种能力，教会学生具备文章分析能力和文章内化能力，扩充词汇量、建立词汇库、建立知识体系，实现声音阅读和文字阅读，<text
              class="t-color-E77415"
              >内化为自学能力</text
            >
            ！</view
          >
        </view>
      </view>
      <view class="box">
        <view class="t-size-26 t-color-3D3D3D font-weight-bold text-center mb-2"
          >创新五</view
        >
        <view class="t-size-30 t-color-1863E5 font-weight-bold text-center"
          >独创弗兰克英语“双境”记忆法</view
        >
        <view class="t-size-24 t-color-1863E5 font-weight-bold text-center"
          >（虚拟语境记忆法和真实语境记忆法）</view
        >
        <view class="text">
          <view
            >1、
            <text class="t-color-E77415">虚拟语境记忆法：</text>
            单词记忆结合图像、音像，应用弗兰克单词拼读技能、语法应用技能，做到单词能拼读、能拼写、能应用，即学即用，有趣好玩，过目不忘；</view
          >
          <view
            >2、
            <text class="t-color-E77415">真实语境记忆法：</text>
            在文字阅读和外国生活场景教学视频里，体验和消化单词，在真正语境中进行肌肉运动记忆单词，结合虚拟语境记忆法实现单词记忆<text
              class="t-color-E77415"
              >治标治本</text
            >
            ，抗遗忘。</view
          >
        </view>
      </view>
    </view>

    <!-- 教学 -->
    <view v-else class="tab4">
      <view class="top_text">
        <image :src="imageBaseUrl + '/frank/8-27-11.png'"></image>
        <view class="text_color">
          <view class="blue">“四维”</view>
          <view class="orange">英语教学法</view>
        </view>
        <text>最好的医生是自己，最好的老师也是自己!</text>
        <view class=".text">教会学生能自学才是真正的教学!</view>
      </view>
      <view class="box">
        <view class="title">声音能听会说</view>
        <view class="cir_box">
          <view class="circle px-1">点<text>见词拼读</text></view>
          <view class="circle px-1">线<text>见句连读</text></view>
          <view class="circle px-1">面<text>见文诵读</text></view>
          <view class="circle px-15">体<text>双语切换同声传译</text></view>
        </view>
        <view class="line"></view>
      </view>
      <view class="box">
        <view class="title">“四维” 体系</view>
        <view class="cir_box">
          <view class="circle px-1">点<text>单词</text></view>
          <view class="circle px-1">线<text>单句</text></view>
          <view class="circle px-1">面<text>篇章</text></view>
          <view class="circle px-1">体<text>听说读写译</text></view>
        </view>
        <view class="line"></view>
      </view>
      <view class="box">
        <view class="title">文章能读会写</view>
        <view class="cir_box">
          <view class="circle px-1">点<text>用词造句</text></view>
          <view class="circle px-1">线<text>长难句分析</text></view>
          <view class="circle px-1">面<text>懂篇章结构</text></view>
          <view class="circle px-1">体<text>能读会写</text></view>
        </view>
        <view class="line"></view>
      </view>
    </view>
  </view>
</template>

<script>
import MyMixin from "@/utils/MyMixin";

export default {
  mixins: [MyMixin],
  data() {
    return {
      backColor: "transparent",
      activeTab: 0,
    };
  },
  onPageScroll(e) {
    if (e.scrollTop > 20) {
      this.backColor = "#fff";
    } else {
      this.backColor = "transparent";
    }
  },
  methods: {
    clickTab1() {
      this.activeTab = 0;
    },
    clickTab2() {
      this.activeTab = 1;
    },
    clickTab3() {
      this.activeTab = 2;
    },
    clickTab4() {
      this.activeTab = 3;
    },
  },
};
</script>

<style lang="scss" scoped>
.main {
  background: linear-gradient(164deg, #bfd8fd 3%, #f0f7fd 20%, #ffffff 200%);
  min-height: 100vh;
  padding-bottom: 40rpx;

  .tabs {
    padding: 45rpx 95rpx 25px 95rpx;
    display: flex;
    justify-content: space-between;
    .higlight {
      color: #1863e5;
      padding-bottom: 10rpx;
      border-bottom: 7rpx solid #1863e5;
    }
  }

  .tab1 {
    margin-top: 15rpx;
    .image {
      margin-left: 85rpx;
      width: 568rpx;
      height: 394rpx;
      image {
        width: 100%;
        height: 100%;
      }
    }
    .box {
      position: relative;
      text-align: center;
      font-size: 24rpx;
      color: #3d3d3d;
      .title {
        font-size: 30rpx;
        font-weight: bold;
        margin-bottom: 30rpx;
        margin-top: 75rpx;
      }
      .blue {
        position: absolute;
        left: 50%;
        top: 30rpx;
        transform: translateX(-50%);
        width: 332rpx;
        height: 10rpx;
        background: rgba(24, 99, 229, 0.3);
      }
      .text {
        display: flex;
        justify-content: center;
        margin: 10rpx 0;
        .hig {
          color: #1863e5;
        }
      }
    }
  }

  .tab2 {
    padding: 15rpx 40rpx 40rpx;
    .box {
      padding: 30rpx;
      margin-bottom: 40rpx;
      background-color: #fff;
      border-radius: 10rpx;
      .title {
        display: flex;
        align-items: center;
        .zhu {
          width: 10rpx;
          height: 30rpx;
          margin-right: 20rpx;
          border-radius: 10rpx;
          background: #1863e5;
        }
        .blue {
          font-family: YouSheBiaoTiHei;
          margin-right: 8rpx;
          font-size: 40rpx;
          font-weight: normal;
          color: #1863e5;
        }
        .orange {
          font-family: YouSheBiaoTiHei;
          font-size: 40rpx;
          font-weight: normal;
          color: #e77415;
        }
      }

      .cont {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 20rpx;
        .text {
          text-indent: 2em;
          width: 400rpx;
          font-size: 24rpx;
          color: #3d3d3d;
          line-height: 1.8;
        }
        .image {
          width: 150rpx;
          height: 273rpx;
          image {
            width: 100%;
            height: 100%;
          }
        }
        .image2 {
          width: 212rpx;
          height: 283rpx;
          image {
            width: 100%;
            height: 100%;
          }
        }
        .image3 {
          width: 169rpx;
          height: 178rpx;
          image {
            width: 100%;
            height: 100%;
          }
        }
        .image4 {
          width: 180rpx;
          height: 222rpx;
          image {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }

  .tab3 {
    padding: 0 40rpx 40rpx;
    .top_text {
      position: relative;
      width: 631rpx;
      height: 146rpx;
      padding-left: 20rpx;
      font-size: 30rpx;
      font-weight: bold;
      image {
        width: 100%;
        height: 100%;
      }
      .text_color {
        position: absolute;
        display: flex;
        top: 20%;
        left: 50%;
        transform: translateX(-50%);
        .blue {
          color: #1863e5;
        }
        .orange {
          color: #e77415;
        }
      }
      text {
        position: absolute;
        top: 50%;
        display: flex;
        justify-content: center;
        flex-wrap: nowrap;
        margin-left: 80rpx;
        margin-top: 20rpx;
      }
    }
    .books {
      display: flex;
      justify-content: space-between;
      margin-top: 40rpx;
      image {
        width: 155rpx;
        height: 213rpx;
      }
    }
    .box {
      padding: 16rpx;
      margin-bottom: 40rpx;
      background-color: #fff;
      .text {
        padding: 0 40rpx;
        text-indent: 2em;
        margin-top: 20rpx;
        font-size: 24rpx;
        color: #3d3d3d;
        line-height: 1.8;
        view {
          margin: 5rpx 0;
        }
      }
    }
  }

  .tab4 {
    padding: 0 40rpx 40rpx;
    .top_text {
      position: relative;
      width: 631rpx;
      height: 146rpx;
      padding-left: 20rpx;
      font-size: 30rpx;
      font-weight: bold;
      text-align: center;
      image {
        width: 100%;
        height: 100%;
      }
      .text_color {
        position: absolute;
        display: flex;
        top: 20%;
        left: 50%;
        transform: translateX(-50%);
        .blue {
          color: #1863e5;
        }
        .orange {
          color: #e77415;
        }
      }
      text {
        position: absolute;
        top: 50%;
        display: flex;
        justify-content: center;
        flex-wrap: nowrap;
        margin-left: 20rpx;
        margin-top: 10rpx;
      }
      .text {
        position: absolute;
        top: 80%;
        display: flex;
        justify-content: center;
        flex-wrap: nowrap;
        margin-left: 75rpx;
        margin-top: 10rpx;
      }
    }
    .box {
      position: relative;
      margin-top: 85rpx;
      padding: 40rpx;
      width: 670rpx;
      height: 288rpx;
      background-color: #fff;
      .title {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        width: 340rpx;
        height: 55rpx;
        background: linear-gradient(
          90deg,
          rgba(216, 216, 216, 0) 0%,
          rgba(24, 99, 229, 0.7) 24%,
          #1863e5 49%,
          rgba(24, 99, 229, 0.7) 73%,
          rgba(216, 216, 216, 0) 100%
        );
        font-size: 32rpx;
        font-weight: normal;
        text-align: center;
        color: #fff;
      }
      .cir_box {
        width: 590rpx;
        display: flex;
        justify-content: space-between;
        position: absolute;
        bottom: 10%;
        .circle {
          display: flex;
          flex-direction: column;
          text-align: center;
          font-size: 22rpx;
          width: 127rpx;
          height: 127rpx;
          padding-top: 20rpx;
          border-radius: 50%;
          background: linear-gradient(
            180deg,
            #eff6ff 34%,
            rgba(239, 246, 255, 0) 100%
          );
          text {
            z-index: 999;
            color: #1863e5;
            margin-top: 12rpx;
          }
        }
      }
      .line {
        position: absolute;
        bottom: 30%;
        left: 50%;
        transform: translateX(-50%);
        width: 440rpx;
        height: 13rpx;
        background: #eff6ff;
      }
    }
  }
}
</style>
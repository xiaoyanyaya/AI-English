import fly from "@/jslibs/dk-flyio";

// 课程体系 - 查询首页课程体系
export const getCourseSystem = (params) =>
  fly.get("/course/system/queryCourseSystem", params);

// 课程体系 - 查询课程大纲体系
export const getCourseOutline = (params) =>
  fly.get("/course/system/queryCourseOutline", params);

//课程体系 - 查询节点的视频列表
export const getNodeVideo = (params) =>
  fly.get("/course/video/queryByNodeId", params);

// 课程体系 - 查询课程信息详情
export const getCourseDetail = (params) =>
  fly.get("/course/system/queryById", params);

// 课程体系 - 查询视频信息详情
export const getVideoOutline = (params) =>
  fly.get("/course/video/queryById", params);

// 课程体系 - 查询视频的习题列表
export const getVideoExampleList = (params) =>
  fly.get("/course/exercise/queryByVideoId", params);

// 课程体系 - 保存习题跟读录音
export const getExampleRecord = (params) =>
  fly.post("/course/answer/add", params);

// 课程体系 - 保存视频播放记录
export const getVideoRecord = (params) =>
  fly.post("/course/playrecord/add", params);

// 课程体系 - 查询用户的播放记录
export const getUserPayList = (params) =>
  fly.get("/course/playrecord/queryByUserId", params);

// 课程体系 - 搜索视频列表
export const getSearchVideoList = (params) =>
  fly.get("/course/video/queryByKeyword", params);

// 获取视频播放凭证
export const getPlayAuth = (videoId) =>
  fly.get(`/aliyun/vod/playAuth/${videoId}`);

// 获取视频播放地址
export const getPlayUrl = (vodVideoId, videoId) =>
  fly.get(`/aliyun/vod/playUrl/${vodVideoId}/${videoId}`);

import fly from "@/jslibs/dk-flyio";

// 查询词汇列表
export const listByBookType = (params) =>
  fly.get("/word/unit/listByBookType", params);

// 查询学历分类
export const educationType = (params) =>
  fly.get("/app/common/query/education_type", params);

// 查询书籍列表
export const bookList = (params) => fly.get("/word/book/list", params);

// 查询单元列表
export const unitList = (params) => fly.get("/word/unit/listByBookId", params);

// 查询课时列表
export const lessonList = (params) =>
  fly.get("/word/lesson/queryListByBookId", params);

// 查询单元-单词列表
export const wordList = (params) =>
  fly.get("/word/lesson/queryByUnitId", params);

// 单元下拉-标签单词量统计
export const labelWordCount = (params) =>
  fly.get("/word/user/dict/queryUserDictCntStat", params);

// 单元下拉-查询单词列表-教材
export const listByUnitId = (params) =>
  fly.get("/word/unit/dict/queryListByUnitId", params);

// 单元下拉-查询单词列表-未学
export const unLearnListByUnitId = (params) =>
  fly.get("/word/unit/dict/queryUnLearnListByUnitId", params);

// 单元下拉-查询单词列表-掌握/错词
export const errOrOkListByUnitId = (params) =>
  fly.get("/word/user/dict/queryListByUnitId", params);

// 考纲-添加课时
export const addLesson = (params) =>
  fly.get("/word/lesson/addLessonForDictBook", params);

// 课时下拉-查询单词列表-考纲
export const dictBookList = (params) =>
  fly.get("/word/unit/dict/queryListByDictBookId", params);

// 课时下拉-查询单词列表-未学习
export const unLearnDictBookList = (params) =>
  fly.get("/word/lesson/dict/queryUnLearnListByLessonId", params);

// 课时下拉-查询单词列表-掌握/错词
export const learnDictBookList = (params) =>
  fly.get("/word/user/dict/queryListByLessonId", params);

// 查询课时单词列表
export const lessonWordListByL = (params) =>
  fly.get("/word/lesson/dict/queryByLessonId", params);

// 查询课时-单词列表
export const dictList = (params) => fly.get("/word/lesson/dict/list", params);

// 查询词汇-单词列表
export const lessonWordList = (params) =>
  fly.get("/word/lesson/queryByUnitId", params);

// 查询单词讲解
export const getWordEn = (params) =>
  fly.get("/word/dict/queryByWordEn", params);

// 查询配置
export const wordNum = (params) =>
  fly.get("/app/common/query/word_lesson_word_num", params);

// 添加学习任务
export const addLessonOutline = (params) =>
  fly.get("/word/lesson/addLessonForExamOutline", params);

// 开始学习
export const reviewStart = (body) => fly.post("/word/review/start", body);

// 下一个单词
export const reviewNext = (params) =>
  fly.post("/word/review/dict/learnWord", params);

// 完成学习
export const reviewFinish = (params) => fly.post("/word/review/finish", params);

// /word/challenge/finish 疯狂挑战 - 完成挑战 get
export const challengeFinish = (params) =>
  fly.get("/word/challenge/finish", params);

// 疯狂挑战 - 开始挑战 https://wapi-dev.aien.xiaolixb.com/v1/word/challenge/start post
export const challengeStart = (params) =>
  fly.post("/word/challenge/start", params);

// 疯狂挑战 - 挑战 - 回答一个单词 word/challenge/dict/challengeWord get
export const challengeWord = (params) =>
  fly.post("/word/challenge/dict/challengeWord", params);

// 疯狂挑战 - 完成挑战 https://wapi-dev.aien.xiaolixb.com/v1/word/challenge/finish post
export const challengeFinishPost = (params) =>
  fly.post("/word/challenge/finish", params);

// 查看答题情况
export const reviewList = (params) => fly.get("/word/review/queryById", params);

// 查看答题情况
export const queryReviewList = (params) =>
  fly.get("/word/review/dict/queryListByReviewId", params);

// 抗遗忘----------------------------------------------------------------------------

// 查询课时列表
export const getUserLessonList = (params) =>
  fly.get("/word/lesson/getUserLessonList", params);

// 复习及待复习历程
export const queryListByLessonId = (params) =>
  fly.get("/word/review/queryListByLessonId", params);

// 单词列表
export const queryById = (params) => fly.get("/word/lesson/queryById", params);

// 错词本列表
export const queryWordWrongDict = (params) =>
  fly.get("/word/wrong/dict/queryWordWrongDict", params);

// 错词本删除
export const updateStatus = (params) =>
  fly.post("/word/wrong/dict/updateStatus", params);

// 疯狂挑战 - 获取教材（考纲）书籍列表 http://localhost:8080/wapi/word/book/list get
export const getBookList = (params) => fly.get("/word/book/list", params);

// 速记 - 教材选择页/考纲选择页 - 查询书籍列表（新） book/queryMapByBookProperties
export const queryMapByBookProperties = (params) =>
  fly.get("/word/book/queryMapByBookProperties", params);

// 速记 - 教材选择页/考纲选择页 - 切换书籍 post http://localhost:8080/wapi/word/config/switchBook
export const switchBook = (params) =>
  fly.post("/word/config/switchBook", params);

// 疯狂挑战 - 获取教材（考纲）书籍信息 get https://wapi-dev.aien.xiaolixb.com/v1/word/book/queryById
export const queryBookById = (params) =>
  fly.get("/word/book/queryById", params);

// 疯狂挑战 - 排行 - 获取本人本教材（考纲）的挑战历程记录 get https://wapi-dev.aien.xiaolixb.com/v1/word/challenge/queryChallengeByUser
export const queryChallengeByUser = (params) =>
  fly.get("/word/challenge/queryChallengeByUser", params);

// 疯狂挑战 - 排行 - 获取教材（考纲）的挑战排行 get https://wapi-dev.aien.xiaolixb.com/v1/word/challenge/queryChallengeByBook
export const queryChallengeByBook = (params) =>
  fly.get("/word/challenge/queryChallengeByBook", params);

// word/unit/dict/queryListByBookId get
export const queryListByBookId = (params) =>
  fly.get("/word/unit/dict/queryListByBookId", params);

// 疯狂挑战 - 排行 - 获取查询教材的本人挑战指标 get https://wapi-dev.aien.xiaolixb.com/v1/word/challenge/queryBookChallengeInfo
export const queryBookChallengeInfo = (params) =>
  fly.get("/word/challenge/queryBookChallengeInfo", params);

// https://wapi-dev.aien.xiaolixb.com/v1/word/challenge/queryChallengeByTotal get
export const queryChallengeByTotal = (params) =>
  fly.get("/word/challenge/queryChallengeByTotal", params);

// word/challenge/queryChallengeByMyself get
export const queryChallengeByMyself = (params) =>
  fly.get("/word/challenge/queryChallengeByMyself", params);

// 首页 - 查询26个字母的发音 get http://localhost:8080/v1/word/dict/queryLetterList
export const queryLetterList = (params) =>
  fly.get("/word/dict/queryLetterList", params);

// 根据教材id查询教材详情
export const queryBookInfo = (params) =>
  fly.get("/word/book/queryById", params);

//查询复习记录
export const queryStudyReport = (params) =>
  fly.get("/word/review/getUserReviewList", params);

//某个复习记录详情
export const queryStudyReportDetail = (params) =>
  fly.get("/word/review/queryById", params);

//单词考纲 - 考纲冲刺 - 考频单词列表查询
export const getFastWordList = (params) =>
  fly.get("/word/unit/dict/queryListByDictFrequency", params);

//单词考纲 - 考纲冲刺 - 考频类型列表查询
export const getFrequencyList = (params) =>
  fly.get("/word/unit/dict/countWordFrequencyType", params);

//单词考纲 - 考纲冲刺 - 单词题目列表查询
export const getWordDictQuestionList = (params) =>
  fly.get("/word/dict/question/queryWordDictQuestionList", params);

//单词考纲 - 考纲冲刺 - 单词极速刷题的结果存储
export const addUserStudyDict = (params) =>
  fly.post("/word/study/history/addStudyHistory", params);

//单词考纲 - 考纲冲刺 - 查看极速刷词列表
export const getStudyWordList = (params) =>
  fly.get("/word/study/dict/queryStudyDictByBookId", params);

//单词考纲 - 考纲冲刺 - 统计极速刷词结果
export const getNewWordNum = (params) =>
  fly.get("/word/study/dict/countStudyDict", params);

//单词考纲 - 考纲冲刺 - 统计极速刷词记录
export const getOverWordNum = (params) =>
  fly.get("/word/study/history/countStudyHistory", params);

//单词考纲 - 用户报障 - 查询报障类型
export const getMalType = () =>
  fly.get("/word/malfunction/queryQuestionMalType");

//单词考纲 - 用户报障 - 添加用户报障
export const postAddMal = (params) => fly.post("/word/malfunction/add", params);

//单词考纲 - 用户报障 - 查询单词讲解报障类型
export const getMalTypeDict = (params) =>
  fly.get("/word/malfunction/queryDictMalType", params);

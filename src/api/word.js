import fly from '@/jslibs/dk-flyio'

// 查询词汇列表
export const listByBookType = params => fly.get('/word/unit/listByBookType', params)

// 查询学历分类
export const educationType = params => fly.get('/app/common/query/education_type', params)

// 查询书籍列表
export const bookList = params => fly.get('/word/book/list', params)

// 查询单元列表
export const unitList = params => fly.get('/word/unit/listByBookId', params)

// 查询课时列表
export const lessonList = params => fly.get('/word/lesson/queryListByBookId', params)

// 查询单元-单词列表
export const wordList = params => fly.get('/word/lesson/queryByUnitId', params)

// 查询课时-单词列表
export const dictList = params => fly.get('/word/lesson/dict/list', params)

// 查询词汇-单词列表
export const lessonWordList = params => fly.get('/word/lesson/queryByUnitId', params)

// 查询单词讲解
export const getWordEn = params => fly.get('/word/dict/queryByWordEn', params)

// 添加课时
export const addLesson = params => fly.get('/word/lesson/addLessonForExamOutline', params)

// 查询配置
export const wordNum = params => fly.get('/app/common/query/word_lesson_word_num', params)

// 添加学习任务
export const addLessonOutline = params => fly.get('/word/lesson/addLessonForExamOutline', params)

// 开始学习
export const reviewStart = params => fly.post('/word/review/start', params)

// 下一个单词
export const reviewNext = params => fly.post('/word/review/dict/learnWord', params)

// 完成学习
export const reviewFinish = params => fly.post('/word/review/finish', params)

// /word/challenge/finish 疯狂挑战 - 完成挑战 get
export const challengeFinish = params => fly.get('/word/challenge/finish', params)

// 疯狂挑战 - 挑战 - 回答一个单词 word/challenge/dict/challengeWord get
export const challengeWord = params => fly.get('/word/challenge/dict/challengeWord', params)

// 查看答题情况
export const reviewList = params => fly.get('/word/review/queryById', params)

// 查看答题情况
export const queryReviewList = params => fly.get('/word/review/dict/queryListByReviewId', params)

// 抗遗忘----------------------------------------------------------------------------

// 查询课时列表
export const getUserLessonList = params => fly.get('/word/lesson/getUserLessonList', params)

// 复习及待复习历程
export const queryListByLessonId = params => fly.get('/word/review/queryListByLessonId', params)

// 单词列表
export const queryById = params => fly.get('/word/lesson/queryById', params)

// 错词本列表
export const queryWordWrongDict = params => fly.get('/word/wrong/dict/queryWordWrongDict', params)

// 错词本删除
export const updateStatus = params => fly.get('/word/wrong/dict/updateStatus', params)

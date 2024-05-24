import fly from '@/jslibs/dk-flyio'

// 查询词汇列表
export const listByBookType = params => fly.get('/word/unit/listByBookType', params)

// 查询学历分类
export const educationType = params => fly.get('/word/config/query/education_type', params)

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
export const wordEn = params => fly.get('/word/dict/queryByWordEn', params)

// 添加课时
export const addLesson = params => fly.get('/word/lesson/addLessonForExamOutline', params)

// 查询配置
export const wordNum = params => fly.get('/word/config/query/word_lesson_word_num',params)
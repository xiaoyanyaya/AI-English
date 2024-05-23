import fly from '@/jslibs/dk-flyio'

// 查询单元列表
export const listByBookType = params => fly.get('/word/unit/listByBookType', params)

// 查询学历分类
export const educationType = params => fly.get('/word/config/query/education_type', params)

// 查询书籍列表
export const bookList = params => fly.get('/word/book/list', params)

// 查询单元列表
export const unitList = params => fly.get('/word/unit/list', params)

// 查询单词列表
export const wordList = params => fly.get('/word/lesson/queryByUnitId', params)

// 查询单词列表
export const wordEn = params => fly.get('/word/dict/queryByWordEn', params)

// 添加课时
export const addLesson = params => fly.get('/word/lesson/addLessonForExamOutline', params)
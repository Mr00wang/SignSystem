/*
要求： 能根据接口文档定义接口请求
包含应用中所有接口请求函数的模块
每个函数的返回值都是promise
 */

import ajax from "./ajax";

// const BASE = 'http://localhost:5000'
const BASE = ''
//登陆接口

/*
export function reqLogin() {
    return ajax('/login', {username,password}, 'POST')
}*/

export const reqLogin = (username, password) => ajax(BASE+'/CodingForFaceID_war/loginServlet', {username, password}, 'POST')

//获取在线人员
export const reqOnline = () => ajax(BASE + '/CodingForFaceID_war/onlineListServlet')

//获取成员列表//个人记录//时长汇总
export const reqUsers = () => ajax(BASE + '/CodingForFaceID_war/memberListServlet')

//添加成员
export const reqAddUser = (addMemberName,addPlace) => ajax(BASE+'/CodingForFaceID_war/addMemberServlet',{addMemberName,addPlace},'POST')

//修改成员接口
export const reqUpdateUser = (amendMemberName,amendPlace,index) => ajax(BASE + '/CodingForFaceID_war/amendInformationServlet',{amendMemberName,amendPlace,index},'POST')

//删除成员
export const reqDeleteUser = (delMemberName) => ajax(BASE + '/CodingForFaceID_war/delMemberServlet',{delMemberName},'POST')

//个人记录详情
export const reqSingleDetail = (memberName) => ajax(BASE + '/CodingForFaceID_war/findMemberByName',{memberName},'POST')

//发送公告编辑
export const reqInform = (NoticeMessage,place) => ajax(BASE + '/CodingForFaceID_war/sendNoticeMessageServlet',{NoticeMessage,place},'POST')

//获取公告
export const reqGetInform = (place) => ajax(BASE + '/CodingForFaceID_war/getNoticeMessageServlet',{place},'POST')

//获取历史记录
export const reqHistory = () => ajax(BASE+'/CodingForFaceID_war/detailedLoginInformationServlet')

//获取位置分布接口
export const reqGetSeat = () => ajax(BASE + '/CodingForFaceID_war/getSeatMap')

//编辑位置接口
export const reqUpdateSeat = (memberName,seat) => ajax(BASE + '/CodingForFaceID_war/seatArrangementServlet',{memberName,seat},'POST')
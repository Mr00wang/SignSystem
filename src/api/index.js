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

export const reqLogin = (username, password) => ajax(BASE+'/faceid_war/loginServlet', {username, password}, 'POST')

//获取在线人员
export const reqOnline = () => ajax(BASE + '/faceid_war/onlineListServlet');

//获取成员列表//个人记录//时长汇总
export const reqUsers = () => ajax(BASE + '/faceid_war/memberListServlet');

//添加成员
export const reqAddUser = (addMemberName,addPlace) => ajax(BASE+'/faceid_war/addMemberServlet',{addMemberName,addPlace},'POST')

//修改成员接口
export const reqUpdateUser = (amendMemberName,amendPlace,index) => ajax(BASE + '/faceid_war/amendInformationServlet',{amendMemberName,amendPlace,index},'POST')

//删除成员
export const reqDeleteUser = (delMemberName) => ajax(BASE + '/faceid_war/delMemberServlet',{delMemberName},'POST')

//个人记录详情
export const reqSingleDetail = (memberName) => ajax(BASE + '/faceid_war/findMemberByName',{memberName},'POST')

//发送公告编辑
export const reqInform = (NoticeMessage,place) => ajax(BASE + '/faceid_war/sendNoticeMessageServlet',{NoticeMessage,place},'POST')

//获取公告
export const reqGetInform = (place) => ajax(BASE + '/faceid_war/getNoticeMessageServlet',{place},'POST');

//获取历史记录
export const reqHistory = () => ajax(BASE+'/faceid_war/detailedLoginInformationServlet');

//获取位置分布接口
export const reqGetSeat = () => ajax(BASE + '/faceid_war/getSeatMap');

//编辑位置接口
export const reqUpdateSeat = (memberName,seat) => ajax(BASE + '/faceid_war/seatArrangementServlet',{memberName,seat},'POST');

//一键关联照片
export const reqLinkPicture = () => ajax(BASE + '/faceid_war/relevantPhotosServlet');

//每个房间签到次数接口
export const reqSignTimes = (place) => ajax(BASE + '/faceid_war/graphRoomSignTimes',{place},'POST');

//前七天房间总签到次数
export const reqSevenDaySignTimes = (place) => ajax(BASE + '/faceid_war/graphSevenDaysForFrequency',{place},'POST');

//前七天房间总前到时长
export const reqSevenDaySignTime = (place) => ajax(BASE + '/faceid_war/graphSevenDaysForTimes',{place},'POST');
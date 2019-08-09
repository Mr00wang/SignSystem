import React,{Component} from 'react';
import {Redirect,Route,Switch} from 'react-router-dom'
import memoryUtils from "../../utils/memoryUtils";
import LeftNav from "../../components/left-nav";
import Header from "../../components/header";
import {Layout} from "antd";
import Home from "../home/home";
import Online from "../online/online";
import User from "../user/user";
import Sum from "../sum/sum";
import History from "../sign-record/history";
import Single from "../sign-record/single";
import Inform from "../inform/inform";
import Bar from "../charts/bar";
import Line from "../charts/line";
import Pie from "../charts/pie";
import NotFound from "../waring/notFound";
import Location from "../location/location";
const { Footer, Sider, Content } = Layout;
/*
后台管理的路由组件
 */
export default class Admin extends Component{

    render() {
        const user = memoryUtils.user
        if(!user){
            return <Redirect to='/login' />
        }
        return (
            <Layout style={{minHeight:'100%'}}>
                <Sider
                    style={{
                    overflow: 'auto',
                    height: '100vh',
                    position: 'fixed',
                    left: 0,
                    }}
                >
                    <LeftNav/>
                </Sider>
                <Layout style={{ marginLeft: 200 }}>
                    <Header>Header</Header>
                    <Content style={{margin:20,backgroundColor:'#fff'}}>
                        <Switch>
                            <Redirect exact from='/' to='/home'/>
                            <Route path='/home' component={Home}/>
                            <Route path='/online' component={Online}/>
                            <Route path='/user' component={User}/>
                            <Route path='/sum' component={Sum}/>
                            <Route path='/sign-record/history' component={History}/>
                            <Route path='/sign-record/single' component={Single}/>
                            <Route path='/inform' component={Inform}/>
                            <Route path='/location' component={Location}/>
                            <Route path='/charts/bar' component={Bar}/>
                            <Route path='/charts/line' component={Line}/>
                            <Route path='/charts/pie' component={Pie}/>
                            <Route component={NotFound}/>
                        </Switch>
                    </Content>
                    {/*<Footer style={{textAlign:'center' , color:'#cccccc'}}>Copyright&copy;2019该版权归郑州轻工业大学软件创新基地所有</Footer>*/}
                    <Footer style={{textAlign:'center' , color:'#cccccc'}}>Copyright&copy;2019 Software Innovation Base Of Zhengzhou University Of Light Industry. All Rights Reserved</Footer>
                </Layout>
            </Layout>
        )
    }
}
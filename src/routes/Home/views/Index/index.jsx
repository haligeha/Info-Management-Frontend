import './index.styl'
import React from 'react';
import { Row, Col,Icon } from 'antd';
//import { Layout,} from 'antd';
//const { Content, } = Layout;
class Home extends React.Component{
  constructor() {
    super();
  }
 
    //跳转到二期首屏展示页面
    info=()=>{
      this.props.history.push('./monitor/view')
    }

    render(){
      return(
        <div className="wholehomepage">
          <Row type="flex" justify="space-around" align="middle">
            <Col span={6}>
              <div className="home">
                <div className="inter"><Icon style={{fontSize:70}} type="home" /><br/>
                  <h3>物管理平台</h3>
                  <p>创建虚拟设备，与被管理的实体设备对应。实现对设备的管理与检测。</p>   
                </div> 
              </div></Col>
            <Col span={6}>
              <div className="home">
                <div className="inter"><Icon style={{fontSize:70}} type="bar-chart"/><br/>
                  <h3>数据分析平台</h3>
                  <p>获取物联网中物与物之间的关系，通过对大量数据的分析挖掘找到相应的数据价值。</p>    
                </div>
              </div>
            </Col>
            <Col span={6}>
              <div className="home">
                <div className="inter"><Icon style={{fontSize:70}} type="desktop" /><br/>
                  <h3>3DWebGis</h3>
                  <p>以3D模型展示方式给用户提供三维立体交互的方式来控制和查看设备</p>    
                </div>
              </div>
            </Col>
          </Row>
          <Row type="flex" justify="space-around">
            <Col span={6}>
              <div className="home">
                <div className="inter"><Icon style={{fontSize:70}} type="book" /><br/>
                  <h3>统一日志中心</h3>
                  <p>收集多个模块的运行日志并统一管理。</p>    
                </div>
              </div>
            </Col>
            <Col span={6}>
              <div className="home">
                <div className="inter"><Icon style={{fontSize:70}} type="setting" /><br/>
                  <h3>统一配置中心</h3>
                  <p>解决多个系统配置信息统一管理困难的问题。</p>    
                </div>
              </div>
            </Col>
            <Col span={6}>
              <div className="home">
                <div className="inter"><Icon style={{fontSize:70}} type="share-alt" /><br/>
                  <h3>Kubernetes</h3>
                  <p>将谷歌的集群管理工具引入到虚拟机和裸机场景</p>    
                </div>
              </div>
            </Col>        
          </Row>
          <Row type="flex" justify="space-around">
            <Col span={6}>
              <div className="home">
                <div className="inter"><Icon style={{fontSize:70}} type="apartment" /><br/>
                  <h3>权限管理</h3>
                  <p>收集多个模块的运行日志并统一管理。</p>    
                </div>
              </div>
            </Col>
            <Col span={6}>
              <div className="home" onClick={this.info}>
                <div className="inter"><Icon style={{fontSize:70}} type="info" /><br/>
                  <h3>信息管理平台</h3>
                  <p>制定巡检路线并管理，提交预案申请并完成审批等。</p>    
                </div>
              </div>
            </Col>    
          </Row>
        </div>
      )
    }
}
export default Home;
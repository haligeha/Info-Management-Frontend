import React, { Component, } from 'react';
import './index.styl';
import { Icon, } from 'antd';

class PageTitle extends Component {
  static defaultProps = {
    titles:[]
  }
  constructor(props) {
    super(props);

    this.state = {
    };
  }



  render() {
    const {
      titles,
      children,
    } = this.props;
    return (
      <div className="page-title-component"
        style={{display:'flex',justifyContent:"space-between"}}
      >
        <div>
          <ul className="page-title-component-titles"
            style={{display:'flex',padding:0}}
          >
            {
              titles.map((cur,index)=>(
                <li key={cur}
                  className="page-title-component-title"
                >
                  <Icon type="caret-right"
                    style={{color:'blue'}}
                  />{cur}{index !== titles.length - 1 ? '' : ''}
                </li>

              ))
            }
          </ul>
        </div>  
        <div className="module-extra">
          {children}
        </div>
      </div>
    );
  }
}

export default PageTitle;


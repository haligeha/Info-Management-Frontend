import React, { Component, } from 'react';
import './index.styl';


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
      ...other
    } = this.props;
    return (
      <div className="search-and-select"
        
        {...other}
      >
      </div>
    );
  }
}

export default PageTitle;


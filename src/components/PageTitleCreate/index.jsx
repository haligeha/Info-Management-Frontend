import React, { Component, } from 'react';
import './index.styl';
import { Link } from 'react-router-dom';

class PageTitleCreate extends Component {
  static defaultProps = {
    titles: [],
    jump: '',
  }
  constructor(props) {
    super(props);

    this.state = {
    };
  }



  render() {
    const {
      titles,
      jump,
    } = this.props;
    console.log(jump)
    return (
      <div className="page-title-create-component">
        <ul className="page-title-create">
          {
            titles.map((cur, index) => (
              <li key={cur}>
                <Link to={jump} style={{ color: (index !== titles.length - 1) ? "#d9d9d9" : "rgba(0, 0, 0, 0.65)" }}>{cur}
                  {index !== titles.length - 1 ? "/"
                    :
                    " "
                  }</Link>
              </li>
            ))
          }
        </ul>
      </div>
    );
  }
}

export default PageTitleCreate;


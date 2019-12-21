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
      <div className="page-title-create-component"
        style={{ display: 'flex', justifyContent: "space-between" }}
      >
        <div >
          <ul className="page-title-create"
            style={{ display: 'flex', padding: 0 }}
          >
            {
              titles.map((cur, index) => (
                <li key={cur}
                  className="page-title-component-create"
                >
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
      </div>
    );
  }
}

export default PageTitleCreate;


import React from 'react'
import './index.styl'

const TitleNav = ({ title }) => (
  <div className="title-container">
    <div className="circle"/>
    <span>{title}</span>
  </div>
)

export default TitleNav;
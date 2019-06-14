import React, { Component } from 'react'
import strings from '../../localization/localization'
import './style.sass'

class TopHeader extends Component {
  render () {
    return (
      <React.Fragment>
        <div className='topHeader-sentence'>
        {strings.formatString(
          strings.topHeader_tittle
          // <a className='topHeader-link'href='/'>{strings.topHeader_link}</a>
        )}
        </div>
      </React.Fragment>
    )
  }
}

export default TopHeader

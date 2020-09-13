// source: https://gist.github.com/julianocomg/296469e414db1202fc86/#gistcomment-1818845
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Sticky = styled.div`
  &.affix {
    position: sticky;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 999;
  }
`

class Affix extends Component {

  static propTypes = {
    offset: PropTypes.number,
  }

  constructor() {
    super()
    this.state = {
      affix: false,
    }
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }

  handleScroll = () => {
    const affix = this.state.affix
    const offset = this.props.offset || 0
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop

    if (!affix && scrollTop >= offset) {
      this.setState({
        affix: true,
      })
    }

    if (affix && scrollTop < offset) {
      this.setState({
        affix: false,
      })
    }
  }

  render() {
    const affix = this.state.affix ? 'affix' : ''
    const { className, ...props } = this.props
    console.log(this.props)

    return (
      <Sticky {...this.props} className={`${className || ''} ${affix}`} style={{top: props.offset ? props.offset : 0}}>
        {this.props.children}
      </Sticky>
    )
  }
}

export default Affix
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
    z-index: 9999;
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
    const offset = this.props.offset
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop

    console.log(offset)

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

    return (
      <Sticky {...props} className={`${className || ''} ${affix}`}>
        {this.props.children}
      </Sticky>
    )
  }
}

export default Affix
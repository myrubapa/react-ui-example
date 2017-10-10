import React from 'react'
import ReactDOM from 'react-dom'
import ownerDocument from 'dom-helpers/ownerDocument'
import contains from 'dom-helpers/query/contains'
import activeElement from 'dom-helpers/activeElement'
import PropTypes from 'prop-types'
import { compose, pure } from 'recompose'
import withStyles from 'material-ui-next/styles/withStyles'
import IconButton from 'material-ui-next/IconButton'
import CloseIcon from 'material-ui-icons/Close'
import addEventListener from '../../helpers/addEventListener'

const styles = theme => ({
  root: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    zIndex: '999',
    '& > div:first-child': {
      position: 'absolute',
      top: 100,
      left: '50%',
      '&:focus': {
        backgroundColor: 'red'
      },
      marginLeft: -200,
      '& > div:first-child': {
        position: 'fixed',
        background: '#fff',
        width: 400,
        boxShadow: theme.shadows[9]
      }
    }
  },

  title: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: theme.palette.primary['400'],
    lineHeight: '55px',
    color: theme.table.headerTextColor,
    boxShadow: theme.shadows[1],
    fontSize: '18px',
    paddingLeft: '10px',
    '& svg': {
      color: `${theme.table.headerIconColor} !important`
    }
  },

  content: {
    padding: '0 10px 10px 10px'
  }
})

class TableDialog extends React.Component {
  modal = null;
  onFocusListener = null;

  componentDidMount () {
    if (!this.onFocusListener) {
      const doc = ownerDocument(ReactDOM.findDOMNode(this))
      this.onFocusListener = addEventListener(doc, 'focus', this.handleFocusListener, true)
    }
  }

  componentWillUnmount () {
    if (this.onFocusListener) {
      this.onFocusListener.remove()
    }
  }

  handleFocusListener = () => {
    const currentFocus = activeElement(ownerDocument(ReactDOM.findDOMNode(this)))
    const modalContent = this.modal && this.modal.lastChild

    if (modalContent && modalContent !== currentFocus && !contains(modalContent, currentFocus)) {
      modalContent.focus()
    }
  }

  render () {
    const { classes, title, children } = this.props

    return (
      <div className={classes.root} ref={ref => { this.modal = ref }}>
        <div tabIndex="-1">
          <div>
            <div className={classes.title}>
              {title}
              <IconButton>
                <CloseIcon />
              </IconButton>
            </div>
            <div className={classes.content}>
              {children}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

TableDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
}

export default compose(
  withStyles(styles),
  pure
)(TableDialog)
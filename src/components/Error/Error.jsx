import React from 'react'
import classes from "../BookList/styles.module.scss"
const Error = ({ children }) => {
  return (
    <div className={classes.err}><span>Error {children}</span></div>
  )
}

export default Error
import React, { Children } from 'react'
import { Alert } from 'react-bootstrap'

export const Message = ({ variant, Children }) => {
   return (
      <Alert variant={variant}>
         {Children}
      </Alert>
   )
}

Message.defaultProps = {
   variant: 'info'
}

export default Message


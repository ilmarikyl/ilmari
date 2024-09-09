import React from 'react'
import ReactMarkdown from 'react-markdown'
import CustomLink from './CustomLink'

const CustomLinkWrapper = props => <CustomLink {...props} />

const MarkdownDescription = ({ description }) => {
  return (
    <ReactMarkdown
      components={{
        a: CustomLinkWrapper,
      }}
    >
      {description}
    </ReactMarkdown>
  )
}

export default MarkdownDescription

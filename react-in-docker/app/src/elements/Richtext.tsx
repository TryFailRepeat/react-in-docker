import React, { FunctionComponent } from 'react'
import Markdown from 'react-markdown'
import Breaks from 'remark-breaks'

interface Props {
    content: string;
}

const RichtextElement: FunctionComponent<Props> = (props: Props) => {
    const { content } = props

    return (<div class="o-richtext">
        <Markdown source={content} escapeHtml={false} plugins={[Breaks]} />
    </div>)
}

export default RichtextElement

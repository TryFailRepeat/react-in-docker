import React, { FunctionComponent } from 'react'

interface Props {
  symbol: string;
  className?: string;
}

const Icon: FunctionComponent<Props> = (props: Props) => {
  const { symbol, className } = props
  const path = `svg/sprite.svg#sprite-${symbol}`
  const use = `<use xlink:href="${path}" />`

  return <svg className={className} dangerouslySetInnerHTML={{__html: use }} />
}

export default Icon

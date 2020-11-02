import React, { FunctionComponent, ReactNode } from 'react'
import { Helmet } from 'react-helmet'

interface Props {
    title: string,
    tabTitle?: string,
    metaDescription?: string,
    metaTags?: Array<string>,
    children?: ReactNode
}

const makeSafeForCSS = (string: string): string => {
    return string
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .replace(/[!\"#$%&'\(\)\*\+,\.\/:;<=>\?\@\[\\\]\^`\{\|\}~]/g, '')
        .replace(/\s/g, '')
}

const Page: FunctionComponent<Props> = (props: Props) => {
    const { title, metaDescription, metaTags, children } = props
    const tabTitle = props.tabTitle || title

    document.body.classList.add(`c-page`)
    document.body.classList.add(`c-page--${makeSafeForCSS(title)}`)

    return (<React.Fragment>
        <Helmet>
            <title>{tabTitle}</title>
            {metaDescription
                ? (<meta name="description" content={metaDescription} />)
                : null
            }
            {metaTags
                ? (<meta name="keywords" content={metaTags.join(',')} />)
                : null
            }
        </Helmet>
        {children}
    </React.Fragment>
    )
}

export default Page

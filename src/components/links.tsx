import React, { useState } from "react"
import { css } from "@emotion/react"
import { graphql, useStaticQuery } from "gatsby"
import styled from "@emotion/styled"

interface Props extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement> { }

export const Links: React.FunctionComponent<Props> = ({ ...props }) => {

  const data = useStaticQuery(graphql`
    query LinksQuery {
      site {
        siteMetadata {
          author {
            contacts
          }
          socials {
            link
            text
          }
        }
      }
    }
  `)

  const contacts = data.site.siteMetadata.author.contacts
  const socials = data.site.siteMetadata.socials

  const [useRealContact, setUseRealContact] = useState(false)
  const handleInput = () => { setUseRealContact(true) }

  return (
    <span {...props} >
      <ContactSpan>
        <a
          onMouseOver={handleInput}
          onTouchStart={handleInput}
          // onFocus={handleInput}
          href={useRealContact
            ? `mailto:${transformContact(contacts)}`
            : 'mailto:#'
          }
        >
          {useRealContact ? ( // on hover, swap the in the real contact
            <span>{transformContact(contacts)}</span>
          ) : ( // else use the one that is visually the same but formatted with css
              <span>
                <span css={css`&:after{content:'@'}`}>{contacts[0]}</span>
                <span css={css`&:after{content:'.'}`}>{contacts[1]}</span>
                <span>{contacts[2]}</span>
              </span>
            )}
        </a>
      </ContactSpan>
      {socials.map((social, i) => (
        <ContactSpan key={i}>
          <a href={social.link}>
            {social.text}
          </a>
        </ContactSpan>
      ))}
    </span>
  )
}

const transformContact = (contacts: string[]): string => `${contacts[0]}@${contacts[1]}.${contacts[2]}`;

const ContactSpan = styled.span`
  font-size: 0.8rem;
  font-weight: 600;
  &:after{
    content:' · ';
    letter-spacing: 0.5ch;
  }
  &:last-child:after{
    content: none;
  }
`

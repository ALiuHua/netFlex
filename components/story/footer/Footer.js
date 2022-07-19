import React from "react";
import styled, { css } from "styled-components";
import { FooterLink } from "../HeaderStyle";
import { useRouter } from "next/router";
const FooterWrapper = styled.footer`
  padding: 7rem 4.5rem;
  font-size: 13px;
  background-color: #000;
  @media only screen and (max-width: ${({ theme }) => theme.mediaXsmall}) {
    padding: 6.25rem 5%;
  }
  ${({ pathname }) =>
    pathname === "/login" &&
    css`
      padding: 3rem 4.5rem;
      background-color: rgba(0, 0, 0, 0.75);
    `}
`;
const FooterContent = styled.div`
  max-width: 100rem;
  margin: 0 auto;
  padding: 0rem 3.5rem;
  /* font-size: 1.6rem; */

  color: #757575;
`;
const FooterTop = styled.p`
  margin-bottom: 3rem;
  font-size: 16px;
`;
const FooterLinksWrapper = styled.div`
  ul {
    /* li { */
    /* list-style: none;
      display: inline-block;
      width: 21.3rem; */
    /* } */
    display: grid;
    grid-template-columns: repeat(4, minmax(18.5rem, 1fr));

    @media only screen and (max-width: ${({ theme }) => theme.mediaSmall}) {
      grid-template-columns: repeat(auto-fit, minmax(17rem, 1fr));
    }
    @media only screen and (max-width: ${({ theme }) => theme.mediaXsmall}) {
      grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr));
    }
    li {
      list-style: none;
      padding-right: 1.2rem;
      margin-bottom: 1.6rem;
      /* font-size: 13px; */
      a {
        /* &:link,
        &:visited {
        } */
        &:hover,
        &:active {
          /* border-bottom: 1px soild red; */

          border-bottom: 1px solid #757575;
        }
        /* why not work,because solid typo */
      }
    }
  }
`;
const fullContent = [
  { id: "1", content: "FAQ", href: "#" },
  { id: "2", content: "Help Centre", href: "#" },
  { id: "3", content: "Account", href: "#" },
  { id: "4", content: "Media Centre", href: "#" },
  { id: "5", content: "Investor relations", href: "#" },
  { id: "6", content: "Jobs", href: "#" },
  { id: "7", content: "Redeem gift cards", href: "#" },
  { id: "8", content: "Buy gift cards", href: "#" },
  { id: "9", content: "Ways to watch", href: "#" },
  { id: "10", content: "Terms of Use", href: "#" },
  { id: "11", content: "Pravicy", href: "#" },
  { id: "12", content: "Cookie preferences", href: "#" },
  { id: "13", content: "Corporate information", href: "#" },
  { id: "14", content: "Contact us", href: "#" },
  { id: "15", content: "Speed test", href: "#" },
  { id: "16", content: "Legal notices", href: "#" },
  { id: "17", content: "Only on NetFlex", href: "#" },
];
const loginContent = [
  { id: "1", content: "FAQ", href: "#" },
  { id: "2", content: "Help Centre", href: "#" },
  { id: "3", content: "Terms of Use", href: "#" },
  { id: "4", content: "Pravicy", href: "#" },
  { id: "5", content: "Cookie preferences", href: "#" },
  { id: "6", content: "Corporate information", href: "#" },
];
const FooterCountry = styled.p`
  margin: 2.4rem 0 1.3rem 0;
`;
const Footer = () => {
  const { pathname } = useRouter();
  const content = pathname === "/login" ? loginContent : fullContent;

  return (
    <FooterWrapper pathname={pathname}>
      <FooterContent>
        <FooterTop>Questions? Phone 1800 875 462</FooterTop>
        <FooterLinksWrapper>
          <ul>
            {content.map((data) => (
              <li key={data.id}>
                <FooterLink href={data.href}>{data.content}</FooterLink>
              </li>
            ))}
          </ul>
        </FooterLinksWrapper>
        {pathname !== "/login" && (
          <FooterCountry>NetFlex Australia</FooterCountry>
        )}
      </FooterContent>
    </FooterWrapper>
  );
};

export default Footer;

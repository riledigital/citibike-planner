import styled from "styled-components";
import Link from "next/link";

const NavLink = ({ children, href, onClick }) => {
  return (
    <StyledLi>
      <Link {...{ href }}>
        <StyledA>{children}</StyledA>
      </Link>
    </StyledLi>
  );
};

const ThumbNav = () => {
  return (
    <StyledThumbNav>
      <StyledNavList>
        <NavLink href="/">Map</NavLink>
        <NavLink href="/favorites">Stations</NavLink>
        <NavLink href="/about">About</NavLink>
      </StyledNavList>
    </StyledThumbNav>
  );
};

export default ThumbNav;

const StyledThumbNav = styled.nav`
  background: var(--c-blue);
  color: var(--c-white);

  display: flex;
  z-index: 999;
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  height: 4rem;
`;

const StyledNavList = styled.ul`
  display: flex;
  justify-content: center;
  flex-direction: row;
  gap: 1ch;

  margin: auto;
`;

const StyledLi = styled.li`
  text-align: center;
  align-items: center;

  font-size: 1rem;
  list-style-type: none;
  padding-left: 0;
  padding: 0.5ch;
  min-width: 5rem;

  &:hover {
    background: blue;
  }
`;

const StyledA = styled.a`
  color: var(--c-white);
  font-weight: bold;
`;

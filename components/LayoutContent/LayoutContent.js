import styled from "styled-components";

const LayoutContent = (props) => {
  return <Content {...props}>{props.children}</Content>;
};

export default LayoutContent;

const Content = styled.main`
  margin: 2rem;
  margin-bottom: calc(var(--h-thumbnav) + 2rem);

  @media screen and (min-width: 1000px) {
    margin: auto;
  }
`;

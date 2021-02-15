import styled from "styled-components/macro";

const Container = styled.div`
  position: absolute;
  width: 19rem;
  height: 20rem;

  background-color: #212529;
  border-radius: 10px;

  padding: 2rem 1.5rem;
  box-sizing: border-box;
  color: white;

  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);

  top: 2rem;
  right: 2rem;

  display: grid;
  grid-template-columns: 5rem 1fr;
  grid-auto-rows: 2rem;
  grid-gap: 1rem 0;
  align-items: center;
`;

const PropName = styled.div``;

const PropControl = styled.div``;

export default function Control() {
  return (
    <Container>
      <PropName>Property</PropName>
      <PropControl>aasdf asdf asdf asd fasdf </PropControl>
      <PropName>Property</PropName>
      <PropControl>aasdf asdf asdf asd fasdf </PropControl>
    </Container>
  );
}

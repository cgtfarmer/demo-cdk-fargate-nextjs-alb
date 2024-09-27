import Container from 'react-bootstrap/Container';

interface ComponentProps {
  className: string;
}

export default function Component(props: ComponentProps) {
  return (
    <footer className={props.className}>
      <Container
        className="d-flex flex-wrap justify-content-center align-items-center py-3 my-4 border-top"
      >
        <span className="mb-3 mb-md-0 text-light">Footer</span>
      </Container>
    </footer>
  );
};

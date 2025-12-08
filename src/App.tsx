import { Button, Container, Title, Text } from '@mantine/core';

function App() {
  return (
    <Container size="sm" style={{ textAlign: 'center', marginTop: '50px' }}>
      <Title order={1} c="blue">
        SacabamClicker
      </Title>
      
      <Text size="xl" mt="md">
        Dự án test của Goshujinsama khởi chạy thành công! 
      </Text>

      <Button variant="filled" color="cyan" size="lg" mt="xl">
        Bấm đi! (Test Mantine)
      </Button>
    </Container>
  );
}

export default App;
import server from './config/server';

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});

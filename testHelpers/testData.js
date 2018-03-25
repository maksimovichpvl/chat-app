const timeNow = () => new Date().toLocaleTimeString();

export const messages = [
  {
    id: 1,
    username: 'test',
    content: 'asdasdasdasd',
    createdAt: timeNow()
  },
  {
    id: 2,
    username: 'test',
    content: 'asdasdasdasd',
    createdAt: timeNow()
  },
  {
    id: 3,
    username: 'test',
    content: 'asdasdasdasd',
    createdAt: timeNow(),
    isMy: true
  },
  {
    id: 4,
    username: '4444',
    content: 'asdasdasdasd',
    createdAt: timeNow()
  },
];
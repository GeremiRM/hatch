const axios = {
  get: jest.fn().mockResolvedValue({
    data: {
      quotes: { USDEUR: 0.5 },
    },
  }),
};

export default axios;

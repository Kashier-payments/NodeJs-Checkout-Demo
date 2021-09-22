module.exports = {
  mode: 'test',
  live: {
    baseUrl: 'https://checkout.kashier.io',
    mode: 'live',
    PaymentApiKey: 'GENERATE AN API KEY FROM THE LIVE DASHBOARD',
    mid: 'MID-X-XXX',
  },
  test: {
    baseUrl: 'https://checkout.kashier.io',
    PaymentApiKey:
      'c7c4c0a1500aebd5a7a0008b408673fe6135baa11bf7e69202ac334e26f37bba',
    mode: 'test',
    mid: 'MID-2-670',
  },
};

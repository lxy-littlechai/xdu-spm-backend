
const alipayConfig = {
  appId: '2021000122693685', // 开放平台上创建应用时生成的 appId
  signType: 'RSA2', // 签名算法,默认 RSA2
  gateway: 'https://openapi.alipaydev.com/gateway.do', // 支付宝网关地址 ，沙箱环境下使用时需要修改
  alipayPublicKey: 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAg7ZPiPmBEz3vafn045nhCZg3fhU5HwezGO+DtOikFod9MDRML62uGM/t3SQOleHFtDu4fx3XWnNsTmwfYS3WmkPVey5kyis6qCNOipOjlWb9objyXhz+M579kqZlupKqcvjF8Jam4PvMFARRf/otj6kOEupkcHRM+ezsMlyKxvzGP4ARD4X/R4Kkfi/JIPw9XGel+HLV5hoK0MF+zarBwWkX8ecLk8nj19QE+OoGsugDQ+mzJD6kc8uNwY2xuYTOqLKMcEL9aJLgZ/ImOV78T3TAEajjUyZ5CbjI/kw8sN7QykMKkbFqO5URHjWNVvyErTWrpKIFtSJVWW2GvwSj5wIDAQAB', // 支付宝公钥，需要对结果验签时候必填
  privateKey: 'MIIEowIBAAKCAQEAjBBtPBJeWvqroL8d/at1+ipaxbynyubdC4dFoFhu3Jdg/9dznYI0gLQLexw09tfsn0L6VuXGBaW+hrzHERfg5FVSMpmFbVyq5oixCKxmv1A9px3fyDg4XQHpcO10K3D8emeSNRu+NEG9I4wFV3xsmVlDslONXgju75FjnJl87u+T5gCsfli2QALrkp7pozaK07SBCebYaiqDSyL33piZWX2sosxLHIymD3y2vg/DejYVk3GuspEpGnrwHht777ysf4y7d13U6oY1XF8XwVtJCS9dTlkSA4iTu3eEHRL/pizwnNEn7i69Kq3m6Uym8dSCSkm0zcR4Ea67y65uVXVbkwIDAQABAoIBAQCHXmj0ohwnehXealgmD00a10ybx9WzuKTyu26DpnSfJn9NRYIsPOdZbKmb9osJ925uDmG9Ep3sX2BhAJq03oswo3WqCc53ABT8cigH5ff39ylfFvRtokh3O53O0vBv++dItkkMox+VieOvM2kGQO8E1s0i0LXUqHWlfLL1azLgCZ9n3aS27QXi2mZlBF+O4HE2x+P4o1CxkW99tQ/WZm9NygWXGzJRkdpZT+1aUnr5yb9Qwl1Jcb/ffczWPmlbn4Ombx4/HvegDOWIERBeueqaC8Y6wkXkMJp/87jHOM9xEu9nC1394comEhIz6jBxuixObTv1iIkEoEKFIMEoMxtBAoGBAOcleUUPr/zkcv1LRLwXTSEnqWgtS7yS5WyeQNWdnFDyb+GBn2XLXdfOlb2SktUwckL5jIs3rryfGcPabFM91BMrNiyM3nN+iIP9gu44xCfmDrIjmgsVJiD/nHNUQ+IupMR3K8iQQ6jyqqcwzjxQr+TJAJ/XAT8x7nPmuC2a/1nLAoGBAJsf09aC8PhHbvpbjKoMqdxtMueVXK8E5mEw8nCVcokVrnHWE+mVAGQv4roUB+DmqPcclH2gXOGe+NC+kgtYGVQQN29ApSatCzOroBGbj5L/5AaxVQTux1V0IZTznLJOaQyx3WsZTr8mbCMxzqqqip54/FhRx3rYgNR1WY5GuOxZAoGAFz8GjjKAsX9MLTsno374a9AwUmDT0Bg56I2V2aXrNZzcMaK2pCcqvexx1Mnr6HLh2uh8APhNo3ygu7i40jpSnMbowNw99wGPuy6Av3KID7csXTAFav3qgsESO+sKlLG6MmQFzDruAwy8qunWo+w9dFXesTSPVIqx/4gBl9yRt7cCgYAztXpR6TgWKwmtXtMW5D3DAouTctCAbuu0vjIyoT6av6V0wN3GYSrOOsAjMwYlS/5K0TYWYlxTwUBDpSLdsTJQOU+hQDVNHSW8xZsIA4jqgW4rZPVoPYgozhtboZE8RrLxzmB2kOsVAOPPH406irrGdKH5dtk98+mN6Mg/iwedkQKBgDAz2VUGBDTQ00FbnBs5QeKRTkKp45jYdGwjBs74E5vjUvvnMcqHVMm5ehStfgd9dbKL4n1CYOw4MmdgWTP4BdidS5koZUvxQxpuH9TGcet9I8Zen7CbSUfvy3XR7xdPbjoPjpkDwVkJNTn2Ws4miUhZDbDzEViMU75nT+GHJfZC', // 应用私钥字符串
};
module.exports = {
  alipayConfig
}
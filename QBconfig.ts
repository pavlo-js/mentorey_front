export const QBConfig = {
  credentials: {
    appId: 101725,
    accountKey: "iy2ngw7Xhh4jq74cLvx8",
    authKey: "4PweHumpUCHwdZe",
    authSecret: "yur3waVSJ3uH4dZ",
    sessionToken: "",
  },
  appConfig: {
    chatProtocol: {
      Active: 2,
    },
    debug: false,
    endpoints: {
      apiEndpoint: "https://api.quickblox.com",
      chatEndpoint: "chat.quickblox.com",
    },
    on: {
      async sessionExpired(handleResponse: any, retry: any) {
        console.log(`Test sessionExpired… ${handleResponse} ${retry}`);
      },
    },
    streamManagement: {
      Enable: true,
    },
  },
};

/// <reference path="./.sst/platform/config.d.ts" />
export default $config({
  app(input) {
    return {
      name: "useless-hermit",
      removal: input?.stage === "production" ? "retain" : "remove",
      protect: ["production"].includes(input?.stage),
      home: "aws",
      providers: {
        aws: {
          profile:
            input.stage === "production"
              ? "uselesshermit-production"
              : "uselesshermit-dev",
          region: "us-east-1",
        },
        cloudflare: "6.1.2",
      },
    };
  },
  async run() {
    new sst.aws.Astro("MyWeb", {
      domain: {
        name: "uselesshermit.com",
        dns: sst.cloudflare.dns(),
        redirects: ["www.uselesshermit.com"],
      },
    });
  },
});

import middy from "@middy/core";
import ssm from "@middy/ssm";

const { SERVICE_A_SECRET_KEY_PARAMETER_NAME } = process.env;

if (!SERVICE_A_SECRET_KEY_PARAMETER_NAME) {
  throw new Error("SERVICE_A_SECRET_KEY_PARAMETER_NAME environment variable is not set");
}

export const handler = middy((_, context) => {
  // ⚠️⚠️⚠️ you should never log secrets; just for demo purposes ⚠️⚠️⚠️
  console.log(context.SERVICE_A_SECRET_KEY);
}).use(ssm({
  fetchData: {
    SERVICE_A_SECRET_KEY: SERVICE_A_SECRET_KEY_PARAMETER_NAME
  },
  cacheKey: SERVICE_A_SECRET_KEY_PARAMETER_NAME,
  cacheExpiry: 5 * 60, // 5min
  setToContext: true
}));
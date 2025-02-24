import { GeneratedSecret, OtpauthURLOptions } from "speakeasy";

export default (label: string, secret: GeneratedSecret): OtpauthURLOptions => {
  return {
    label,
    secret: secret.base32,
    issuer: "www.euro-media.eu",
    encoding: "base32",
  };
};

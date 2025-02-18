export const getCaptchaToken = (): Promise<string> => {
    return new Promise((resolve, reject) => {
      grecaptcha.ready(async () => {
        try {
          const siteKey = process.env.NEXT_PUBLIC_CAPTCHA_SITE_KEY;  // Use site key, not secret key
          if (!siteKey) {
            return reject(new Error("CAPTCHA site key is not found"));
          }
          
          const token = await grecaptcha.execute(siteKey, { action: "registeration" });
          resolve(token);
        } catch (error) {
          reject(error);
        }
      });
    });
  };
  
  export const verifyToken = async (token: string) => {
    try {
      const secretKey = process.env.CAPTCHA_SECRET_KEY;
      if (!secretKey) {
        throw new Error("CAPTCHA secret key is not found");
      }
  
      const url = new URL("https://www.google.com/recaptcha/api/siteverify");
      url.searchParams.append("secret", secretKey);
      url.searchParams.append("response", token);
  
      const res = await fetch(url, { method: "POST" });
      const captchaData: CaptchaDataType = await res.json();
      return captchaData;
    } catch (error: any) {
      throw new Error(error.message || "Something went wrong");
    }
  };
  
  interface CaptchaDataType {
    success: boolean;
    challenge_ts: string; // Timestamp of the challenge load (ISO format yyyy-MM-dd'T'HH:mm:ssZZ)
    hostname: string; // The hostname of the site where the reCAPTCHA was solved
    error_codes?: string[]; // Optional field for error codes
    score: number;
  }
  
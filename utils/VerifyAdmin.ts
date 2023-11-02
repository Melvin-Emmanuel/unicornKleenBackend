import jwt from "jsonwebtoken";

export const verifyAdmin = async (req: any, res: any, next: any) => {
  const getSession = req.headers["cookie"];
  if (!getSession) {
    return res.status(404).json({
      message: "please login to get token",
    });
  }
  const tokenCookies = await getSession.split("=")[1];
//   console.log("melvin", tokenCookies);
  if (tokenCookies) {
    const tokens = await tokenCookies;
    jwt.verify(tokens, "melvinmelasiemmanuelAdminVerification", (err: any, payload: any) => {
      if (err) {
        return res.status(404).json({ message: "token expire" });
      }
      req.user = payload;
      next();
    });
  } else {
    return res.status(404).json({
      message: "please provide a valid token",
    });
  }
};

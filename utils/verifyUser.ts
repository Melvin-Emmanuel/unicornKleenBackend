import jwt from "jsonwebtoken"

export const verifyUser = async (req: any, res: any, next: any) => {
  const getSession = req.headers["cookie"];
  if (!getSession) {
    return res.status(404).json({
      message: "please login to get token",
    });
  }
  const tokenCookies = await getSession.split("=")[1];
  // console.log("melvin", tokenCookies);
  if (tokenCookies) {
    const tokens = await tokenCookies;
    jwt.verify(tokens, "melvinmelasiemmanuel", (err: any, payload: any) => {
      if (err) {
        return res.status(404).json({ message: "token expire" });
      }
      req.User = payload;
      next();
    });
  } else {
    return res.status(404).json({
      message: "please provide a valid token",
    });
  }
};

import admin from "firebase-admin";
import { Request, Response, NextFunction } from "express";

interface AuthRequest extends Request {
  user?: admin.auth.DecodedIdToken;
  userDocument?: any;
}

const isAuthenticated = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authorizationHeader = req.headers.authorization;
  const token = authorizationHeader?.split("Bearer ")[1];

  if (!token) {
    return res.status(401).send("No token provided");
  }

  admin
    .auth()
    .verifyIdToken(token)
    .then((decodedToken) => {
      req.user = decodedToken;
      next();
    })
    .catch((error) => {
      console.error("Error verifying auth token", error);
      res.status(403).send("Invalid token");
    });
};

export default isAuthenticated;

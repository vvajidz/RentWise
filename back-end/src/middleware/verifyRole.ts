import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const verifyRole = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!);

      // @ts-ignore to quickly avoid type complaints
      req.user = decoded;

      // @ts-ignore to avoid type error on role (since TS doesn't know user field)
      if (!roles.includes(req.user.role)) {
        return res.status(403).json({ message: "Forbidden: Insufficient role" });
      }

      next();
    } catch (err) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }
  };
};

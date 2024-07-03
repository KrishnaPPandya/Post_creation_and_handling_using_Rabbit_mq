import jwt from 'jsonwebtoken';

/**
 * Middleware to authenticate requests using a JWT.
 * 
 * @param req - The request object.
 * @param res - The response object.
 * @param next - The next middleware function in the stack.
 * 
 * @returns {void}
 */
export const authenticate = (req: any, res: any, next: any): void => {
  const token = req.header('Authorization');
  if (!token) {
    res.status(401).send('Access denied. No token provided.');
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).send('Invalid token.');
  }
};

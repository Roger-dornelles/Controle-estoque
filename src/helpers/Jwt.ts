import JWT from 'jsonwebtoken';

export const jwtDecoded = async (token: string) => {
  if (token) {
    let decoded: any = JWT.verify(token, process.env.JWT_SECRET_KEY as string);
    let { id, email } = decoded;
    return { id, email };
  }
};

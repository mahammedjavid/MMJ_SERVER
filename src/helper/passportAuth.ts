import {
  Strategy as JwtStrategy,
  ExtractJwt,
  VerifiedCallback,
} from "passport-jwt";
import { UserTable } from "../relation/index";
import { PassportStatic } from "passport";
import { JwtPayload } from "jsonwebtoken";

function passPOrtAuth(passport: PassportStatic): void {
  const params = {
    secretOrKey: process.env.ACCESSTOKENSECRET,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  };

  passport.use(
    new JwtStrategy(
      params,
      async (jwt_payload: JwtPayload, done: VerifiedCallback) => {
        try {
          const user = await UserTable.findOne({
            where: { mobile_number: jwt_payload?.mobile_number || jwt_payload?.userDetails?.mobile_number },
          });

          if (user) {
            done(null, user);
          } else {
            done(null, false);
          }
        } catch (error) {
          done(error, false);
        }
      }
    )
  );
}

export { passPOrtAuth };

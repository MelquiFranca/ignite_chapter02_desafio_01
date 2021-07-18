import { Response, NextFunction, Request, Router } from "express";

import { createUserController } from "../modules/users/useCases/createUser";
import { listAllUsersController } from "../modules/users/useCases/listAllUsers";
import { showUserProfileController } from "../modules/users/useCases/showUserProfile";
import { turnUserAdminController } from "../modules/users/useCases/turnUserAdmin";

const usersRoutes = Router();

function checkExistsUserId(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { user_id } = request.header;

  if (!user_id) {
    throw new Error("User Id not found.");
  }

  request.user_id = user_id;

  next();
}

usersRoutes.post("/", (request, response) =>
  createUserController.handle(request, response)
);

usersRoutes.patch("/:user_id/admin", (request, response) =>
  turnUserAdminController.handle(request, response)
);

usersRoutes.get("/:user_id", (request, response) =>
  showUserProfileController.handle(request, response)
);

usersRoutes.get("/", checkExistsUserId, (request, response) =>
  listAllUsersController.handle(request, response)
);

export { usersRoutes };

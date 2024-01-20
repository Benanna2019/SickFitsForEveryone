import { prisma } from "./db";
import { UserModel } from "./models";

export async function syncUser(superTokenUserId: string): Promise<UserModel> {
  return await prisma.user.upsert({
    where: {
      superTokenUserId,
    },
    update: {
      superTokenUserId,
    },
    create: {
      superTokenUserId,
    },
  });
}

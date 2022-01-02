import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IStoregeProvider } from "@shared/container/providers/StorageProvider/IStoregeProvider";


interface IRequest {
    user_id: string;
    avatar_file: string;
}

@injectable()
class UpdateUserAvatarUseCase {
    constructor(
        @inject("UsersRepository")
        private UsersRepository: IUsersRepository,
        @inject("StoregeProvider")
        private storegeProvider: IStoregeProvider
    ) { }

    async execute({ user_id, avatar_file }: IRequest): Promise<void> {
        const user = await this.UsersRepository.findById(user_id);

        
        if (user.avatar) {
            await this.storegeProvider.delete(user.avatar, "avatar");
        }

        await this.storegeProvider.save(avatar_file, "avatar");
        
        user.avatar = avatar_file

        await this.UsersRepository.create(user);

    }
}

export { UpdateUserAvatarUseCase }

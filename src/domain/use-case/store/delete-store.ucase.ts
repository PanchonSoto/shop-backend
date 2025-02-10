import { CustomError } from "../../errors/custom.error";

import { IStoreRepository } from "../../repositories";

export class DeleteStore {
  constructor(private readonly storeRepository: IStoreRepository) {}

  async execute(id: number): Promise<void> {
    const existStore = this.storeRepository.verifyStoreExists(id);

    //todo: validate that user only can delete its own store

    if (!existStore)
      throw CustomError.notFound(`Store with id: ${id} does not exists.`);

    await this.storeRepository.deleteStore(id);
  }
}

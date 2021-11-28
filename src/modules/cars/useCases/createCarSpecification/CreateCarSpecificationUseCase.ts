import { inject, injectable, injectAll } from "tsyringe"
import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository"
import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
    car_id: string;
    specifications_id: string[];
}

@injectable()
class CreateCarSpecificationUseCase {
    constructor(
        @inject("CarsRepository")
        private carsRepository: ICarsRepository,

        @inject("SpecificationsRepository")
        private specificatonRepository: ISpecificationsRepository
    ){}

    async execute({ car_id, specifications_id }: IRequest): Promise<Car> {
        const carsExists = await this.carsRepository.findById(car_id);

        if(!carsExists){
            throw new AppError("Car does not exists!")
        }

        const specifications = await this.specificatonRepository.findByIds(specifications_id);

        carsExists.specifications = specifications;

        await this.carsRepository.create(carsExists);

        return carsExists;
    }
}

export { CreateCarSpecificationUseCase }
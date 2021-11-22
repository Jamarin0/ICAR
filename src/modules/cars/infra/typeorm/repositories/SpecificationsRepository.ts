import { getRepository, Repository } from "typeorm";
import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";
import {
    ISpecificationsRepository,
    ICreateSpecificationDTO,
} from "@modules/cars/repositories/ISpecificationsRepository";

class SpecificationsRepository implements ISpecificationsRepository {
    private repository: Repository<Specification>;

    constructor() {
        this.repository = getRepository(Specification);
    }

    async create({ description, name }: ICreateSpecificationDTO): Promise<Specification> {
        const specifiaction = this.repository.create({
            description,
            name,
        });

        await this.repository.save(specifiaction);

        return specifiaction;
    }

    async findByName(name: string): Promise<Specification> {
        const specifiaction = await this.repository.findOne({
            name,
        });
        return specifiaction;
    }

    async findByIds(ids: string[]): Promise<Specification[]> {
        const specifiactions = await this.repository.findByIds(ids);

        return specifiactions;
    }
}

export { SpecificationsRepository };

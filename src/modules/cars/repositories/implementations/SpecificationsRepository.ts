import { getRepository, Repository } from "typeorm";
import { Specification } from "../../entities/Specification";
import {
    ISpecificationsRepository,
    ICreateSpecificationDTO,
} from "../ISpecificationsRepository";

class SpecificationsRepository implements ISpecificationsRepository {
    private repository: Repository<Specification>;

    constructor() {
        this.repository = getRepository(Specification);
    }

    async create({ description, name }: ICreateSpecificationDTO): Promise<void> {
       const specifiaction = this.repository.create({
           description,
           name,
       });

       await this.repository.save(specifiaction);
    }

    async findByName(name: string): Promise<Specification> {
        const specifiaction = this.repository.findOne({
            name,
        });        
        return specifiaction;
    }
}

export { SpecificationsRepository };

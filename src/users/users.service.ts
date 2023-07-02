import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './enteties/user.entetiy';
import { DataSource, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';


@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private dataSource: DataSource
  ){}

  async create(CreateUserDto: CreateUserDto){
    this.usersRepository.create(CreateUserDto);
    return  this.usersRepository.save(CreateUserDto);
  }

  async update(id: string, CreateUserDto: any){
    const user = await this.usersRepository.preload({
        id: id,
        ...CreateUserDto,
    });
    if(!user){
        throw new NotFoundException(`User #${id} not found`)
    }

    return this.usersRepository.save(user);
  }

  async findOne(email: string): Promise<User | undefined> {
    const user = await this.dataSource
    .getRepository(User)
    .createQueryBuilder('user')
    .where("user.email = :email", { email: email })
    .addSelect("user.password")
    .getOne();
    return user;
  }

  async findAll(){
    return this.usersRepository.find();
  }

  async remove(id: string){
    return this.usersRepository.delete(id);
  }
}
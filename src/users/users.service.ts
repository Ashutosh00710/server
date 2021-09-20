import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User, UserDocument } from './entities/users.entity';
import { LoginInput } from './dto/login-user.input';
import { Ctx } from './interfaces/context';
import { signJwt } from './utils/jwt.utils';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createUser(user: CreateUserInput) {
    const createdUser = await this.userModel.create({
      ...user,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return createdUser.save();
  }

  async login({ email, password }: LoginInput, context: Ctx) {
    const user = await this.userModel.findOne({ email }).select('-__v').exec();
    if (!user || !(await user.comparePassword(password))) {
      throw new Error('Incorrect email or password');
    }

    const jwt = signJwt({
      email: user.email,
      firstname: user.firstname,
    });

    context.res.cookie('token', jwt, {
      domain: 'localhost', // <- Change to your client domain
      secure: false, // <- Should be true if !development
      sameSite: 'strict',
      httpOnly: true,
      path: '/',
    });

    return user;
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(id: string): Promise<User> {
    return this.userModel.findById(id).exec();
  }

  async update(id: string, updatedUser: UpdateUserInput): Promise<User> {
    return this.userModel
      .findByIdAndUpdate(
        id,
        { ...updatedUser, updatedAt: new Date() },
        { new: true },
      )
      .exec();
  }

  async delete(id: string): Promise<User> {
    return this.userModel.findByIdAndDelete(id).exec();
  }
}

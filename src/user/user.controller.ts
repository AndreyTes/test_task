import { Controller, Get, Post, Body, Param, Delete, Put, Sse } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '@prisma/client';
import { Observable, interval, map } from 'rxjs';

@Controller('users')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Post()
  create(@Body() data: { firstName: string; lastName?: string }): Promise<User> {
    return this.usersService.create(data);
  }

  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<User | null> {
    return this.usersService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: { firstName?: string; lastName?: string }): Promise<User> {
    return this.usersService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<User> {
    return this.usersService.delete(id);
  }

  @Sse('sse')
  sse(): Observable<MessageEvent> {
    return interval(1000).pipe(
      map(() => ({ data: this.usersService.findAll() } as MessageEvent)),
    );
  }
}

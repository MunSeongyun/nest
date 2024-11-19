import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private repository:Repository<Post>
  ){

  }
  async create(createPostDto: CreatePostDto) {
    const date = new Date()
    
    const newPost = new Post();
    newPost.author = createPostDto.author
    newPost.content = createPostDto.content
    newPost.title = createPostDto.title
    newPost.createdAt = date.toISOString()

    return await this.repository.save(newPost);
  }

  async findAll() {
    return await this.repository.find();
  }

  async findOne(id: number) {
    return await this.repository.findBy({id:id});
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    const post = await this.repository.findBy({id:id})
    if(!post){
      throw new NotFoundException('게시글이 없는데요?')
    }
    return await this.repository.update({id:id},updatePostDto);
  }

  async remove(id: number) {
    return await this.repository.delete({id:id});
  }
}

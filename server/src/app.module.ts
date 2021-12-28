import { MiddlewareConsumer, Module, RequestMethod } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import ormConfig from "./configs/typeorm.config";
import { UserModule } from "./modules/user/user.module";
import { BookModule } from "./modules/book/book.module";
import { CategoryModule } from "./modules/category/category.module";
import { AuthorModule } from "./modules/author/author.module";
import { AuthMiddleware } from "./modules/user/middlewares/auth.middleware";

@Module({
  imports: [
    TypeOrmModule.forRoot(ormConfig),
    UserModule,
    BookModule,
    CategoryModule,
    AuthorModule,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}

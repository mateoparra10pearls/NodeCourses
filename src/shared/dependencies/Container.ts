import { Container } from "inversify";
import { UserRepository } from "../../repositories/UserRepository";
import { TYPES } from "./Types";
import { Entity } from "../Constants";
import UserController from "../../controllers/UserController";
import { UserService } from "../../services/UserService";
import { IBaseRepository } from "../../repositories/base/IBaseRepository";
import { User } from "../../entity/User";
import { Category } from "../../entity/Category";
import { CategoryRepository } from "../../repositories/CategoryRepository";
import { CategoryType } from "../../entity/CategoryType";
import { CategoryTypeRepository } from "../../repositories/CategoryTypeRepository";
import { Course } from "../../entity/Course";
import { CourseRepository } from "../../repositories/CourseRepository";
import { CourseTag } from "../../entity/CourseTag";
import { CourseTagRepository } from "../../repositories/CourseTagRepository";
import { Role } from "../../entity/Role";
import { RoleRepository } from "../../repositories/RoleRepository";
import { Section } from "../../entity/Section";
import { SectionRepository } from "../../repositories/SectionRepository";
import { Tag } from "../../entity/Tag";
import { TagRepository } from "../../repositories/TagRepository";
import { UserSection } from "../../entity/UserSection";
import { UserSectionRepository } from "../../repositories/UserSectionRepository";
import { IBaseController } from "../../controllers/base/IBaseController";
import { IBaseService } from "../../services/base/IBaseService";
import { CategoryService } from "../../services/CategoryService";
import { CategoryTypeService } from "../../services/CategoryTypeService";
import { CourseService } from "../../services/CourseService";
import { CourseTagService } from "../../services/CourseTagService";
import { RoleService } from "../../services/RoleService";
import { SectionService } from "../../services/SectionService";
import { TagService } from "../../services/TagService";
import { UserSectionService } from "../../services/UserSectionService";
import RoleController from "../../controllers/RoleController";

let DIContainer =  new Container();

type ConfigEntity = string;

// Controllers
DIContainer.bind<IBaseController>(TYPES.UserController).to(UserController);
DIContainer.bind<IBaseController>(TYPES.RoleController).to(RoleController);

// Services
DIContainer.bind<IBaseService<User>>(TYPES.UserService).to(UserService);
DIContainer.bind<IBaseService<Category>>(TYPES.CategoryService).to(CategoryService);
DIContainer.bind<IBaseService<CategoryType>>(TYPES.CategoryTypeService).to(CategoryTypeService);
DIContainer.bind<IBaseService<Course>>(TYPES.CourseService).to(CourseService);
DIContainer.bind<IBaseService<CourseTag>>(TYPES.CourseTagService).to(CourseTagService);
DIContainer.bind<IBaseService<Role>>(TYPES.RoleService).to(RoleService);
DIContainer.bind<IBaseService<Section>>(TYPES.SectionService).to(SectionService);
DIContainer.bind<IBaseService<Tag>>(TYPES.TagService).to(TagService);
DIContainer.bind<IBaseService<UserSection>>(TYPES.UserSectionService).to(UserSectionService);

// Repositories
DIContainer.bind<IBaseRepository<User>>(TYPES.UserRepository).to(UserRepository);
DIContainer.bind<IBaseRepository<Category>>(TYPES.CategoryRepository).to(CategoryRepository);
DIContainer.bind<IBaseRepository<CategoryType>>(TYPES.CategoryTypeRepository).to(CategoryTypeRepository);
DIContainer.bind<IBaseRepository<Course>>(TYPES.CourseRepository).to(CourseRepository);
DIContainer.bind<IBaseRepository<CourseTag>>(TYPES.CourseTagRepository).to(CourseTagRepository);
DIContainer.bind<IBaseRepository<Role>>(TYPES.RoleRepository).to(RoleRepository);
DIContainer.bind<IBaseRepository<Section>>(TYPES.SectionRepository).to(SectionRepository);
DIContainer.bind<IBaseRepository<Tag>>(TYPES.TagRepository).to(TagRepository);
DIContainer.bind<IBaseRepository<UserSection>>(TYPES.UserSectionRepository).to(UserSectionRepository);

// Entities
DIContainer.bind<ConfigEntity>(TYPES.ConfigEntity).toConstantValue(Entity.User).whenTargetNamed(Entity.User);
DIContainer.bind<ConfigEntity>(TYPES.ConfigEntity).toConstantValue(Entity.Category).whenTargetNamed(Entity.Category);
DIContainer.bind<ConfigEntity>(TYPES.ConfigEntity).toConstantValue(Entity.CategoryType).whenTargetNamed(Entity.CategoryType);
DIContainer.bind<ConfigEntity>(TYPES.ConfigEntity).toConstantValue(Entity.Course).whenTargetNamed(Entity.Course);
DIContainer.bind<ConfigEntity>(TYPES.ConfigEntity).toConstantValue(Entity.CourseTag).whenTargetNamed(Entity.CourseTag);
DIContainer.bind<ConfigEntity>(TYPES.ConfigEntity).toConstantValue(Entity.Role).whenTargetNamed(Entity.Role);
DIContainer.bind<ConfigEntity>(TYPES.ConfigEntity).toConstantValue(Entity.Section).whenTargetNamed(Entity.Section);
DIContainer.bind<ConfigEntity>(TYPES.ConfigEntity).toConstantValue(Entity.Tag).whenTargetNamed(Entity.Tag);
DIContainer.bind<ConfigEntity>(TYPES.ConfigEntity).toConstantValue(Entity.UserSection).whenTargetNamed(Entity.UserSection);



export { DIContainer }
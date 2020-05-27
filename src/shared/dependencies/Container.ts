import { Container } from "inversify";
import { TYPES } from "./Types";
import { IBaseController } from "../../controllers/base/IBaseController";
import RoleController from "../../controllers/RoleController";
import CategoryController from "../../controllers/CategoryController";
import CategoryTypeController from "../../controllers/CategoryTypeController";
import CourseController from "../../controllers/CourseController";
import CourseTagController from "../../controllers/CourseTagController";
import SectionController from "../../controllers/SectionController";
import TagController from "../../controllers/TagController";
import UserController from "../../controllers/UserController";
import UserSectionController from "../../controllers/UserSectionController";
import { IBaseRepository } from "../../repositories/base/IBaseRepository";
import { UserRepository } from "../../repositories/UserRepository";
import { CategoryRepository } from "../../repositories/CategoryRepository";
import { CategoryTypeRepository } from "../../repositories/CategoryTypeRepository";
import { CourseRepository } from "../../repositories/CourseRepository";
import { CourseTagRepository } from "../../repositories/CourseTagRepository";
import { RoleRepository } from "../../repositories/RoleRepository";
import { SectionRepository } from "../../repositories/SectionRepository";
import { TagRepository } from "../../repositories/TagRepository";
import { UserSectionRepository } from "../../repositories/UserSectionRepository";
import { Entity } from "../Constants";
import { UserService } from "../../services/UserService";
import { User } from "../../entity/User";
import { Category } from "../../entity/Category";
import { CategoryType } from "../../entity/CategoryType";
import { Course } from "../../entity/Course";
import { CourseTag } from "../../entity/CourseTag";
import { Role } from "../../entity/Role";
import { Section } from "../../entity/Section";
import { Tag } from "../../entity/Tag";
import { UserSection } from "../../entity/UserSection";
import { IBaseService } from "../../services/base/IBaseService";
import { CategoryService } from "../../services/CategoryService";
import { CategoryTypeService } from "../../services/CategoryTypeService";
import { CourseService } from "../../services/CourseService";
import { CourseTagService } from "../../services/CourseTagService";
import { RoleService } from "../../services/RoleService";
import { SectionService } from "../../services/SectionService";
import { TagService } from "../../services/TagService";
import { UserSectionService } from "../../services/UserSectionService";
import EmailSender from "../utils/EmailSender";
import { IEmailSender } from "../interfaces/IEmailSender";
import { HashRepository } from "../../repositories/HashRepository";
import { Hash } from "../../entity/Hash";
import { HashService } from "../../services/HashService";
import { IHashService } from "../../services/interfaces/IHashService";

let DIContainer =  new Container();

type ConfigEntity = string;

// Controllers
DIContainer.bind<IBaseController>(TYPES.UserController).to(UserController);
DIContainer.bind<IBaseController>(TYPES.CategoryController).to(CategoryController);
DIContainer.bind<IBaseController>(TYPES.CategoryTypeController).to(CategoryTypeController);
DIContainer.bind<IBaseController>(TYPES.CourseController).to(CourseController);
DIContainer.bind<IBaseController>(TYPES.CourseTagController).to(CourseTagController);
DIContainer.bind<IBaseController>(TYPES.RoleController).to(RoleController);
DIContainer.bind<IBaseController>(TYPES.SectionController).to(SectionController);
DIContainer.bind<IBaseController>(TYPES.TagController).to(TagController);
DIContainer.bind<IBaseController>(TYPES.UserSectionController).to(UserSectionController);

// Services
DIContainer.bind<IBaseService<Category>>(TYPES.CategoryService).to(CategoryService);
DIContainer.bind<IBaseService<CategoryType>>(TYPES.CategoryTypeService).to(CategoryTypeService);
DIContainer.bind<IBaseService<Course>>(TYPES.CourseService).to(CourseService);
DIContainer.bind<IBaseService<CourseTag>>(TYPES.CourseTagService).to(CourseTagService);
DIContainer.bind<IBaseService<Role>>(TYPES.RoleService).to(RoleService);
DIContainer.bind<IBaseService<Section>>(TYPES.SectionService).to(SectionService);
DIContainer.bind<IBaseService<Tag>>(TYPES.TagService).to(TagService);
DIContainer.bind<IBaseService<UserSection>>(TYPES.UserSectionService).to(UserSectionService);
DIContainer.bind<IBaseService<User>>(TYPES.UserService).to(UserService);
DIContainer.bind<IHashService>(TYPES.HashService).to(HashService);

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
DIContainer.bind<IBaseRepository<Hash>>(TYPES.HashRepository).to(HashRepository);

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
DIContainer.bind<ConfigEntity>(TYPES.ConfigEntity).toConstantValue(Entity.Hash).whenTargetNamed(Entity.Hash);

// Shared
DIContainer.bind<IEmailSender>(TYPES.EmailSender).to(EmailSender);


export { DIContainer }
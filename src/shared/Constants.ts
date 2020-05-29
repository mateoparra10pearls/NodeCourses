export const Entity = {
  User: "User",
  Course: "Course",
  Section: "Section",
  UserSection: "UserSection",
  Role: "Role",
  Category: "Category",
  CategoryType: "CategoryType",
  Tag: "CategoryType",
  CourseTag: "CourseTag",
  Hash: "Hash",
};

export const ErrorMessage = {
  BadFormat: { code: 900, message: "Bad Format" },
  UserAlreadyExist: { code: 901, message: "The email is already used" },
  BadPasswordFormat: {
    code: 902,
    message:
      "Passowrds provided must match and have between 6 and 30 characters.",
  },
  BadEmailFormat: {
    code: 903,
    message:
      "Email must be written in a proper format (Ex: testemail@domain.com)",
  },
  BadLengthFormat: {
    code: 904,
    message : "Check length",
    getMessage: (propertyName: string, min: number, max?: number) => {
      if (max) {
        return `The property ${propertyName} must have min ${min} and max ${max} characters.`;
      } else {
        return `The property ${propertyName} must have min ${min} characters.`;
      }
    }
  },
  NotFoundHash: {
    code: 905,
    message:
      "The hash code provided does not exist.",
  },
  NotFoundEmail : {
    code: 906,
    message:
      "The email entered was not found.",
  },
  WrongPassword: {
    code: 907,
    message:
      "Wrong password.",
  },

};

export const RequestPaths = {
  // Users
  User_GetAll: "/users/getAll",
  User_GetOne: "/users/get/:id",
  User_GetHashInfo: "/users/getHashInfo/:hash",
  User_Save: "/users/save",
  User_SavePassword: "/users/savePassword",
  User_Login: "/users/login",
  // Categories
  Category_GetAll: "/categories/getAll",
  Category_GetOne: "/categories/get/:id",
  Category_Save: "/categories/save"

};

export const Roles = {
  Admin : "Admin",
  RegularUser : "RegularUser"
};

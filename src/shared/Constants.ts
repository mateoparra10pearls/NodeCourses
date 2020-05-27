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
  invalidPassword: { code: 902, message: "Passowrds provided must match and have betwween 6 and 30 characters." }
};
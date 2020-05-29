export const Templates = {

  // New User Email
  userCreatedSubject() : string  {
    return "Welcome to the system! Finish you sign up process"
  },
  userCreatedBody(name: string, hash: string) : string {
    return `<h1>Welcome ${name},</h1>
    <p>There is only one remaining step, you need to set you password,</p>
    <a href="${process.env.APP_MAIN_PAGE_URL}/users/setPassword/${hash}">Click here!</a>`;
  },
};

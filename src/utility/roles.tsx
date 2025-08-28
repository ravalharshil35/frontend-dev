
export default function roles() {
  return (
    {
      user:{
          ViewUser: 0,
          AddUser: 1,
          EditUser: 2,
          DeleteUser: 4,
      },
      Profile:{
          ViewProfile: 8,
          AddProfile: 16,
          EditProfile: 32,
          DeleteProfile: 64,
      }
    }
  )
}

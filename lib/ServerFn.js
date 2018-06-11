import Base64 from './Base64';

//id와 password로 DB검색 : DB가 하는 일
function getUser(id, password) {
  let users = require('./users.json');
  let user = [];
  for (let i in users) {
    if (id === users[i].id && password === users[i].password)
      user.push(users[i]);
  }
  return user;
}

//서버 로그인 로직
export const login = async (pId, pPassword) => {

  let id = pId;
  let password = pPassword;
  password = Base64.btoa(password);

  //id와 password로 DB검색
  let user = await getUser(id, password);

  //없을 경우
  if (user.length === 0) {
    return {
      status: 'ERROR',
      message: "아이디와 비밀번호를 확인하세요"
    };
  }

  //DB 무결성 에러
  if (user.length !== 1) {
    return {
      status: 'ERROR',
      message: "DB ERROR"
    };
  }

  let key = {
    login: true,
    id
  }
  key = Base64.btoa(JSON.stringify(key, 0, 2));

  //서버 세션 생성 생략

  return {
    status: 'SUCCESS',
    data: {
      key: key
    }
  };
}

export const serverAuth = async (key) => {

  let userKey = key;
  userKey = JSON.parse(Base64.atob(userKey));

  return userKey.id && userKey.login ? {status : 'SUCCESS', data : {id : userKey.id}} : {status : 'ERROR'};
}

//서버 로그아웃 로직
export const logout = () => {

  //서버 세션 삭제 생략

  return {
    status: 'SUCCESS'
  };
}
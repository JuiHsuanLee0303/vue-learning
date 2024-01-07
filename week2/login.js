const url = "https://vue3-course-api.hexschool.io/v2";
const path = "warren-lee";

checkLogin();

const usernameInput = document.querySelector("#username");
const passwordInput = document.querySelector("#password");
const loginBtn = document.querySelector("#login");

loginBtn.addEventListener("click", login);

function login() {
      const username = usernameInput.value;
      const password = passwordInput.value;

      const user = {
            username,
            password,
      };
      console.log(user);

      axios.post(`${url}/admin/signin`, user)
            .then((res) => {
                  console.log(res);
                  const { token, expired } = res.data;
                  document.cookie = `hexToken=${token}; expires=${new Date(
                        expired
                  )}`;
                  window.location.assign("./product.html");
            })
            .catch((err) => console.log(err));
}

function checkLogin() {
      const token = document.cookie.replace(
            /(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/,
            "$1"
      );
      axios.defaults.headers.common["Authorization"] = token;

      axios.post(`${url}/api/user/check`)
            .then((res) => {
                  console.log(res);
                  window.location.assign("./product.html");
            })
            .catch((err) => {
                  console.log(err);
            });
}

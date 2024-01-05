const url = "https://vue3-course-api.hexschool.io/v2";
const path = "warren-lee";

function checkLogin() {
  const token = document.cookie.replace(
    /(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/,
    "$1"
  );
  axios.defaults.headers.common["Authorization"] = token;

  axios
    .post(`${url}/api/user/check`)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
      window.location.assign("./login.html");
    });
}

checkLogin();

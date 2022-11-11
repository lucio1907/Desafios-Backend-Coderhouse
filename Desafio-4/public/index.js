const form = document.getElementById("form");

const handleSubmit = (e, form, route) => {
  e.preventDefault();

  let data = new FormData(form);
  let object = {};

  data.forEach((value, key) => (object[key] = value));

  fetch(route, {
    method: "POST",
    body: JSON.stringify(object),
    headers: {
      "Content-type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((err) => console.error(err))
    .finally(console.log("Sended"));
};

form.addEventListener("submit", (e) => handleSubmit(e, e.target, "/api/productos"));
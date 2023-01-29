const socket = io();

const productsForm = document.getElementById("form");
const history = document.getElementById("history");
const chatMessages = document.getElementById("messages");
const chatInput = document.getElementById("chatBox");
const sendMessageButton = document.getElementById("sendButton");
const buttonLogout = document.getElementById("logout");

const backMessage = document.getElementById("message");

// Id para usuario
const currentUser = `${Math.floor(Math.random() * 100)}`;
socket.emit("newUser", currentUser);

// Fecha y hora
const getTimeNow = () => {
  const date = new Date();
  return `[${date.toLocaleDateString()} | ${date.getHours()}:${date.getMinutes()} hs.]`;
};

// Event Handler
const handleSubmit = (e, form, route) => {
  e.preventDefault();
  const formData = new FormData(form);
  const obj = {};

  formData.forEach((value, key) => (obj[key] = value));

  fetch(route, {
    method: "POST",
    body: JSON.stringify(obj),
    headers: {
      "Content-type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((res) => socket.emit("productos", res))
    .catch((err) => console.error(err))
    .finally(() => form.reset());
};

productsForm.addEventListener("submit", (e) =>
  handleSubmit(e, e.target, "/api/productos")
);

document.addEventListener("DOMContentLoaded", () => {
  axios
    .get("/user/getUser")
    .then((res) => {
      backMessage.innerHTML = `<h1 class="text-3xl p-7 text-center font-bold bg-red-500">${
        res.data.username
          ? `Welcome ${res.data.username}`
          : "Insert your Products here!"
      }</h1>`;
    })
    .catch((error) => console.log(error));

  buttonLogout.addEventListener("click", (e) => {
    e.preventDefault();
    axios.get("/user/getUser").then((res) => {
      if (res.statusText === "OK") {
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 5000,
          timerProgressBar: true,
        });

        Toast.fire({
          icon: "success",
          title: `Good Bye ${res.data.username}`,
        });
      }

      location.href = "/user/login";
    });

    axios.get("/user/logout").then((res) => console.log(res));
  });
  // Listado de productos
  socket.on("history", (data) => {
    const allProducts = data.products;
    backMessage.innerHTML = `<h1 class="text-3xl p-7 text-center font-bold bg-red-500">${data.msg}</h1>`;

    if (allProducts.length > 0) {
      let html = `<h2 class="text-center font-bold text-xl mt-5">Your Products:</h2>
    <div class="flex flex-col my-5 text-xl font-bold"></div>`;

      allProducts.forEach((product) => {
        html += `
            <div class="flex flex-col my-5 text-xl font-bold">
                <div class="flex gap-10">${product.id}) Name: <span class="bg-cyan-400 p-1 px-2 rounded shadow">${product.title}</span> Price: <span class="bg-cyan-400 p-1 px-2 rounded shadow">${product.price}</span> Photo: <img class="w-10 h-10" src=${product.url} alt=${product.url}>
            </div>
            `;
        history.innerHTML = html;
      });
    }
  });

  // Persistencia de productos
  socket.on("allProducts", (products) => {
    if (products.length > 0) {
      let html = `<h2 class="text-center font-bold text-xl mt-5">Your Products:</h2>
      <div class="flex flex-col my-5 text-xl font-bold"></div>`;

      products.forEach((product) => {
        html += `
              <div class="flex flex-col my-5 text-xl font-bold">
                  <div class="flex gap-10">${product.id}) Name: <span class="bg-cyan-400 p-1 px-2 rounded shadow">${product.title}</span> Price: <span class="bg-cyan-400 p-1 px-2 rounded shadow">${product.price}</span> Photo: <img class="w-10 h-10" src=${product.url} alt=${product.url}>
              </div>
              `;
        history.innerHTML = html;
      });
    }
  });

  // Info del chat
  const sendInputData = (e, eventType, type) => {
    e.preventDefault();

    if (eventType === type) {
      chatMessages.scrollTop = chatMessages.scrollHeight;
      // Validacion
      if (chatInput.value.trim().length > 0) {
        socket.emit("messages", {
          user: currentUser,
          message: chatInput.value.trim(),
          date: getTimeNow(),
        });
        chatInput.value = "";
      }
    }
  };

  // Evento del campo para escribir
  chatInput.addEventListener("keyup", (e) => sendInputData(e, e.key, "Enter"));

  // Boton para enviar mensaje
  sendMessageButton.addEventListener("click", (e) =>
    sendInputData(e, e.type, "click")
  );

  // Imprimir mensajes
  socket.on("user", (data, msg) => {
    if (data.length > 0) {
      chatMessages.innerHTML = data
        .map((messages) => {
          if (messages.user === currentUser) {
            return `<div class="flex p-1 gap-1 bg-slate-100 backdrop-opacity-50 shadow rounded mt-2"><span class="text-green-500">${messages.date} User${messages.user} (You): </span><p>${messages.message}</p></div>`;
          } else {
            return `<div class="flex p-1 gap-1 bg-slate-100 backdrop-opacity-50 shadow rounded mt-2"><span class="text-red-500">${messages.date} User${messages.user}: </span><p>${messages.message}</p></div>`;
          }
        })
        .join(" ");

      if (msg.length > 0 || msg !== undefined) {
        chatMessages.innerHTML = msg
          .map((messages) => {
            if (messages.user === currentUser) {
              return `<div class="flex p-1 gap-1 bg-slate-100 backdrop-opacity-50 shadow rounded mt-2"><span class="text-green-500">${messages.date} User${messages.user} (You): </span><p>${messages.message}</p></div>`;
            } else {
              return `<div class="flex p-1 gap-1 bg-slate-100 backdrop-opacity-50 shadow rounded mt-2"><span class="text-red-500">${messages.date} User${messages.user}: </span><p>${messages.message}</p></div>`;
            }
          })
          .join(" ");
      }
    }
  });

  // Alerta de nuevo usuario conectado
  socket.on("newUserAlert", (newUser) => {
    if (newUser !== currentUser) {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 5000,
        timerProgressBar: true,
      });

      Toast.fire({
        icon: "success",
        title: `New user with id ${newUser} has been connected!`,
      });
    }
  });
});

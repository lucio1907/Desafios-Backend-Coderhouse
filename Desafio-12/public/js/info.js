const infoList = document.querySelector("#infoList");

document.addEventListener("DOMContentLoaded", () => {
  const getData = async () => {
    const response = await fetch("/getInfo");
    const data = await response.json();

    infoList.innerHTML = `
            <p class="font-bold">Entry Arguments: <span class="text-indigo-500">${data.argv}</span></p>
            <p class="font-bold">Operative System: <span class="text-indigo-500">${data.os}</span></p>
            <p class="font-bold">Node Version: <span class="text-indigo-500">${data.nodeVersion}</span></p>
            <p class="font-bold">Reserved Memory (RSS): <span class="text-indigo-500">${data.rss}</span></p>
            <p class="font-bold">Execute Path: <span class="text-indigo-500">${data.execPath}</span></p>
            <p class="font-bold">Process ID: <span class="text-indigo-500">${data.id}</span></p>
            <p class="font-bold">Project Folder: <span class="text-indigo-500">${data.dirname}</span></p>
        `;
  };

  getData();
});

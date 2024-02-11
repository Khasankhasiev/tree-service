document.addEventListener("DOMContentLoaded", function () {
  fetch("data.json")
    .then((res) => res.json())
    .then((body) => {
      const data = body.services;
      const treeElement = document.getElementById("tree");
      treeElement.innerHTML = buildTree(data, null, 0);
    })
    .catch((error) => console.error("Error fetching data:", error));

  function buildTree(data, parentId, level) {
    const filteredData = data.filter((item) => item.head === parentId);
    filteredData.sort((a, b) => a.sorthead - b.sorthead);
    let html = "";
    if (filteredData.length > 0) {
      html += "<ul>";
      filteredData.forEach((item) => {
        html += `<li>${item.name} (${item.price})`;
        if (item.node === 1) {
          html += buildTree(data, item.id, level + 1);
        }
        html += "</li>";
      });
      html += "</ul>";
    }
    return html;
  }
});
